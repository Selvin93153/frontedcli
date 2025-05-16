// src/pages/Citas.jsx

import React, { useEffect, useState } from 'react';
import { getCitas } from '../api/Citas.js';

function Citas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    getCitas()
      .then(data => {
        const adaptadas = Array.isArray(data)
          ? data.map(cita => ({
              id: cita.id_cita,
              fecha: cita.fecha,
              hora: cita.hora,
              estado: cita.estado,
              pacienteNombre: cita.paciente?.usuario?.nombres || '',
              pacienteApellido: cita.paciente?.usuario?.apellidos || '',
              medicoNombre: cita.medico?.usuario?.nombres || '',
              medicoApellido: cita.medico?.usuario?.apellidos || '',
              especialidad: cita.medico?.especialidad || ''
            }))
          : [];
        setCitas(adaptadas);
      })
      .catch(err => console.error('Error cargando citas:', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#f0f8ff', padding: '2rem', borderRadius: '12px' }}>
      <h2 style={{ color: '#0c63e4' }}>📅 Lista de Citas</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead style={{ backgroundColor: '#e0efff' }}>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.id}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.estado}</td>
              <td>{`${cita.pacienteNombre} ${cita.pacienteApellido}`}</td>
              <td>{`${cita.medicoNombre} ${cita.medicoApellido}`}</td>
              <td>{cita.especialidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Citas;
