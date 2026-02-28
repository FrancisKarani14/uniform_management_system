# Django Backend - Render Deployment Preparation Guide

## Table of Contents
1. [Current State Analysis](#current-state-analysis)
2. [Security Issues](#security-issues)
3. [Database Migration](#database-migration)
4. [Environment Configuration](#environment-configuration)
5. [Static Files & Media](#static-files--media)
6. [Performance Optimizations](#performance-optimizations)
7. [Code Cleanup](#code-cleanup)
8. [Deployment Checklist](#deployment-checklist)
9. [Post-Deployment](#post-deployment)

---

## Current State Analysis

### Project Structure
```
server/
├── schools/          # School management app
├── tailors/          # Tailor management app
├── uniform_orders/   # Order & assignment management
├── users/            # User authentication & profiles
├── UMS/              # Main project settings
├── db.sqlite3        # ⚠️ SQLite database (needs migration)
├── Pipfile           # Python dependencies
└── manage.py
```

### Technology Stack
- **Django 6.0.2** (Latest)
- **Django REST Framework** (API)
- **djangorestframework-simplejwt** (JWT Authentication)
- **django-cors-headers** (CORS handling)
- **python-dotenv** (Environment variables)
- **supabase** (Hybrid auth - partially implemented)

---

## Security Issues

### 🔴 CRITICAL - Must Fix Before Deployment

#### 1. **Exposed Secret Key**
```python
# settings.py - Line 27
SECRET_KEY = 'django-insecure-_mg-@aj*c2!e%t(j&4-l^liq2i*qx0j08-@o+_4ns+sfin0ixx'
```
**Risk**: Anyone with this key can forge sessions, decrypt data, and compromise security.

**Fix**: Move to environment variable
```python
SECRET_KEY = os.getenv('SECRET_KEY', 'fallback-key-for-local-dev')
```

#### 2. **DEBUG = True in Production**
```python
DEBUG = True  # Line 30
```
**Risk**: Exposes sensitive error pages with stack traces, settings, and SQL queries.

**Fix**: 
```python
DEBUG = os.getenv('DEBUG', 'False') == 'True'
```

#### 3. **Empty ALLOWED_HOSTS**
```python
ALLOWED_HOSTS = []  # Line 32
```
**Risk**: Django will reject all requests in production.

**Fix**:
```python
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')
```

#### 4. **CORS_ALLOW_ALL_ORIGINS = True**
```python
CORS_ALLOW_ALL_ORIGINS = True  # Line 135
```
**Risk**: Any website can make requests to your API.

**Fix**:
```python
CORS_ALLOWED_ORIGINS = [
    'https://your-frontend-domain.com',
    'http://localhost:5173',  # For local dev
]
```

---

## Database Migration

### Current: SQLite (db.sqlite3)
**Issues**:
- ❌ Not suitable for production
- ❌ No concurrent write support
- ❌ File-based (doesn't work on Render's ephemeral filesystem)
- ❌ No backup/restore capabilities

### Recommended: PostgreSQL

**Why PostgreSQL?**
- ✅ Free tier on Render
- ✅ Concurrent connections
- ✅ ACID compliance
- ✅ Automatic backups
- ✅ Better performance at scale

### Migration Steps

1. **Add PostgreSQL to Pipfile**
```toml
[packages]
psycopg2-binary = "*"  # PostgreSQL adapter
dj-database-url = "*"  # Parse database URLs
```

2. **Update settings.py**
```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3'),
        conn_max_age=600
    )
}
```

3. **Render will provide DATABASE_URL automatically**

---

## Environment Configuration

### Create `.env.example` (for documentation)
```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-app.onrender.com,www.your-domain.com

# Database (Render provides this automatically)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# CORS
CORS_ALLOWED_ORIGINS=https://your-frontend.com,https://www.your-frontend.com

# JWT Settings
JWT_ACCESS_TOKEN_LIFETIME=60

# Supabase (if using hybrid auth)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
```

### Update settings.py to use environment variables
```python
# Security
SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

# CORS
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')

# JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_LIFETIME', '60'))),
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

---

## Static Files & Media

### Current State
```python
STATIC_URL = 'static/'  # Only URL defined
```

### Required for Production

```python
import os

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media files (User uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# WhiteNoise for serving static files
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this
    # ... rest of middleware
]

# Static file storage
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

### Add to Pipfile
```toml
[packages]
whitenoise = "*"
```

---

## Performance Optimizations

### 1. **Database Connection Pooling**
Already configured in database settings:
```python
conn_max_age=600  # Keep connections alive for 10 minutes
```

### 2. **Add Database Indexes**
Check models for missing indexes on frequently queried fields:

**users/models.py**
```python
class User(AbstractUser):
    email = models.EmailField(unique=True, db_index=True)  # Add index
    role = models.CharField(max_length=20, choices=Roles.choices, db_index=True)
```

**uniform_orders/models.py**
```python
class Uniform_assignment(models.Model):
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', db_index=True)
```

### 3. **Query Optimization**
Add `select_related()` and `prefetch_related()` to reduce database queries:

**Example in views.py**
```python
# Before (N+1 queries)
students = StudentProfile.objects.all()

# After (2 queries)
students = StudentProfile.objects.select_related('user', 'parent', 'school').all()
```

### 4. **Caching** (Optional for MVP)
```python
# Add to Pipfile
django-redis = "*"

# settings.py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': os.getenv('REDIS_URL', 'redis://127.0.0.1:6379/1'),
    }
}
```

---

## Code Cleanup

### Files to Remove

#### 1. **Unused Test Files**
```bash
# All apps have empty tests.py files
schools/tests.py
tailors/tests.py
uniform_orders/tests.py
users/tests.py
```
**Action**: Delete or add actual tests

#### 2. **Migration Files** (Optional)
If starting fresh on Render:
```bash
# Keep only __init__.py in migrations/
# Delete numbered migration files
# Run makemigrations on Render
```

#### 3. **SQLite Database**
```bash
# Don't commit to git
db.sqlite3
```

### Update .gitignore
```gitignore
# Database
*.sqlite3
db.sqlite3

# Environment
.env
*.env

# Python
__pycache__/
*.py[cod]
*$py.class
*.so

# Django
staticfiles/
media/
*.log

# IDE
.vscode/
.idea/
*.swp
```

### Code Quality Issues

#### 1. **Inconsistent Naming**
```python
# Current (snake_case for classes - incorrect)
class Parent_school_application(models.Model):
class Tailor_school_request(models.Model):
class Uniform_order(models.Model):
class Uniform_assignment(models.Model):

# Should be (PascalCase)
class ParentSchoolApplication(models.Model):
class TailorSchoolRequest(models.Model):
class UniformOrder(models.Model):
class UniformAssignment(models.Model):
```
**Impact**: Works but violates Python conventions
**Fix**: Rename classes (requires migration)

#### 2. **Missing Docstrings**
Most views lack documentation
```python
# Add docstrings
def approve(self, request, pk=None):
    """
    Approve a parent school application.
    
    Only school admins can approve applications to their school.
    Updates application status from Pending to Approved.
    
    Returns:
        200: Application approved successfully
        400: Application already processed
        403: Permission denied
    """
```

#### 3. **Hardcoded Values**
```python
# settings.py
'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Hardcoded
```
**Fix**: Use environment variables (shown in Environment Configuration)

---

## Deployment Checklist

### Pre-Deployment

- [ ] **Security**
  - [ ] Move SECRET_KEY to environment variable
  - [ ] Set DEBUG=False
  - [ ] Configure ALLOWED_HOSTS
  - [ ] Restrict CORS_ALLOWED_ORIGINS
  - [ ] Review all permissions.py files

- [ ] **Database**
  - [ ] Add psycopg2-binary to Pipfile
  - [ ] Add dj-database-url to Pipfile
  - [ ] Update DATABASES setting
  - [ ] Test migrations locally with PostgreSQL

- [ ] **Static Files**
  - [ ] Add whitenoise to Pipfile
  - [ ] Configure STATIC_ROOT
  - [ ] Add WhiteNoise middleware
  - [ ] Run `python manage.py collectstatic`

- [ ] **Dependencies**
  - [ ] Run `pipenv lock` to update Pipfile.lock
  - [ ] Remove unused packages
  - [ ] Verify all imports work

- [ ] **Code Quality**
  - [ ] Remove or populate test files
  - [ ] Add .gitignore entries
  - [ ] Remove db.sqlite3 from git
  - [ ] Add docstrings to views

### Render Configuration

#### 1. **Create render.yaml** (Infrastructure as Code)
```yaml
services:
  - type: web
    name: ums-backend
    env: python
    buildCommand: |
      pip install pipenv
      pipenv install --system --deploy
      python manage.py collectstatic --no-input
      python manage.py migrate --no-input
    startCommand: gunicorn UMS.wsgi:application
    envVars:
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: False
      - key: PYTHON_VERSION
        value: 3.12.0
      - key: DATABASE_URL
        fromDatabase:
          name: ums-db
          property: connectionString

databases:
  - name: ums-db
    databaseName: ums_production
    user: ums_user
```

#### 2. **Add Gunicorn** (Production WSGI Server)
```toml
# Pipfile
[packages]
gunicorn = "*"
```

#### 3. **Create Procfile** (Alternative to render.yaml)
```
web: gunicorn UMS.wsgi:application --log-file -
```

### Environment Variables on Render

Set these in Render Dashboard:
```
SECRET_KEY=<generate-random-50-char-string>
DEBUG=False
ALLOWED_HOSTS=your-app.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend.com
DATABASE_URL=<auto-provided-by-render>
```

---

## Post-Deployment

### 1. **Create Superuser**
```bash
# In Render Shell
python manage.py createsuperuser
```

### 2. **Test Endpoints**
```bash
# Health check
curl https://your-app.onrender.com/api/

# Auth test
curl -X POST https://your-app.onrender.com/api/users/token/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### 3. **Monitor Logs**
```bash
# Render Dashboard → Logs
# Watch for errors, slow queries, 500 errors
```

### 4. **Set Up Monitoring** (Optional)
- Sentry for error tracking
- New Relic for performance
- Render's built-in metrics

---

## Optimization Recommendations

### Immediate (Before Launch)
1. ✅ Fix all security issues
2. ✅ Migrate to PostgreSQL
3. ✅ Configure static files
4. ✅ Set up environment variables
5. ✅ Add gunicorn

### Short-term (Week 1-2)
1. 🔄 Add database indexes
2. 🔄 Optimize queries with select_related
3. 🔄 Add API rate limiting
4. 🔄 Set up error monitoring (Sentry)
5. 🔄 Add health check endpoint

### Medium-term (Month 1-2)
1. 📊 Implement caching (Redis)
2. 📊 Add API documentation (drf-spectacular)
3. 📊 Set up automated backups
4. 📊 Add comprehensive tests
5. 📊 Implement logging strategy

### Long-term (Month 3+)
1. 🚀 Consider CDN for static files
2. 🚀 Implement background tasks (Celery)
3. 🚀 Add full-text search (PostgreSQL FTS)
4. 🚀 Consider microservices if needed
5. 🚀 Implement CI/CD pipeline

---

## What Can Be Removed

### Safe to Remove
- ✂️ All `tests.py` files (if empty)
- ✂️ `db.sqlite3` (after migration)
- ✂️ `Routes.jsx` in frontend (unused)
- ✂️ Unused imports in views
- ✂️ Development-only print statements

### Keep (Even if Unused Now)
- ✅ `admin.py` files (for Django admin)
- ✅ `apps.py` files (app configuration)
- ✅ `__init__.py` files (Python packages)
- ✅ Migration files (database history)
- ✅ `permissions.py` files (security)

---

## Estimated Deployment Time

| Task | Time | Priority |
|------|------|----------|
| Security fixes | 30 min | 🔴 Critical |
| Database migration | 1 hour | 🔴 Critical |
| Static files setup | 30 min | 🔴 Critical |
| Environment config | 30 min | 🔴 Critical |
| Render setup | 1 hour | 🔴 Critical |
| Testing | 1 hour | 🟡 High |
| Code cleanup | 2 hours | 🟢 Medium |
| Optimization | 4 hours | 🔵 Low |
| **Total (Critical)** | **3.5 hours** | |
| **Total (All)** | **10.5 hours** | |

---

## Quick Start Commands

```bash
# 1. Install production dependencies
pipenv install psycopg2-binary dj-database-url whitenoise gunicorn

# 2. Update settings.py (see sections above)

# 3. Test locally with PostgreSQL
export DATABASE_URL="postgresql://localhost/ums_test"
python manage.py migrate
python manage.py runserver

# 4. Collect static files
python manage.py collectstatic --no-input

# 5. Test production settings
export DEBUG=False
export SECRET_KEY="test-key"
export ALLOWED_HOSTS="localhost"
gunicorn UMS.wsgi:application

# 6. Deploy to Render
git push origin main
# Configure environment variables in Render dashboard
```

---

## Support Resources

- **Django Deployment Checklist**: https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/
- **Render Django Guide**: https://render.com/docs/deploy-django
- **PostgreSQL on Render**: https://render.com/docs/databases
- **WhiteNoise Documentation**: http://whitenoise.evans.io/

---

**Last Updated**: February 2026
**Django Version**: 6.0.2
**Target Platform**: Render.com
