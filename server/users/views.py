from django.shortcuts import render
from rest_framework import viewsets
from .models import User, AdminProfile, TailorProfile, SchoolAdminProfile, ParentProfile, StudentProfile
from .serializers import UserSerializer, TailorProfileSerializer, ParentProfileSerializer, SchoolAdminProfile, StudentProfileSerializer, AdminProfileSerializer  
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import CustomTokenSerializer 

# creates a custom token view


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer

# Create your views here.
# user viewset
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


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