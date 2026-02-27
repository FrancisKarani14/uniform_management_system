from rest_framework import serializers
from .models import School, Parent_school_application

# serialize School model
class School_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

# serialize Parent_school_application
class Parent_school_application_modelSerializer(serializers.ModelSerializer):
    parent_details = serializers.SerializerMethodField(read_only=True)
    school_details = serializers.SerializerMethodField(read_only=True)
    student_details = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Parent_school_application
        fields = ['id', 'parent', 'school', 'student', 'status', 'created_at', 'updated_at', 'parent_details', 'school_details', 'student_details']
        read_only_fields = ['status', 'created_at', 'updated_at']
    
    def get_parent_details(self, obj):
        if obj.parent and obj.parent.user:
            return {
                'id': obj.parent.id, 
                'name': f"{obj.parent.user.first_name} {obj.parent.user.last_name}",
                'email': obj.parent.user.email,
                'phone_number': obj.parent.phone_number
            }
        return None
    
    def get_school_details(self, obj):
        if obj.school:
            return {'id': obj.school.id, 'name': obj.school.name, 'location': obj.school.location}
        return None
    
    def get_student_details(self, obj):
        if obj.student:
            return {
                'id': obj.student.id, 
                'first_name': obj.student.first_name,
                'last_name': obj.student.last_name,
                'admission_number': obj.student.admission_number
            }
        return None
