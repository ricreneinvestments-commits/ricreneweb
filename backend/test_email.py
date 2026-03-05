import django, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.core.mail import send_mail
from django.conf import settings

print(f"EMAIL_HOST_USER: {settings.EMAIL_HOST_USER}")
print(f"NOTIFY_EMAIL: {settings.NOTIFY_EMAIL}")
print(f"EMAIL_HOST_PASSWORD set: {'Yes' if settings.EMAIL_HOST_PASSWORD else 'NO - MISSING'}")

try:
    send_mail(
        'Test from Ricrene',
        'This is a test email from Django.',
        settings.EMAIL_HOST_USER,
        [settings.NOTIFY_EMAIL],
        fail_silently=False,
    )
    print("SUCCESS - Email sent!")
except Exception as e:
    print(f"FAILED - {e}")