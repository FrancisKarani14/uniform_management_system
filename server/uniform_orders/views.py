from django.shortcuts import render
from rest_framework import viewsets
from .models import Uniform_assignment, Uniform_order
from .serializers import Uniform_assignmentSerializer, Uniform_orderSerializer


# Create your views here.
# uniform order viewset
class Uniform_orderViewSet(viewsets.ModelViewSet):
    queryset = Uniform_order.objects.all()
    serializer_class = Uniform_orderSerializer
    # filterset_fields = ['parent', 'school', 'status'] 

# uniform assignment viewset
class Uniform_assignmentViewSet(viewsets.ModelViewSet):
    queryset = Uniform_assignment.objects.all()
    serializer_class = Uniform_assignmentSerializer
    # filterset_fields = ['uniform_order', 'tailor', 'school']

# class

