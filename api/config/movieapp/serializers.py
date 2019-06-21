from django.contrib.auth.models import User, Group
from rest_framework import serializers
from config.movieapp.models import MovieCollection


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class MovieCollectionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MovieCollection
        fields = (
            'id',
            'user',
            'movie',
            'title',
            'year',
            'poster',
            'saved_at'
        )
        read_only_fields = ('id', 'user')