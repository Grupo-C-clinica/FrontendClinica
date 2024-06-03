import axios from 'axios';

const API_URL = 'http://localhost:8805/api/v1/usuarios';
//const API_URL = 'https://bountiful-clarity-production.up.railway.app/api/v1';

export const fetchUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    return [];
  }
};

export const createUsuario = async (usuarioData) => {
  try {
    await axios.post(`${API_URL}/create`, usuarioData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating usuario:', error);
  }
};
