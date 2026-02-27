from django.urls import path, include
from rest_framework import routers
from schools.views import School_modelViewSet, Parent_school_application_modelViewSet

router = routers.DefaultRouter()
router.register(r'schools', School_modelViewSet)
router.register(r'parent_school_applications', Parent_school_application_modelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]