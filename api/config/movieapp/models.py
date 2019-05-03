from django.db import models
from django.contrib.auth.models import User


class MovieCollection(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    movie = models.CharField(max_length=16)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Movie Collection"
        unique_together = ("user", "movie")

    def __str__(self):
        return f'{self.user} saved {self.movie}'
