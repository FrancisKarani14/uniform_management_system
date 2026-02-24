from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import School, Parent_school_application
from .serializers import School_modelSerializer, Parent_school_application_modelSerializer
from .permissions import IsSchoolAdminOrSystemAdmin, IsParentOrSchoolAdmin

# Create your views here.
# school model view
class School_modelViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = School_modelSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Everyone can view all schools.
        School admins can only edit/delete schools they created.
        """
        queryset = School.objects.all()
        
        # For non-safe methods (POST, PUT, PATCH, DELETE), filter by creator
        if self.action in ['update', 'partial_update', 'destroy']:
            if self.request.user.role == 'School_Admin' and hasattr(self.request.user, 'school_admin_profile'):
                # School admin can only modify their own school
                return queryset.filter(school_admin_profile__user=self.request.user)
        
        return queryset
    
    def get_permissions(self):
        """
        Anyone authenticated can view (GET).
        Only School Admin or System Admin can create/update/delete.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsSchoolAdminOrSystemAdmin()]
        return [IsAuthenticated()]


# parent_school_application model view
class Parent_school_application_modelViewSet(viewsets.ModelViewSet):
    queryset = Parent_school_application.objects.all()
    serializer_class = Parent_school_application_modelSerializer
    permission_classes = [IsParentOrSchoolAdmin]
    
    def get_queryset(self):
        """
        Parents can only view their own applications.
        School admins can view applications to their school.
        System admins can view all.
        """
        user = self.request.user
        
        # System admin sees all
        if user.role == 'Admin':
            return Parent_school_application.objects.all()
        
        # Parent sees only their applications
        if user.role == 'Parent' and hasattr(user, 'parent_profile'):
            return Parent_school_application.objects.filter(parent=user.parent_profile)
        
        # School admin sees applications to their school
        if user.role == 'School_Admin' and hasattr(user, 'school_admin_profile'):
            if user.school_admin_profile.school:
                return Parent_school_application.objects.filter(school=user.school_admin_profile.school)
        
        return Parent_school_application.objects.none()


