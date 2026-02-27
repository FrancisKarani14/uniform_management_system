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
    uniform_order = serializers.SerializerMethodField()
    tailor = serializers.SerializerMethodField()
    school = serializers.SerializerMethodField()
    
    class Meta:
        model = Uniform_assignment
        fields = '__all__'
    
    def get_uniform_order(self, obj):
        if obj.uniform_order:
            return {
                'id': obj.uniform_order.id,
                'gender': obj.uniform_order.gender,
                'status': obj.uniform_order.status,
                'parent': {'user': {'email': obj.uniform_order.parent.user.email}} if obj.uniform_order.parent else None
            }
        return None
    
    def get_tailor(self, obj):
        if obj.tailor:
            return {'id': obj.tailor.id, 'shop_name': obj.tailor.shop_name}
        return None
    
    def get_school(self, obj):
        if obj.school:
            return {'id': obj.school.id, 'name': obj.school.name}
        return None