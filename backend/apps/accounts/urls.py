# backend/apps/accounts/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # ── Auth ──────────────────────────────────────────────────────────────────
    path("auth/register/",        views.register,        name="register"),
    path("auth/login/",           views.login,           name="login"),
    path("auth/logout/",          views.logout,          name="logout"),
    path("auth/me/",              views.me,              name="me"),
    path("auth/change-password/", views.change_password, name="change-password"),
    path("auth/forgot-password/", views.forgot_password, name="forgot-password"),
    path("auth/reset-password/",  views.reset_password,  name="reset-password"),
    path("auth/delete-account/",  views.delete_account,  name="delete-account"),

    # ── Public forms ──────────────────────────────────────────────────────────
    path("contact/",              views.contact,         name="contact"),
    path("payment-inquiry/",      views.payment_inquiry, name="payment-inquiry"),

    # ── Client portal ─────────────────────────────────────────────────────────
    path("projects/",             views.projects_list,   name="projects-list"),
    path("projects/request/",     views.project_request, name="project-request"),
    path("invoices/",             views.invoices_list,   name="invoices-list"),
    path("payments/",             views.payments_list,   name="payments-list"),
    path("messages/",             views.messages,        name="messages"),
]