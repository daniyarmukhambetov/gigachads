from django.shortcuts import render

from django.utils.dateparse import parse_date

from rest_framework import generics, viewsets, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework import permissions

from .serializers import *
from .models import *


@permission_classes((permissions.AllowAny,))
class EventByTimeViewSet(APIView):
    def get(self, request):
        queryset = Event.objects.all().filter(date=parse_date(request.data.get('date')), movie=request.data.get('movie_id')).order_by('start_time')
        serializer_class = EventSerializer(queryset, many=True)
        return Response(serializer_class.data)


@permission_classes((permissions.AllowAny,))
class EventByCinemaViewSet(APIView):
    def get(self, request):
        queryset = Event.objects.all().filter(date=parse_date(request.data.get('date')), movie=request.data.get('movie_id')).order_by('cinema', 'start_time')
        serializer_class = EventSerializer(queryset, many=True)
        return Response(serializer_class.data)