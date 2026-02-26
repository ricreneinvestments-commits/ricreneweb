"""
Root URL configuration.
Dynamically includes app URLs based on feature flags.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# API versioning prefix
API_PREFIX = 'api/v1/'

urlpatterns = [
    # Admin
    path('admin/', admin.site.admin_view),
    
    # Core apps - always included
    path(f'{API_PREFIX}auth/', include('apps.accounts.urls')),
]

# Conditionally include business domain apps based on feature flags
if settings.ENABLED_APPS.get('attendance'):
    urlpatterns.append(
        path(f'{API_PREFIX}attendance/', include('apps.attendance.urls'))
    )

if settings.ENABLED_APPS.get('events'):
    urlpatterns.append(
        path(f'{API_PREFIX}events/', include('apps.events.urls'))
    )

if settings.ENABLED_APPS.get('billing'):
    urlpatterns.append(
        path(f'{API_PREFIX}billing/', include('apps.billing.urls'))
    )

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)