import { useState } from 'react';
import { login as apiLogin } from '../api/auth';
import { setTokens, clearTokens, getTokens } from '../api/http';
import { AuthCtx } from './auth-context';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(correo, password) {
    const data = await apiLogin({ correo, password });
    setTokens({ access: data.access, refresh: data.refresh });
    setUser(data.user);
    return data.user;
  }

  function logout() {
    clearTokens();
    setUser(null);
  }

  return (
    <AuthCtx.Provider value={{ user, login, logout, hasTokens: !!getTokens().access }}>
      {children}
    </AuthCtx.Provider>
  );
}
