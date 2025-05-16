import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getCitas = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/citas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    throw error;
  }
};
