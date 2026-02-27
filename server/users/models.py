from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
# Create your models here.
# creates a custom user model usong abstrct user

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN =  'Admin'
        TAILOR =  'Tailor'
        SCHOOL_ADMIN =  'School_Admin'
        PARENT =  'Parent'
        STUDENT = 'Student'
    username = None   
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=Roles.choices)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()
    


# creates profile models
class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    # avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)


    def __str__(self):
        return f"Admin: {self.user.username}"


class TailorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tailor_profile')
    shop_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return self.shop_name


class SchoolAdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='school_admin_profile')
    school = models.OneToOneField('schools.School', on_delete=models.CASCADE, related_name='school_admin_profile', null=True, blank=True)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        school_name = self.school.name if self.school else 'No School'
        return f"{self.user.email} - {school_name}"


class ParentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='parent_profile')
    phone_number = models.CharField(max_length=15)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Parent: {self.user.username}"
    
class StudentProfile(models.Model):
    class Gender(models.TextChoices):
        MALE = 'Male'
        FEMALE = 'Female'
        OTHER = 'Other'

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile', null=True, blank=True)
    parent = models.ForeignKey(ParentProfile, on_delete=models.CASCADE, related_name='children')
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='students', null=True, blank=True)
    first_name = models.CharField(max_length=150, default='Student')
    last_name = models.CharField(max_length=150, default='Name')
    admission_number = models.CharField(max_length=50, unique=True)
    gender = models.CharField(max_length=10, choices=Gender.choices)
    

    def __str__(self):
        return f"Student: {self.first_name} {self.last_name}"
