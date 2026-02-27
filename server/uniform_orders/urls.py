from django.urls import path, include
from rest_framework import routers
from .views import Uniform_assignmentViewSet, Uniform_orderViewSet

router = routers.DefaultRouter()
router.register(r'uniform_orders', Uniform_orderViewSet)
router.register(r'uniform_assignments', Uniform_assignmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]