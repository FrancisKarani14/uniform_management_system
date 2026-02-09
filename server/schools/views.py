from django.shortcuts import render
from rest_framework import viewsets
from .models import School, Parent_school_application
from .serializers import School_modelSerializer, Parent_school_application_modelSerializer

# Create your views here.
# school model view
class School_modelViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = School_modelSerializer



# parent_school_application model view
class Parent_school_application_modelViewSet(viewsets.ModelViewSet):
    queryset = Parent_school_application.objects.all()
    serializer_class = Parent_school_application_modelSerializer
    # filterset_fields = ['parent', 'school', 'student']


