# Uniform Management System - Server Documentation

## Overview
A Django REST API backend for managing school uniform orders, connecting parents, schools, and tailors in a unified platform.

## Tech Stack
- **Framework**: Django 6.0.2
- **API**: Django REST Framework
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **Authentication**: JWT (SimpleJWT) with Custom User Model
- **Authorization**: Role-Based Access Control (RBAC)
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
│   ├── permissions.py     # User role permissions
│   └── urls.py            # User routes
├── schools/                # School management app
│   ├── models.py          # School models
│   ├── views.py           # School API views
│   ├── permissions.py     # School permissions
│   └── urls.py            # School routes
├── tailors/                # Tailor management app
│   ├── models.py          # Tailor request models
│   ├── views.py           # Tailor API views
│   ├── permissions.py     # Tailor permissions
│   └── urls.py            # Tailor routes
├── uniform_orders/         # Uniform order management
│   ├── models.py          # Order and assignment models
│   ├── views.py           # Order API views
│   ├── permissions.py     # Order permissions
│   └── urls.py            # Order routes
├── manage.py              # Django management script
├── Pipfile                # Python dependencies
└── db.sqlite3             # SQLite database
```

## Database Models

### User Models (users app)

#### User
Custom user model extending AbstractUser with role-based access.
- **Authentication**: Email-based (no username)
- **Roles**: Admin, Tailor, School_Admin, Parent, Student
- **Fields**: email (unique), password, role, first_name, last_name
- **Manager**: CustomUserManager for email-based authentication
- **Why**: Email is more user-friendly than username; role field enables RBAC

#### Profile Models
- **AdminProfile**: Admin user profile with phone number
- **TailorProfile**: Tailor business details (shop_name, location, phone)
#### SchoolAdminProfile
- **Purpose**: Links school admin to a school
- **Fields**: user, school (nullable), phone_number
- **Why nullable school**: School admin is upgraded from Parent, creates school later
- **Constraint**: OneToOne with User and School
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

## Authentication & Authorization

### JWT Authentication

**Implementation**: Django REST Framework SimpleJWT

**Custom Token Serializer** (`CustomTokenSerializer`):
- Uses email instead of username for login
- Returns access and refresh tokens
- Custom validation for email-based authentication

**Endpoints**:
```
POST /api/users/token/          # Login (get tokens)
POST /api/users/token/refresh/  # Refresh access token
```

**Why JWT**: Stateless authentication, scalable, works well with React frontend

### Role-Based Access Control (RBAC)

**Custom Permission Classes**:

#### users/permissions.py
- `IsSystemAdmin` - Full system access
- `IsTailor` - Tailor-only access
- `IsParent` - Parent-only access  
- `IsSchoolAdmin` - School admin-only access
- `IsStudent` - Student-only access
- `IsOwnerOrAdmin` - Object-level: users access own profiles

#### schools/permissions.py
- `IsSchoolAdminOrSystemAdmin` - School management
- `IsParentOrSchoolAdmin` - View school applications
- `CanApplyToSchool` - Parents apply, others view
- `CanManageSchoolApplications` - School admins manage their school's applications

#### tailors/permissions.py
- `IsTailorOrSchoolAdmin` - Access tailor requests
- `CanCreateTailorRequest` - Tailors create, others view
- `CanManageTailorRequest` - School admins approve/reject

#### uniform_orders/permissions.py
- `CanCreateUniformOrder` - Parents create, others view
- `CanViewUniformOrder` - Role-based viewing
- `CanManageUniformAssignment` - School admins assign to tailors
- `CanUpdateAssignmentStatus` - Tailors update their assignments

**Why RBAC**: 
- Data isolation (users only see their own data)
- Security (prevents unauthorized access)
- Scalability (easy to add new roles)
- Compliance (audit trail of who accessed what)

### Permission Implementation

**ViewSet-level permissions**:
```python
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSystemAdmin]
```

**Action-level permissions**:
```python
def get_permissions(self):
    if self.action == 'create':
        return [IsParent()]
    return [IsAuthenticated()]
```

**Queryset filtering**:
```python
def get_queryset(self):
    if self.request.user.role == 'Parent':
        return Order.objects.filter(parent=self.request.user.parent_profile)
    return Order.objects.all()
