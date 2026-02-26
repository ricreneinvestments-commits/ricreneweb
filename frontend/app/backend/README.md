# Backend Platform

Django REST API backend for the IT solutions platform.

## Architecture

- **Django 4.2** with Django REST Framework
- **PostgreSQL** database
- **JWT Authentication** with role-based access control
- **Feature-flag based app enablement** for single-tenant deployments

## Project Structure

```
backend/
├── core/               # Project configuration
│   ├── settings/       # Environment-specific settings
│   ├── urls.py         # Root URL routing
│   └── wsgi.py         # WSGI application
├── apps/               # Business domain apps
│   ├── accounts/       # User management & auth
│   └── attendance/     # Attendance tracking
├── common/             # Shared utilities
│   ├── utils.py        # Helper functions
│   ├── permissions.py  # Permission classes
│   └── constants.py    # Platform constants
├── manage.py
└── requirements.txt
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb platform_db

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 4. Run Development Server

```bash
python manage.py runserver
```

API will be available at: `http://localhost:8000/api/v1/`

## Feature Flags

Control which business domains are enabled per deployment:

```env
ENABLE_ATTENDANCE=True
ENABLE_EVENTS=False
ENABLE_BILLING=False
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login/` - User login
- `POST /api/v1/auth/logout/` - User logout
- `GET /api/v1/auth/me/` - Get current user

### Users (Admin only)
- `GET /api/v1/auth/users/` - List users
- `POST /api/v1/auth/users/` - Create user
- `GET /api/v1/auth/users/{id}/` - Get user details
- `PUT /api/v1/auth/users/{id}/` - Update user
- `POST /api/v1/auth/users/change_password/` - Change password

### Attendance (if enabled)
- `POST /api/v1/attendance/records/check_in/` - Employee check-in
- `POST /api/v1/attendance/records/check_out/` - Employee check-out
- `GET /api/v1/attendance/records/my_attendance/` - Get own attendance
- `GET /api/v1/attendance/records/` - List all records (Manager)
- `POST /api/v1/attendance/records/` - Manual attendance record (Manager)

### Leave Requests (if attendance enabled)
- `GET /api/v1/attendance/leaves/` - List leave requests
- `POST /api/v1/attendance/leaves/` - Create leave request
- `POST /api/v1/attendance/leaves/{id}/review/` - Review leave (Manager)
- `GET /api/v1/attendance/leaves/pending/` - Pending requests (Manager)

### Attendance Summaries (if attendance enabled)
- `GET /api/v1/attendance/summaries/` - List summaries
- `POST /api/v1/attendance/summaries/calculate/` - Calculate summary

## Role-Based Access

- **ADMIN**: Full system access
- **MANAGER**: Can manage attendance, approve leaves, view all records
- **EMPLOYEE**: Can check in/out, request leave, view own records

## Testing

```bash
# Run all tests
pytest

# Run specific app tests
pytest apps/accounts/tests.py
pytest apps/attendance/tests.py

# Run with coverage
pytest --cov=apps
```

## Production Deployment

1. Set environment to production:
   ```env
   DJANGO_SETTINGS_MODULE=core.settings.prod
   DEBUG=False
   ```

2. Configure production database and email

3. Collect static files:
   ```bash
   python manage.py collectstatic
   ```

4. Run with Gunicorn:
   ```bash
   gunicorn core.wsgi:application --bind 0.0.0.0:8000
   ```

## Code Quality

```bash
# Format code
black .

# Lint code
flake8 .
```