"""
from django.contrib import admin
from django.urls import path
from django.http import HttpResponse

from apps.accounts import views

urlpatterns = [
    # Health check — Render and Vercel both ping this
    path('', lambda request: HttpResponse("Backend is running 🚀")),

    path('admin/', admin.site.urls),

    # ── Auth ──────────────────────────────────────────────────────────────
    path('api/auth/register/',        views.register,         name='register'),
    path('api/auth/login/',           views.login,            name='login'),
    path('api/auth/logout/',          views.logout,           name='logout'),
    path('api/auth/me/',              views.me,               name='me'),
    path('api/auth/change-password/', views.change_password,  name='change-password'),
    path('api/auth/forgot-password/', views.forgot_password,  name='forgot-password'),
    path('api/auth/reset-password/',  views.reset_password,   name='reset-password'),
    path('api/auth/delete-account/',  views.delete_account,   name='delete-account'),

    # ── Public forms ──────────────────────────────────────────────────────
    path('api/contact/',              views.contact,          name='contact'),
    path('api/payment-inquiry/',      views.payment_inquiry,  name='payment-inquiry'),

    # ── Client portal ─────────────────────────────────────────────────────
    path('api/projects/',             views.projects_list,    name='projects-list'),
    path('api/projects/request/',     views.project_request,  name='project-request'),
    path('api/invoices/',             views.invoices_list,    name='invoices-list'),
    path('api/payments/',             views.payments_list,    name='payments-list'),
    path('api/messages/',             views.messages,         name='messages'),
]
"""