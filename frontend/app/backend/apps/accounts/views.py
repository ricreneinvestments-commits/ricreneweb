"""
API views for authentication and user management.
Thin controllers - business logic in serializers/services.
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from common.permissions import IsAdminUser, IsSelfOrAdmin
from common.utils import success_response, error_response
from .models import User
from .serializers import (
    UserSerializer, UserCreateSerializer, UserUpdateSerializer,
    PasswordChangeSerializer, LoginSerializer
)


class AuthViewSet(viewsets.GenericViewSet):
    """
    Authentication endpoints: login, logout, refresh token.
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        """
        Authenticate user and return JWT tokens.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return success_response(
            data={
                'user': UserSerializer(user).data,
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                }
            },
            message='Login successful',
            status_code=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        """
        Logout user by blacklisting refresh token.
        """
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            
            return success_response(message='Logout successful')
        except Exception as e:
            return error_response(message='Invalid token', status_code=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """
        Get current authenticated user profile.
        """
        serializer = UserSerializer(request.user)
        return success_response(data=serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    """
    CRUD endpoints for user management.
    Admin-only for create/update/delete. Users can view their own profile.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        """
        Different permissions based on action.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated, IsAdminUser]
        else:
            permission_classes = [IsAuthenticated, IsSelfOrAdmin]
        
        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        """
        Use different serializers for different actions.
        """
        if self.action == 'create':
            return UserCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return UserUpdateSerializer
        return UserSerializer
    
    def create(self, request, *args, **kwargs):
        """
        Create a new user (admin only).
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return success_response(
            data=UserSerializer(user).data,
            message='User created successfully',
            status_code=status.HTTP_201_CREATED
        )
    
    def update(self, request, *args, **kwargs):
        """
        Update user information (admin only).
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return success_response(
            data=UserSerializer(user).data,
            message='User updated successfully'
        )
    
    def destroy(self, request, *args, **kwargs):
        """
        Deactivate user instead of deleting (soft delete).
        """
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        
        return success_response(message='User deactivated successfully')
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def change_password(self, request):
        """
        Allow users to change their own password.
        """
        serializer = PasswordChangeSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        
        return success_response(message='Password changed successfully')