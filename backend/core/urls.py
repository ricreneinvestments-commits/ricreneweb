# backend/core/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse


urlpatterns = [
    # Health check — Render/Vercel ping this to confirm the service is up
    path("", lambda request: HttpResponse("Backend is running 🚀")),

    path("admin/", admin.site.urls),

    # All API routes — defined in apps/accounts/urls.py
    path("api/", include("apps.accounts.urls")),
]