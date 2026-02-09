from django.shortcuts import render
from rest_framework import viewsets
from .models import User, AdminProfile, TailorProfile, SchoolAdminProfile, ParentProfile, StudentProfile
from .serializers import UserSerializer, TailorProfileSerializer, ParentProfileSerializer, SchoolAdminProfile, StudentProfileSerializer   

# Create your views here.
