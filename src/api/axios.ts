import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
export const farmashopApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true,
  withXSRFToken: true
});
farmashopApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    switch (status) {
      case 401:
        if (!error.config?.url?.includes('/api/user')) {
          window.location.href = '/login'
        }
        break

      case 419:
        console.error('Token expirado')
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

      default:
        console.error('Error desconocido', error)
        break
    }

    return Promise.reject(error)
  },
)
