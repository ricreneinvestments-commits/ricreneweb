# backend/apps/accounts/admin.py
from django.contrib import admin
from .models import Service, ContactInquiry, PaymentInquiry, UserProfile, Client, Project, Invoice


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display        = ['name', 'category', 'price_range', 'is_active', 'order']
    list_filter         = ['category', 'is_active']
    search_fields       = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering            = ['order']


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display  = ['name', 'email', 'service', 'created_at']
    list_filter   = ['service', 'created_at']
    search_fields = ['name', 'email']
    ordering      = ['-created_at']


@admin.register(PaymentInquiry)
class PaymentInquiryAdmin(admin.ModelAdmin):
    list_display    = ['plan_name', 'amount', 'billing_period', 'contact_method', 'status', 'created_at']
    list_filter     = ['status', 'billing_period', 'contact_method']
    search_fields   = ['plan_name', 'name', 'email', 'mpesa_transaction_id']
    ordering        = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display  = ['user', 'role']
    list_filter   = ['role']
    search_fields = ['user__email', 'user__first_name', 'user__last_name']


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display  = ['user', 'company_name', 'phone', 'created_at']
    search_fields = ['user__email', 'user__first_name', 'company_name']
    ordering      = ['-created_at']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display    = ['name', 'client', 'service', 'status', 'amount', 'created_at']
    list_filter     = ['status', 'service']
    search_fields   = ['name', 'client__user__email', 'client__company_name']
    ordering        = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display    = ['invoice_number', 'project', 'amount', 'status', 'issued_date', 'due_date']
    list_filter     = ['status']
    search_fields   = ['invoice_number', 'project__name', 'mpesa_transaction_id']
    ordering        = ['-created_at']
    readonly_fields = ['created_at', 'issued_date']