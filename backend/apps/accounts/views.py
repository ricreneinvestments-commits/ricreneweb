# backend/apps/accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
import logging
import threading
import os
import time

from .models import ContactInquiry, PaymentInquiry, UserProfile, Client, Project, Invoice, Service
from .serializers import (
    ContactInquirySerializer, PaymentInquirySerializer,
    RegisterSerializer, UserProfileSerializer,
    ProjectSerializer, InvoiceSerializer, ServiceSerializer,
)
from .supabase_client import supabase, CONTACT_TABLE

logger = logging.getLogger(__name__)


# ── Custom Throttles ──────────────────────────────────────────────────────────

class AuthThrottle(AnonRateThrottle):
    rate = '10/minute'
    scope = 'auth'

class ContactThrottle(AnonRateThrottle):
    rate = '5/minute'
    scope = 'contact'


# ── Email Helpers ─────────────────────────────────────────────────────────────

def send_email_async(subject, message, from_email, recipient_list):
    """Send email via Brevo API — works on Render free tier."""
    def _send():
        try:
            import sib_api_v3_sdk
            from sib_api_v3_sdk.rest import ApiException

            api_key = os.getenv('BREVO_API_KEY')
            if not api_key:
                logger.warning("BREVO_API_KEY not set — email skipped")
                return

            configuration = sib_api_v3_sdk.Configuration()
            configuration.api_key['api-key'] = api_key

            api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
                sib_api_v3_sdk.ApiClient(configuration)
            )

            send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
                to=[{"email": email} for email in recipient_list],
                sender={"name": "Ricrene", "email": "ricreneinvestments@gmail.com"},
                subject=subject,
                text_content=message,
            )

            api_instance.send_transac_email(send_smtp_email)
            logger.info("Email sent via Brevo API to %s", recipient_list)

        except Exception as e:
            logger.error("Brevo API email failed: %s", e)

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


def notify_project_request(user, data):
    send_email_async(
        subject=f'🚀 New Project Request — {data.get("service", "General")}',
        message=f"""
New project request from client portal.

Client:      {user.get_full_name()} ({user.email})
Project:     {data.get("name", "—")}
Service:     {data.get("service", "—")}
Description: {data.get("description", "—")}
Budget:      {data.get("budget", "Not specified")}
        """.strip(),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[settings.NOTIFY_EMAIL],
    )


def notify_client_message(user, message):
    send_email_async(
        subject=f'💬 New Message from {user.get_full_name()}',
        message=f"""
New message from client portal.

From:    {user.get_full_name()} ({user.email})
Message: {message}
        """.strip(),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[settings.NOTIFY_EMAIL],
    )


# ── Services (public) ─────────────────────────────────────────────────────────

class ServiceListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        services = Service.objects.filter(is_active=True)
        return Response(ServiceSerializer(services, many=True).data)


# ── Contact (public) ──────────────────────────────────────────────────────────

# NOTE: Contact form on the frontend currently uses Formspree (https://formspree.io/f/xnjbovwy)
# To switch back to Django: update ContactSection.tsx fetch URL to:
#   `${process.env.NEXT_PUBLIC_API_URL}/api/contact/`

class ContactInquiryView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ContactThrottle]

    def post(self, request):
        serializer = ContactInquirySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        inquiry = serializer.save()

        try:
            notify_contact(inquiry)
        except Exception as e:
            logger.error("Contact email failed: %s", e)

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
            logger.warning("Supabase mirror failed (non-fatal): %s", e)

        return Response({"success": True}, status=status.HTTP_201_CREATED)


# ── Payment Inquiry (public) ──────────────────────────────────────────────────

class PaymentInquiryView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ContactThrottle]

    def post(self, request):
        serializer = PaymentInquirySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        inquiry = serializer.save()

        try:
            notify_payment(inquiry)
        except Exception as e:
            logger.error("Payment email failed: %s", e)

        return Response({"success": True, "id": serializer.data['id']}, status=status.HTTP_201_CREATED)


# ── Client Portal — Projects ──────────────────────────────────────────────────

class ProjectListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = Project.objects.filter(client__user=request.user)
        return Response(ProjectSerializer(projects, many=True).data)


class ProjectRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        required = ['name', 'service', 'description']
        for field in required:
            if not str(data.get(field, '')).strip():
                return Response({field: 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Sanitise lengths
        name        = str(data['name'])[:255]
        service     = str(data['service'])[:255]
        description = str(data['description'])[:2000]
        budget      = str(data.get('budget', 'Not specified'))[:255]

        client, _ = Client.objects.get_or_create(user=request.user)

        project = Project.objects.create(
            client=client,
            name=name,
            service=service,
            description=description,
            status='inquiry',
            amount=0,
            notes=f"Budget: {budget}",
        )

        try:
            notify_project_request(request.user, {
                'name': name, 'service': service,
                'description': description, 'budget': budget,
            })
        except Exception as e:
            logger.error("Project request email failed: %s", e)

        return Response(ProjectSerializer(project).data, status=status.HTTP_201_CREATED)


# ── Client Portal — Invoices ──────────────────────────────────────────────────

class InvoiceListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        invoices = Invoice.objects.filter(project__client__user=request.user)
        return Response(InvoiceSerializer(invoices, many=True).data)


# ── Client Portal — Payments ──────────────────────────────────────────────────

class PaymentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        payments = PaymentInquiry.objects.filter(email=request.user.email)
        return Response(PaymentInquirySerializer(payments, many=True).data)


# ── Client Portal — Messages ──────────────────────────────────────────────────

class ClientMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = str(request.data.get('message', '')).strip()[:2000]
        if not message:
            return Response({'message': 'Message cannot be empty.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            notify_client_message(request.user, message)
        except Exception as e:
            logger.error("Client message email failed: %s", e)

        return Response({"success": True}, status=status.HTTP_201_CREATED)


# ── Auth ──────────────────────────────────────────────────────────────────────

class RegisterView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [AuthThrottle]

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
        logger.info("New user registered: %s", user.email)

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
    throttle_classes = [AuthThrottle]

    def post(self, request):
        email    = str(request.data.get('email', '')).lower().strip()[:254]
        password = str(request.data.get('password', ''))
        user     = authenticate(request, username=email, password=password)

        if not user:
            logger.warning("Failed login attempt for email: %s", email)
            return Response(
                {'error': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)
        profile = getattr(user, 'profile', None)
        logger.info("User logged in: %s", user.email)

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
            logger.info("User logged out: %s", request.user.email)
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

        user.first_name = str(request.data.get('first_name', user.first_name))[:150]
        user.last_name  = str(request.data.get('last_name',  user.last_name))[:150]
        user.save()

        if client:
            client.phone        = str(request.data.get('phone',        client.phone))[:50]
            client.company_name = str(request.data.get('company_name', client.company_name))[:255]
            client.address      = str(request.data.get('address',      client.address))[:500]
            client.save()

        return Response({'success': True})