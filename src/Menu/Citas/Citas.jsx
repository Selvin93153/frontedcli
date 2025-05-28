import React, { useEffect, useState } from 'react';
import { getCitas, updateCita, deleteCita } from '../../api/Citas';
import FormCitas from '../Citas/FormCitas.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Citas() {
  const [citas, setCitas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

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

  const imprimirCitaPDF = (cita) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor('#0d6efd');
    doc.text('📅 Detalles de la Cita Médica', 14, 22);
    doc.setDrawColor(13, 110, 253);
    doc.setLineWidth(0.5);
    doc.line(14, 25, 196, 25);
    doc.setFontSize(12);
    doc.setTextColor('#212529');
    const startY = 35;
    const lineHeight = 10;

    doc.text(`ID Cita: ${cita.id}`, 14, startY);
    doc.text(`Fecha: ${cita.fecha}`, 14, startY + lineHeight);
    doc.text(`Hora: ${cita.hora}`, 14, startY + lineHeight * 2);
    doc.text(`Estado: ${cita.estado}`, 14, startY + lineHeight * 3);

    if (usuario?.rol?.id_rol !== 1) {
      doc.text(`Paciente: ${cita.pacienteNombre} ${cita.pacienteApellido}`, 14, startY + lineHeight * 4);
    }

    doc.text(`Médico: Dr(a). ${cita.medicoNombre} ${cita.medicoApellido}`, 14, startY + lineHeight * 5);
    doc.text(`Especialidad: ${cita.especialidad}`, 14, startY + lineHeight * 6);
    doc.setDrawColor(13, 110, 253);
    doc.line(14, startY + lineHeight * 7 + 2, 196, startY + lineHeight * 7 + 2);
    doc.setFontSize(10);
    doc.setTextColor('#6c757d');
    doc.text('Sistema de Gestión de Citas Médicas', 14, 285, null, null, 'left');
    doc.text(`Generado el: ${new Date().toLocaleString()}`, 196, 285, null, null, 'right');

    doc.save(`Cita_${cita.id}.pdf`);
  };

  const guardarEstado = async (id) => {
    try {
      const dataAEnviar = { estado: nuevoEstado };
      await updateCita(id, dataAEnviar);
      setEditandoId(null);
      setNuevoEstado('');
      cargarCitas();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const eliminarCita = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cita?')) {
      try {
        await deleteCita(id);
        cargarCitas();
      } catch (error) {
        console.error('Error al eliminar cita:', error);
      }
    }
  };

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
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                {usuario?.rol?.id_rol !== 1 && <th>Paciente</th>}
                <th>Médico</th>
                <th>Especialidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.map(cita => (
                <tr key={cita.id}>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>
                    {editandoId === cita.id ? (
                      <select
                        className="form-select"
                        value={nuevoEstado}
                        onChange={(e) => setNuevoEstado(e.target.value)}
                      >
                        <option value="pendiente">pendiente</option>
                        <option value="completada">completada</option>
                        <option value="cancelada">cancelada</option>
                      </select>
                    ) : (
                      <span className={`badge ${
                        cita.estado === 'pendiente' ? 'bg-warning text-dark' :
                        cita.estado === 'completada' ? 'bg-success' :
                        'bg-danger'
                      }`}>
                        {cita.estado}
                      </span>
                    )}
                  </td>
                  {usuario?.rol?.id_rol !== 1 && (
                    <td>{cita.pacienteNombre} {cita.pacienteApellido}</td>
                  )}
                  <td>{cita.medicoNombre} {cita.medicoApellido}</td>
                  <td>{cita.especialidad}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm me-1"
                      onClick={() => imprimirCitaPDF(cita)}
                    >
                      🖨️
                    </button>
                    {usuario?.rol?.id_rol !== 1 && (
                      <>
                        {editandoId === cita.id ? (
                          <button
                            className="btn btn-success btn-sm me-1"
                            onClick={() => guardarEstado(cita.id)}
                          >
                            Guardar
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning btn-sm me-1"
                            onClick={() => {
                              setEditandoId(cita.id);
                              setNuevoEstado(cita.estado);
                            }}
                          >
                            ✏️
                          </button>
                        )}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarCita(cita.id)}
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </td>
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
