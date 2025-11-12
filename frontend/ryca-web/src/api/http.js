// Almacenamiento simple de tokens en localStorage
const ACCESS_KEY = 'ryca_access'
const REFRESH_KEY = 'ryca_refresh'

export function getTokens() {
  return {
    access: localStorage.getItem(ACCESS_KEY),
    refresh: localStorage.getItem(REFRESH_KEY),
  }
}
export function setTokens({access, refresh}) {
  if (access) localStorage.setItem(ACCESS_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh)
}
export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

// apiFetch: añade Bearer y reintenta una vez con refresh si es que se da 401
export async function apiFetch(input, init = {}) {
  const { access, refresh } = getTokens()
  const headers = new Headers(init.headers || {})
  if (access) headers.set('Authorization', `Bearer ${access}`)

  let res = await fetch(input, { ...init, headers })
  if (res.status !== 401 || !refresh) return res

  // intentar refresh
  const rr = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ refresh })
  })
  if (!rr.ok) return res // sigue 401, deja que el caller maneje

  const data = await rr.json()
  setTokens({ access: data.access })
  const headers2 = new Headers(init.headers || {})
  headers2.set('Authorization', `Bearer ${data.access}`)
  return fetch(input, { ...init, headers: headers2 })
}
