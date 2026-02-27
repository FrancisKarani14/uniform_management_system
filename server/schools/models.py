from django.db import models

# Create your models here.

# create a school model
class School(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    # school_admin = models.ForeignKey('users.SchoolAdminProfile', on_delete=models.CASCADE, related_name='schools')


    def __str__(self):
        return self.name

# create a parent_school_application
class Parent_school_application(models.Model):
    class Status(models.TextChoices):
        PENDING = 'Pending'
        APPROVED = 'Approved'
        REJECTED = 'Rejected'
    
    parent = models.ForeignKey('users.ParentProfile', on_delete=models.CASCADE, related_name='parent_school_applications')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='parent_school_applications')
    student = models.ForeignKey('users.StudentProfile', on_delete=models.CASCADE, related_name='parent_school_applications')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
