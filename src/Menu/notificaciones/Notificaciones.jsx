// src/components/Notificaciones.jsx

import React, { useEffect, useState } from 'react';
import { getNotificaciones } from '../../api/notificaciones';
import FormNotificacion from './FormNotificacion';
import 'bootstrap/dist/css/bootstrap.min.css';


function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Nuevo estado

  const cargarNotificaciones = async () => {
    try {
      const data = await getNotificaciones();
      const adaptadas = Array.isArray(data)
        ? data.map(n => ({
            id: n.id_notificacion,
            mensaje: n.mensaje,
            nombres: n.usuario?.nombres || '',
            apellidos: n.usuario?.apellidos || ''
          }))
        : [];
      setNotificaciones(adaptadas);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  };

  useEffect(() => {
    cargarNotificaciones();
  }, []);

  const handleMostrarFormulario = () => {
    setMostrarFormulario(true);
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    cargarNotificaciones(); // Para refrescar después de enviar
  };

  return (
    <div style={{ backgroundColor: '#fff5e6', padding: '2rem', borderRadius: '12px' }}>
      <h2 style={{ color: '#d35400' }}>🔔 Notificaciones</h2>

      {!mostrarFormulario && (
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
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#ffe0b2' }}>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {notificaciones.map(n => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>{n.nombres}</td>
                <td>{n.apellidos}</td>
                <td>{n.mensaje}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Notificaciones;
