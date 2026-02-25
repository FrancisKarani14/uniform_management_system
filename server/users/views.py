from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, AdminProfile, TailorProfile, SchoolAdminProfile, ParentProfile, StudentProfile
from .serializers import UserSerializer, TailorProfileSerializer, ParentProfileSerializer, SchoolAdminProfile, StudentProfileSerializer, AdminProfileSerializer  
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import CustomTokenSerializer
from .permissions import IsSystemAdmin, IsTailor, IsParent, IsSchoolAdmin, IsStudent 

# creates a custom token view


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer

# Create your views here.
# user viewset
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.action == 'upgrade_to_school_admin':
            return [IsSystemAdmin()]
        return [IsAuthenticated()]
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """
        Get current authenticated user.
        GET /api/users/users/me/
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[IsSystemAdmin])
    def upgrade_to_school_admin(self, request, pk=None):
        """
        Upgrade a Parent user to School Admin.
        POST /api/users/{id}/upgrade_to_school_admin/
        Body: { "phone_number": "123456789" }  // optional
        """
        user = self.get_object()
        
        # Validate user is currently a Parent
        if user.role != 'Parent':
            return Response(
                {'error': 'Can only upgrade Parent users to School Admin'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if SchoolAdminProfile already exists
        if hasattr(user, 'school_admin_profile'):
            return Response(
                {'error': 'User already has a School Admin profile'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get phone number from request or use parent's phone
        phone_number = request.data.get('phone_number', '')
        if not phone_number and hasattr(user, 'parent_profile'):
            phone_number = user.parent_profile.phone_number or ''
        
        try:
            # Change user role
            user.role = 'School_Admin'
            user.save()
            
            # Create SchoolAdminProfile without school (school will be created later)
            SchoolAdminProfile.objects.create(
                user=user,
                school=None,  # No school assigned yet
                phone_number=phone_number
            )
            
            return Response({
                'message': 'User successfully upgraded to School Admin. They can now create a school.',
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            # Rollback role change if profile creation fails
            user.role = 'Parent'
            user.save()
            return Response(
                {'error': f'Failed to create School Admin profile: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# admin profile viewset
class AdminProfileViewSet(viewsets.ModelViewSet):
    queryset = AdminProfile.objects.all()
    serializer_class = AdminProfileSerializer
    permission_classes = [IsSystemAdmin]

# school adminprofile viewset
class SchoolAdminProfileViewSet(viewsets.ModelViewSet):
    queryset = SchoolAdminProfile.objects.all()
    serializer_class = SchoolAdminProfile
    permission_classes = [IsSystemAdmin | IsSchoolAdmin]

# Tailor profile viewset
class TailorProfileViewSet(viewsets.ModelViewSet):
    queryset = TailorProfile.objects.all()
    serializer_class = TailorProfileSerializer
    permission_classes = [IsSystemAdmin | IsTailor]

# parent profile viewset
class ParentProfileViewSet(viewsets.ModelViewSet):
    queryset = ParentProfile.objects.all()
    serializer_class = ParentProfileSerializer
    permission_classes = [IsSystemAdmin | IsParent]

# student profile viewset
class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [IsSystemAdmin | IsStudent]