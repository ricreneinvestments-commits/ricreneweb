"""
Tests for accounts app.
"""

import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import User


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def admin_user(db):
    return User.objects.create_user(
        email='admin@test.com',
        password='testpass123',
        first_name='Admin',
        last_name='User',
        role='ADMIN'
    )


@pytest.fixture
def employee_user(db):
    return User.objects.create_user(
        email='employee@test.com',
        password='testpass123',
        first_name='Employee',
        last_name='User',
        role='EMPLOYEE'
    )


@pytest.mark.django_db
class TestUserModel:
    """Test User model."""
    
    def test_create_user(self):
        user = User.objects.create_user(
            email='test@test.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
        assert user.email == 'test@test.com'
        assert user.get_full_name() == 'Test User'
        assert user.role == 'EMPLOYEE'  # Default role
        assert user.is_active is True
    
    def test_create_superuser(self):
        user = User.objects.create_superuser(
            email='admin@test.com',
            password='adminpass123',
            first_name='Admin',
            last_name='User'
        )
        assert user.is_superuser is True
        assert user.is_staff is True
        assert user.role == 'ADMIN'
    
    def test_user_role_properties(self, admin_user, employee_user):
        assert admin_user.is_admin is True
        assert admin_user.is_manager is True
        assert admin_user.is_employee is True
        
        assert employee_user.is_admin is False
        assert employee_user.is_manager is False
        assert employee_user.is_employee is True


@pytest.mark.django_db
class TestAuthEndpoints:
    """Test authentication endpoints."""
    
    def test_login_success(self, api_client, employee_user):
        url = reverse('auth-login')
        data = {
            'email': 'employee@test.com',
            'password': 'testpass123'
        }
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_200_OK
        assert 'tokens' in response.data['data']
        assert 'access' in response.data['data']['tokens']
        assert 'refresh' in response.data['data']['tokens']
    
    def test_login_invalid_credentials(self, api_client):
        url = reverse('auth-login')
        data = {
            'email': 'wrong@test.com',
            'password': 'wrongpass'
        }
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_get_current_user(self, api_client, employee_user):
        # Login first
        api_client.force_authenticate(user=employee_user)
        
        url = reverse('auth-me')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['data']['email'] == employee_user.email


@pytest.mark.django_db
class TestUserEndpoints:
    """Test user management endpoints."""
    
    def test_list_users_admin_only(self, api_client, admin_user, employee_user):
        # Employee cannot list users
        api_client.force_authenticate(user=employee_user)
        url = reverse('user-list')
        response = api_client.get(url)
        assert response.status_code == status.HTTP_403_FORBIDDEN
        
        # Admin can list users
        api_client.force_authenticate(user=admin_user)
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
    
    def test_create_user_admin_only(self, api_client, admin_user):
        api_client.force_authenticate(user=admin_user)
        url = reverse('user-list')
        data = {
            'email': 'newuser@test.com',
            'password': 'newpass123',
            'first_name': 'New',
            'last_name': 'User',
            'role': 'EMPLOYEE'
        }
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(email='newuser@test.com').exists()