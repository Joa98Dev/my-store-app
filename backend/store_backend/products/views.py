# products views.py

from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer

# Recupera la informacion de la base de datos
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]  # Esto asegura que solo usuarios autenticados puedan acceder
