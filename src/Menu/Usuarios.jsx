import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../api/usuarios';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState({
    nombres: '',
    apellidos: '',
    correo: ''
  });

  useEffect(() => {
    getUsuarios()
      .then(data => {
        console.log('data:', data); // Verifica que viene el campo rol
        const usuariosAdaptados = Array.isArray(data)
          ? data.map(u => ({
              id: u.id_usuario,
              nombre: `${u.nombres} ${u.apellidos}`,
              correo: u.correo,
              rol: u.rol?.nombre || 'Sin rol' // Asegura que haya un nombre de rol
            }))
          : [];
        setUsuarios(usuariosAdaptados);
      })
      .catch(error => console.error('Error al cargar usuarios:', error));
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      id: usuarios.length + 1, // temporal
      nombre: `${formulario.nombres} ${formulario.apellidos}`,
      correo: formulario.correo,
      rol: 'Sin rol' // Por defecto si no hay selección de rol
    };
    setUsuarios([...usuarios, nuevoUsuario]);
    setFormulario({ nombres: '', apellidos: '', correo: '' });
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
      <h2 style={{ color: '#0c63e4' }}>👥 Usuarios</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          name="nombres"
          value={formulario.nombres}
          onChange={handleChange}
          placeholder="Nombres"
          required
        />
        <input
          name="apellidos"
          value={formulario.apellidos}
          onChange={handleChange}
          placeholder="Apellidos"
          required
        />
        <input
          name="correo"
          value={formulario.correo}
          onChange={handleChange}
          placeholder="Correo"
          required
          type="email"
        />
        <button
          type="submit"
          style={{ backgroundColor: '#0c63e4', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}
        >
          Agregar
        </button>
      </form>

      <h3>Lista de Usuarios</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0efff' }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
