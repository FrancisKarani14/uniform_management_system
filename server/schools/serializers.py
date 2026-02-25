from rest_framework import serializers
from .models import School, Parent_school_application

# serialize School model
class School_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

# serialize Parent_school_application
class Parent_school_application_modelSerializer(serializers.ModelSerializer):
    parent = serializers.SerializerMethodField()
    school = serializers.SerializerMethodField()
    student = serializers.SerializerMethodField()
    
    class Meta:
        model = Parent_school_application
        fields = '__all__'
    
    def get_parent(self, obj):
        if obj.parent:
            return {'id': obj.parent.id, 'user': {'email': obj.parent.user.email}}
        return None
    
    def get_school(self, obj):
        if obj.school:
            return {'id': obj.school.id, 'name': obj.school.name}
        return None
    
    def get_student(self, obj):
        if obj.student:
            return {'id': obj.student.id, 'admission_number': obj.student.admission_number}
        return None
