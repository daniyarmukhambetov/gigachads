from rest_framework import serializers

from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    event = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Ticket
        fields = ['id', 'user', 'event', 'seat_number']

    def create(self, validated_data):
        ticket = Ticket.objects.create(user_id=self.context.get("request").user.id,
                                       event_id=self.context.get("request").query_params.get("event"),
                                       seat_number=validated_data.get('seat_number'))
        return ticket
