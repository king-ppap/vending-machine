from django.urls import path, include, re_path
from .routers import DefaultRouter
from .views import VendingMachineViewSet, VendingMachineGenericViewSet

app_name = 'vending-machine'

router = DefaultRouter()


router.register('vending-machine', VendingMachineViewSet,
                basename='vending-machine')
router.register('vending-machine-custom', VendingMachineGenericViewSet,
                basename='vending-machine')

urlpatterns = [
    re_path('', include(router.urls)),
]
