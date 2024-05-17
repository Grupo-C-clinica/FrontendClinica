// services/multimediaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8805/api/v1/multimedia';

export const fetchMultimedia = async (historialId) => {
  try {
    const response = await axios.get(`${API_URL}/all/${historialId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching multimedia:', error);
    return [];
  }
};
