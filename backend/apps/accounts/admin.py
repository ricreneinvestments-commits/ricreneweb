"""
backend/apps/accounts/admin.py
Matches models.py exactly — no references to fields that don't exist.
"""

from django.contrib import admin
from .models import (
    UserProfile, PasswordResetToken,
    Client, Service,
    ContactInquiry, PaymentInquiry,
    Project, Invoice, Payment, Message,
)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display  = ["user", "phone"]
    search_fields = ["user__email", "user__first_name", "user__last_name"]


@admin.register(PasswordResetToken)
class PasswordResetTokenAdmin(admin.ModelAdmin):
    list_display  = ["user", "used", "expires_at", "created_at"]
    list_filter   = ["used"]
    readonly_fields = ["user", "token", "created_at", "expires_at", "used"]
    search_fields = ["user__email"]


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display  = ["user", "company", "created_at"]
    search_fields = ["user__email", "user__first_name", "company"]


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display  = ["name", "slug", "is_active", "order"]
    list_filter   = ["is_active"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display  = ["name", "email", "phone", "service", "created_at"]
    list_filter   = ["created_at"]
    search_fields = ["name", "email"]
    readonly_fields = ["created_at"]


@admin.register(PaymentInquiry)
class PaymentInquiryAdmin(admin.ModelAdmin):
    list_display  = ["name", "email", "plan", "created_at"]
    list_filter   = ["created_at"]
    search_fields = ["name", "email"]
    readonly_fields = ["created_at"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ["title", "client", "status", "start_date", "due_date", "created_at"]
    list_filter   = ["status"]
    search_fields = ["title", "client__user__email"]
    readonly_fields = ["created_at", "updated_at"]


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display  = ["invoice_no", "client", "amount", "status", "issued_date", "due_date"]
    list_filter   = ["status"]
    search_fields = ["invoice_no", "client__user__email"]
    readonly_fields = ["created_at"]


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display  = ["plan_name", "client", "amount", "billing_period", "status", "created_at"]
    list_filter   = ["status", "billing_period"]
    search_fields = ["plan_name", "client__user__email"]
    readonly_fields = ["created_at"]


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display  = ["user", "direction", "read", "created_at"]
    list_filter   = ["direction", "read"]
    search_fields = ["user__email", "body"]
    readonly_fields = ["created_at"]