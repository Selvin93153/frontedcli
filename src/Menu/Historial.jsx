import { useState } from 'react';

function Historial() {
  const [historiales, setHistoriales] = useState([
    {
      id: 1,
      paciente: 'María López',
      diagnostico: 'Gripe común',
      tratamiento: 'Paracetamol 500mg',
      notas: 'Revisión en 7 días'
    }
  ]);

  const [formulario, setFormulario] = useState({
    paciente: '',
    diagnostico: '',
    tratamiento: '',
    notas: ''
  });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoHistorial = {
      id: historiales.length + 1,
      ...formulario
    };
    setHistoriales([...historiales, nuevoHistorial]);
    setFormulario({ paciente: '', diagnostico: '', tratamiento: '', notas: '' });
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
      <h2 style={{ color: '#0c63e4' }}>📁 Historial Clínico</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input name="paciente" value={formulario.paciente} onChange={handleChange} placeholder="Nombre del paciente" required />
        <input name="diagnostico" value={formulario.diagnostico} onChange={handleChange} placeholder="Diagnóstico" required />
        <input name="tratamiento" value={formulario.tratamiento} onChange={handleChange} placeholder="Tratamiento" required />
        <input name="notas" value={formulario.notas} onChange={handleChange} placeholder="Notas (opcional)" />
        <button type="submit" style={{ backgroundColor: '#0c63e4', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>
          Guardar
        </button>
      </form>

      <h3>Registros del Paciente</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0efff' }}>
            <th>ID</th><th>Paciente</th><th>Diagnóstico</th><th>Tratamiento</th><th>Notas</th>
          </tr>
        </thead>
        <tbody>
          {historiales.map((h) => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.paciente}</td>
              <td>{h.diagnostico}</td>
              <td>{h.tratamiento}</td>
              <td>{h.notas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Historial;
