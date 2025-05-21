// src/api/auth.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (correo, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      correo,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al iniciar sesión'
    );
  }
};
