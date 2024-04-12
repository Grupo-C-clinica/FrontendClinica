import axios from 'axios';

const API_URL = 'http://localhost:8090/api/v1';

export const fetchPacientesPaginated = async (page, pageSize) => {
  const params = { page, size: pageSize };
  console.log("Sending params:", params);  // Agrega esta línea para ver qué estás enviando
  try {
    const response = await axios.get(`${API_URL}/paciente/all`, { params });
    console.log("Received data:", response.data);  // Ver la respuesta completa
    return response.data;
  } catch (error) {
    console.error('Error fetching paginated pacientes:', error);
    throw error;
  }
};

export const fetchPacientesByName = async (nombre) => {
  try {
    const response = await axios.get(`${API_URL}/paciente/nombre`, { params: { nombre } });
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

export const fetchPacientesByStatus = async (estado, page, pageSize) => {
  try {
    const params = {
      page: page,
      size: pageSize
    };
    const response = await axios.get(`${API_URL}/paciente/estado/${estado}`, { params });
    console.log(`Fetching status: ${estado} with page: ${page} and size: ${pageSize}, Received data:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes by status:', error);
    throw error;
  }
};

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

// Añadir esta nueva función para enviar alergias
export const addAlergiaToPaciente = async (idPaciente, alergiaData) => {
<<<<<<< HEAD
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
        ci: 123,
        idZona: parseInt(pacienteData.idZona, 10),
        status: pacienteData.status === 'true',
      });
      return response.data;
    } catch (error) {
      console.error('Error adding paciente:', error);
      throw error;
    }
};
=======
  try {
    // Asegúrate de enviar un array, incluso si solo estás enviando un objeto
    const response = await axios.post(`${API_URL}/alergia/${idPaciente}`, [alergiaData]);
    return response.data;
  } catch (error) {
    console.error('Error adding alergia:', error);
    throw error;
  }
};
>>>>>>> 1e6082bd8f26f514030adbaa5fb68dc4ad588ba7
