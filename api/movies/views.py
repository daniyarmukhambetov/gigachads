from rest_framework import viewsets, generics, mixins, status
from rest_framework import filters

from movies.models import Movie, Category, Status
from movies.serializers import MovieModelSerializer, CategoryModelSerializer, StatusModelSerializer


class MovieViewSet(viewsets.ModelViewSet):
    search_fields = ['^title']
    filter_backends = (filters.SearchFilter,)
    queryset = Movie.objects.all()
    serializer_class = MovieModelSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryModelSerializer


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = CategoryModelSerializer





