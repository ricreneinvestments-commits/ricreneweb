"""
Centralized permission classes for role-based access control.
Prevents hardcoded role checks in views.
"""

from rest_framework import permissions


class IsAdminUser(permissions.BasePermission):
    """
    Permission check for admin users only.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'ADMIN'


class IsManagerUser(permissions.BasePermission):
    """
    Permission check for manager and admin users.
    """
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['ADMIN', 'MANAGER']
        )


class IsEmployeeUser(permissions.BasePermission):
    """
    Permission check for employee, manager, and admin users.
    Essentially any authenticated user with a role.
    """
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['ADMIN', 'MANAGER', 'EMPLOYEE']
        )


class IsSelfOrAdmin(permissions.BasePermission):
    """
    Permission check: user can access their own data, or admin can access any.
    Requires object-level permission check.
    """
    def has_object_permission(self, request, view, obj):
        # Admin can access anything
        if request.user.role == 'ADMIN':
            return True
        
        # User can access their own data
        # Assumes obj has a 'user' attribute
        if hasattr(obj, 'user'):
            return obj.user == request.user
        
        # If obj IS the user
        return obj == request.user


class ReadOnly(permissions.BasePermission):
    """
    Permission check for read-only access.
    Allows safe methods (GET, HEAD, OPTIONS) only.
    """
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS