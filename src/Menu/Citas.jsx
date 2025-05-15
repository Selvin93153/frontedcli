import { useState } from 'react';

function Citas() {
  const [citas, setCitas] = useState([
    { id: 1, paciente: 'Luis Ramírez', fecha: '2025-05-20', hora: '10:00', motivo: 'Consulta general' }
  ]);

  const [formulario, setFormulario] = useState({
    paciente: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaCita = {
      id: citas.length + 1,
      ...formulario
    };
    setCitas([...citas, nuevaCita]);
    setFormulario({ paciente: '', fecha: '', hora: '', motivo: '' });
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
      <h2 style={{ color: '#0c63e4' }}>📅 Citas Médicas</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input name="paciente" value={formulario.paciente} onChange={handleChange} placeholder="Nombre del paciente" required />
        <input type="date" name="fecha" value={formulario.fecha} onChange={handleChange} required />
        <input type="time" name="hora" value={formulario.hora} onChange={handleChange} required />
        <input name="motivo" value={formulario.motivo} onChange={handleChange} placeholder="Motivo" required />
        <button type="submit" style={{ backgroundColor: '#0c63e4', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>
          Registrar
        </button>
      </form>

      <h3>Listado de Citas</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0efff' }}>
            <th>ID</th><th>Paciente</th><th>Fecha</th><th>Hora</th><th>Motivo</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.id}</td><td>{cita.paciente}</td><td>{cita.fecha}</td><td>{cita.hora}</td><td>{cita.motivo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Citas;
