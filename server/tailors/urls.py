from django.urls import path, include
from rest_framework import routers
from .views import Tailor_school_requestViewSet

router = routers.DefaultRouter()
router.register(r'tailor_school_requests', Tailor_school_requestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]