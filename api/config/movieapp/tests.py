from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import MovieCollection
from django.contrib.auth.models import User

class MovieCollectionTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="joe", password="password", email="joe@foo.com")
        self.superuser = User.objects.create_superuser(
            username="admin", password="supersecret", email="admin@foo.com")


    def test_adding_to_collection(self):
        url = reverse('collection-list')
        data = {'movie': 'test-imdb-id'}
        self.client.login(username="joe", password="password")
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MovieCollection.objects.count(), 1)
        self.assertEqual(response.data['movie'], 'test-imdb-id')

    def test_getting_full_collection(self):
        url = reverse('collection-list')
        MovieCollection.objects.create(user=self.user, movie='fake-id-1')
        MovieCollection.objects.create(user=self.user, movie='fake-id-2')
        self.client.login(username="joe", password="password")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        MovieCollection.objects.get(movie='fake-id-1').delete()
        MovieCollection.objects.get(movie='fake-id-2').delete()

    def test_querying_collection(self):
        url = reverse('collection-list')
        MovieCollection.objects.create(user=self.user, movie='fake-id-1')
        self.client.login(username="joe", password="password")

        response = self.client.get(f'{url}?movie=fake-id-1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['movie'], 'fake-id-1')

        response = self.client.get(f'{url}?movie=fake-id-2')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        MovieCollection.objects.get(movie='fake-id-1').delete()

    def test_deleting_from_collection(self):
        row = MovieCollection.objects.create(user=self.user, movie='fake-id-1')
        url = reverse('collection-detail', args=[row.id])
        self.client.login(username="joe", password="password")

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(MovieCollection.objects.count(), 0)