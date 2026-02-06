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
    parent = models.ForeignKey('users.ParentProfile', on_delete=models.CASCADE, related_name='parent_school_applications')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='parent_school_applications')
    student_name = models.CharField(max_length=255)
    student_age = models.IntegerField()
    student_gender = models.CharField(max_length=10)
