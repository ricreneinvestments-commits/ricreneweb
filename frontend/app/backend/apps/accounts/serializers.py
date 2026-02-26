"""
Serializers for user and authentication endpoints.
"""

from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Standard user serializer for API responses.
    Excludes sensitive fields.
    """
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'full_name',
            'phone_number', 'role', 'employee_id', 'department', 
            'position', 'date_joined', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'employee_id']


class UserCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new users.
    Handles password hashing.
    """
    password = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = User
        fields = [
            'email', 'password', 'first_name', 'last_name',
            'phone_number', 'role', 'department', 'position', 'date_joined'
        ]
    
    def create(self, validated_data):
        # Generate unique employee ID if not provided
        from common.utils import generate_unique_code
        if not validated_data.get('employee_id'):
            validated_data['employee_id'] = generate_unique_code(prefix='EMP', length=6)
        
        return User.objects.create_user(**validated_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating user information.
    Password changes handled separately for security.
    """
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'phone_number',
            'department', 'position', 'is_active'
        ]


class PasswordChangeSerializer(serializers.Serializer):
    """
    Serializer for password change by authenticated user.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    
    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Old password is incorrect')
        return value


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            user = authenticate(
                request=self.context.get('request'),
                username=email,
                password=password
            )
            
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            
            data['user'] = user
            return data
        
        raise serializers.ValidationError('Email and password are required')