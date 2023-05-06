from rest_framework import serializers
from django.contrib.auth.models import AnonymousUser

from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    event = serializers.PrimaryKeyRelatedField(read_only=True)
    is_users_ticket = serializers.SerializerMethodField()

    def get_is_users_ticket(self, obj):
        usr = self.context.get("request").user
        if isinstance(usr, AnonymousUser):
            return False
        return usr == obj.user

    class Meta:
        model = Ticket
        fields = ['id', 'user', 'event', 'seat_number', 'is_users_ticket']

    def create(self, validated_data):
        ticket = Ticket.objects.create(user_id=self.context.get("request").user.id,
                                       event_id=self.context.get("request").query_params.get("event"),
                                       seat_number=validated_data.get('seat_number'))
        return ticket