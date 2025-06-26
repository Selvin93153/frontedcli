import React, { useEffect, useState } from 'react';
import { getPacientes, deletePaciente } from '../../api/pacientes';
import FormPaciente from './FormPaciente';

function Pacientes({ usuario }) {
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (![2, 3, 4].includes(usuario.rol.id_rol)) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h4 className="text-muted">⚠️ No tienes permiso para ver este módulo.</h4>
      </div>
    );
  }

  const fetchPacientes = async () => {
    try {
      const data = await getPacientes();
      setPacientes(data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleEdit = (paciente) => {
    setSelectedPaciente(paciente);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar este paciente?');
    if (confirmacion) {
      try {
        await deletePaciente(id);
        fetchPacientes();
      } catch (error) {
        console.error('Error al eliminar paciente:', error);
      }
    }
  };

  const handleNew = () => {
    setSelectedPaciente(null);
    setShowForm(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👨‍⚕️ Pacientes</h2>
      <button onClick={handleNew} style={styles.newButton}>+ Nuevo Paciente</button>

      {showForm && (
        <FormPaciente
          selectedPaciente={selectedPaciente}
          onSuccess={() => {
            setShowForm(false);
            fetchPacientes();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th>👤 Nombre Completo</th>
            <th>🎂 Fecha de Nacimiento</th>
            <th>📍 Dirección</th>
            <th>📞 Teléfono</th>
            <th>✏️ Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id_paciente}>
              <td>{p.usuario?.nombres} {p.usuario?.apellidos}</td>
              <td>{p.fecha_nac}</td>
              <td>{p.direccion}</td>
              <td>{p.telefono}</td>
              <td>
                <button onClick={() => handleEdit(p)} style={styles.editButton}>
                  Editar
                </button>
                </td>
                <td>
                <button onClick={() => handleDelete(p.id_paciente)} style={styles.deleteButton}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '1000px',
    margin: 'auto',
    marginTop: '2rem',
  },
  title: {
    color: '#007bff',
    marginBottom: '1rem',
    fontSize: '24px',
  },
  newButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  editButton: {
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '8px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default Pacientes;
