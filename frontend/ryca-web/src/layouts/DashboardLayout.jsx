import { Outlet, /*useLocation*/ } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ErrorBoundary from '../components/ErrorBoundary'
import '../styles/dashboard.css'

// Debug para veificación de ruta y rol del usuario
// function DebugBar() {
//   const loc = useLocation()
//   const u = JSON.parse(localStorage.getItem('ryca_user') || '{}')
//   return (
//     <div className="card" style={{marginBottom:12}}>
//       <div><b>Debug</b></div>
//       <div>pathname: <code>{loc.pathname}</code></div>
//       <div>rol (localStorage): <code>{String(u?.rol)}</code></div>
//     </div>
//   )
// }

export default function DashboardLayout() {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="main">
          {/* <DebugBar /> */}
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
