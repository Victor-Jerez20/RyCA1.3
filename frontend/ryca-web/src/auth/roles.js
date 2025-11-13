export const ROLES = {
  ADMIN: 1,          // Administrador
  ACTAS: 2,          // Actas
  CERTIFICACIONES: 3,// certificaciones
  EXPEDIENTES: 4,    // expedientes
  EQUIVALENCIAS: 5,  // equivalencias
  TITULOS: 6,        // titulos
}

export function getCurrentRoleId() {
  try {
    const u = JSON.parse(localStorage.getItem('ryca_user'))
    return u?.rol ?? null
  } catch { return null }
}