```

**Why this approach**: Combines permission checks with data filtering for complete security

## User Registration & Role Management

### Public Registration
- Users can only register as **Parent** or **Tailor**
- Automatically creates corresponding profile (ParentProfile or TailorProfile)
- Email verification recommended for production

### Role Upgrade (Parent → School Admin)

**Endpoint**: `POST /api/users/{id}/upgrade_to_school_admin/`

**Process**:
1. System Admin selects a Parent user
2. Changes user role from 'Parent' to 'School_Admin'
3. Creates SchoolAdminProfile (school field is null initially)
4. School Admin logs in and creates their school
5. SchoolAdminProfile gets linked to the school

**Why this flow**:
- Security: Only System Admin can create School Admins
- Flexibility: School Admin creates school with their own details
- Data integrity: Parent profile remains for historical data
- Access control: Role change automatically updates permissions

**Access after upgrade**:
- User loses Parent dashboard access (role != 'Parent')
- User gains School Admin dashboard access (role == 'School_Admin')
- Same login credentials (email/password)
- Frontend routes based on role field in JWT token

## Data Access Patterns

### Schools
- **View**: All authenticated users
- **Create/Edit/Delete**: School Admin (own school) or System Admin

### Parent School Applications  
- **Create**: Parents
- **View**: Parent (own), School Admin (their school), System Admin (all)
- **Approve/Reject**: School Admin (their school), System Admin

### Tailor School Requests
- **Create**: Tailors
- **View**: Tailor (own), School Admin (their school), System Admin (all)
- **Approve/Reject**: School Admin (their school), System Admin

### Uniform Orders
- **Create**: Parents
- **View**: Parent (own), School Admin (their school), System Admin (all)
- **Approve/Reject**: School Admin (their school), System Admin

### Uniform Assignments
- **Create**: School Admin (their school), System Admin
- **View**: School Admin (their school), Tailor (own), Parent (own orders), System Admin (all)
- **Update Status**: Tailor (own), School Admin (their school), System Admin

**Why these patterns**: 
- Principle of least privilege
- Data isolation between schools
- Clear ownership and responsibility
- Audit trail for compliance

## API Endpoints

### Base URL
```
http://localhost:8000/api/
```

### Authentication
```
POST /api/users/token/           # Login
POST /api/users/token/refresh/   # Refresh token
```

### Users
```
GET    /api/users/                           # List users (Admin only)
POST   /api/users/                           # Create user
GET    /api/users/{id}/                      # Get user details
PATCH  /api/users/{id}/                      # Update user
DELETE /api/users/{id}/                      # Delete user
POST   /api/users/{id}/upgrade_to_school_admin/  # Upgrade parent to school admin
```

### Schools
```
GET    /api/schools/                         # List all schools (authenticated)
POST   /api/schools/                         # Create school (School Admin/Admin)
GET    /api/schools/{id}/                    # Get school details
PATCH  /api/schools/{id}/                    # Update school (owner/Admin)
DELETE /api/schools/{id}/                    # Delete school (owner/Admin)
```

### Parent Applications
```
GET    /api/parent-applications/             # List applications (filtered by role)
POST   /api/parent-applications/             # Create application (Parent)
GET    /api/parent-applications/{id}/        # Get application details
PATCH  /api/parent-applications/{id}/        # Update status (School Admin)
```

### Tailor Requests
```
GET    /api/tailor-requests/                 # List requests (filtered by role)
POST   /api/tailor-requests/                 # Create request (Tailor)
GET    /api/tailor-requests/{id}/            # Get request details
PATCH  /api/tailor-requests/{id}/            # Update status (School Admin)
```

### Uniform Orders
```
GET    /api/uniform-orders/                  # List orders (filtered by role)
POST   /api/uniform-orders/                  # Create order (Parent)
GET    /api/uniform-orders/{id}/             # Get order details
PATCH  /api/uniform-orders/{id}/             # Update status (School Admin)
```

### Uniform Assignments
```
GET    /api/uniform-assignments/             # List assignments (filtered by role)
POST   /api/uniform-assignments/             # Create assignment (School Admin)
GET    /api/uniform-assignments/{id}/        # Get assignment details
PATCH  /api/uniform-assignments/{id}/        # Update status (Tailor/School Admin)
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

### System Admin
- Full system access to all resources
- Manage all users and data
- Upgrade Parents to School Admins
- View system-wide analytics
- **Why**: Central authority for system management

### School Admin
- Manage their school information
- Approve/reject parent applications to their school
- Approve/reject tailor requests to their school
- Approve/reject uniform orders for their school
- Assign approved orders to tailors
- View all data related to their school
- **Why**: School autonomy while maintaining data isolation

