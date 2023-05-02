from rest_framework.routers import DefaultRouter

from .views import TicketView

router = DefaultRouter()

router.register("tickets", viewset=TicketView, basename="tickets")

urlpatterns = router.urls
