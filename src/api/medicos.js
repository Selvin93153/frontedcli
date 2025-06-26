import axios from 'axios';

const API = 'https://backend-clinica-j1pc.onrender.com/api/medicos';
const API_USUARIOS = 'https://backend-clinica-j1pc.onrender.com/api/usuarios';

export const getMedicos = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const getUsuariosMedicos = async () => {
  const response = await axios.get(`${API_USUARIOS}?rol=2`); // asumiendo que acepta filtro por rol
  return response.data;
};

export const createMedico = async (medicoData) => {
  const response = await axios.post(API, medicoData);
  return response.data;
};

export const updateMedico = async (id, data) => {
  const response = await axios.patch(`https://backend-clinica-j1pc.onrender.com/api/medicos/${id}`, data);
  return response.data;
};

