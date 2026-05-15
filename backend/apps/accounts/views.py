"""
backend/apps/accounts/views.py
"""

import logging
import threading
import secrets
from datetime import timedelta

import requests
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.core.cache import cache
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    ContactInquiry, PaymentInquiry, UserProfile,
    Project, Invoice, Payment, Message,
    PasswordResetToken,
)
from .serializers import (
    UserSerializer, UserProfileSerializer,
    ProjectSerializer, InvoiceSerializer,
    PaymentSerializer, MessageSerializer,
)

logger = logging.getLogger(__name__)

FRONTEND_URL = getattr(settings, "FRONTEND_URL", "https://www.ricreneinvestment.co.tz")


# ── Brevo email helper ────────────────────────────────────────────────────────

def send_email_async(to_email: str, to_name: str, subject: str, html_body: str):
    """Send email via Brevo HTTP API in a background thread."""
    def _send():
        try:
            resp = requests.post(
                "https://api.brevo.com/v3/smtp/email",
                headers={
                    "api-key": settings.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
                json={
                    "sender": {
                        "name":  "Ricrene Investment Ltd",
                        "email": settings.BREVO_SENDER_EMAIL,
                    },
                    "to": [{"email": to_email, "name": to_name}],
                    "subject": subject,
                    "htmlContent": html_body,
                },
                timeout=10,
            )
            if resp.status_code not in (200, 201):
                logger.error("Brevo error %s: %s", resp.status_code, resp.text)
        except Exception as exc:
            logger.error("Email send failed: %s", exc)

    threading.Thread(target=_send, daemon=True).start()


# ── Email template helpers ────────────────────────────────────────────────────

def _email_header(title: str) -> str:
    return (
        f'<div style="background:linear-gradient(135deg,#44B6E8,#2A9FD4);'
        f'padding:24px 32px;border-radius:12px 12px 0 0">'
        f'<h1 style="color:white;margin:0;font-size:20px;font-weight:700">{title}</h1>'
        f'</div>'
    )

def _email_wrapper(header: str, body: str) -> str:
    return (
        '<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;'
        'border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">'
        + header
        + '<div style="padding:28px 32px;background:white">' + body + '</div>'
        + '<div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb">'
        '<p style="margin:0;color:#9ca3af;font-size:12px">'
        'Ricrene Investment Ltd · Samora Tower, Dar es Salaam, Tanzania'
        '</p></div></div>'
    )


# ── Auth — Register ───────────────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    required = ["email", "password", "first_name", "last_name"]
    if any(not data.get(f) for f in required):
        return Response({"error": "All fields are required."}, status=400)

    email = data["email"].strip().lower()
    if User.objects.filter(username=email).exists():
        return Response({"error": "An account with this email already exists."}, status=400)

    user = User.objects.create(
        username=email,
        email=email,
        first_name=data["first_name"].strip(),
        last_name=data["last_name"].strip(),
        password=make_password(data["password"]),
    )
    UserProfile.objects.get_or_create(user=user)
    refresh = RefreshToken.for_user(user)

    send_email_async(
        to_email=email,
        to_name=f"{user.first_name} {user.last_name}",
        subject="Welcome to Ricrene Investment Ltd",
        html_body=_email_wrapper(
            _email_header("Welcome to Ricrene!"),
            f'<p style="color:#374151">Hi <strong>{user.first_name}</strong>,</p>'
            f'<p style="color:#6b7280">Your client portal account has been created. '
            f'You can now track projects, invoices, and payments.</p>'
            f'<a href="{FRONTEND_URL}/dashboard" style="display:inline-block;margin-top:16px;'
            f'padding:12px 28px;background:#44B6E8;color:white;border-radius:8px;'
            f'text-decoration:none;font-weight:600;font-size:14px">Go to Dashboard</a>',
        ),
    )

    return Response({
        "access":  str(refresh.access_token),
        "refresh": str(refresh),
        "user":    UserSerializer(user).data,
    }, status=201)


# ── Auth — Login ──────────────────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    email    = (request.data.get("email") or "").strip().lower()
    password = request.data.get("password") or ""

    if not email or not password:
        return Response({"error": "Email and password are required."}, status=400)

    cache_key = f"login_attempts_{email}"
    attempts  = cache.get(cache_key, 0)
    if attempts >= 10:
        return Response({"error": "Too many attempts. Please try again later."}, status=429)

    user = authenticate(request, username=email, password=password)
    if not user:
        cache.set(cache_key, attempts + 1, timeout=900)
        return Response({"error": "Invalid email or password."}, status=401)

    cache.delete(cache_key)
    refresh = RefreshToken.for_user(user)
    return Response({
        "access":  str(refresh.access_token),
        "refresh": str(refresh),
        "user":    UserSerializer(user).data,
    })


# ── Auth — Logout ─────────────────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        token = RefreshToken(request.data.get("refresh"))
        token.blacklist()
    except Exception:
        pass
    return Response({"message": "Logged out."})


# ── Auth — Me ─────────────────────────────────────────────────────────────────

@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    if request.method == "GET":
        return Response(UserSerializer(user).data)

    data = request.data
    if "first_name" in data:
        user.first_name = data["first_name"].strip()
    if "last_name" in data:
        user.last_name  = data["last_name"].strip()
    user.save()

    profile, _ = UserProfile.objects.get_or_create(user=user)
    if "phone" in data:
        profile.phone = data["phone"].strip()
        profile.save()

    return Response(UserSerializer(user).data)


# ── Auth — Change password ────────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user         = request.user
    current      = request.data.get("current_password") or ""
    new_password = request.data.get("new_password") or ""

    if not authenticate(username=user.username, password=current):
        return Response({"error": "Current password is incorrect."}, status=400)
    if len(new_password) < 8:
        return Response({"error": "New password must be at least 8 characters."}, status=400)

    user.set_password(new_password)
    user.save()
    return Response({"message": "Password changed successfully."})


# ── Auth — Forgot password ────────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([AllowAny])
def forgot_password(request):
    """
    POST { "email": "user@example.com" }
    Always returns 200 — never reveals whether the email exists.
    Reset link is valid for 1 hour and only contains the token (no uid).
    """
    email = (request.data.get("email") or "").strip().lower()
    if not email:
        return Response({"error": "Email is required."}, status=400)

    cache_key = f"pwd_reset_{email}"
    if cache.get(cache_key, 0) >= 3:
        return Response({"message": "If that email exists, a reset link has been sent."})

    try:
        user = User.objects.get(username=email)
    except User.DoesNotExist:
        return Response({"message": "If that email exists, a reset link has been sent."})

    # Invalidate all existing unused tokens
    PasswordResetToken.objects.filter(user=user, used=False).update(used=True)

    # Create a new token
    token = secrets.token_urlsafe(48)
    PasswordResetToken.objects.create(
        user=user,
        token=token,
        expires_at=timezone.now() + timedelta(hours=1),
    )

    # URL only contains token — frontend reads params.get("token") with no uid needed
    reset_url = f"{FRONTEND_URL}/reset-password?token={token}"

    send_email_async(
        to_email=email,
        to_name=user.first_name or "there",
        subject="Reset your Ricrene password",
        html_body=_email_wrapper(
            _email_header("Reset Your Password"),
            f'<p style="color:#374151">Hi <strong>{user.first_name or "there"}</strong>,</p>'
            f'<p style="color:#6b7280">We received a request to reset the password for '
            f'<strong>{email}</strong>.</p>'
            f'<p style="color:#6b7280">Click below — this link expires in <strong>1 hour</strong>.</p>'
            f'<a href="{reset_url}" style="display:inline-block;margin-top:16px;'
            f'padding:12px 28px;background:#44B6E8;color:white;border-radius:8px;'
            f'text-decoration:none;font-weight:600;font-size:14px">Reset Password</a>'
            f'<p style="margin-top:20px;color:#9ca3af;font-size:13px">'
            f"If you didn't request this, you can safely ignore this email.</p>",
        ),
    )

    cache.set(cache_key, cache.get(cache_key, 0) + 1, timeout=3600)
    return Response({"message": "If that email exists, a reset link has been sent."})


# ── Auth — Reset password ─────────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([AllowAny])
def reset_password(request):
    """
    POST { "token": "...", "password": "newpassword" }

    FIXES applied:
    1. Accepts 'password' (what the frontend sends) — old code only checked 'new_password'
    2. Does NOT require uid — backend never put uid in the URL, but old frontend checked for it
    3. Returns { "error": "..." } consistently — old frontend checked d.detail (wrong field)
    """
    token_str = request.data.get("token") or ""

    # Accept 'password' (frontend field) with fallback to 'new_password'
    new_password = (
        request.data.get("password") or
        request.data.get("new_password") or
        ""
    )

    if not token_str:
        return Response({"error": "Reset token is required."}, status=400)
    if not new_password:
        return Response({"error": "New password is required."}, status=400)
    if len(new_password) < 8:
        return Response({"error": "Password must be at least 8 characters."}, status=400)

    try:
        reset_obj = PasswordResetToken.objects.get(token=token_str, used=False)
    except PasswordResetToken.DoesNotExist:
        return Response(
            {"error": "Invalid or expired reset link. Please request a new one."},
            status=400,
        )

    if reset_obj.expires_at < timezone.now():
        reset_obj.used = True
        reset_obj.save()
        return Response(
            {"error": "This reset link has expired. Please request a new one."},
            status=400,
        )

    user = reset_obj.user
    user.set_password(new_password)
    user.save()

    reset_obj.used = True
    reset_obj.save()

    # Confirmation email
    send_email_async(
        to_email=user.email,
        to_name=user.first_name or "there",
        subject="Your Ricrene password has been changed",
        html_body=_email_wrapper(
            _email_header("Password Changed Successfully"),
            f'<p style="color:#374151">Hi <strong>{user.first_name or "there"}</strong>,</p>'
            f'<p style="color:#6b7280">Your password for <strong>{user.email}</strong> '
            f'has been changed successfully.</p>'
            f'<a href="{FRONTEND_URL}/login" style="display:inline-block;margin-top:16px;'
            f'padding:12px 28px;background:#44B6E8;color:white;border-radius:8px;'
            f'text-decoration:none;font-weight:600;font-size:14px">Sign In</a>'
            f'<p style="margin-top:20px;color:#9ca3af;font-size:13px">'
            f'If you did not make this change, contact us immediately at '
            f'<a href="mailto:ricreneinvestments@gmail.com" style="color:#44B6E8">'
            f'ricreneinvestments@gmail.com</a></p>',
        ),
    )

    return Response({"message": "Password reset successfully. You can now sign in."})


# ── Auth — Delete account ─────────────────────────────────────────────────────

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_account(request):
    """DELETE — requires password: { "password": "..." }"""
    password = request.data.get("password") or ""
    if not authenticate(username=request.user.username, password=password):
        return Response({"error": "Incorrect password."}, status=400)

    email = request.user.email
    name  = request.user.first_name

    send_email_async(
        to_email=settings.NOTIFY_EMAIL,
        to_name="Ricrene Admin",
        subject="Client account deleted",
        html_body=_email_wrapper(
            _email_header("Account Deleted"),
            f'<p style="color:#6b7280">Client <strong>{name}</strong> ({email}) '
            f'deleted their account.</p>',
        ),
    )

    request.user.delete()
    return Response({"message": "Account deleted."})


# ── Contact form ──────────────────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([AllowAny])
def contact(request):
    data = request.data
    required = ["name", "email", "message"]
    if any(not data.get(f) for f in required):
        return Response({"error": "Name, email, and message are required."}, status=400)

    ContactInquiry.objects.create(
        name=data["name"].strip(),
        email=data["email"].strip().lower(),
        phone=data.get("phone", "").strip(),
        service=data.get("service", "").strip(),
        message=data["message"].strip(),
    )

    send_email_async(
        to_email=settings.NOTIFY_EMAIL,
        to_name="Ricrene Team",
        subject=f"New enquiry from {data['name']}",
        html_body=_email_wrapper(
            _email_header("New Contact Enquiry"),
            f'<p><strong>Name:</strong> {data["name"]}</p>'
            f'<p><strong>Email:</strong> <a href="mailto:{data["email"]}" style="color:#44B6E8">'
            f'{data["email"]}</a></p>'
            f'<p><strong>Phone:</strong> {data.get("phone") or "—"}</p>'
            f'<p><strong>Service:</strong> {data.get("service") or "—"}</p>'
            f'<p><strong>Message:</strong></p>'
            f'<p style="background:#f9fafb;padding:12px;border-radius:8px;color:#374151;'
            f'border-left:3px solid #44B6E8">{data["message"]}</p>',
        ),
    )

    return Response({"message": "Message sent successfully."}, status=201)


# ── Payment inquiry ───────────────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([AllowAny])
def payment_inquiry(request):
    data = request.data
    PaymentInquiry.objects.create(
        name=data.get("name", "").strip(),
        email=data.get("email", "").strip().lower(),
        plan=data.get("plan", "").strip(),
        message=data.get("message", "").strip(),
    )
    send_email_async(
        to_email=settings.NOTIFY_EMAIL,
        to_name="Ricrene Team",
        subject=f"Payment enquiry: {data.get('plan', '')}",
        html_body=_email_wrapper(
            _email_header("Payment Enquiry"),
            f'<p><strong>Name:</strong> {data.get("name", "")}</p>'
            f'<p><strong>Email:</strong> <a href="mailto:{data.get("email", "")}" style="color:#44B6E8">'
            f'{data.get("email", "")}</a></p>'
            f'<p><strong>Plan:</strong> {data.get("plan", "")}</p>'
            f'<p style="background:#f9fafb;padding:12px;border-radius:8px;color:#374151;'
            f'border-left:3px solid #44B6E8">{data.get("message", "—")}</p>',
        ),
    )
    return Response({"message": "Enquiry received."}, status=201)


# ── Projects ──────────────────────────────────────────────────────────────────

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def projects_list(request):
    qs = Project.objects.filter(client__user=request.user).order_by("-created_at")
    return Response(ProjectSerializer(qs, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def project_request(request):
    data = request.data
    if not data.get("title"):
        return Response({"error": "Project title is required."}, status=400)

    from .models import Client
    client, _ = Client.objects.get_or_create(user=request.user)

    project = Project.objects.create(
        client=client,
        name=data["title"].strip(),
        description=data.get("description", "").strip(),
        status="inquiry",
    )

    send_email_async(
        to_email=settings.NOTIFY_EMAIL,
        to_name="Ricrene Team",
        subject=f"New project request: {project.name}",
        html_body=_email_wrapper(
            _email_header("New Project Request"),
            f'<p><strong>Client:</strong> {request.user.get_full_name()} ({request.user.email})</p>'
            f'<p><strong>Title:</strong> {project.name}</p>'
            f'<p style="background:#f9fafb;padding:12px;border-radius:8px;color:#374151;'
            f'border-left:3px solid #44B6E8">{project.description or "—"}</p>',
        ),
    )

    return Response(ProjectSerializer(project).data, status=201)


# ── Invoices ──────────────────────────────────────────────────────────────────

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def invoices_list(request):
    qs = Invoice.objects.filter(client__user=request.user).order_by("-issued_date")
    return Response(InvoiceSerializer(qs, many=True).data)


# ── Payments ──────────────────────────────────────────────────────────────────

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def payments_list(request):
    qs = Payment.objects.filter(client__user=request.user).order_by("-created_at")
    return Response(PaymentSerializer(qs, many=True).data)


# ── Messages ──────────────────────────────────────────────────────────────────

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def messages(request):
    if request.method == "GET":
        qs = Message.objects.filter(user=request.user).order_by("-created_at")
        return Response(MessageSerializer(qs, many=True).data)

    body = (request.data.get("body") or "").strip()
    if not body:
        return Response({"error": "Message body is required."}, status=400)

    msg = Message.objects.create(
        user=request.user,
        body=body,
        direction="client_to_admin",
    )

    send_email_async(
        to_email=settings.NOTIFY_EMAIL,
        to_name="Ricrene Team",
        subject=f"Portal message from {request.user.get_full_name()}",
        html_body=_email_wrapper(
            _email_header("New Portal Message"),
            f'<p><strong>From:</strong> {request.user.get_full_name()} ({request.user.email})</p>'
            f'<p style="background:#f9fafb;padding:12px;border-radius:8px;color:#374151;'
            f'border-left:3px solid #44B6E8">{body}</p>',
        ),
    )

    return Response(MessageSerializer(msg).data, status=201)