# Uniform Management System - Server Documentation

## Overview
A Django REST API backend for managing school uniform orders, connecting parents, schools, and tailors in a unified platform.

## Tech Stack
- **Framework**: Django 6.0.2
- **API**: Django REST Framework
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **Authentication**: Django Auth with Custom User Model
- **CORS**: django-cors-headers

## Project Structure
```
server/
├── UMS/                    # Main project configuration
│   ├── settings.py         # Django settings
│   ├── urls.py            # Root URL configuration
│   └── wsgi.py            # WSGI configuration
├── users/                  # User management app
│   ├── models.py          # User and profile models
│   ├── views.py           # User API views
│   ├── serializers.py     # User serializers
│   └── urls.py            # User routes
├── schools/                # School management app
│   ├── models.py          # School models
│   ├── views.py           # School API views
│   └── urls.py            # School routes
├── tailors/                # Tailor management app
│   ├── models.py          # Tailor request models
│   ├── views.py           # Tailor API views
│   └── urls.py            # Tailor routes
├── uniform_orders/         # Uniform order management
│   ├── models.py          # Order and assignment models
│   ├── views.py           # Order API views
│   └── urls.py            # Order routes
├── manage.py              # Django management script
├── Pipfile                # Python dependencies
└── db.sqlite3             # SQLite database
```

## Database Models

### User Models (users app)

#### User
Custom user model extending AbstractUser with role-based access.
- **Roles**: Admin, Tailor, School_Admin, Parent, Student
- **Fields**: username, email, password, role

#### Profile Models
- **AdminProfile**: Admin user profile with phone number
- **TailorProfile**: Tailor business details (shop_name, location, phone)
- **SchoolAdminProfile**: Links school admin to a school
- **ParentProfile**: Parent contact information
- **StudentProfile**: Student details (admission_number, DOB, gender, parent, school)

### School Models (schools app)

#### School
- **Fields**: name, location, phone_number
- **Relations**: Has many students, school admins, applications

#### Parent_school_application
- **Purpose**: Tracks parent applications to schools
- **Relations**: Links parent, school, and student

### Tailor Models (tailors app)

#### Tailor_school_request
- **Purpose**: Tailor requests to work with schools
- **Status**: PENDING, APPROVED, REJECTED
- **Constraint**: One application per tailor per school

### Uniform Order Models (uniform_orders app)

#### Uniform_order
- **Purpose**: Parent uniform orders for students
- **Status**: PENDING, APPROVED, REJECTED
- **Sizes**: blouse, skirt, sweater, trouser, shoes, shirt
- **Relations**: Links parent and school

#### Uniform_assignment
- **Purpose**: Assigns approved orders to tailors
- **Relations**: Links uniform_order, tailor, and school

## API Endpoints

### Base URL
```
http://localhost:8000/api/
```

### Users
```
/api/users/          # User management endpoints
```

### Schools
```
/api/schools/        # School management endpoints
```

### Tailors
```
/api/tailors/        # Tailor request endpoints
```

### Uniform Orders
```
/api/uniform_orders/ # Order management endpoints
```

## Setup Instructions

### Prerequisites
- Python 3.12
- pipenv

### Installation

1. **Navigate to server directory**
```bash
cd server
```

2. **Install dependencies**
```bash
pipenv install
```

3. **Activate virtual environment**
```bash
pipenv shell
```

4. **Run migrations**
```bash
python manage.py migrate
```

5. **Create superuser**
```bash
python manage.py createsuperuser
```

6. **Run development server**
```bash
python manage.py runserver
```

Server will be available at `http://localhost:8000`

## Environment Configuration

Create a `.env` file in the server directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
```

## Database Configuration

### SQLite (Default - Development)
Already configured in `settings.py`

### PostgreSQL (Production)

1. **Install psycopg2**
```bash
pipenv install psycopg2-binary
```

2. **Update settings.py**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'uniform_management_db',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

3. **Run migrations**
```bash
python manage.py migrate
```

## User Roles & Permissions

### Admin
- Full system access
- Manage all users and data

### School Admin
- Manage school information
- Approve/reject parent applications
- Approve/reject tailor requests
- Assign orders to tailors

### Parent
- Register students
- Submit uniform orders
- Track order status

### Tailor
- Apply to work with schools
- View assigned orders
- Update order status

### Student
- View profile information
- Linked to parent and school

## Common Commands

### Create new app
```bash
python manage.py startapp app_name
```

### Make migrations
```bash
python manage.py makemigrations
```

### Apply migrations
```bash
python manage.py migrate
```

### Create superuser
```bash
python manage.py createsuperuser
```

### Run tests
```bash
python manage.py test
```

### Collect static files
```bash
python manage.py collectstatic
```

## Development Workflow

1. Create feature branch
2. Make changes to models/views/serializers
3. Run `makemigrations` if models changed
4. Run `migrate` to apply changes
5. Test endpoints using Django admin or API client
6. Commit and push changes

## Admin Panel

Access Django admin at: `http://localhost:8000/admin/`

Register models in each app's `admin.py` to manage via admin panel.

## CORS Configuration

CORS is enabled for all origins in development:
```python
CORS_ALLOW_ALL_ORIGINS = True
```

For production, update to specific origins:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://yourdomain.com",
]
```

## Security Notes

- Change `SECRET_KEY` in production
- Set `DEBUG = False` in production
- Configure `ALLOWED_HOSTS` properly
- Use environment variables for sensitive data
- Implement proper authentication/authorization
- Enable HTTPS in production

## Troubleshooting

### Migration conflicts
```bash
python manage.py migrate --fake app_name zero
python manage.py migrate app_name
```

### Reset database
```bash
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

### Port already in use
```bash
python manage.py runserver 8001
```

## Future Enhancements

- [ ] JWT authentication
- [ ] Email notifications
- [ ] Payment integration
- [ ] File uploads for uniform designs
- [ ] Real-time order tracking
- [ ] Analytics dashboard
- [ ] Mobile app API support

## Support

For issues or questions, contact the development team.
