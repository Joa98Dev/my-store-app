from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Esto proporciona el endpoint para obtener el token
class MyTokenObtainPairView(TokenObtainPairView):
    pass

# Para refrescar el token
class MyTokenRefreshView(TokenRefreshView):
    pass


# Create your views here.
