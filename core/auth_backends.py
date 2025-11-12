from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from django.db import transaction
from .models_legacy import Usuarios
import bcrypt

User = get_user_model()

def _verify_password(plain: str, stored: str) -> bool:
    if stored.startswith("pbkdf2_") or stored.startswith("argon2") or stored.startswith("sha1$"):
        return check_password(plain, stored)
    if stored.startswith("$2a$") or stored.startswith("$2b$") or stored.startswith("$2y$"):
        try:
            return bcrypt.checkpw(plain.encode(), stored.encode())
        except Exception:
            return False
    return plain == stored  # fallback de texto plano

class LegacyUserBackend(BaseBackend):
    """
    Autentica contra tabla 'usuarios' usando correo+contra.
    Crea/actualiza un espejo en auth_user con username=correo (clave humana),
    y sincroniza email/first_name.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        correo = (username or kwargs.get("correo") or "").strip().lower()
        if not correo or not password:
            return None

        try:
            u = Usuarios.objects.get(correo=correo)
        except Usuarios.DoesNotExist:
            return None

        if hasattr(u, "activo") and not u.activo:
            return None

        if not _verify_password(password, u.contra):
            return None

        # Espejo en Django: username=correo para mantener unicidad
        with transaction.atomic():
            dj_user, created = User.objects.get_or_create(
                username=correo,
                defaults={"email": correo, "first_name": getattr(u, "nombre", "") or ""},
            )

            changed = False
            if dj_user.email != correo:
                dj_user.email = correo
                changed = True
            nombre = getattr(u, "nombre", "") or ""
            if dj_user.first_name != nombre:
                dj_user.first_name = nombre
                changed = True
            if changed:
                dj_user.save(update_fields=["email", "first_name"])

            return dj_user

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
