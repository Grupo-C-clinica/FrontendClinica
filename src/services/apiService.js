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
export const fetchPacientesByName = async (nombre) => {
  try {
    const response = await axios.get(`${API_URL}/paciente/nombre/${nombre}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes by name:', error);
    throw error;
  }
};
export const fetchPacientesByFecha = async (fecha) => {
  try {
    const response = await axios.get(`${API_URL}/paciente/fecha/${fecha}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes by fecha:', error);
    throw error;
  }
};

export const fetchPacientesByStatus = async (estado) => {
  try {
    const response = await axios.get(`${API_URL}/paciente/estado/${estado}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes by status:', error);
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
// apiService.js
export const addPaciente = async (pacienteData) => {
    try {
      const response = await axios.post(`${API_URL}/paciente/agregar`, {
        ...pacienteData,
        telefono: parseInt(pacienteData.telefono, 10),
        CI: pacienteData.CI,
        idZona: parseInt(pacienteData.idZona, 10),
        status: pacienteData.status === 'true',
      });
      return response.data;
    } catch (error) {
      console.error('Error adding paciente:', error);
      throw error;
    }
};
