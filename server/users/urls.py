from django.urls import path, include
from .views import UserViewSet, AdminProfileViewSet, TailorProfileViewSet, ParentProfileViewSet, SchoolAdminProfileViewSet, StudentProfileViewSet, CustomTokenView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'admin_profiles', AdminProfileViewSet)
router.register(r'school_admin_profiles', SchoolAdminProfileViewSet)
router.register(r'tailor_profiles', TailorProfileViewSet)
router.register(r'parent_profiles', ParentProfileViewSet)
router.register(r'student_profiles', StudentProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomTokenView.as_view(), name='token'),
]
