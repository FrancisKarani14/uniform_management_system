from django.db import models

# Create your models here.
# create a tailor_school application model

class Tailor_school_request(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]
    tailor = models.ForeignKey('users.TailorProfile', on_delete=models.CASCADE, related_name='tailorschoolrequest')
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='tailorschoolrequest')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')

    # one application per tailor per school
    class Meta:
        unique_together = ('tailor', 'school')

    def __str__(self):
        return f"{self.tailor} → {self.school} ({self.status})"