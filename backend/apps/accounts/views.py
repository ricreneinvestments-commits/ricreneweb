"""
backend/apps/accounts/views.py
Complete views — includes all existing endpoints PLUS:
  - POST /api/auth/forgot-password/   → sends reset email via Brevo
  - POST /api/auth/reset-password/    → confirms token + sets new password
  - DELETE /api/auth/delete-account/  → hard-deletes the authenticated user
  - GET /api/projects/                → list client's projects
  - POST /api/projects/request/       → request a new project
  - GET /api/invoices/                → list client's invoices
  - GET /api/payments/                → list client's payments
  - GET/POST /api/messages/           → inbox + send message
"""

import json
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
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    ContactInquiry, PaymentInquiry, UserProfile,
    Project, Invoice, Payment, Message,
    PasswordResetToken,          # ← new model — add to models.py
)
from .serializers import (
    UserSerializer, UserProfileSerializer,
    ProjectSerializer, InvoiceSerializer,
    PaymentSerializer, MessageSerializer,
)

logger = logging.getLogger(__name__)

# ── Brevo helper ──────────────────────────────────────────────────────────────

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
                    "sender": {"name": "Ricrene Investment Ltd", "email": settings.NOTIFY_EMAIL},
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
        html_body=f"""
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px">
          <img src="https://ricrene.co.tz/images/Ricrene logo transparent.png"
               alt="Ricrene" style="height:48px;margin-bottom:24px"/>
          <h2 style="color:#111;margin-bottom:8px">Welcome, {user.first_name}!</h2>
          <p style="color:#555">Your client portal account has been created successfully.</p>
          <p style="color:#555">You can now log in to track your projects, invoices, and payments.</p>
          <a href="https://ricrene.co.tz/dashboard"
             style="display:inline-block;margin-top:20px;padding:12px 28px;
                    background:#DC2626;color:white;border-radius:8px;
                    text-decoration:none;font-weight:600">
            Go to Dashboard
          </a>
          <p style="margin-top:32px;color:#999;font-size:12px">
            Ricrene Investment Ltd · Samora Tower, Dar es Salaam
          </p>
        </div>""",
    )

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": UserSerializer(user).data,
    }, status=201)


# ── Auth — Login ──────────────────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    email    = (request.data.get("email") or "").strip().lower()
    password = request.data.get("password") or ""

    if not email or not password:
        return Response({"error": "Email and password are required."}, status=400)

    # Rate-limit: max 10 attempts per email per 15 min
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


# ── Auth — Me (get + update profile) ─────────────────────────────────────────

