from django.shortcuts import render
from rest_framework import viewsets
from .models import Tailor_school_request
from .serializers import Tailor_school_requestSerializer
from .permissions import IsTailorOrSchoolAdmin


# Create your views here.
class Tailor_school_requestViewSet(viewsets.ModelViewSet):
    queryset = Tailor_school_request.objects.all()
    serializer_class = Tailor_school_requestSerializer
    permission_classes = [IsTailorOrSchoolAdmin]
    
    def get_queryset(self):
        """
        Tailors can only view their own requests.
        School admins can view requests to their school.
        System admins can view all.
        """
        user = self.request.user
        
        # System admin sees all
        if user.role == 'Admin':
            return Tailor_school_request.objects.all()
        
        # Tailor sees only their requests
        if user.role == 'Tailor' and hasattr(user, 'tailor_profile'):
            return Tailor_school_request.objects.filter(tailor=user.tailor_profile)
        
        # School admin sees requests to their school
        if user.role == 'School_Admin' and hasattr(user, 'school_admin_profile'):
            if user.school_admin_profile.school:
                return Tailor_school_request.objects.filter(school=user.school_admin_profile.school)
        
        return Tailor_school_request.objects.none()
    
    def get_permissions(self):
        """
        Tailors can create and view their requests.
        School admins can view and update (approve/reject) requests to their school.
        """
        if self.action in ['create']:
            # Only tailors can create
            from users.permissions import IsTailor
            return [IsTailor()]
        return [IsTailorOrSchoolAdmin()]

