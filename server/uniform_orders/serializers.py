from rest_framework import serializers
from .models import Uniform_order, Uniform_assignment

# serialize Uniform_order model
class Uniform_orderSerializer(serializers.ModelSerializer):
    parent_details = serializers.SerializerMethodField(read_only=True)
    school_details = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Uniform_order
        fields = ['id', 'parent', 'school', 'status', 'gender', 'blouse_size', 'skirt_size', 'sweater_size', 'trouser_size', 'shoes_size', 'shirt_size', 'created_at', 'updated_at', 'parent_details', 'school_details']
        read_only_fields = ['created_at', 'updated_at']
    
    def get_parent_details(self, obj):
        if obj.parent and obj.parent.user:
            return {
                'id': obj.parent.id, 
                'name': f"{obj.parent.user.first_name} {obj.parent.user.last_name}",
                'user': {'email': obj.parent.user.email}
            }
        return None
    
    def get_school_details(self, obj):
        if obj.school:
            return {'id': obj.school.id, 'name': obj.school.name}
        return None

# serialize Uniform_assignment model
class Uniform_assignmentSerializer(serializers.ModelSerializer):
    uniform_order_details = serializers.SerializerMethodField(read_only=True)
    tailor_details = serializers.SerializerMethodField(read_only=True)
    school_details = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Uniform_assignment
        fields = ['id', 'uniform_order', 'tailor', 'school', 'status', 'created_at', 'updated_at', 'uniform_order_details', 'tailor_details', 'school_details']
        read_only_fields = ['created_at', 'updated_at']
    
    def get_uniform_order_details(self, obj):
        if obj.uniform_order:
            parent_info = None
            if obj.uniform_order.parent and obj.uniform_order.parent.user:
                parent_info = {
                    'name': f"{obj.uniform_order.parent.user.first_name} {obj.uniform_order.parent.user.last_name}",
                    'user': {'email': obj.uniform_order.parent.user.email}
                }
            return {
                'id': obj.uniform_order.id,
                'gender': obj.uniform_order.gender,
                'status': obj.uniform_order.status,
                'parent': parent_info,
                'shirt_size': obj.uniform_order.shirt_size,
                'trouser_size': obj.uniform_order.trouser_size,
                'shoes_size': obj.uniform_order.shoes_size,
                'sweater_size': obj.uniform_order.sweater_size,
                'blouse_size': obj.uniform_order.blouse_size,
                'skirt_size': obj.uniform_order.skirt_size
            }
        return None
    
    def get_tailor_details(self, obj):
        if obj.tailor:
            return {'id': obj.tailor.id, 'shop_name': obj.tailor.shop_name}
        return None
    
    def get_school_details(self, obj):
        if obj.school:
            return {'id': obj.school.id, 'name': obj.school.name}
        return None