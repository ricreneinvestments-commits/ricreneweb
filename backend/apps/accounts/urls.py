"""
backend/apps/accounts/urls.py
All URL patterns — updated with forgot/reset password, delete account,
and all dashboard endpoints.
"""

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # ── Public auth ──────────────────────────────────────────────────────────
    path("auth/register/",        views.register,         name="register"),
    path("auth/login/",           views.login,            name="login"),
    path("auth/refresh/",         TokenRefreshView.as_view(), name="token_refresh"),

    # ── Password reset (no auth required) ────────────────────────────────────
    path("auth/forgot-password/", views.forgot_password,  name="forgot_password"),
    path("auth/reset-password/",  views.reset_password,   name="reset_password"),

    # ── Authenticated auth ────────────────────────────────────────────────────
    path("auth/logout/",          views.logout,           name="logout"),
    path("auth/me/",              views.me,               name="me"),
    path("auth/change-password/", views.change_password,  name="change_password"),
    path("auth/delete-account/",  views.delete_account,   name="delete_account"),

    # ── Public forms ─────────────────────────────────────────────────────────
    path("contact/",              views.contact,          name="contact"),
    path("payment-inquiry/",      views.payment_inquiry,  name="payment_inquiry"),

    # ── Dashboard (authenticated) ─────────────────────────────────────────────
    path("projects/",             views.projects_list,    name="projects_list"),
    path("projects/request/",     views.project_request,  name="project_request"),
    path("invoices/",             views.invoices_list,    name="invoices_list"),
    path("payments/",             views.payments_list,    name="payments_list"),
    path("messages/",             views.messages,         name="messages"),
]