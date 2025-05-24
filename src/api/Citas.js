import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const getCitas = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/citas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    throw error;
  }
};

export const createCita = async (citaData) => {
  try {
    const response = await axios.post(`${API_URL}/api/citas`, citaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la cita:', error);
    throw error;
  }
};

export const getPacientes = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/pacientes`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    throw error;
  }
};

export const getMedicos = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/medicos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener médicos:', error);
    throw error;
  }
};
