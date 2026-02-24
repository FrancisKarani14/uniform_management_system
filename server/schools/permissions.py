from rest_framework import permissions


class IsSchoolAdminOrSystemAdmin(permissions.BasePermission):
    """
    Permission for school admins to manage their school or system admins to manage all schools.
    """
    message = "Only school administrators or system administrators can access this resource"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['School_Admin', 'Admin']


class IsParentOrSchoolAdmin(permissions.BasePermission):
    """
    Permission for parents to apply to schools or school admins to view applications.
    """
    message = "Only parents or school administrators can access this resource"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['Parent', 'School_Admin', 'Admin']


class CanApplyToSchool(permissions.BasePermission):
    """
    Permission for parents to apply to schools.
    """
    message = "Only parents can apply to schools"
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # Anyone authenticated can view schools
            return request.user.is_authenticated
        # Only parents can apply (POST)
        return request.user.is_authenticated and request.user.role == 'Parent'


class CanManageSchoolApplications(permissions.BasePermission):
    """
    Permission for school admins to approve/reject applications to their school.
    """
    message = "Only school administrators can manage school applications"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['School_Admin', 'Admin']
    
    def has_object_permission(self, request, view, obj):
        # System admin can manage all
        if request.user.role == 'Admin':
            return True
        # School admin can only manage their school's applications
        return (request.user.role == 'School_Admin' and 
                hasattr(request.user, 'school_admin_profile') and
                obj.school == request.user.school_admin_profile.school)
