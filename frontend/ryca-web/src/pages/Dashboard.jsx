import { useEffect, useState } from 'react'
import { apiFetch } from '../api/http'
import { useAuth } from '../auth/useAuth';

export default function Dashboard() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const { user, logout } = useAuth()

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch('/api/expedientes?page_size=10')
        if (!res.ok) throw new Error('No autorizado o error de API')
        const data = await res.json()
        setRows(data.results || data) // DRF list default
      } catch (e) {
        setError(e.message)
      }
    })()
  }, [])

  return (
    <div style={{padding:'1rem'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3>Panel RYCA</h3>
        <div>
          <span>{user?.nombre || user?.correo}</span>
          <button onClick={logout} style={{marginLeft:8}}>Salir</button>
        </div>
      </header>

      {error && <p style={{color:'crimson'}}>{error}</p>}

      <table border="1" cellPadding="6" style={{marginTop:'1rem', width:'100%'}}>
        <thead>
          <tr><th>Carne</th><th>Nombre</th><th>Correo</th></tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td>{r.carne}</td>
              <td>{r.nombre_completo || r.nombre}</td>
              <td>{r.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}