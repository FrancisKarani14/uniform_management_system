from rest_framework import serializers
from .models import User, AdminProfile, TailorProfile, SchoolAdminProfile, ParentProfile

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

