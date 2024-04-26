import axios from 'axios';
import { error } from 'pdf-lib';

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
    try {
      // Asegúrate de enviar un array, incluso si solo estás enviando un objeto
      const response = await axios.post(`${API_URL}/alergia/${idPaciente}`, [alergiaData]);
      return response.data;
    } catch (error) {
      console.error('Error adding alergia:', error);
      throw error;
    }
  };

export const listHistorialByPaciente = async (idPaciente) =>{
  try{
    const response = await axios.get(`${API_URL}/historial/${idPaciente}`);
    return response.data;
  }catch(error){
    console.error("Error en la lista de historiales por paciente" , error);
    throw error; 
  }
};

// Añadir esta nueva función para enviar pacientes
// apiService.js
/*export const addPaciente = async (pacienteData) => {
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
};*/
export const fetchHistorialByPaciente = async (idPaciente) => {
  try {
    const response = await axios.get(`http://localhost:8805/api/v1/historial/${idPaciente}`);
    // Asegúrate de acceder a `response.data.data`, ya que tu backend envuelve los datos en un objeto con `code`, `data` y `message`.
    return response.data.data;
  } catch (error) {
    console.error('Error fetching historial by paciente:', error);
    throw error;
  }
};
export const updatePaciente = async (idPaciente, pacienteData) => {
  console.log("Datos enviados para actualizar:", pacienteData);
  try {
    const response = await axios.put(`${API_URL}/paciente/${idPaciente}`, pacienteData);
    console.log("Respuesta de actualización:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating paciente:', error.response ? error.response.data : error);
    throw error;
  }
};

export const addHistorialToPaciente = async (idPaciente, historialData) => {
  try{
    const response = await axios.post(`${API_URL}/historial/agregar/${idPaciente}`, historialData);
    return response.data;
  }catch{
    console.error('Error al añadir historial: ', error);
    throw error;
  }
};

export const fetchCitasByFecha = async (fecha) => {
  try{
    const response = await axios.get(`${API_URL}/cita/all/${fecha}`);
    return response.data;
  }catch (error) {
    console.error("Error fetching citas by fecha", error);
    throw error;
  }
}

export const addCita = async (pacienteId, citaData) => {
  try {
    const response = await axios.post(`${API_URL}/cita/create/${pacienteId}`, citaData);
    return response.data;
  } catch (error) {
    console.error('Error adding cita:', error);
    throw error;
  }
};