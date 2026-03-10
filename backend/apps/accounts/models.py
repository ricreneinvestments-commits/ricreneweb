"""
backend/apps/accounts/models.py
Complete models — adds PasswordResetToken to support forgot/reset password flow.
"""

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# ── User profile (extra fields) ───────────────────────────────────────────────

class UserProfile(models.Model):
    user  = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return f"Profile – {self.user.email}"


# ── Password reset token ──────────────────────────────────────────────────────

class PasswordResetToken(models.Model):
    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reset_tokens")
    token      = models.CharField(max_length=128, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    used       = models.BooleanField(default=False)

    def __str__(self):
        return f"ResetToken – {self.user.email} ({'used' if self.used else 'active'})"


# ── Client (links User to projects/invoices/payments) ────────────────────────

class Client(models.Model):
    user       = models.OneToOneField(User, on_delete=models.CASCADE, related_name="client")
    company    = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.email


# ── Services ──────────────────────────────────────────────────────────────────

class Service(models.Model):
    name        = models.CharField(max_length=200)
    slug        = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    icon        = models.CharField(max_length=100, blank=True)
    is_active   = models.BooleanField(default=True)
    order       = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


# ── Contact inquiry ───────────────────────────────────────────────────────────

class ContactInquiry(models.Model):
    name       = models.CharField(max_length=200)
    email      = models.EmailField()
    phone      = models.CharField(max_length=30, blank=True)
    service    = models.CharField(max_length=200, blank=True)
    message    = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Contact inquiries"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} – {self.email}"


# ── Payment inquiry (public, before portal) ───────────────────────────────────

class PaymentInquiry(models.Model):
    name       = models.CharField(max_length=200)
    email      = models.EmailField()
    plan       = models.CharField(max_length=200, blank=True)
    message    = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Payment inquiries"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} – {self.plan}"


# ── Project ───────────────────────────────────────────────────────────────────

PROJECT_STATUS = [
    ("pending",     "Pending"),
    ("in_progress", "In Progress"),
    ("review",      "Under Review"),
    ("completed",   "Completed"),
    ("on_hold",     "On Hold"),
    ("cancelled",   "Cancelled"),
]

class Project(models.Model):
    client      = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="projects")
    title       = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    status      = models.CharField(max_length=30, choices=PROJECT_STATUS, default="pending")
    start_date  = models.DateField(null=True, blank=True)
    due_date    = models.DateField(null=True, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} – {self.client}"


# ── Invoice ───────────────────────────────────────────────────────────────────

INVOICE_STATUS = [
    ("draft",     "Draft"),
    ("sent",      "Sent"),
    ("paid",      "Paid"),
    ("overdue",   "Overdue"),
    ("cancelled", "Cancelled"),
]

class Invoice(models.Model):
    client       = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="invoices")
    invoice_no   = models.CharField(max_length=50, unique=True)
    description  = models.TextField(blank=True)
    amount       = models.DecimalField(max_digits=12, decimal_places=2)
    status       = models.CharField(max_length=20, choices=INVOICE_STATUS, default="sent")
    issued_date  = models.DateField(default=timezone.now)
    due_date     = models.DateField(null=True, blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-issued_date"]

    def __str__(self):
        return f"INV-{self.invoice_no} – {self.client}"


# ── Payment ───────────────────────────────────────────────────────────────────

PAYMENT_STATUS = [
    ("pending",   "Pending"),
    ("confirmed", "Confirmed"),
    ("paid",      "Paid"),
    ("cancelled", "Cancelled"),
]

class Payment(models.Model):
    client         = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="payments")
    invoice        = models.ForeignKey(Invoice, on_delete=models.SET_NULL, null=True, blank=True)
    plan_name      = models.CharField(max_length=200)
    amount         = models.DecimalField(max_digits=12, decimal_places=2)
    billing_period = models.CharField(max_length=50, blank=True)  # monthly / yearly
    status         = models.CharField(max_length=20, choices=PAYMENT_STATUS, default="pending")
    created_at     = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.plan_name} – {self.client} – {self.status}"


# ── Message ───────────────────────────────────────────────────────────────────

MESSAGE_DIRECTION = [
    ("client_to_admin", "Client → Admin"),
    ("admin_to_client", "Admin → Client"),
]

class Message(models.Model):
    user      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")
    body      = models.TextField()
    direction = models.CharField(max_length=20, choices=MESSAGE_DIRECTION, default="client_to_admin")
    read      = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Message from {self.user.email} – {self.created_at:%Y-%m-%d}"