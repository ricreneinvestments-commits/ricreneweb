# backend/apps/accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
import logging
import traceback

from .models import ContactInquiry, PaymentInquiry, UserProfile, Client
from .serializers import (
    ContactInquirySerializer, PaymentInquirySerializer,
    RegisterSerializer, UserProfileSerializer
)
from .supabase_client import supabase, CONTACT_TABLE

logger = logging.getLogger(__name__)


# ── Email Helpers ─────────────────────────────────────────────────────────────

import threading

def send_email_async(subject, message, from_email, recipient_list):
    """Send email in background thread so it never blocks the request."""
    def _send():
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=from_email,
                recipient_list=recipient_list,
                fail_silently=True,
            )
            logger.info("Email sent successfully")
        except Exception as e:
            logger.error(f"Email failed: {e}")
    
    thread = threading.Thread(target=_send)
    thread.daemon = True
    thread.start()


def notify_contact(inquiry):
    send_email_async(
        subject=f'📩 New Contact Inquiry — {inquiry.service}',
        message=f"""
New contact inquiry received.

Name:    {inquiry.name}
Email:   {inquiry.email}
Phone:   {inquiry.phone}
Service: {inquiry.service}
Message: {inquiry.message}
        """.strip(),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[settings.NOTIFY_EMAIL],
    )


def notify_payment(inquiry):
    period = {'monthly': '/ month', 'yearly': '/ year', 'once': 'one-time'}.get(
        inquiry.billing_period, inquiry.billing_period
    )
    send_email_async(
        subject=f'💰 New Payment Inquiry — {inquiry.plan_name}',
        message=f"""
New payment inquiry received on Ricrene.

Plan:   {inquiry.plan_name}
Amount: TZS {inquiry.amount:,.0f} {period}
Via:    {inquiry.get_contact_method_display()}

Name:   {inquiry.name or '—'}
Email:  {inquiry.email or '—'}
Phone:  {inquiry.phone or '—'}
        """.strip(),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.NOTIFY_EMAIL],
    )


# ── Contact ───────────────────────────────────────────────────────────────────

# NOTE: Contact form on the frontend currently uses Formspree (https://formspree.io/f/xnjbovwy)
# To switch back to Django: update ContactSection.tsx fetch URL to:
#   `${process.env.NEXT_PUBLIC_API_URL}/api/contact/`
# and remove the Formspree Accept header.

class ContactInquiryView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = ContactInquirySerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            inquiry = serializer.save()

            # 1. Send email notification
            try:
                notify_contact(inquiry)
            except Exception as e:
                logger.error(f"Contact email failed: {e}")

            # 2. Mirror to Supabase REST API (optional — falls back gracefully)
            try:
                if supabase:
                    supabase.table(CONTACT_TABLE).insert({
                        "name":       inquiry.name,
                        "email":      inquiry.email,
                        "phone":      inquiry.phone,
                        "service":    inquiry.service,
                        "message":    inquiry.message,
                        "created_at": inquiry.created_at.isoformat(),
                    }).execute()
            except Exception as e:
                logger.warning(f"Supabase mirror failed (non-fatal): {e}")

            return Response({"success": True}, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"ContactInquiryView error: {e}")
            return Response(
                {"error": str(e), "trace": traceback.format_exc()},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ── Payment ───────────────────────────────────────────────────────────────────

class PaymentInquiryView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = PaymentInquirySerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            inquiry = serializer.save()

            try:
                notify_payment(inquiry)
            except Exception as e:
                logger.error(f"Payment email failed: {e}")

            return Response({"success": True, "id": serializer.data['id']}, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"PaymentInquiryView error: {e}")
            return Response(
                {"error": str(e), "trace": traceback.format_exc()},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ── Auth ──────────────────────────────────────────────────────────────────────

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        if User.objects.filter(email=data['email']).exists():
            return Response(
                {'email': 'An account with this email already exists.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create_user(
            username=data['email'],
            email=data['email'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data.get('last_name', ''),
        )
        UserProfile.objects.create(user=user, role=UserProfile.ROLE_CLIENT)
        Client.objects.create(user=user, phone=data.get('phone', ''))

        refresh = RefreshToken.for_user(user)
        return Response({
            'access':     str(refresh.access_token),
            'refresh':    str(refresh),
            'first_name': user.first_name,
            'last_name':  user.last_name,
            'email':      user.email,
            'role':       'client',
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email    = request.data.get('email', '').lower().strip()
        password = request.data.get('password', '')
        user     = authenticate(request, username=email, password=password)

        if not user:
            return Response(
                {'error': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)
        profile = getattr(user, 'profile', None)

        return Response({
            'access':     str(refresh.access_token),
            'refresh':    str(refresh),
            'first_name': user.first_name,
            'last_name':  user.last_name,
            'email':      user.email,
            'role':       profile.role if profile else 'client',
        })


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = RefreshToken(request.data.get('refresh'))
            token.blacklist()
        except Exception:
            pass
        return Response({'success': True})


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user    = request.user
        profile = getattr(user, 'profile', None)
        client  = getattr(user, 'client_profile', None)
        return Response({
            'id':           user.id,
            'first_name':   user.first_name,
            'last_name':    user.last_name,
            'email':        user.email,
            'role':         profile.role if profile else 'client',
            'phone':        client.phone if client else '',
            'company_name': client.company_name if client else '',
        })

    def patch(self, request):
        user   = request.user
        client = getattr(user, 'client_profile', None)

        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name  = request.data.get('last_name',  user.last_name)
        user.save()

        if client:
            client.phone        = request.data.get('phone',        client.phone)
            client.company_name = request.data.get('company_name', client.company_name)
            client.address      = request.data.get('address',      client.address)
            client.save()

        return Response({'success': True})