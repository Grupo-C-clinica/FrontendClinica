import axios from 'axios';

const API_URL = 'http://localhost:8090/api/v1'; 

export const fetchPacientes = async (pagina = 1) => {
  try {
    const response = await axios.get(`${API_URL}/paciente/all?page=${pagina}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes:', error);
    throw error;
  }
};

// Añadir esta nueva función para enviar alergias
export const addAlergiaToPaciente = async (idPaciente, alergiaData) => {
    try {
      // Asegúrate de enviar un array, incluso si solo estás enviando un objeto
      const response = await axios.post(`${API_URL}/alergia/${idPaciente}`, [alergiaData]);
      return response.data;
    } catch (error) {
      console.error('Error adding alergia:', error);
      throw error;
    }
  };

// Añadir esta nueva función para enviar pacientes
export const addPaciente = async (pacienteData) => {
    try {
      const response = await axios.post(`${API_URL}/paciente/agregar`, pacienteData);
      return response.data;
    } catch (error) {
      console.error('Error adding paciente:', error);
      throw error;
    }
  };
