import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../../api/usuarios';
import FormUsuario from '../usuarios/FormUsuario';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      const usuariosAdaptados = Array.isArray(data)
        ? data.map(u => ({
            id_usuario: u.id_usuario,
            nombres: u.nombres,
            apellidos: u.apellidos,
            correo: u.correo,
            id_rol: u.id_rol,
            rol: u.rol?.nombre || 'Sin rol'
          }))
        : [];
      setUsuarios(usuariosAdaptados);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleNew = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEdit = (usuario) => {
    setSelectedUser(usuario);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    fetchUsuarios();
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
      <h2 style={{ color: '#0c63e4' }}>👥 Usuarios</h2>

      <button
        onClick={handleNew}
        style={{ backgroundColor: '#198754', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', marginBottom: '1rem' }}
      >
        + Nuevo Usuario
      </button>

      {showForm && (
        <FormUsuario
          selectedUser={selectedUser}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      <h3>Lista de Usuarios</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0efff' }}>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id_usuario}>
              <td>{u.id_usuario}</td>
              <td>{u.nombres}</td>
              <td>{u.apellidos}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td>
                <button
                  onClick={() => handleEdit(u)}
                  style={{ backgroundColor: '#0d6efd', color: 'white', padding: '0.3rem 0.7rem', border: 'none', borderRadius: '5px' }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
