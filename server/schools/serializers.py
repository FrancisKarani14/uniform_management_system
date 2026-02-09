from rest_framework import serializers
from .models import School, Parent_school_application

# serialize Tailor_school_request model
class School_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

# serialize Parent_school_application
class Parent_school_application_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent_school_application
        fields = '__all__'
