from rest_framework import permissions


class CanCreateUniformOrder(permissions.BasePermission):
    """
    Permission for parents to create uniform orders.
    """
    message = "Only parents can create uniform orders"
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # Parents, school admins, and tailors can view orders
            return request.user.is_authenticated and request.user.role in ['Parent', 'School_Admin', 'Tailor', 'Admin']
        # Only parents can create orders (POST)
        return request.user.is_authenticated and request.user.role == 'Parent'


class CanViewUniformOrder(permissions.BasePermission):
    """
    Permission to view uniform orders based on role.
    """
    message = "You don't have permission to view this uniform order"
    
    def has_object_permission(self, request, view, obj):
        # System admin can view all
        if request.user.role == 'Admin':
            return True
        # Parent can view their own orders
        if request.user.role == 'Parent' and hasattr(request.user, 'parent_profile'):
            return obj.parent == request.user.parent_profile
        # School admin can view orders for their school
        if request.user.role == 'School_Admin' and hasattr(request.user, 'school_admin_profile'):
            return obj.school == request.user.school_admin_profile.school
        # Tailor can view orders assigned to them
        if request.user.role == 'Tailor' and hasattr(request.user, 'tailor_profile'):
            return obj.uniform_assignment.filter(tailor=request.user.tailor_profile).exists()
        return False


class CanManageUniformAssignment(permissions.BasePermission):
    """
    Permission for school admins to assign uniform orders to tailors.
    Tailors and parents can view assignments.
    """
    message = "You don't have permission to manage uniform assignments"
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # Tailors, parents, school admins can view
            return request.user.is_authenticated and request.user.role in ['School_Admin', 'Admin', 'Tailor', 'Parent']
        # Only school admins can create/update/delete
        return request.user.is_authenticated and request.user.role in ['School_Admin', 'Admin']
    
    def has_object_permission(self, request, view, obj):
        # System admin can manage all
        if request.user.role == 'Admin':
            return True
        # School admin can only manage assignments for their school
        if request.user.role == 'School_Admin':
            return (hasattr(request.user, 'school_admin_profile') and
                    obj.school == request.user.school_admin_profile.school)
        # Tailor can view their assignments
        if request.user.role == 'Tailor' and request.method in permissions.SAFE_METHODS:
            return hasattr(request.user, 'tailor_profile') and obj.tailor == request.user.tailor_profile
        # Parent can view their assignments
        if request.user.role == 'Parent' and request.method in permissions.SAFE_METHODS:
            return (hasattr(request.user, 'parent_profile') and 
                    obj.uniform_order.parent == request.user.parent_profile)
        return False


class CanUpdateAssignmentStatus(permissions.BasePermission):
    """
    Permission for tailors to update the status of their assigned orders.
    """
    message = "Only assigned tailors can update assignment status"
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['Tailor', 'Admin']
    
    def has_object_permission(self, request, view, obj):
        # System admin can update all
        if request.user.role == 'Admin':
            return True
        # Tailor can only update their own assignments
        return (request.user.role == 'Tailor' and 
                hasattr(request.user, 'tailor_profile') and
                obj.tailor == request.user.tailor_profile)
