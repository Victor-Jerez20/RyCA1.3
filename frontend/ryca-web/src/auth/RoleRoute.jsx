import { Outlet } from 'react-router-dom'
import { getCurrentRoleId } from './roles'

function NoAccess() {
  return (
    <div className="card">
      <h3>Sin autorización</h3>
      <p>No tienes permisos para ver esta sección.</p>
    </div>
  )
}

export default function RoleRoute({ allow }) {
  const raw = getCurrentRoleId()
  const current = raw != null ? Number(raw) : null
  const allowed = (Array.isArray(allow) ? allow : [allow]).map(Number)

  if (!current || !allowed.includes(current)) return <NoAccess />
  return <Outlet />
}
