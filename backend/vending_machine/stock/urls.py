from django.urls import path, include, re_path
from .routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, ItemsInMachineViewSet, ItemsInMachineWithUuidList

app_name = 'stock'

router = DefaultRouter()

router.register('product', ProductViewSet, basename='Stock')
router.register('category', CategoryViewSet, basename='Stock')
router.register('items', ItemsInMachineViewSet, basename='Stock')
router.register(
    'stock', ItemsInMachineWithUuidList, basename='Stock')

urlpatterns = [
    re_path('', include(router.urls)),
]
