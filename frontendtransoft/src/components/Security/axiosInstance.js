// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api-transoft/users",
});

// Intercepteur pour ajouter le token à chaque requête
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token ajouté aux en-têtes:", config.headers.Authorization);
  }
  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
