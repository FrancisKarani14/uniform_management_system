from rest_framework import permissions


class IsTailorOrSchoolAdmin(permissions.BasePermission):
    """
    Permission for tailors to apply to schools or school admins to view/manage applications.
    """
    message = "Only tailors or school administrators can access this resource"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['Tailor', 'School_Admin', 'Admin']


class CanCreateTailorRequest(permissions.BasePermission):
    """
    Permission for tailors to create school requests.
    """
    message = "Only tailors can create school requests"
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # Tailors, school admins, and system admins can view
            return request.user.is_authenticated and request.user.role in ['Tailor', 'School_Admin', 'Admin']
        # Only tailors can create requests (POST)
        return request.user.is_authenticated and request.user.role == 'Tailor'


class CanManageTailorRequest(permissions.BasePermission):
    """
    Permission for school admins to approve/reject tailor requests to their school.
    """
    message = "Only school administrators can manage tailor requests"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['School_Admin', 'Admin']
    
    def has_object_permission(self, request, view, obj):
        # System admin can manage all
        if request.user.role == 'Admin':
            return True
        # School admin can only manage requests to their school
        return (request.user.role == 'School_Admin' and 
                hasattr(request.user, 'school_admin_profile') and
                obj.school == request.user.school_admin_profile.school)
