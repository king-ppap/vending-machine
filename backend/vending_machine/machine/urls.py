from django.urls import path, include, re_path
from .routers import DefaultRouter
# from .views import 

app_name = 'vending-machine'

router = DefaultRouter()


# router.register('vending-machine', XXXViewSet, basename='vending-machine')

urlpatterns = [
    re_path('v1/', include(router.urls)),
]
