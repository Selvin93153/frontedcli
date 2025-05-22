// src/api/notificaciones.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getNotificaciones = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/notificaciones`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    throw error;
  }
};

export const createNotificacion = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/notificaciones`, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear notificación:', error);
    throw error;
  }
};

// Estas funciones son opcionales, pero útiles para una gestión completa:
export const deleteNotificacion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/notificaciones/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar notificación:', error);
    throw error;
  }
};

export const updateNotificacion = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/api/notificaciones/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar notificación:', error);
    throw error;
  }
};

export const marcarComoLeida = async (id) => {
  const res = await fetch(`http://localhost:4000/api/notificaciones/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ leida: true }),
  });

  if (!res.ok) throw new Error('Error al marcar como leída');

  return res.json();
};
