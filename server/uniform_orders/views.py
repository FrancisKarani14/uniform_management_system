from django.shortcuts import render
from rest_framework import viewsets
from .models import Uniform_assignment, Uniform_order
from .serializers import Uniform_assignmentSerializer, Uniform_orderSerializer
from .permissions import CanCreateUniformOrder, CanManageUniformAssignment, CanUpdateAssignmentStatus
from users.permissions import IsParent, IsSchoolAdmin


# Create your views here.
# uniform order viewset
class Uniform_orderViewSet(viewsets.ModelViewSet):
    queryset = Uniform_order.objects.all()
    serializer_class = Uniform_orderSerializer
    
    def get_queryset(self):
        """
        Parents can view their own orders.
        School admins can view orders for their school.
        System admins can view all.
        """
        user = self.request.user
        
        # System admin sees all
        if user.role == 'Admin':
            return Uniform_order.objects.all()
        
        # Parent sees only their orders
        if user.role == 'Parent' and hasattr(user, 'parent_profile'):
            return Uniform_order.objects.filter(parent=user.parent_profile)
        
        # School admin sees orders for their school
        if user.role == 'School_Admin' and hasattr(user, 'school_admin_profile'):
            if user.school_admin_profile.school:
                return Uniform_order.objects.filter(school=user.school_admin_profile.school)
        
        return Uniform_order.objects.none()
    
    def get_permissions(self):
        """
        Parents can create orders.
        School admins can view and update (approve/reject) orders.
        """
        if self.action in ['create']:
            return [IsParent()]
        if self.action in ['update', 'partial_update']:
            return [IsSchoolAdmin()]
        return [CanCreateUniformOrder()]

# uniform assignment viewset
class Uniform_assignmentViewSet(viewsets.ModelViewSet):
    queryset = Uniform_assignment.objects.all()
    serializer_class = Uniform_assignmentSerializer
    permission_classes = [CanManageUniformAssignment]
    
    def get_queryset(self):
        """
        School admins can view assignments for their school.
        Tailors can view their own assignments.
        Parents can view assignments for their orders.
        System admins can view all.
        """
        user = self.request.user
        
        # System admin sees all
        if user.role == 'Admin':
            return Uniform_assignment.objects.all()
        
        # School admin sees assignments for their school
        if user.role == 'School_Admin' and hasattr(user, 'school_admin_profile'):
            if user.school_admin_profile.school:
                return Uniform_assignment.objects.filter(school=user.school_admin_profile.school)
        
        # Tailor sees only their assignments
        if user.role == 'Tailor' and hasattr(user, 'tailor_profile'):
            return Uniform_assignment.objects.filter(tailor=user.tailor_profile)
        
        # Parent sees assignments for their orders
        if user.role == 'Parent' and hasattr(user, 'parent_profile'):
            return Uniform_assignment.objects.filter(uniform_order__parent=user.parent_profile)
        
        return Uniform_assignment.objects.none()
    
    def get_permissions(self):
        """
        School admins can create assignments.
        Tailors can update status.
        Tailors, parents, and school admins can view.
        """
        if self.action in ['create', 'destroy']:
            return [IsSchoolAdmin()]
        if self.action in ['update', 'partial_update']:
            return [CanUpdateAssignmentStatus()]
        return [CanManageUniformAssignment()]

