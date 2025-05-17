import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getPacientes = async () => {
  const res = await axios.get(`${API_URL}/api/pacientes`);
  return res.data;
};

export const createPaciente = async (data) => {
  const res = await axios.post(`${API_URL}/api/pacientes`, data);
  return res.data;
};

export const updatePaciente = async (id_paciente, data) => {
  try {
    console.log("Datos enviados al servidor:", data); // ← Log para depuración
    const response = await axios.put(`${API_URL}/api/pacientes/${id_paciente}`, data); // CAMBIADO de patch a put
    return response.data;
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    throw error;
  }
};