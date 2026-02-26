"""
WSGI config for production deployments.
"""

import os
from django.core.wsgi import get_wsgi_application

# Default to production settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.prod')

application = get_wsgi_application()