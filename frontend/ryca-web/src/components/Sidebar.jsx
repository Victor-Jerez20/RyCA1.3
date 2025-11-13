import { NavLink } from 'react-router-dom'
import { getCurrentRoleId, ROLES } from '../auth/roles'
import '../styles/dashboard.css'

const MENU_BASE = [
  { label: 'Inicio', to: '/dashboard' },
]

const MENU_BY_ROLE = {
  [ROLES.ADMIN]: [
    { section: 'Administración' },
    { label: 'Admin', to: '/admin' },
    { section: 'Módulos' },
    { label: 'Actas', to: '/actas' },
    { label: 'Certificaciones', to: '/certificaciones' },
    { label: 'Expedientes', to: '/expedientes' },
    { label: 'Equivalencias', to: '/equivalencias' },
    { label: 'Títulos', to: '/titulos' },
  ],
  [ROLES.ACTAS]: [
    { section: 'Módulos' },
    { label: 'Actas', to: '/actas' },
  ],
  [ROLES.CERTIFICACIONES]: [
    { section: 'Módulos' },
    { label: 'Certificaciones', to: '/certificaciones' },
  ],
  [ROLES.EXPEDIENTES]: [
    { section: 'Módulos' },
    { label: 'Expedientes', to: '/expedientes' },
  ],
  [ROLES.EQUIVALENCIAS]: [
    { section: 'Módulos' },
    { label: 'Equivalencias', to: '/equivalencias' },
  ],
  [ROLES.TITULOS]: [
    { section: 'Módulos' },
    { label: 'Títulos', to: '/titulos' },
  ],
}

export default function Sidebar() {
  const role = getCurrentRoleId()
  const menu = [...MENU_BASE, ...(MENU_BY_ROLE[role] || [])]

  return (
    <aside className="sidebar">
      <div className="brand">RYCA</div>
      <nav className="menu">
        {menu.map((item, idx) =>
          item.section ? (
            <div className="section" key={'s'+idx}>{item.section}</div>
          ) : (
            <NavLink key={item.to} to={item.to}>
              <span>•</span><span>{item.label}</span>
            </NavLink>
          )
        )}
      </nav>
    </aside>
  )
}
