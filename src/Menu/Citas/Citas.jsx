import React, { useEffect, useState } from 'react';
import { getCitas } from '../../api/Citas';
import FormCitas from '../Citas/FormCitas.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Citas() {
  const [citas, setCitas] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      setUsuario(user);
    }
  }, []);

  const cargarCitas = async () => {
    try {
      const data = await getCitas();

      let citasFiltradas = data;

      if (usuario?.rol?.id_rol === 1) {
        // Si es paciente, filtrar por su id_usuario
        citasFiltradas = data.filter(cita =>
          cita.paciente?.usuario?.id_usuario === usuario.id
        );
      }

      const adaptadas = citasFiltradas.map(cita => ({
        id: cita.id_cita,
        fecha: cita.fecha,
        hora: cita.hora,
        estado: cita.estado,
        pacienteNombre: cita.paciente?.usuario?.nombres || '',
        pacienteApellido: cita.paciente?.usuario?.apellidos || '',
        medicoNombre: cita.medico?.usuario?.nombres || '',
        medicoApellido: cita.medico?.usuario?.apellidos || '',
        especialidad: cita.medico?.especialidad || ''
      }));

      setCitas(adaptadas);
    } catch (error) {
      console.error('Error al cargar citas:', error);
    }
  };

  useEffect(() => {
    if (usuario) {
      cargarCitas();
    }
  }, [usuario]);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-4">📅 Citas Médicas</h1>

      {usuario?.rol?.id_rol !== 1 && (
        <div className="card shadow mb-5">
          <div className="card-header bg-success text-white">
            <h4 className="mb-0">Crear Nueva Cita</h4>
          </div>
          <div className="card-body">
            <FormCitas onCitaCreada={cargarCitas} />
          </div>
        </div>
      )}

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Listado de Citas</h4>
        </div>
        <div className="card-body">
          <table className="table table-hover table-striped text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                {usuario?.rol?.id_rol !== 1 && <th>Paciente</th>}
                <th>Médico</th>
                <th>Especialidad</th>
              </tr>
            </thead>
            <tbody>
              {citas.map(cita => (
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
                  {usuario?.rol?.id_rol !== 1 && (
                    <td>{cita.pacienteNombre} {cita.pacienteApellido}</td>
                  )}
                  <td>{cita.medicoNombre} {cita.medicoApellido}</td>
                  <td>{cita.especialidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Citas;
