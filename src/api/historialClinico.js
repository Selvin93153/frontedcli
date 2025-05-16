import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getHistorialClinico = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/historial-clinico`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial clínico:', error);
    throw error;
  }
};
