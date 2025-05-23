import axios from 'axios';

const API = 'http://localhost:4000/api/medicos';
const API_USUARIOS = 'http://localhost:4000/api/usuarios';

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
