from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models_legacy import Usuarios

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        correo = (request.data.get("correo") or "").strip().lower()
        password = request.data.get("password") or ""
        if not correo or not password:
            return Response({"detail": "Faltan credenciales."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=correo, password=password)
        if not user:
            return Response({"detail": "Credenciales inválidas."}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            u = Usuarios.objects.get(correo=correo)
        except Usuarios.DoesNotExist:
            return Response({"detail": "Usuario no encontrado (RYCA)."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        refresh = RefreshToken.for_user(user)
        refresh["id_usuario"] = u.id_usuario
        rol_id = getattr(getattr(u, "id_rol", None), "id_rol", None)
        if rol_id is None:
            rol_id = getattr(u, "id_rol_id", getattr(u, "id_rol", None))
        refresh["rol"] = rol_id
        refresh["nombre"] = getattr(u, "nombre", "") or user.first_name
        refresh["correo"] = u.correo

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id_usuario": u.id_usuario,
                "correo": u.correo,
                "nombre": getattr(u, "nombre", "") or user.first_name,
                "rol": rol_id,
            }
        }, status=200)
