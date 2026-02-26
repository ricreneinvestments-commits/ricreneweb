from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    ContactInquiryView,
    PaymentInquiryView,
    RegisterView,
    LoginView,
    LogoutView,
    MeView,
)

urlpatterns = [
    # Public
    path('contact/',         ContactInquiryView.as_view()),
    path('payment-inquiry/', PaymentInquiryView.as_view()),

    # Auth
    path('auth/register/',   RegisterView.as_view()),
    path('auth/login/',      LoginView.as_view()),
    path('auth/logout/',     LogoutView.as_view()),
    path('auth/refresh/',    TokenRefreshView.as_view()),
    path('auth/me/',         MeView.as_view()),
]