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
    class Meta:
        model = User
        fields = '__all__'

# serialize admin profile
class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminProfile
        fields = ["phone_number"]

# serialize TailorProfile
class TailorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TailorProfile
        fields = ["shop_name", "location", "phone_number"]

# serialize SchoolAdminProfile
class SchoolAdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolAdminProfile
        fields = ["phone_number"]

# serialize ParentProfile
class ParentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentProfile
        fields = ["phone_number", "address"]

# serialize StudentProfile
class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ["admission_number", "date_of_birth", "gender"]

