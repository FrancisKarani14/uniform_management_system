from rest_framework import serializers
from .models import Uniform_order, Uniform_assignment

# serialize Uniform_order model
class Uniform_orderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Uniform_order
        fields = ['status', 'gender', 'blouse_size', 'skirt_size', 'sweater_size', 'trouser_size', 'shoes_size', 'shirt_size', 'created_at', 'updated_at']

# serialize Uniform_assignment model
class Uniform_assignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Uniform_assignment
        fields = ['created_at', 'updated_at']