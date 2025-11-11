from rest_framework import serializers
from .models_legacy import Expedientes, Cursos, Sedes

class ExpedienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expedientes
        fields = ["carne", "nombre_completo", "correo"]  # unicos campos para prueba.

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursos
        fields = ["id_curso", "nombre", "id_carrera", "ciclo"]

class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sedes
        fields = ["id_sede", "nombre", "id_region"]
