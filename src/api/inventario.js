import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getInventario = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/inventario`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    throw error;
  }
};

export const createInventario = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/inventario`, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear inventario:', error);
    throw error;
  }
};

export const updateInventario = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/api/inventario/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar inventario:', error);
    throw error;
  }
};
