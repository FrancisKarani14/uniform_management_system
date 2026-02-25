from rest_framework import serializers
from .models import Uniform_order, Uniform_assignment

# serialize Uniform_order model
class Uniform_orderSerializer(serializers.ModelSerializer):
    parent = serializers.SerializerMethodField()
    school = serializers.SerializerMethodField()
    
    class Meta:
        model = Uniform_order
        fields = '__all__'
    
    def get_parent(self, obj):
        if obj.parent:
            return {'id': obj.parent.id, 'user': {'email': obj.parent.user.email}}
        return None
    
    def get_school(self, obj):
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