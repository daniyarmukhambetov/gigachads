from django.db import models

from users.models import *
from movies.models import *
from cinemas.models import *


class Event(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE)
    child_price = models.FloatField()
    student_price = models.FloatField()
    adult_price =models.FloatField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    hall_number = models.IntegerField()

    def __str__(self):
        return '%s: %s' % (self.movie.title, self.cinema.name)


class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=4)    
    booked = models.BooleanField(default=False)

    def __str__(self):
        return '%s: %s' % (self.user.username, self.event.movie.title)