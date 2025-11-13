import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import RoleRoute from './auth/RoleRoute'
import DashboardLayout from './layouts/DashboardLayout'

import Home from './pages/dashboard/Home'
import Admin from './pages/modules/Admin'
import Actas from './pages/modules/Actas'
import Certificaciones from './pages/modules/Certificaciones'
import Expedientes from './pages/modules/Expedientes'
import Equivalencias from './pages/modules/Equivalencias'
import Titulos from './pages/modules/Titulos'
import Login from './pages/Login'
import { ROLES } from './auth/roles'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Home />} />

            {/* Admin */}
            <Route element={<RoleRoute allow={[ROLES.ADMIN]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            {/* Módulos */}
            <Route element={<RoleRoute allow={[ROLES.ADMIN, ROLES.ACTAS]} />}>
              <Route path="actas" element={<Actas />} />
            </Route>

            <Route element={<RoleRoute allow={[ROLES.ADMIN, ROLES.CERTIFICACIONES]} />}>
              <Route path="certificaciones" element={<Certificaciones />} />
            </Route>

            <Route element={<RoleRoute allow={[ROLES.ADMIN, ROLES.EXPEDIENTES]} />}>
              <Route path="expedientes" element={<Expedientes />} />
            </Route>

            <Route element={<RoleRoute allow={[ROLES.ADMIN, ROLES.EQUIVALENCIAS]} />}>
              <Route path="equivalencias" element={<Equivalencias />} />
            </Route>

            <Route element={<RoleRoute allow={[ROLES.ADMIN, ROLES.TITULOS]} />}>
              <Route path="titulos" element={<Titulos />} />
            </Route>

            {/* 404 dentro del layout */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        {/* 404 global */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
