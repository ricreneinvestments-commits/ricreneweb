"""
Platform-wide constants.
Centralizes magic strings and enums for consistency.
"""

# User roles
USER_ROLES = [
    ('ADMIN', 'Administrator'),
    ('MANAGER', 'Manager'),
    ('EMPLOYEE', 'Employee'),
]

# Attendance status
ATTENDANCE_STATUS = [
    ('PRESENT', 'Present'),
    ('ABSENT', 'Absent'),
    ('LATE', 'Late'),
    ('HALF_DAY', 'Half Day'),
    ('ON_LEAVE', 'On Leave'),
]

# Leave types
LEAVE_TYPES = [
    ('SICK', 'Sick Leave'),
    ('ANNUAL', 'Annual Leave'),
    ('MATERNITY', 'Maternity Leave'),
    ('PATERNITY', 'Paternity Leave'),
    ('UNPAID', 'Unpaid Leave'),
]

# Leave status
LEAVE_STATUS = [
    ('PENDING', 'Pending'),
    ('APPROVED', 'Approved'),
    ('REJECTED', 'Rejected'),
    ('CANCELLED', 'Cancelled'),
]

# Event types (for events app when enabled)
EVENT_TYPES = [
    ('WEDDING', 'Wedding'),
    ('CORPORATE', 'Corporate Event'),
    ('CONFERENCE', 'Conference'),
    ('WORKSHOP', 'Workshop'),
    ('OTHER', 'Other'),
]

# Payment status (for billing app when enabled)
PAYMENT_STATUS = [
    ('PENDING', 'Pending'),
    ('PAID', 'Paid'),
    ('FAILED', 'Failed'),
    ('REFUNDED', 'Refunded'),
]