from rest_framework import serializers
from .models import User, AdminProfile, TailorProfile, SchoolAdminProfile, ParentProfile, StudentProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView  
from django.contrib.auth import authenticate

# creates a custom serialer


class CustomTokenSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(
            request=self.context.get('request'),
            username=email,   
            password=password
        )

        if user is None:
            raise Exception("Invalid email or password")

        data = super().validate(attrs)
        return data

# serialize user model
class UserSerializer(serializers.ModelSerializer):
    school_admin_profile = serializers.SerializerMethodField()
    parent_profile = serializers.SerializerMethodField()
    tailor_profile = serializers.SerializerMethodField()
    admin_profile = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user
    
    def get_school_admin_profile(self, obj):
        if hasattr(obj, 'school_admin_profile'):
            profile = obj.school_admin_profile
            return {
                'id': profile.id,
                'phone_number': profile.phone_number,
                'school': {'id': profile.school.id, 'name': profile.school.name} if profile.school else None
            }
        return None
    
    def get_parent_profile(self, obj):
        if hasattr(obj, 'parent_profile'):
            profile = obj.parent_profile
            return {
                'id': profile.id,
                'phone_number': profile.phone_number,
                'address': profile.address
            }
        return None
    
    def get_tailor_profile(self, obj):
        if hasattr(obj, 'tailor_profile'):
            profile = obj.tailor_profile
            return {
                'id': profile.id,
                'shop_name': profile.shop_name,
                'location': profile.location,
                'phone_number': profile.phone_number
            }
        return None
    
    def get_admin_profile(self, obj):
        if hasattr(obj, 'admin_profile'):
            profile = obj.admin_profile
            return {
                'id': profile.id,
                'phone_number': profile.phone_number
            }
        return None

# serialize admin profile
class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminProfile
        fields = '__all__'

# serialize TailorProfile
class TailorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TailorProfile
        fields = '__all__'

# serialize SchoolAdminProfile
class SchoolAdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolAdminProfile
        fields = '__all__'

# serialize ParentProfile
class ParentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentProfile
        fields = '__all__'

# serialize StudentProfile
class StudentProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    school = serializers.SerializerMethodField()
    
    class Meta:
        model = StudentProfile
        fields = '__all__'
    
    def get_user(self, obj):
        if obj.user:
            return {
                'id': obj.user.id,
                'email': obj.user.email,
                'first_name': obj.user.first_name,
                'last_name': obj.user.last_name
            }
        return {
            'first_name': obj.first_name,
            'last_name': obj.last_name
        }
    
    def get_school(self, obj):
        if obj.school:
            return {'id': obj.school.id, 'name': obj.school.name}
        return None

