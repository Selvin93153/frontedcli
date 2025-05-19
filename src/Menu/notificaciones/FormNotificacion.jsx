// src/components/FormNotificacion.jsx
import React, { useEffect, useState } from 'react';
import { createNotificacion } from '../../api/notificaciones';
import { getUsuarios } from '../../api/usuarios';

function FormNotificacion({ onSuccess }) {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: '',
    nombres: '',
    apellidos: '',
    mensaje: ''
  });

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

  const handleUsuarioSelect = (e) => {
    const selectedId = parseInt(e.target.value);
    const usuario = usuarios.find(u => u.id_usuario === selectedId);
    setFormData(prev => ({
      ...prev,
      id_usuario: selectedId,
      nombres: usuario?.nombres || '',
      apellidos: usuario?.apellidos || ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNotificacion({
        id_usuario: formData.id_usuario,
        mensaje: formData.mensaje
      });
      onSuccess();
    } catch (error) {
      console.error('Error al crear notificación:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Crear Notificación</h3>

      <label style={styles.label}>Seleccionar Usuario:</label>
      <select name="id_usuario" value={formData.id_usuario} onChange={handleUsuarioSelect} required style={styles.select}>
        <option value="">Seleccione un usuario</option>
        {usuarios.map((u) => (
          <option key={u.id_usuario} value={u.id_usuario}>
            {u.nombres} {u.apellidos}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="nombres"
        value={formData.nombres}
        placeholder="Nombres"
        readOnly
        style={styles.input}
      />

      <input
        type="text"
        name="apellidos"
        value={formData.apellidos}
        placeholder="Apellidos"
        readOnly
        style={styles.input}
      />

      <textarea
        name="mensaje"
        placeholder="Mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        required
        style={styles.textarea}
      />

      <button type="submit" style={styles.button}>Enviar Notificación</button>
    </form>
  );
}

const styles = {
  form: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '500px',
    margin: '0 auto',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
    marginTop: '10px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    height: '100px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default FormNotificacion;
