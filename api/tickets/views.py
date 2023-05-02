from django_filters import rest_framework as filters
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .models import Ticket
from .serializers import TicketSerializer


class TicketView(
    viewsets.GenericViewSet,
    viewsets.mixins.ListModelMixin,
    viewsets.mixins.CreateModelMixin,
    viewsets.mixins.RetrieveModelMixin,
    viewsets.mixins.DestroyModelMixin
):
    permission_classes = [permissions.AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('event__id',)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        parameters=[
            OpenApiParameter("event", OpenApiTypes.INT, description="event id", required=True)
        ],
        request=TicketSerializer(many=True)
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)
        # return super().create(request, *args, **kwargs)

    def get_queryset(self):
        return Ticket.objects.all()

    def get_serializer_class(self):
        return TicketSerializer
