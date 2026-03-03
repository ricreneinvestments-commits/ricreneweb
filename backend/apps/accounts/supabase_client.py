import os
from supabase import create_client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
CONTACT_TABLE = os.getenv("SUPABASE_CONTACT_TABLE", "contact_inquiries")
PAYMENT_TABLE = os.getenv("SUPABASE_PAYMENT_TABLE", "payment_inquiries")
USER_PROFILE_TABLE = os.getenv("SUPABASE_USER_PROFILE_TABLE", "user_profiles")
CLIENT_TABLE = os.getenv("SUPABASE_CLIENT_TABLE", "clients")
PROJECT_TABLE = os.getenv("SUPABASE_PROJECT_TABLE", "projects")
INVOICE_TABLE = os.getenv("SUPABASE_INVOICE_TABLE", "invoices")
