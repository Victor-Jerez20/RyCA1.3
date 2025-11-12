from rest_framework.permissions import BasePermission

class HasRole(BasePermission):
    allowed = set()

    def has_permission(self, request, view):
        claims = getattr(request, "auth", {}) or {}
        rol = claims.get("rol")
        # si rol viene como str/None, intenta castear
        try: rol = int(rol) if rol is not None else None
        except: pass
        return rol in self.allowed

# Fábrica práctica:
def roles_permitidos(*ids):
    class _HasRole(HasRole):
        allowed = set(ids)
    return _HasRole
