from django.db import models

# Create your models here.
# uniform order model
class Uniform_order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    parent = models.ForeignKey('users.ParentProfile', on_delete=models.CASCADE,  related_name='uniform_order')
    school = models.ForeignKey('scools.School', on_delete=models.CASCADE, related_name='uniform_order')
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='PENDING')
    
