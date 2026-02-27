from rest_framework import serializers
from .models import Tailor_school_request

# serialize Tailor_school_request model
class Tailor_school_requestSerializer(serializers.ModelSerializer):
    tailor_details = serializers.SerializerMethodField(read_only=True)
    school_details = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Tailor_school_request
        fields = ['id', 'tailor', 'school', 'status', 'applied_at', 'tailor_details', 'school_details']
        read_only_fields = ['applied_at']
    
    def get_tailor_details(self, obj):
        if obj.tailor and obj.tailor.user:
            return {
                'id': obj.tailor.id, 
                'shop_name': obj.tailor.shop_name,
                'name': f"{obj.tailor.user.first_name} {obj.tailor.user.last_name}",
                'email': obj.tailor.user.email,
                'location': obj.tailor.location
            }
        return None
    
    def get_school_details(self, obj):
        if obj.school:
            return {'id': obj.school.id, 'name': obj.school.name}
        return None