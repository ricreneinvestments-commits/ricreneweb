from django.db import models
from django.contrib.auth.models import User


# ── Contact Inquiry ───────────────────────────────────────────────────────────

class ContactInquiry(models.Model):
    name       = models.CharField(max_length=255)
    email      = models.EmailField()
    phone      = models.CharField(max_length=50)
    service    = models.CharField(max_length=255)
    message    = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service}"

    class Meta:
        verbose_name_plural = "Contact Inquiries"
        ordering = ['-created_at']


# ── Payment Inquiry ───────────────────────────────────────────────────────────

class PaymentInquiry(models.Model):

    BILLING_MONTHLY = 'monthly'
    BILLING_YEARLY  = 'yearly'
    BILLING_ONCE    = 'once'
    BILLING_CHOICES = [
        (BILLING_MONTHLY, 'Monthly'),
        (BILLING_YEARLY,  'Yearly'),
        (BILLING_ONCE,    'One-time'),
    ]

    CONTACT_WHATSAPP = 'whatsapp'
    CONTACT_EMAIL    = 'email'
    CONTACT_FORM     = 'form'
    CONTACT_CHOICES  = [
        (CONTACT_WHATSAPP, 'WhatsApp'),
        (CONTACT_EMAIL,    'Email'),
        (CONTACT_FORM,     'Contact Form'),
    ]

    STATUS_PENDING   = 'pending'
    STATUS_CONFIRMED = 'confirmed'
    STATUS_PAID      = 'paid'
    STATUS_CANCELLED = 'cancelled'
    STATUS_CHOICES   = [
        (STATUS_PENDING,   'Pending'),
        (STATUS_CONFIRMED, 'Confirmed'),
        (STATUS_PAID,      'Paid'),
        (STATUS_CANCELLED, 'Cancelled'),
    ]

    plan_name    = models.CharField(max_length=255)
    service_name = models.CharField(max_length=255, default='Ricrene Investment Ltd')
    amount       = models.DecimalField(max_digits=12, decimal_places=2)
    billing_period = models.CharField(max_length=10, choices=BILLING_CHOICES, default=BILLING_MONTHLY)

    contact_method = models.CharField(max_length=10, choices=CONTACT_CHOICES)
    name  = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)

    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default=STATUS_PENDING)

    mpesa_transaction_id = models.CharField(max_length=255, blank=True, null=True)
    mpesa_phone          = models.CharField(max_length=20, blank=True, null=True)
    paid_at              = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    notes      = models.TextField(blank=True)

    def __str__(self):
        return f"{self.plan_name} - {self.get_status_display()} - {self.created_at.strftime('%Y-%m-%d')}"

    class Meta:
        verbose_name_plural = "Payment Inquiries"
        ordering = ['-created_at']


# ── User Profile (role) ───────────────────────────────────────────────────────

class UserProfile(models.Model):
    ROLE_ADMIN  = 'admin'
    ROLE_STAFF  = 'staff'
    ROLE_CLIENT = 'client'
    ROLE_CHOICES = [
        (ROLE_ADMIN,  'Admin'),
        (ROLE_STAFF,  'Staff'),
        (ROLE_CLIENT, 'Client'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=ROLE_CLIENT)

    def __str__(self):
        return f"{self.user.email} ({self.role})"


# ── Client Profile ────────────────────────────────────────────────────────────

class Client(models.Model):
    user         = models.OneToOneField(User, on_delete=models.CASCADE, related_name='client_profile')
    company_name = models.CharField(max_length=255, blank=True)
    phone        = models.CharField(max_length=50, blank=True)
    address      = models.TextField(blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.user.email})"

    class Meta:
        ordering = ['-created_at']


# ── Project ───────────────────────────────────────────────────────────────────

class Project(models.Model):
    STATUS_CHOICES = [
        ('inquiry',   'Inquiry'),
        ('proposal',  'Proposal Sent'),
        ('active',    'Active'),
        ('review',    'In Review'),
        ('completed', 'Completed'),
        ('on_hold',   'On Hold'),
    ]

    client      = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='projects')
    name        = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    service     = models.CharField(max_length=255)
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default='inquiry')
    start_date  = models.DateField(blank=True, null=True)
    end_date    = models.DateField(blank=True, null=True)
    amount      = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    notes       = models.TextField(blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} — {self.client}"

    class Meta:
        ordering = ['-created_at']


# ── Invoice ───────────────────────────────────────────────────────────────────

class Invoice(models.Model):
    STATUS_CHOICES = [
        ('draft',     'Draft'),
        ('sent',      'Sent'),
        ('paid',      'Paid'),
        ('overdue',   'Overdue'),
        ('cancelled', 'Cancelled'),
    ]

    project        = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='invoices')
    invoice_number = models.CharField(max_length=50, unique=True)
    amount         = models.DecimalField(max_digits=12, decimal_places=2)
    status         = models.CharField(max_length=15, choices=STATUS_CHOICES, default='draft')
    issued_date    = models.DateField(auto_now_add=True)
    due_date       = models.DateField(blank=True, null=True)
    paid_date      = models.DateField(blank=True, null=True)
    notes          = models.TextField(blank=True)
    mpesa_transaction_id = models.CharField(max_length=255, blank=True, null=True)
    created_at     = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.invoice_number} — {self.project.name}"

    class Meta:
        ordering = ['-created_at']