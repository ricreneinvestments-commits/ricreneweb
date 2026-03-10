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
    phone = serializers.SerializerMethodField()

    class Meta:
        model  = User
        fields = ["id", "email", "first_name", "last_name", "phone", "date_joined"]

    def get_phone(self, obj):
        try:
            return obj.profile.phone
        except Exception:
            return ""


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Project
        fields = [
            "id", "title", "description", "status",
            "start_date", "due_date", "created_at", "updated_at",
        ]


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Invoice
        fields = [
            "id", "invoice_no", "description", "amount",
            "status", "issued_date", "due_date", "created_at",
        ]


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Payment
        fields = [
            "id", "plan_name", "amount", "billing_period",
            "status", "created_at",
        ]


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Message
        fields = ["id", "body", "direction", "read", "created_at"]