import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/usuarios`); // agregué /api aquí
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};
