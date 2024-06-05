// authService.js
import axios from 'axios';
//const API_BASE_URL = 'http://localhost:8805/api/v1';
const API_BASE_URL = 'https://bountiful-clarity-production.up.railway.app/api/v1';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    const { data } = response.data;

    if (data && data.token && data.id) {
      // Store token and id in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);

      console.log("Token and UserId stored in localStorage:", data.token, data.id);
      return response.data;
    } else {
      throw new Error('Token or user ID not provided or invalid response');
    }
  } catch (error) {
    console.error("Error during login:", error.response ? error.response.data : "No response data");
    throw error.response.data;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgot-password?email=${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
      token,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

