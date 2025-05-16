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