@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    if request.method == "GET":
        return Response(UserSerializer(user).data)

    # PATCH — update name / phone
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
    Always returns 200 so we don't leak whether the email exists.
    Sends a reset link valid for 1 hour.
    """
    email = (request.data.get("email") or "").strip().lower()
    if not email:
        return Response({"error": "Email is required."}, status=400)

    # Rate-limit: 3 requests per email per hour
    cache_key = f"pwd_reset_{email}"
    if cache.get(cache_key, 0) >= 3:
        return Response({"message": "If that email exists, a reset link has been sent."})

    try:
        user = User.objects.get(username=email)
    except User.DoesNotExist:
        # Don't reveal the email doesn't exist
        return Response({"message": "If that email exists, a reset link has been sent."})

    # Invalidate any existing tokens for this user
    PasswordResetToken.objects.filter(user=user, used=False).update(used=True)

    # Create a new token
    token = secrets.token_urlsafe(48)
    PasswordResetToken.objects.create(
        user=user,
        token=token,
        expires_at=timezone.now() + timedelta(hours=1),
    )

    reset_url = f"https://ricrene.co.tz/reset-password?token={token}"
    # During dev before domain is live, use Render URL:
    # reset_url = f"https://ricrene-frontend.onrender.com/reset-password?token={token}"

    send_email_async(
        to_email=email,
        to_name=user.first_name or "there",
        subject="Reset your Ricrene password",
        html_body=f"""
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px">
          <img src="https://ricrene.co.tz/images/Ricrene logo transparent.png"
               alt="Ricrene" style="height:48px;margin-bottom:24px"/>
          <h2 style="color:#111;margin-bottom:8px">Reset your password</h2>
          <p style="color:#555">
            We received a request to reset the password for your account (<strong>{email}</strong>).
          </p>
          <p style="color:#555">Click the button below — this link expires in <strong>1 hour</strong>.</p>
          <a href="{reset_url}"
             style="display:inline-block;margin-top:20px;padding:12px 28px;
                    background:#DC2626;color:white;border-radius:8px;
                    text-decoration:none;font-weight:600">
            Reset Password
          </a>
          <p style="margin-top:20px;color:#888;font-size:13px">
            If you didn't request this, you can safely ignore this email.
          </p>
          <p style="margin-top:32px;color:#999;font-size:12px">
            Ricrene Investment Ltd · Samora Tower, Dar es Salaam
          </p>
        </div>""",
    )

    cache.set(cache_key, cache.get(cache_key, 0) + 1, timeout=3600)
    return Response({"message": "If that email exists, a reset link has been sent."})


# ── Auth — Reset password (confirm) ──────────────────────────────────────────

@api_view(["POST"])
@permission_classes([AllowAny])
def reset_password(request):
    """
    POST { "token": "...", "password": "newpassword" }
    """
    token_str    = request.data.get("token") or ""
    new_password = request.data.get("password") or ""

    if not token_str or not new_password:
        return Response({"error": "Token and new password are required."}, status=400)
    if len(new_password) < 8:
        return Response({"error": "Password must be at least 8 characters."}, status=400)

    try:
        reset_obj = PasswordResetToken.objects.get(token=token_str, used=False)
    except PasswordResetToken.DoesNotExist:
        return Response({"error": "Invalid or expired reset link."}, status=400)

    if reset_obj.expires_at < timezone.now():
        reset_obj.used = True
        reset_obj.save()
        return Response({"error": "This reset link has expired. Please request a new one."}, status=400)

    user = reset_obj.user
    user.set_password(new_password)
    user.save()

    reset_obj.used = True
    reset_obj.save()

    return Response({"message": "Password reset successfully. You can now log in."})


# ── Auth — Delete account ─────────────────────────────────────────────────────

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_account(request):
    """
    DELETE — must confirm with password in body: { "password": "..." }
    """
    password = request.data.get("password") or ""
    if not authenticate(username=request.user.username, password=password):
        return Response({"error": "Incorrect password."}, status=400)

    email = request.user.email
    name  = request.user.first_name

    # Notify admin
    send_email_async(
        to_email=settings.NOTIFY_EMAIL,
        to_name="Ricrene Admin",
        subject="Client account deleted",
        html_body=f"<p>Client <strong>{name}</strong> ({email}) deleted their account.</p>",
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
        return Response({"error": "Name, email and message are required."}, status=400)

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
        subject=f"New contact: {data['name']}",
        html_body=f"""
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px">
          <h2 style="color:#DC2626">New Contact Inquiry</h2>
          <p><strong>Name:</strong> {data['name']}</p>
          <p><strong>Email:</strong> {data['email']}</p>
          <p><strong>Phone:</strong> {data.get('phone','—')}</p>
          <p><strong>Service:</strong> {data.get('service','—')}</p>
          <p><strong>Message:</strong><br>{data['message']}</p>
        </div>""",
    )
    return Response({"message": "Message sent."}, status=201)


# ── Payment inquiry (public) ──────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([AllowAny])
def payment_inquiry(request):
    data = request.data
    PaymentInquiry.objects.create(
        name=data.get("name","").strip(),
        email=data.get("email","").strip().lower(),
        plan=data.get("plan","").strip(),
        message=data.get("message","").strip(),
    )
    send_email_async(
        to_email=settings.NOTIFY_EMAIL,
        to_name="Ricrene Team",
        subject=f"Payment inquiry: {data.get('plan','')}",
        html_body=f"""
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px">
          <h2 style="color:#DC2626">Payment Inquiry</h2>
          <p><strong>Name:</strong> {data.get('name','')}</p>
          <p><strong>Email:</strong> {data.get('email','')}</p>
          <p><strong>Plan:</strong> {data.get('plan','')}</p>
          <p><strong>Message:</strong><br>{data.get('message','')}</p>
        </div>""",
    )
    return Response({"message": "Inquiry received."}, status=201)


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
        title=data["title"].strip(),
        description=data.get("description","").strip(),
        status="pending",
    )

    send_email_async(
        to_email=settings.NOTIFY_EMAIL,
        to_name="Ricrene Team",
        subject=f"New project request: {project.title}",
        html_body=f"""
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px">
          <h2 style="color:#DC2626">New Project Request</h2>
          <p><strong>Client:</strong> {request.user.get_full_name()} ({request.user.email})</p>
          <p><strong>Title:</strong> {project.title}</p>
          <p><strong>Description:</strong><br>{project.description or '—'}</p>
        </div>""",
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

    # POST — client sends a message to admin
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
        html_body=f"""
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px">
          <h2 style="color:#DC2626">Portal Message</h2>
          <p><strong>From:</strong> {request.user.get_full_name()} ({request.user.email})</p>
          <p><strong>Message:</strong><br>{body}</p>
        </div>""",
    )

    return Response(MessageSerializer(msg).data, status=201)