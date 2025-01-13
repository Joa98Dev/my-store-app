# products models.py

# Importa el modulo models de Django
from django.db import models

# Clase Product
# Define una tabla en la base de datos
class Product(models.Model):
    name = models.CharField(max_length=255) # Tendra el nombre del producto -> VARCHAR(255)
    description = models.TextField() # Alamcenara la descripcion del producto -> TEXT
    price = models.DecimalField(max_digits=10, decimal_places=2) # Tendra el precio del producto -> DECIMAL (10, 2)
    stock = models.PositiveIntegerField() # Cantidad del producto en inventario -> INTEGER

    # Define la representacion del producto
    def __str__(self):
        return self.name

