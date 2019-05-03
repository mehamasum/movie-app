from django.urls import include, path
from rest_framework import routers
from config.movieapp import views
from rest_framework.authtoken import views as drf_views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
    path('api/login/', drf_views.obtain_auth_token)
]
