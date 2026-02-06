from rest_framework import serializers
from .models import Tailor_school_request

# serialize Tailor_school_request model
class Tailor_school_requestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tailor_school_request
        fields = ['status', 'applied_at']