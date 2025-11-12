from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from .models_legacy import Expedientes, Cursos, Sedes
from .serializers import ExpedienteSerializer, CursoSerializer, SedeSerializer
from rest_framework.permissions import IsAuthenticated
from core.permissions import roles_permitidos

@api_view(["GET"])
def ping(_):
    return Response({"ok": True, "service": "ryca-api"})

class DefaultPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = "page_size"
    max_page_size = 200

class ExpedienteViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated, roles_permitidos(1)]
    queryset = Expedientes.objects.all().order_by("carne")
    serializer_class = ExpedienteSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["carne", "nombre_completo", "correo"]
    ordering_fields = ["carne", "nombre_completo"]

class CursoViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated, roles_permitidos(1)]
    queryset = Cursos.objects.all().order_by("id_curso")
    serializer_class = CursoSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["id_curso", "nombre", "id_carrera", "ciclo"]
    ordering_fields = ["id_curso", "nombre", "id_carrera", "ciclo"]

class SedeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated, roles_permitidos(1)]
    queryset = Sedes.objects.all().order_by("id_sede")
    serializer_class = SedeSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["id_sede", "nombre", "id_region"]
    ordering_fields = ["id_sede", "nombre", "id_region"]

@api_view(["GET"])
@permission_classes([IsAuthenticated, roles_permitidos(1)])
def me(request):
    """
    Retorna info básica del usuario autenticado.
    Si consumís los claims (via request.auth), también puedes devolver rol, etc.
    """
    user = request.user
    # Si quieres leer claims extra desde el token:
    claims = getattr(request, "auth", {}) or {}
    return Response({
        "django_user_id": user.id,
        "username": user.username,
        "email": user.email,
        "claims": {
            "id_usuario": claims.get("id_usuario"),
            "rol": claims.get("rol"),
            "nombre": claims.get("nombre"),
            "correo": claims.get("correo"),
        }
    })