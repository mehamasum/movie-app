from django.db import models
from django.contrib.auth.models import User


class MovieCollection(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    movie = models.CharField(max_length=16) # imdbID
    title = models.CharField(max_length=256, blank=True, null=True)
    year = models.CharField(max_length=4, blank=True, null=True)
    poster = models.CharField(max_length=2048, blank=True, null=True)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Movie Collection"
        unique_together = ("user", "movie")

    def __str__(self):
        return f'{self.user} saved {self.title}'
