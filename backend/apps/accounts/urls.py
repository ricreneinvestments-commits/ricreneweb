# backend/apps/accounts/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import ServiceListView
from .views import (
    ContactInquiryView,
    PaymentInquiryView,
    RegisterView,
    LoginView,
    LogoutView,
    MeView,
    ProjectListView,
    InvoiceListView,
    PaymentListView,
    ProjectRequestView,
    ClientMessageView,
)

urlpatterns = [
    # ── Public ────────────────────────────────────────────────────────────────
    path('contact/',          ContactInquiryView.as_view()),
    path('payment-inquiry/',  PaymentInquiryView.as_view()),

    # ── Auth ──────────────────────────────────────────────────────────────────
    path('auth/register/',    RegisterView.as_view()),
    path('auth/login/',       LoginView.as_view()),
    path('auth/logout/',      LogoutView.as_view()),
    path('auth/refresh/',     TokenRefreshView.as_view()),
    path('auth/me/',          MeView.as_view()),

    # ── Client Portal (authenticated) ─────────────────────────────────────────
    path('projects/',         ProjectListView.as_view()),
    path('projects/request/', ProjectRequestView.as_view()),
    path('invoices/',         InvoiceListView.as_view()),
    path('payments/',         PaymentListView.as_view()),
    path('messages/',         ClientMessageView.as_view()),
    path('services/', ServiceListView.as_view()),
]