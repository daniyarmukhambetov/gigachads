from django.db import models

from movies.models import *


class Cinema(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Event(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE)
    child_price = models.FloatField()
    student_price = models.FloatField()
    adult_price = models.FloatField()
    date = models.DateField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    hall_number = models.IntegerField()

    def __str__(self):
        return '%s: %s' % (self.movie.title, self.cinema.name)