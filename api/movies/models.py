from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


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

    class Meta:
        verbose_name_plural = "Statuses"


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