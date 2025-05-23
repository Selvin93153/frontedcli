import React, { useEffect, useState } from 'react';
import { getNotificaciones, marcarComoLeida } from '../../api/notificaciones';
import FormNotificacion from './FormNotificacion';
import 'bootstrap/dist/css/bootstrap.min.css';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      setUsuario(user);
    }
  }, []);

  const cargarNotificaciones = async () => {
    try {
      const data = await getNotificaciones();

      let filtradas = data;
      if (usuario?.rol?.id_rol === 1 || usuario?.rol?.id_rol === 2) {
        filtradas = data.filter(n => n.usuario?.id_usuario === usuario.id);
      }

      const adaptadas = Array.isArray(filtradas)
        ? filtradas.map(n => ({
            id: n.id_notificacion,
            mensaje: n.mensaje,
            nombres: n.usuario?.nombres || '',
            apellidos: n.usuario?.apellidos || '',
            leida: n.leida || false
          }))
        : [];

      setNotificaciones(adaptadas);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  };

  useEffect(() => {
    if (usuario) {
      cargarNotificaciones();
    }
  }, [usuario]);

  const handleMostrarFormulario = () => {
    setMostrarFormulario(true);
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    cargarNotificaciones();
  };

  const marcarLeida = async (id) => {
    try {
      await marcarComoLeida(id);
      cargarNotificaciones();
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    }
  };

  const hayNoLeidas = notificaciones.some(n => !n.leida);

  return (
    <div style={{ backgroundColor: '#fff5e6', padding: '2rem', borderRadius: '12px' }}>
      <h2 style={{ color: '#d35400' }}>
        🔔 Notificaciones {hayNoLeidas && <span style={{ color: 'red' }}>📢</span>}
      </h2>

       {(usuario?.rol?.id_rol === 3 || usuario?.rol?.id_rol === 2) && !mostrarFormulario && (
  <button
    onClick={handleMostrarFormulario}
    style={{
      backgroundColor: '#d35400',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      marginBottom: '1rem'
    }}
  >
    ➕ Enviar Notificación
  </button>
)}


      {mostrarFormulario ? (
        <FormNotificacion onSuccess={handleOcultarFormulario} />
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}
        >
          <thead>
            <tr style={{ backgroundColor: '#ffe0b2' }}>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Mensaje</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {notificaciones.map(n => (
              <tr key={n.id} style={{ backgroundColor: n.leida ? '#f9f9f9' : '#fff3cd' }}>
                <td>{n.id}</td>
                <td>{n.nombres}</td>
                <td>{n.apellidos}</td>
                <td>{n.mensaje}</td>
                <td>{n.leida ? 'Leída ✅' : 'No leída 🔔'}</td>
                <td>
                  {!n.leida && (
                    <button
                      onClick={() => marcarLeida(n.id)}
                      style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                    >
                      Marcar como leída
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Notificaciones;
