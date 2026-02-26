from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings

from .models import (
    ContactInquiry, PaymentInquiry,
    UserProfile, Client
)
from .serializers import (
    ContactInquirySerializer, PaymentInquirySerializer,
    RegisterSerializer, UserProfileSerializer
)


# ── Email Helpers ─────────────────────────────────────────────────────────────

def notify_contact(inquiry):
    send_mail(
        subject=f'📩 New Contact Inquiry — {inquiry.service}',
        message=f"""
New contact inquiry received on Ricrene.

Name:     {inquiry.name}
Email:    {inquiry.email}
Phone:    {inquiry.phone}
Service:  {inquiry.service}

Message:
{inquiry.message}
        """.strip(),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.NOTIFY_EMAIL],
        fail_silently=False,
    )


def notify_payment(inquiry):
    period = {'monthly': '/ month', 'yearly': '/ year', 'once': 'one-time'}.get(
        inquiry.billing_period, inquiry.billing_period
    )
    send_mail(
        subject=f'💰 New Payment Inquiry — {inquiry.plan_name}',
        message=f"""
New payment inquiry received on Ricrene.

Plan:    {inquiry.plan_name}
Amount:  TZS {inquiry.amount:,.0f} {period}
Via:     {inquiry.get_contact_method_display()}

Name:    {inquiry.name or '—'}
Email:   {inquiry.email or '—'}
Phone:   {inquiry.phone or '—'}
        """.strip(),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.NOTIFY_EMAIL],
        fail_silently=False,
    )


# ── Contact & Payment ─────────────────────────────────────────────────────────

class ContactInquiryView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactInquirySerializer(data=request.data)
        if serializer.is_valid():
            inquiry = serializer.save()
            try:
                notify_contact(inquiry)
            except Exception as e:
                print(f'Email notification failed: {e}')
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentInquiryView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PaymentInquirySerializer(data=request.data)
        if serializer.is_valid():
            inquiry = serializer.save()
            try:
                notify_payment(inquiry)
            except Exception as e:
                print(f'Email notification failed: {e}')
            return Response({"success": True, "id": serializer.data['id']}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ── Auth ──────────────────────────────────────────────────────────────────────

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        # Check email not already taken
        if User.objects.filter(email=data['email']).exists():
            return Response(
                {'email': 'An account with this email already exists.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create user — use email as username too
        user = User.objects.create_user(
            username=data['email'],
            email=data['email'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data.get('last_name', ''),
        )

        # Create profile (role=client by default)
        UserProfile.objects.create(user=user, role=UserProfile.ROLE_CLIENT)

        # Create client profile
        Client.objects.create(
            user=user,
            phone=data.get('phone', ''),
        )

        # Issue tokens immediately — user is logged in after signup
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

        # Django auth uses username — we store email as username
        user = authenticate(request, username=email, password=password)

        if not user:
            return Response(
                {'error': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED
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
        # Update profile info
        user   = request.user
        client = getattr(user, 'client_profile', None)

        # Update name fields on user
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name  = request.data.get('last_name',  user.last_name)
        user.save()

        # Update client profile fields
        if client:
            client.phone        = request.data.get('phone',        client.phone)
            client.company_name = request.data.get('company_name', client.company_name)
            client.address      = request.data.get('address',      client.address)
            client.save()

        return Response({'success': True})