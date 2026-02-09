from django.shortcuts import render
from rest_framework import viewsets
from .models import Tailor_school_request
from .serializers import Tailor_school_requestSerializer


# Create your views here.
class Tailor_school_requestViewSet(viewsets.ModelViewSet):
    queryset = Tailor_school_request.objects.all()
    serializer_class = Tailor_school_requestSerializer
    # filterset_fields = ['tailor', 'school', 'status']

