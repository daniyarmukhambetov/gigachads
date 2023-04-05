from django.db import models

from users.models import *
from cinemas.models import *


class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=4)    
    booked = models.BooleanField(default=False)

    def __str__(self):
        return '%s: %s' % (self.user.username, self.event.movie.title)