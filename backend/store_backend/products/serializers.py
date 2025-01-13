# products serializers.py

# Impoerta el modulo serializer de DjangoRestFramework
from rest_framework import serializers

# Importa la clase Product definida en models.py
from .models import Product

# Convierte el modelo Product en un diccionario JSON
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__' # Inlcuira todos los campos de Product