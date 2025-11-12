import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export default function ProtectedRoute() {
  const { user, hasTokens } = useAuth()
  if (!user && !hasTokens) return <Navigate to="/login" replace />
  return <Outlet />
}