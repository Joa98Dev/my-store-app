
# products urls.py

# Impoerta eel modulo path para definir rutas en Django
from django.urls import path

# Importa la clase DefoaulRouter pertenecinete a DRF
from rest_framework.routers import DefaultRouter

# Importa la clase ProducViewSet
from .views import ProductViewSet

# Genera las rutas necesarias para la API RESTful
router = DefaultRouter()
router.register('products', ProductViewSet)

# Devuelve directamente las URLs registradas por el router
urlpatterns = router.urls
