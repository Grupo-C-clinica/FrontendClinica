// services/multimediaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8805/api/v1/multimedia';
//const API_URL = 'https://bountiful-clarity-production.up.railway.app/api/v1';

export const fetchMultimedia = async (idHistorial) => {
  try {
    const response = await axios.get(`${API_URL}/all/${idHistorial}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching multimedia:', error);
    return [];
  }
};

export const createMultimedia = async (idHistorial, formData) => {
  try {
    await axios.post(`${API_URL}/create/${idHistorial}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error creating multimedia:', error);
  }
};
export const deleteMultimedia = async (idMultimedia) => {
  try {
    await axios.delete(`${API_URL}/delete/${idMultimedia}`);
  } catch (error) {
    console.error('Error deleting multimedia:', error);
  }
};
