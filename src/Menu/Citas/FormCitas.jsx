import React, { useEffect, useState } from 'react';
import { getPacientes, getMedicos, getCitas, createCita } from '../../api/Citas';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormCitas = ({ onCitaCreada }) => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [idPaciente, setIdPaciente] = useState('');
  const [idMedico, setIdMedico] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [citasExistentes, setCitasExistentes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientesData, medicosData, citasData] = await Promise.all([
          getPacientes(),
          getMedicos(),
          getCitas(),
        ]);
        setPacientes(pacientesData);
        setMedicos(medicosData);
        setCitasExistentes(citasData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (idMedico) {
      const medicoSeleccionado = medicos.find(m => m.id_medico === parseInt(idMedico));
      setEspecialidad(medicoSeleccionado?.especialidad || '');
    } else {
      setEspecialidad('');
    }
  }, [idMedico, medicos]);

  const citaDuplicada = () => {
    if (!fecha || !hora || !idMedico) return false;
    return citasExistentes.some(cita =>
      cita.medico.id_medico === parseInt(idMedico) &&
      cita.fecha === fecha &&
      cita.hora === hora
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (citaDuplicada()) {
      alert('❌ Ya existe una cita para ese médico en la fecha y hora seleccionadas.');
      return;
    }

    const nuevaCita = {
      fecha,
      hora,
      estado,
      id_paciente: parseInt(idPaciente),
      id_medico: parseInt(idMedico),
    };

    try {
      await createCita(nuevaCita);
      alert('✅ Cita registrada correctamente');
      setFecha('');
      setHora('');
      setEstado('pendiente');
      setIdPaciente('');
      setIdMedico('');
      setEspecialidad('');
      if (onCitaCreada) onCitaCreada();

      // Actualizar citas existentes para mantener la validación actualizada
      const citasData = await getCitas();
      setCitasExistentes(citasData);
    } catch (err) {
      console.error('Error al registrar cita', err);
      if (err.response?.data?.message) {
        alert(`❌ ${err.response.data.message}`);
      } else {
        alert('❌ Error al registrar la cita');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">📅 Fecha:</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
  <label className="form-label">⏰ Hora (08:00 - 17:00):</label>
  <select
    className="form-select"
    value={hora}
    onChange={(e) => setHora(e.target.value)}
    required
  >
    <option value="">-- Seleccione una hora --</option>
    {Array.from({ length: 10 }, (_, i) => {
      const hour = 8 + i;
      const hourStr = hour.toString().padStart(2, '0');
      return (
        <option key={hourStr} value={`${hourStr}:00`}>
          {hourStr}:00
        </option>
      );
    })}
  </select>
</div>

        <div className="col-md-6">
          <label className="form-label">👤 Paciente:</label>
          <select
            className="form-select"
            value={idPaciente}
            onChange={(e) => setIdPaciente(e.target.value)}
            required
          >
            <option value="">-- Seleccione un paciente --</option>
            {pacientes.map((p) => (
              <option key={p.id_paciente} value={p.id_paciente}>
                {p.usuario?.nombres} {p.usuario?.apellidos}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">🩺 Médico:</label>
          <select
            className="form-select"
            value={idMedico}
            onChange={(e) => setIdMedico(e.target.value)}
            required
          >
            <option value="">-- Seleccione un médico --</option>
            {medicos.map((m) => (
              <option key={m.id_medico} value={m.id_medico}>
                Dr(a). {m.usuario?.nombres} {m.usuario?.apellidos}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">📚 Especialidad:</label>
          <input
            type="text"
            className="form-control"
            value={especialidad}
            readOnly
            disabled
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">📌 Estado:</label>
          <select
            className="form-select"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div className="col-12 d-grid mt-4">
          <button type="submit" className="btn btn-success">
            💾 Guardar Cita
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormCitas;
