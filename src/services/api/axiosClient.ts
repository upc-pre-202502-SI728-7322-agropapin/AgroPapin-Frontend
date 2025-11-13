import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let getAuth0Token: (() => Promise<string>) | null = null;

export function setAuth0TokenGetter(tokenGetter: () => Promise<string>) {
  getAuth0Token = tokenGetter;
}

// instancia de axios
export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor para las peticiones que añade el token JWT al header
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      // le pide el token al auth0
      if (getAuth0Token) {
        const token = await getAuth0Token();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        }
      }
      
    } catch (error) {
      console.error('Error obteniendo token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// interceptor para las respuestas que maneja errores globales
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
