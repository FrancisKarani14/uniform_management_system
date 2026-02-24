from rest_framework import permissions


class IsSystemAdmin(permissions.BasePermission):
    """
    Permission to check if user is a System Admin.
    System admins have full access to all resources.
    """
    message = "Only system administrators can access this resource"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Admin'


class IsTailor(permissions.BasePermission):
    """
    Permission to check if user is a Tailor.
    """
    message = "Only tailors can access this resource"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Tailor'


class IsParent(permissions.BasePermission):
    """
    Permission to check if user is a Parent.
    """
    message = "Only parents can access this resource"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Parent'


class IsSchoolAdmin(permissions.BasePermission):
    """
    Permission to check if user is a School Admin.
    """
    message = "Only school administrators can access this resource"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'School_Admin'


class IsStudent(permissions.BasePermission):
    """
    Permission to check if user is a Student.
    """
    message = "Only students can access this resource"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Student'


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object or admins to access it.
    """
    message = "You can only access your own profile"
    
    def has_object_permission(self, request, view, obj):
        # Admin can access everything
        if request.user.role == 'Admin':
            return True
        # User can only access their own profile
        return obj.user == request.user
