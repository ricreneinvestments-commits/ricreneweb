"""
Common utility functions used across the platform.
"""

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Custom exception handler for consistent error responses.
    Returns errors in a standardized format.
    """
    response = exception_handler(exc, context)
    
    if response is not None:
        custom_response = {
            'error': True,
            'message': str(exc),
            'details': response.data
        }
        response.data = custom_response
    
    return response


def success_response(data=None, message='Success', status_code=status.HTTP_200_OK):
    """
    Standardized success response format.
    """
    return Response({
        'error': False,
        'message': message,
        'data': data
    }, status=status_code)


def error_response(message='Error occurred', details=None, status_code=status.HTTP_400_BAD_REQUEST):
    """
    Standardized error response format.
    """
    return Response({
        'error': True,
        'message': message,
        'details': details
    }, status=status_code)


def generate_unique_code(prefix='', length=8):
    """
    Generate a unique alphanumeric code with optional prefix.
    Used for generating employee IDs, attendance codes, etc.
    """
    import random
    import string
    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
    return f"{prefix}{code}" if prefix else code