### Parent
- Register and manage students
- Apply to schools for student enrollment
- Submit uniform orders for students
- Track order and assignment status
- View only their own data
- **Why**: Privacy and focused user experience

### Tailor
- Apply to work with schools
- View assigned orders from approved schools
- Update order status (received, started, halfway, complete)
- View only their own assignments
- **Why**: Business privacy and focused workflow

### Student
- View profile information
- Linked to parent and school
- Passive role (managed by parent)
- **Why**: Students don't need active system access

## Design Decisions & Rationale

### Why Email-Based Authentication?
- **User-friendly**: People remember emails better than usernames
- **Unique identifier**: Email is naturally unique
- **Communication**: Can send notifications to login email
- **Industry standard**: Most modern apps use email login

### Why Role-Based Access Control (RBAC)?
- **Security**: Users only access what they need
- **Scalability**: Easy to add new roles without changing code
- **Compliance**: Clear audit trail of permissions
- **Maintainability**: Centralized permission logic

### Why JWT Tokens?
- **Stateless**: No server-side session storage needed
- **Scalable**: Works across multiple servers
- **Mobile-friendly**: Easy to implement in mobile apps
- **Frontend separation**: Clean API for React frontend

### Why Separate Permission Files?
- **Organization**: Each app manages its own permissions
- **Reusability**: Permissions can be combined with `|` operator
- **Maintainability**: Easy to find and update permissions
- **Testing**: Isolated permission logic is easier to test

### Why Queryset Filtering?
- **Defense in depth**: Permissions + data filtering = double security
- **Performance**: Database-level filtering is efficient
- **Automatic**: Developers can't forget to filter data
- **Consistent**: Same filtering logic across all views

### Why Parent → School Admin Upgrade?
- **Trust**: School admins are vetted (were parents first)
- **Simplicity**: No separate school admin registration flow
- **Flexibility**: System admin controls who becomes school admin
- **Data continuity**: Parent history is preserved

### Why Nullable School in SchoolAdminProfile?
- **Workflow**: School admin needs to create school after upgrade
- **Flexibility**: School admin can set up school with their details
- **Validation**: Prevents dummy school data during upgrade
- **User experience**: School admin controls their school information

### Why ModelViewSet?
- **Full CRUD**: Automatic endpoints for all operations
- **DRY principle**: Less code to maintain
- **Consistency**: Standard REST API patterns
- **Extensibility**: Easy to add custom actions

### Why Multiple Profile Models?
- **Separation of concerns**: Each role has specific data
- **Flexibility**: Easy to add role-specific fields
- **Performance**: Only load relevant profile data
- **Clarity**: Clear data structure for each role

### Why OneToOne School in SchoolAdminProfile?
- **Business rule**: One school admin per school
- **Data integrity**: Prevents multiple admins for same school
- **Simplicity**: Clear ownership model
- **Scalability**: Can be changed to ForeignKey if needed

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

- [ ] JWT token refresh automation
- [ ] Email notifications for status changes
- [ ] Payment integration for uniform orders
- [ ] File uploads for uniform designs/measurements
- [ ] Real-time order tracking with WebSockets
- [ ] Analytics dashboard for System Admin
- [ ] Mobile app API support
- [ ] Multi-school support for School Admins
- [ ] Tailor rating and review system
- [ ] Automated assignment based on tailor availability
- [ ] Bulk order processing
- [ ] Export reports (PDF/Excel)
- [ ] Two-factor authentication (2FA)
- [ ] Password reset via email
- [ ] User activity logs for audit

## Architecture Decisions

### Why Django REST Framework?
- **Mature ecosystem**: Well-tested and documented
- **Built-in features**: Serializers, viewsets, permissions
- **Browsable API**: Easy testing during development
- **Community**: Large community and third-party packages

### Why SQLite for Development?
- **Zero configuration**: Works out of the box
- **Fast setup**: No database server needed
- **Portable**: Database is a single file
- **Easy reset**: Delete file to start fresh

### Why Separate Apps?
- **Modularity**: Each app has single responsibility
- **Reusability**: Apps can be reused in other projects
- **Team collaboration**: Different developers can work on different apps
- **Testing**: Easier to test isolated functionality

### Why Custom User Manager?
- **Email authentication**: Override default username-based auth
- **Superuser creation**: Custom logic for admin creation
- **Validation**: Centralized user creation logic
- **Consistency**: Same user creation flow everywhere

## Support

For issues or questions, contact the development team.
