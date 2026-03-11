"""
backend/apps/accounts/serializers.py
"""

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, Project, Invoice, Payment, Message


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model  = UserProfile
        fields = ["phone"]


class UserSerializer(serializers.ModelSerializer):
    phone        = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()
    role         = serializers.SerializerMethodField()

    class Meta:
        model  = User
        fields = ["id", "first_name", "last_name", "email", "phone", "company_name", "role"]

    def get_phone(self, obj):
        try:
            return obj.profile.phone
        except Exception:
            return ""

    def get_company_name(self, obj):
        try:
            return obj.client.company_name
        except Exception:
            return ""

    def get_role(self, obj):
        if obj.is_superuser or obj.is_staff:
            return "admin"
        return "client"


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Project
        fields = [
            "id", "name", "service", "description",
            "status", "amount", "start_date", "end_date",
            "created_at",
        ]


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Invoice
        fields = [
            "id", "invoice_number", "project_name",
            "amount", "status", "issued_date", "due_date",
            "created_at",
        ]


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Payment
        fields = [
            "id", "plan_name", "amount",
            "billing_period", "status", "created_at",
        ]


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Message
        fields = ["id", "body", "direction", "read", "created_at"]