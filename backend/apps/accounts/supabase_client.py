# backend/apps/accounts/supabase_client.py
import os
import logging

logger = logging.getLogger(__name__)

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

CONTACT_TABLE      = os.getenv("SUPABASE_CONTACT_TABLE",      "contact_inquiries")
PAYMENT_TABLE      = os.getenv("SUPABASE_PAYMENT_TABLE",      "payment_inquiries")
USER_PROFILE_TABLE = os.getenv("SUPABASE_USER_PROFILE_TABLE", "user_profiles")
CLIENT_TABLE       = os.getenv("SUPABASE_CLIENT_TABLE",       "clients")
PROJECT_TABLE      = os.getenv("SUPABASE_PROJECT_TABLE",      "projects")
INVOICE_TABLE      = os.getenv("SUPABASE_INVOICE_TABLE",      "invoices")

supabase = None

if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        logger.info("Supabase client initialised successfully")
    except Exception as e:
        logger.warning(f"Supabase client failed to initialise: {e}")
        supabase = None
else:
    logger.warning("Supabase not configured — SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing")