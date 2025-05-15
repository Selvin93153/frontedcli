import { useState } from 'react';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, mensaje: 'Cita programada para mañana', leido: false }
  ]);

  const [mensaje, setMensaje] = useState('');

  const agregarNotificacion = (e) => {
    e.preventDefault();
    const nueva = {
      id: notificaciones.length + 1,
      mensaje,
      leido: false
    };
    setNotificaciones([nueva, ...notificaciones]);
    setMensaje('');
  };

  const marcarLeido = (id) => {
    const actualizado = notificaciones.map(n =>
      n.id === id ? { ...n, leido: true } : n
    );
    setNotificaciones(actualizado);
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
      <h2 style={{ color: '#0c63e4' }}>🔔 Notificaciones</h2>

      <form onSubmit={agregarNotificacion} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribir nueva notificación"
          required
          style={{ flex: 1 }}
        />
        <button type="submit" style={{
          backgroundColor: '#0c63e4',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '5px'
        }}>
          Enviar
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notificaciones.map((n) => (
          <li
            key={n.id}
            style={{
              backgroundColor: n.leido ? '#e0ffe0' : '#ffe0e0',
              padding: '0.75rem',
              borderRadius: '6px',
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{n.mensaje}</span>
            {!n.leido && (
              <button onClick={() => marcarLeido(n.id)} style={{
                backgroundColor: '#999',
                color: 'white',
                border: 'none',
                padding: '0.3rem 0.8rem',
                borderRadius: '4px'
              }}>
                Marcar como leído
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notificaciones;
