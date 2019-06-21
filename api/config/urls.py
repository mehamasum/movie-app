from django.urls import include, path
from rest_framework import routers
from config.movieapp import views
from rest_framework.authtoken import views as drf_views
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
    path('api/login/', drf_views.obtain_auth_token),
    path('api/collection/', views.MovieCollectionView.as_view(), name="collection-list"),
    path('api/collection/<int:pk>/',
         views.MovieCollectionDetailView.as_view(), name="collection-detail"),
    path('admin/', admin.site.urls),
]
