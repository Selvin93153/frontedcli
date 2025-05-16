// src/components/Notificaciones.jsx

import React, { useEffect, useState } from 'react';
import { getNotificaciones } from '../api/notificaciones';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    getNotificaciones()
      .then(data => {
        const adaptadas = Array.isArray(data)
          ? data.map(n => ({
              id: n.id_notificacion,
              mensaje: n.mensaje,
              nombres: n.usuario?.nombres || '',
              apellidos: n.usuario?.apellidos || ''
            }))
          : [];
        setNotificaciones(adaptadas);
      })
      .catch(error => console.error('Error al cargar notificaciones:', error));
  }, []);

  return (
    <div style={{ backgroundColor: '#fff5e6', padding: '2rem', borderRadius: '12px' }}>
      <h2 style={{ color: '#d35400' }}>🔔 Notificaciones</h2>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
    </div>
  );
}

export default Notificaciones;
