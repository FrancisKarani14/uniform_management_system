from rest_framework import serializers
from .models import School, Parent_school_application

# serialize Tailor_school_request model
class Tailor_school_requestSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

# serialize Tailor_School_application model
# class Parent_school_applicationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Parent_school_application
#         fields = ["parent", "school", "student_name", "student_age", "student_gender"]