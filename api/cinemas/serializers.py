from rest_framework import serializers

from .models import *


class EventSerializer(serializers.ModelSerializer):
    cinema = serializers.StringRelatedField()
    class Meta:
        model = Event
        fields = ['id', 'movie', 'cinema', 'child_price', 'student_price', 'adult_price', 'date', 'start_time', 'end_time', 'hall_number']