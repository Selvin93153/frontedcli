import React, { useEffect, useState } from 'react';
import { getHistorialClinico } from '../api/historialClinico';

function HistorialClinico() {
  const [historiales, setHistoriales] = useState([]);
  const [formulario, setFormulario] = useState({
    id_paciente: '',
    diagnostico: '',
    tratamiento: '',
    fecha_registro: ''
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
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías hacer el POST real a tu API, pero para ejemplo temporal:
    const nuevo = {
      id: historiales.length + 1,
      diagnostico: formulario.diagnostico,
      tratamiento: formulario.tratamiento,
      fecha: new Date(formulario.fecha_registro).toLocaleString(),
      nombres: 'Nombre',
      apellidos: 'Apellido',
      telefono: 'N/A'
    };
    setHistoriales([...historiales, nuevo]);
    setFormulario({
      id_paciente: '',
      diagnostico: '',
      tratamiento: '',
      fecha_registro: ''
    });
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
      <h2 style={{ color: '#0c63e4' }}>🩺 Historial Clínico</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          name="id_paciente"
          value={formulario.id_paciente}
          onChange={handleChange}
          placeholder="ID Paciente"
          required
          type="number"
        />
        <input
          name="diagnostico"
          value={formulario.diagnostico}
          onChange={handleChange}
          placeholder="Diagnóstico"
          required
        />
        <input
          name="tratamiento"
          value={formulario.tratamiento}
          onChange={handleChange}
          placeholder="Tratamiento"
          required
        />
        <input
          name="fecha_registro"
          value={formulario.fecha_registro}
          onChange={handleChange}
          placeholder="Fecha (YYYY-MM-DD HH:MM:SS)"
          required
        />
        <button
          type="submit"
          style={{ backgroundColor: '#0c63e4', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}
        >
          Agregar
        </button>
      </form>

      <h3>Lista de Historiales</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0efff' }}>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Diagnóstico</th>
            <th>Tratamiento</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {historiales.map(h => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.nombres}</td>
              <td>{h.apellidos}</td>
              <td>{h.telefono}</td>
              <td>{h.diagnostico}</td>
              <td>{h.tratamiento}</td>
              <td>{h.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistorialClinico;
