from django.urls import path, include

from movies.views import MovieViewSet, CategoryViewSet, StatusViewSet

urlpatterns = [
    path('movie_list/', MovieViewSet.as_view()),
    path('category_list/', CategoryViewSet.as_view()),
    path('status_list/', StatusViewSet.as_view()),
]
