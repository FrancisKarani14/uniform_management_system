# Supabase PostgreSQL Setup Guide

Use Supabase's built-in PostgreSQL as the database for the Django backend deployed on Render.

---

## 1. Get Your Supabase Database Credentials

1. Go to [supabase.com](https://supabase.com) → your project → **Settings → Database**
2. Scroll to **Connection string** → select **URI** tab
3. Copy the URI — it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.djxziagjnzrjplfgvvdw.supabase.co:5432/postgres
   ```
4. Also note the individual fields under **Connection info**:
   - Host: `db.djxziagjnzrjplfgvvdw.supabase.co`
   - Port: `5432`
   - Database: `postgres`
   - User: `postgres`
   - Password: *(the one you set when creating the project)*

> If you forgot the password: **Settings → Database → Reset database password**

---

## 2. Install Required Packages

```bash
cd server
pipenv install psycopg2-binary dj-database-url gunicorn whitenoise
```

Your `Pipfile` packages section should now include:
```toml
psycopg2-binary = "*"
dj-database-url = "*"
gunicorn = "*"
whitenoise = "*"
```

---

## 3. Update `settings.py`

Replace the current `DATABASES` block and add environment-based config:

```python
import dj_database_url

# Replace the hardcoded SECRET_KEY
SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-dev-key-change-in-prod')

DEBUG = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')

# Replace the sqlite DATABASES block
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        ssl_require=True
    )
}

# CORS — replace CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', 'http://localhost:5173').split(',')

# Static files (add whitenoise)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # add after SecurityMiddleware
    ...
]

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

---

## 4. Create the `.env` File for Local Dev

Update `server/.env`:

```env
SECRET_KEY=your-strong-random-secret-key
DEBUG=True
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.djxziagjnzrjplfgvvdw.supabase.co:5432/postgres
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

Generate a strong secret key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## 5. Run Migrations (Creates All Tables on Supabase)

This will create all your Django app tables directly on the Supabase PostgreSQL database:

```bash
cd server
pipenv run python manage.py migrate
```

This creates tables for:
- `users_user` — custom user model
- `users_adminprofile`, `users_tailorprofile`, `users_schooladminprofile`, `users_parentprofile`, `users_studentprofile`
- `schools_school`, `schools_parent_school_application`
- `tailors_tailor_school_request`
- `uniform_orders_uniform_order`, `uniform_orders_uniform_assignment`
- All Django built-in tables (sessions, content types, permissions, etc.)

---

## 6. Create the Superadmin User

```bash
pipenv run python manage.py createsuperuser
```

You'll be prompted for:
```
Email: admin@yourdomain.com
Password: 
Password (again):
```

This creates a user with `is_staff=True` and `is_superuser=True`. Since your `User` model uses email as `USERNAME_FIELD`, no username is needed.

To also create the `AdminProfile` for this superuser, run the Django shell:

```bash
pipenv run python manage.py shell
```

```python
from users.models import User, AdminProfile
user = User.objects.get(email='admin@yourdomain.com')
AdminProfile.objects.create(user=user, phone_number='')
exit()
```

---

## 7. Verify Tables in Supabase

1. Go to your Supabase project → **Table Editor**
2. You should see all the Django tables listed
3. Check `users_user` — your superadmin should be there with `is_superuser = true`

---

## 8. Deploy to Render

### Create a `render.yaml` (optional but recommended)

```yaml
services:
  - type: web
    name: ums-api
    env: python
    buildCommand: "pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate"
    startCommand: "gunicorn UMS.wsgi:application"
    envVars:
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: "False"
      - key: DATABASE_URL
        sync: false
      - key: ALLOWED_HOSTS
        sync: false
      - key: CORS_ALLOWED_ORIGINS
        sync: false
```

### Generate `requirements.txt` from Pipfile

Render uses `requirements.txt` by default:

```bash
cd server
pipenv requirements > requirements.txt
```

### Render Environment Variables

In Render dashboard → your service → **Environment**, add:

| Key | Value |
|-----|-------|
| `SECRET_KEY` | *(generate a strong key)* |
| `DEBUG` | `False` |
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@db.djxziagjnzrjplfgvvdw.supabase.co:5432/postgres` |
| `ALLOWED_HOSTS` | `your-render-app.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | `https://your-frontend-domain.com` |

---

## 9. Supabase Connection Pooling (Optional but Recommended)

For production, use Supabase's **connection pooler** (PgBouncer) to avoid exhausting connections:

1. **Settings → Database → Connection pooling**
2. Copy the **pooler connection string** (port `6543`)
3. Use that as `DATABASE_URL` instead, and set `conn_max_age=0` in `dj_database_url.config()`

```python
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=0,  # use 0 with pgbouncer
        ssl_require=True
    )
}
```

---

## Summary Checklist

- [ ] Get Supabase DB connection string from Settings → Database
- [ ] `pipenv install psycopg2-binary dj-database-url gunicorn whitenoise`
- [ ] Update `settings.py` — DATABASE_URL, SECRET_KEY, ALLOWED_HOSTS, CORS, whitenoise
- [ ] Update `server/.env` with real DATABASE_URL
- [ ] `python manage.py migrate` — creates all tables on Supabase
- [ ] `python manage.py createsuperuser` — creates superadmin
- [ ] Create `AdminProfile` for superadmin via shell
- [ ] Verify tables in Supabase Table Editor
- [ ] `pipenv requirements > requirements.txt`
- [ ] Set all env vars on Render
- [ ] Deploy
