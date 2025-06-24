import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'https://rp-gen-back.vercel.app',
  timeout: 20_000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // Altere para true se usar cookies
});

// Interceptor de requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de resposta
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Tratamento especial para erros CORS
  if (error.message === 'Network Error' && !error.response) {
    error.isNetworkError = true;
    error.corsIssue = 'Possível problema de CORS ou conexão';
  }
  
  // Tratamento para erros 500
  if (error.response?.status === 500) {
    console.error('Erro interno do servidor:', error.config.url);
  }
  
  return Promise.reject(error);
});

export default api;