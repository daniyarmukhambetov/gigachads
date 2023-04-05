from django.contrib.auth.models import AbstractUser

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class User(AbstractUser):

    def __str__(self) -> str:
        return self.username
    
    def __repr__(self) -> str:
        return self.username


class Cinema(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Status(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Movie(models.Model):
    category = models.ManyToManyField(Category)
    title = models.CharField(max_length=100)
    description = models.TextField()
    rating = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(10.0)],)
    release_date = models.DateField()
    country = models.CharField(max_length=50)
    duration = models.IntegerField()
    revenue = models.FloatField(validators=[MinValueValidator(0.0)],)
    tagline = models.CharField(max_length=50)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    age_limit = models.IntegerField()

    def __str__(self):
        return self.title


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