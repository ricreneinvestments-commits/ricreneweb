# backend/core/settings.py
from pathlib import Path
from datetime import timedelta
import os
import warnings
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

# ── Security ──────────────────────────────────────────────────────────────────

SECRET_KEY = os.getenv('SECRET_KEY', 'fallback-dev-key-change-in-production')
DEBUG = os.getenv('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = [
    # Production
    "ricreneinvestment.co.tz",
    "www.ricreneinvestment.co.tz",
    "api.ricreneinvestment.co.tz",
    # Render backend
    "ricrene-backend.onrender.com",
    # Vercel — the leading dot covers ALL subdomains: abc.vercel.app, xyz-abc.vercel.app, etc.
    ".vercel.app",
    # Local dev
    "localhost",
    "127.0.0.1",
]

if not DEBUG:
    SECURE_BROWSER_XSS_FILTER   = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS             = 'DENY'
    SECURE_REFERRER_POLICY      = 'strict-origin-when-cross-origin'

# ── Apps ──────────────────────────────────────────────────────────────────────

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    'apps.accounts',
]

# ── Middleware ────────────────────────────────────────────────────────────────

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",       # MUST be first
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

# ── Templates ─────────────────────────────────────────────────────────────────

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# ── Database ──────────────────────────────────────────────────────────────────

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': '6543',
        'OPTIONS': {'sslmode': 'require'},
        'CONN_MAX_AGE': 60,
    }
}

# ── Auth & JWT ────────────────────────────────────────────────────────────────

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '60/hour',
        'user': '300/hour',
        'auth': '10/minute',
        'contact': '5/minute',
    },
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME':    timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME':   timedelta(days=30),
    'ROTATE_REFRESH_TOKENS':    True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# ── CORS ──────────────────────────────────────────────────────────────────────

CORS_ALLOWED_ORIGINS = [
    "https://ricreneinvestment.co.tz",
    "https://www.ricreneinvestment.co.tz",
    "https://ricreneweb.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Covers every possible Vercel preview URL pattern:
#   ricreneweb-abc123-xyz.vercel.app
#   ricreneweb-ejaeyn8ix-ricreneinvestments-commits-projects.vercel.app
#   ricreneweb-git-main-ricreneinvestments-commits-projects.vercel.app
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://ricreneweb[a-zA-Z0-9\-]*\.vercel\.app$",
    r"^https://[a-zA-Z0-9\-]+-ricreneinvestments-commits-projects\.vercel\.app$",
]

CORS_ALLOW_ALL_ORIGINS  = False
CORS_ALLOW_CREDENTIALS  = True

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

# ── CSRF trusted origins ──────────────────────────────────────────────────────
# Needed so Django doesn't reject requests from these domains.
# DRF+JWT is CSRF-exempt but Django admin and session views still need this.

CSRF_TRUSTED_ORIGINS = [
    "https://ricreneinvestment.co.tz",
    "https://www.ricreneinvestment.co.tz",
    "https://ricreneweb.vercel.app",
]

# ── Email (Brevo SMTP) ────────────────────────────────────────────────────────

EMAIL_BACKEND       = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST          = 'smtp-relay.brevo.com'
EMAIL_PORT          = 587
EMAIL_USE_TLS       = True
EMAIL_HOST_USER     = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL  = f'Ricrene <{os.getenv("EMAIL_HOST_USER")}>'

NOTIFY_EMAIL = os.getenv('NOTIFY_EMAIL') or os.getenv('EMAIL_HOST_USER')

# ── Brevo HTTP API ────────────────────────────────────────────────────────────

BREVO_API_KEY      = os.getenv('BREVO_API_KEY', '')
BREVO_SENDER_EMAIL = os.getenv('BREVO_SENDER_EMAIL', 'ricreneinvestments@gmail.com')
FRONTEND_URL       = os.getenv('FRONTEND_URL', 'https://www.ricreneinvestment.co.tz')

if not BREVO_API_KEY:
    warnings.warn("BREVO_API_KEY is not set — emails will not be sent!", RuntimeWarning)
if not NOTIFY_EMAIL:
    warnings.warn("NOTIFY_EMAIL is not set — contact form notifications will fail!", RuntimeWarning)

# ── Logging ───────────────────────────────────────────────────────────────────

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '[{levelname}] {asctime} {module} — {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {'handlers': ['console'], 'level': 'INFO'},
    'loggers': {
        'django': {'handlers': ['console'], 'level': 'WARNING', 'propagate': False},
        'apps':   {'handlers': ['console'], 'level': 'INFO',    'propagate': False},
    },
}

# ── Internationalisation ──────────────────────────────────────────────────────

LANGUAGE_CODE = 'en-us'
TIME_ZONE     = 'Africa/Dar_es_Salaam'
USE_I18N      = True
USE_TZ        = True

# ── Static files ──────────────────────────────────────────────────────────────

STATIC_URL  = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ── Default primary key ───────────────────────────────────────────────────────

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'