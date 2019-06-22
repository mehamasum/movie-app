from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from config.movieapp.serializers import UserSerializer, GroupSerializer
from config.movieapp.models import MovieCollection
from config.movieapp.serializers import MovieCollectionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from .paginations import SavedTimeBasedPagination

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class MovieCollectionView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None):
        """
        Returns user's entire collection
        If movie param is provided, checks whethear a movie is in collection of user
        """
        movie = self.request.query_params.get('movie', None)

        if movie:
            try:
                instance = MovieCollection.objects.get(movie=movie,
                                                       user=self.request.user)
            except MovieCollection.DoesNotExist:
                raise NotFound
            serializer = MovieCollectionSerializer(
                instance, context={'request': request})
            return Response(serializer.data)

        queryset = MovieCollection.objects.filter(user=self.request.user)
        paginator = SavedTimeBasedPagination()

        page = paginator.paginate_queryset(queryset, self.request, view=self)
        
        if page is not None:
            serializer = MovieCollectionSerializer(page, many=True,
                                               context={'request': request})
            return paginator.get_paginated_response(serializer.data)

        serializer = MovieCollectionSerializer(queryset, many=True,
                                                context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Adds a movie to collections
        """
        serializer = MovieCollectionSerializer(data=request.data,
                                               context={'request': request})
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieCollectionDetailView(APIView):
    def delete(self, request, pk, format=None):
        """
        Deletes a movie to collections
        """
        try:
            instance = MovieCollection.objects.get(pk=pk,
                                                   user=self.request.user)
        except MovieCollection.DoesNotExist:
            raise NotFound
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)