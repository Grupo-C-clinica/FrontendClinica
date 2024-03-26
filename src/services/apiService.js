import axios from 'axios';

const API_URL = 'http://localhost:8090/api/v1/paciente'; 

export const fetchPacientes = async (pagina = 1) => {
  try {
    const response = await axios.get(`${API_URL}/all?page=${pagina}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes:', error);
    throw error;
  }
};
