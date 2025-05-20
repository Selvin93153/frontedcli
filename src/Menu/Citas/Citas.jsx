// src/pages/Citas.jsx

import React, { useEffect, useState } from 'react';
import { getCitas } from '../../api/Citas.js';
import FormCitas from '../Citas/FormCitas.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Citas() {
  const [citas, setCitas] = useState([]);

  const cargarCitas = () => {
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
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-4">🩺 Gestión de Citas</h1>

      <div className="card shadow mb-5">
        <div className="card-header bg-info text-white">
          <h4 className="mb-0">➕ Crear Nueva Cita</h4>
        </div>
        <div className="card-body">
          <FormCitas onCitaCreada={cargarCitas} />
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">📅 Lista de Citas Registradas</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered align-middle">
              <thead className="table-light text-center">
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
              <tbody className="text-center">
                {citas.map((cita) => (
                  <tr key={cita.id}>
                    <td>{cita.id}</td>
                    <td>{cita.fecha}</td>
                    <td>{cita.hora}</td>
                    <td>
                      <span className={`badge ${
                        cita.estado === 'pendiente' ? 'bg-warning text-dark' :
                        cita.estado === 'completada' ? 'bg-success' :
                        'bg-danger'
                      }`}>
                        {cita.estado}
                      </span>
                    </td>
                    <td>{`${cita.pacienteNombre} ${cita.pacienteApellido}`}</td>
                    <td>{`${cita.medicoNombre} ${cita.medicoApellido}`}</td>
                    <td>{cita.especialidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Citas;
