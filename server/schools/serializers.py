from rest_framework import serializers
from .models import School

# serialize Tailor_school_request model
class Tailor_school_requestSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'