import os
from supabase import create_client

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

# Fail safely — don't crash if env vars are missing
if SUPABASE_URL and SUPABASE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None
    print("WARNING: Supabase not configured — SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing")

CONTACT_TABLE = os.getenv("SUPABASE_CONTACT_TABLE", "contact_inquiries")
PAYMENT_TABLE = os.getenv("SUPABASE_PAYMENT_TABLE", "payment_inquiries")
USER_PROFILE_TABLE = os.getenv("SUPABASE_USER_PROFILE_TABLE", "user_profiles")
CLIENT_TABLE = os.getenv("SUPABASE_CLIENT_TABLE", "clients")
PROJECT_TABLE = os.getenv("SUPABASE_PROJECT_TABLE", "projects")
INVOICE_TABLE = os.getenv("SUPABASE_INVOICE_TABLE", "invoices")