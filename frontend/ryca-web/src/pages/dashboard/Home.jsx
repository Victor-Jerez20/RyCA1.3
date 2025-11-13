                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        export default function Home() {
  const u = JSON.parse(localStorage.getItem('ryca_user') || '{}')
  return (
    <div className="grid">
      <div className="card">
        <h3>Bienvenido, {u?.nombre || u?.correo}</h3>
        <p>Este es tu inicio de RYCA. A la izquierda verás los módulos disponibles según tu rol.</p>
      </div>
      <div className="card">
        <h4>Estado</h4>
        <p className="mono">Rol ID: {u?.rol ?? '—'}</p>
      </div>
    </div>
  )
}
