from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ContactInquiry, PaymentInquiry, UserProfile, Client


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