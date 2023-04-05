from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(User)
admin.site.register(Status)
admin.site.register(Category)
admin.site.register(Movie)
admin.site.register(Event)
admin.site.register(Ticket)
admin.site.register(Cinema)