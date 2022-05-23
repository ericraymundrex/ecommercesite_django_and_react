from .serializers import CategorySerializers
from .models import Category
from rest_framework import viewsets

class CategoryViewSet(viewsets.ModelViewSet):
    queryset=Category.objects.all().order_by('name')
    serializer_class=CategorySerializers