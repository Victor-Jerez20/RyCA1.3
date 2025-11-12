export async function login({ correo, password }) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ correo, password })
  })
  if (!res.ok) {
    const err = await res.json().catch(()=>({detail:'Error login'}))
    throw new Error(err.detail || 'Login failed')
  }
  return res.json() // { access, refresh, user }
}

export async function refreshToken(refresh) {
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ refresh })
  })
  if (!res.ok) throw new Error('Refresh failed')
  return res.json() // { access }
}
