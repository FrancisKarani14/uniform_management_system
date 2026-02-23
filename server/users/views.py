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
from .permissions import IsSystemAdmin 

# creates a custom token view


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer

# Create your views here.
# user viewset
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=True, methods=['post'], permission_classes=[IsSystemAdmin])
    def upgrade_to_school_admin(self, request, pk=None):
        """
        Upgrade a Parent user to School Admin.
        POST /api/users/{id}/upgrade_to_school_admin/
        Body: { "school_id": 1, "phone_number": "123456789" }
        """
        user = self.get_object()
        
        # Validate user is currently a Parent
        if user.role != 'Parent':
            return Response(
                {'error': 'Can only upgrade Parent users to School Admin'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate required fields
        school_id = request.data.get('school_id')
        phone_number = request.data.get('phone_number')
        
        if not school_id:
            return Response(
                {'error': 'school_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Change user role
        user.role = 'School_Admin'
        user.save()
        
        # Create SchoolAdminProfile
        SchoolAdminProfile.objects.create(
            user=user,
            school_id=school_id,
            phone_number=phone_number or user.parent_profile.phone_number
        )
        
        return Response({
            'message': 'User successfully upgraded to School Admin',
            'user': UserSerializer(user).data
        }, status=status.HTTP_200_OK)


# admin profile viewset
class AdminProfileViewSet(viewsets.ModelViewSet):
    queryset = AdminProfile.objects.all()
    serializer_class = AdminProfileSerializer

# school adminprofile viewset
class SchoolAdminProfileViewSet(viewsets.ModelViewSet):
    queryset = SchoolAdminProfile.objects.all()
    serializer_class = SchoolAdminProfile

# Tailor profile viewset
class TailorProfileViewSet(viewsets.ModelViewSet):
    queryset = TailorProfile.objects.all()
    serializer_class = TailorProfileSerializer

# parent profile viewset
class ParentProfileViewSet(viewsets.ModelViewSet):
    queryset = ParentProfile.objects.all()
    serializer_class = ParentProfileSerializer

# student profile viewset
class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer