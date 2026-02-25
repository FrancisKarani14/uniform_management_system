from rest_framework import serializers
from .models import Tailor_school_request

# serialize Tailor_school_request model
class Tailor_school_requestSerializer(serializers.ModelSerializer):
    tailor = serializers.SerializerMethodField()
    school = serializers.SerializerMethodField()
    
    class Meta:
        model = Tailor_school_request
        fields = '__all__'
    
    def get_tailor(self, obj):
        if obj.tailor:
            return {'id': obj.tailor.id, 'shop_name': obj.tailor.shop_name}
        return None
    
    def get_school(self, obj):
        if obj.school:
            return {'id': obj.school.id, 'name': obj.school.name}
        return None