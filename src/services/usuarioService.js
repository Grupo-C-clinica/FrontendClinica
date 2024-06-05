import axios from 'axios';

//const API_URL = 'http://localhost:8805/api/v1';

const API_URL = 'https://bountiful-clarity-production.up.railway.app/api/v1';
export const fetchUsuarios = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    return [];
  }
};

export const createUsuario = async (usuarioData) => {
  try {
    const endpoint = `${API_URL}/auth/register/${usuarioData.rol.toLowerCase()}`;
    await axios.post(endpoint, usuarioData, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating usuario:', error);
  }
};

export const changeUsuarioStatus = async (userId, status, token) => {
  try {
    await axios.put(`${API_URL}/usuarios//change-status/${userId}`, { status }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Error changing usuario status:', error);
  }
};

export const updateUsuario = async (usuarioId, usuarioData) => {
  try {
    const response = await axios.put(`${API_URL}/usuarios/${usuarioData.rol.toLowerCase()}/${usuarioId}`, usuarioData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario', error);
    throw error;
  }
};