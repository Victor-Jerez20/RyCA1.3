import { useNavigate } from 'react-router-dom'

export default function Topbar() {
  const nav = useNavigate()
  function logout() {
    localStorage.removeItem('ryca_access')
    localStorage.removeItem('ryca_refresh')
    localStorage.removeItem('ryca_user')
    nav('/login', { replace:true })
  }
  const u = JSON.parse(localStorage.getItem('ryca_user') || '{}')

  return (
    <header className="topbar">
      <div className="mono">Usuario: {u?.nombre || u?.correo || '—'}</div>
      <button className="btn" onClick={logout}>Salir</button>
    </header>
  )
}
