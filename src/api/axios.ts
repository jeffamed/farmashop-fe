import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    switch (status) {
      case 401:
        localStorage.removeItem('token')
        window.location.href = '/login'
        break

      case 403:
        console.error('No autorizado')
        break

      case 422:
        console.error('Errores de validación', error.response.data)
        break

      case 500:
        console.error('Error del servidor')
        break
    }

    return Promise.reject(error)
  },
)
