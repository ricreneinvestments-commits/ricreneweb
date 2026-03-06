# backend/apps/accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ContactInquiry, PaymentInquiry, UserProfile, Client, Project, Invoice
from .models import Service, ContactInquiry, PaymentInquiry, UserProfile, Client, Project, Invoice


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model  = ContactInquiry
        fields = '__all__'


class PaymentInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model  = PaymentInquiry
        fields = [
            'id', 'plan_name', 'service_name', 'amount',
            'billing_period', 'contact_method',
            'name', 'email', 'phone', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'status', 'created_at']


class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=150)
    last_name  = serializers.CharField(max_length=150, required=False, allow_blank=True)
    email      = serializers.EmailField()
    phone      = serializers.CharField(max_length=50, required=False, allow_blank=True)
    password   = serializers.CharField(min_length=8, write_only=True)

    def validate_email(self, value):
        return value.lower().strip()


class UserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name  = serializers.CharField(source='user.last_name')
    email      = serializers.EmailField(source='user.email')

    class Meta:
        model  = UserProfile
        fields = ['first_name', 'last_name', 'email', 'role']


class ProjectSerializer(serializers.ModelSerializer):
    client_name = serializers.SerializerMethodField()

    class Meta:
        model  = Project
        fields = [
            'id', 'name', 'description', 'service', 'status',
            'start_date', 'end_date', 'amount', 'notes',
            'created_at', 'updated_at', 'client_name'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_client_name(self, obj):
        return obj.client.user.get_full_name()


class InvoiceSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.name', read_only=True)

    class Meta:
        model  = Invoice
        fields = [
            'id', 'invoice_number', 'project', 'project_name',
            'amount', 'status', 'issued_date', 'due_date',
            'paid_date', 'notes', 'created_at'
        ]
        read_only_fields = ['id', 'issued_date', 'created_at']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Service
        fields = ['id', 'name', 'slug', 'category', 'short_desc', 'description', 'price_range', 'order']