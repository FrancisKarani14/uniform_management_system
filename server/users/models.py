from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
# creates a custom user model usong abstrct user

class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN =  'Admin'
        TAILOR =  'Tailor'
        SCHOOL_ADMIN =  'School_Admin'
        PARENT =  'Parent'
    role = models.CharField(max_length=20, choices=Roles.choices)


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
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='admins')
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.user.username} - {self.school.name}"


class ParentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='parent_profile')
    phone_number = models.CharField(max_length=15)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Parent: {self.user.username}"
