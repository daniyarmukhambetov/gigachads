from rest_framework import serializers

from movies.models import Movie, Category, Status



class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class MovieModelSerializer(serializers.ModelSerializer):
    category = CategoryModelSerializer(many=True)
    status = serializers.StringRelatedField()
    class Meta:
        model = Movie
        fields = "__all__"



class StatusModelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Status
        fields = "__all__"
