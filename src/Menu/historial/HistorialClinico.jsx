// src/pages/HistorialClinico.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getHistorialClinico } from '../../api/historialClinico';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jsPDF } from 'jspdf';

function HistorialClinico() {
  const [historiales, setHistoriales] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [formulario, setFormulario] = useState({
    id_paciente: '',
    diagnostico: '',
    tratamiento: '',
    fecha_registro: '',
    nombres: '',
    apellidos: ''
  });

  useEffect(() => {
    getHistorialClinico()
      .then(data => {
        const adaptados = Array.isArray(data)
          ? data.map(h => ({
              id: h.id_historial,
              diagnostico: h.diagnostico,
              tratamiento: h.tratamiento,
              fecha: new Date(h.fecha_registro).toLocaleString(),
              nombres: h.paciente?.usuario?.nombres || '',
              apellidos: h.paciente?.usuario?.apellidos || '',
              telefono: h.paciente?.telefono || 'No disponible'
            }))
          : [];
        setHistoriales(adaptados);
      })
      .catch(error => console.error('Error al cargar historial clínico:', error));

    axios.get('https://backend-clinica-j1pc.onrender.com/api/pacientes')
      .then(res => setPacientes(res.data))
      .catch(err => console.error('Error al cargar pacientes:', err));
  }, []);

  const handlePacienteChange = (e) => {
    const id = e.target.value;
    const pacienteSeleccionado = pacientes.find(p => p.id_paciente.toString() === id);
    setFormulario({
      ...formulario,
      id_paciente: id,
      nombres: pacienteSeleccionado?.usuario?.nombres || '',
      apellidos: pacienteSeleccionado?.usuario?.apellidos || ''
    });
  };

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id_paciente, diagnostico, tratamiento, fecha_registro } = formulario;

    try {
      await axios.post('https://backend-clinica-j1pc.onrender.com/api/historial-clinico', {
        id_paciente: parseInt(id_paciente),
        diagnostico,
        tratamiento,
        fecha_registro
      });

      alert('✅ Historial clínico guardado correctamente');

      setFormulario({
        id_paciente: '',
        diagnostico: '',
        tratamiento: '',
        fecha_registro: '',
        nombres: '',
        apellidos: ''
      });

      const data = await getHistorialClinico();
      const adaptados = data.map(h => ({
        id: h.id_historial,
        diagnostico: h.diagnostico,
        tratamiento: h.tratamiento,
        fecha: new Date(h.fecha_registro).toLocaleString(),
        nombres: h.paciente?.usuario?.nombres || '',
        apellidos: h.paciente?.usuario?.apellidos || '',
        telefono: h.paciente?.telefono || 'No disponible'
      }));
      setHistoriales(adaptados);
    } catch (error) {
      console.error('❌ Error al guardar historial:', error);
      alert('Error al guardar historial clínico');
    }
  };

  const imprimirPDF = (historial) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor('#0d6efd');
    doc.text('🩺 Historial Clínico', 105, 20, null, null, 'center');

    doc.setDrawColor(13, 110, 253);
    doc.setLineWidth(0.5);
    doc.line(15, 25, 195, 25);

    doc.setFontSize(12);
    doc.setTextColor('#212529');

    let posY = 40;
    const saltoLinea = 10;

    doc.text(`Nombre: ${historial.nombres} ${historial.apellidos}`, 15, posY);
    posY += saltoLinea;
    doc.text(`Teléfono: ${historial.telefono}`, 15, posY);
    posY += saltoLinea;

    doc.text('Diagnóstico:', 15, posY);
    posY += saltoLinea;
    doc.text(historial.diagnostico, 25, posY);
    posY += saltoLinea * 2;

    doc.text('Tratamiento:', 15, posY);
    posY += saltoLinea;
    doc.text(historial.tratamiento, 25, posY);
    posY += saltoLinea * 2;

    doc.text(`Fecha de registro: ${historial.fecha}`, 15, posY);
    posY += saltoLinea;

    doc.setDrawColor(13, 110, 253);
    doc.line(15, posY + 5, 195, posY + 5);

    doc.setFontSize(10);
    doc.setTextColor('#6c757d');
    doc.text('Sistema de Gestión Clínica', 15, 285, null, null, 'left');
    doc.text(`Generado: ${new Date().toLocaleString()}`, 195, 285, null, null, 'right');

    doc.save(`HistorialClinico_${historial.id}.pdf`);
  };

  return (
    <div className="container mt-4 p-4 bg-light rounded shadow-sm">
      <h2 className="text-primary mb-4">🩺 Registro de Historial Clínico</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">👤 Paciente:</label>
          <select
            className="form-select"
            value={formulario.id_paciente}
            onChange={handlePacienteChange}
            required
          >
            <option value="">-- Seleccione un paciente --</option>
            {pacientes.map(p => (
              <option key={p.id_paciente} value={p.id_paciente}>
                {p.usuario?.nombres} {p.usuario?.apellidos}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">🧾 Nombres:</label>
          <input
            type="text"
            className="form-control"
            value={formulario.nombres}
            readOnly
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">🧾 Apellidos:</label>
          <input
            type="text"
            className="form-control"
            value={formulario.apellidos}
            readOnly
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">📋 Diagnóstico:</label>
          <input
            name="diagnostico"
            value={formulario.diagnostico}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">💊 Tratamiento:</label>
          <input
            name="tratamiento"
            value={formulario.tratamiento}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">📅 Fecha de Registro:</label>
          <input
            type="datetime-local"
            name="fecha_registro"
            value={formulario.fecha_registro}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-12 d-grid">
          <button className="btn btn-primary" type="submit">💾 Guardar Historial</button>
        </div>
      </form>

      <h4 className="mt-4">📚 Lista de Historiales</h4>
      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Diagnóstico</th>
            <th>Tratamiento</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {historiales.map(h => (
            <tr key={h.id}>
              <td>{h.nombres}</td>
              <td>{h.apellidos}</td>
              <td>{h.telefono}</td>
              <td>{h.diagnostico}</td>
              <td>{h.tratamiento}</td>
              <td>{h.fecha}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => imprimirPDF(h)}
                >
                  🖨️ Imprimir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistorialClinico;
