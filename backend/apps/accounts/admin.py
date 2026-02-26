from django.contrib import admin
from .models import ContactInquiry, PaymentInquiry


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'service', 'created_at']
    list_filter = ['service', 'created_at']
    search_fields = ['name', 'email']
    ordering = ['-created_at']


@admin.register(PaymentInquiry)
class PaymentInquiryAdmin(admin.ModelAdmin):
    list_display = ['plan_name', 'amount', 'billing_period', 'contact_method', 'status', 'created_at']
    list_filter = ['status', 'billing_period', 'contact_method']
    search_fields = ['plan_name', 'name', 'email', 'mpesa_transaction_id']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']