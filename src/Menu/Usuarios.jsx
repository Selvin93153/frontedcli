import { useState } from 'react';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Ana Pérez', correo: 'ana@correo.com', rol: 'admin' }
  ]);

  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    rol: ''
  });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: formulario.nombre,
      correo: formulario.correo,
      rol: formulario.rol
    };
    setUsuarios([...usuarios, nuevoUsuario]);
    setFormulario({ nombre: '', correo: '', contrasena: '', rol: '' });
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
      <h2 style={{ color: '#0c63e4' }}>👥 Usuarios</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input name="nombre" value={formulario.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="correo" value={formulario.correo} onChange={handleChange} placeholder="Correo" required />
        <input name="contrasena" value={formulario.contrasena} onChange={handleChange} placeholder="Contraseña" type="password" required />
        <input name="rol" value={formulario.rol} onChange={handleChange} placeholder="Rol" required />
        <button type="submit" style={{ backgroundColor: '#0c63e4', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>
          Agregar
        </button>
      </form>

      <h3>Lista de Usuarios</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0efff' }}>
            <th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.nombre}</td><td>{u.correo}</td><td>{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
