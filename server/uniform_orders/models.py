from django.db import models

# Create your models here.
# uniform order model
class Uniform_order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]
    GENDER_CHOICES = [
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
    ]


    parent = models.ForeignKey('users.ParentProfile', on_delete=models.CASCADE,  related_name='uniform_order')
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='uniform_order')
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='PENDING')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    blouse_size = models.CharField(max_length=10)
    skirt_size = models.CharField(max_length=10)
    sweater_size = models.CharField(max_length=10)
    trouser_size = models.CharField(max_length=10)
    shoes_size = models.CharField(max_length=10)
    shirt_size = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
 

#  uniform assignments
class Uniform_assignment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('received', 'Received'),
        ('started', 'Started'),
        ('halfway', 'Halfway Done'),
        ('complete', 'Complete'),
    ]
    
    uniform_order = models.ForeignKey(Uniform_order, on_delete=models.CASCADE, related_name='uniform_assignment')
    tailor = models.ForeignKey('users.TailorProfile', on_delete=models.CASCADE, related_name='uniform_assignment')
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='uniform_assignment')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



    
