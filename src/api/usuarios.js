import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/usuarios`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUsuario = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/usuarios`, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Actualizar un usuario existente (PATCH)
export const updateUsuario = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/api/usuarios/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};
