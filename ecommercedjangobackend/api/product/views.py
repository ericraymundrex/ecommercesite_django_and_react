from .serializers import ProductSerializer
from .models import Product
from rest_framework import viewsets

class ProductViewSet(viewsets.ModelViewSet):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer