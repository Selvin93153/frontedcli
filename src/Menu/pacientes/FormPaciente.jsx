// src/Menu/pacientes/FormPaciente.jsx
import React, { useEffect, useState } from 'react';
import { createPaciente, updatePaciente } from '../../api/pacientes';
import { getUsuarios } from '../../api/usuarios';

function FormPaciente({ selectedPaciente, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    id_usuario: '',
    fecha_nac: '',
    direccion: '',
    telefono: ''
  });

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    if (selectedPaciente) {
      setFormData({
        id_usuario: selectedPaciente.id_usuario,
        fecha_nac: selectedPaciente.fecha_nac,
        direccion: selectedPaciente.direccion,
        telefono: selectedPaciente.telefono
      });
    }
  }, [selectedPaciente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPaciente) {
        // Solo se actualizan los campos permitidos
        await updatePaciente(selectedPaciente.id_paciente, {
          fecha_nac: formData.fecha_nac,
          direccion: formData.direccion,
          telefono: formData.telefono
        });
      } else {
        await createPaciente(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error al guardar paciente:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>
        {selectedPaciente ? '✏️ Editar Paciente' : '➕ Nuevo Paciente'}
      </h3>

      {!selectedPaciente && (
        <select
          name="id_usuario"
          value={formData.id_usuario}
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Seleccione un usuario</option>
          {usuarios.map((u) => (
            <option key={u.id_usuario} value={u.id_usuario}>
              {u.nombres} {u.apellidos}
            </option>
          ))}
        </select>
      )}

      <input
        type="date"
        name="fecha_nac"
        value={formData.fecha_nac}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <div style={styles.buttons}>
        <button type="submit" style={styles.submitButton}>
          {selectedPaciente ? 'Guardar Cambios' : 'Crear Paciente'}
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: '#f1f5f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    maxWidth: '450px',
    marginBottom: '1.5rem'
  },
  title: {
    marginBottom: '15px',
    color: '#0c63e4'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px'
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default FormPaciente;
