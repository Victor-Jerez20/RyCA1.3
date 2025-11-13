import { useState, useMemo } from 'react'
import { AuthCtx } from './auth-context'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ryca_user') || 'null') } catch { return null }
  })

  const hasTokens = !!localStorage.getItem('ryca_access')

  async function login(correo, password) {
    const r = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ correo, password })
    })
    if (!r.ok) {
      const e = await r.json().catch(()=>({detail:'Error de autenticación'}))
      throw new Error(e.detail || 'Login failed')
    }
    const { access, refresh, user } = await r.json()
    localStorage.setItem('ryca_access', access)
    localStorage.setItem('ryca_refresh', refresh)
    localStorage.setItem('ryca_user', JSON.stringify(user))
    setUser(user)
    return user
  }

  function logout() {
    localStorage.removeItem('ryca_access')
    localStorage.removeItem('ryca_refresh')
    localStorage.removeItem('ryca_user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, hasTokens, login, logout }), [user, hasTokens])

  return (
    <AuthCtx.Provider value={value}>
      {children}
    </AuthCtx.Provider>
  )
}
