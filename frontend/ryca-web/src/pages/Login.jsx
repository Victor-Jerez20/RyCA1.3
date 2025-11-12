import { useState } from 'react'
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    try {
      await login(correo, password)
      nav('/dashboard')
    } catch (e) {
      setErr(e.message || 'Error de autenticación')
    }
  }

  return (
    <div style={{maxWidth:420, margin:'4rem auto'}}>
      <h2>Ingreso RYCA</h2>
      <form onSubmit={onSubmit}>
        <label>Correo</label>
        <input type="email" value={correo} onChange={e=>setCorreo(e.target.value)} required />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
      {err && <p style={{color:'crimson'}}>{err}</p>}
    </div>
  )
}
