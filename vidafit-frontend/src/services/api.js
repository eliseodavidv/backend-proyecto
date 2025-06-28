import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8090';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        const { response } = error;

        if (!response) {
            toast.error('Error de conexión. ¿Está el backend ejecutándose?');
            return Promise.reject(new Error('Error de conexión'));
        }

        switch (response.status) {
            case 400:
                toast.error('Datos inválidos');
                break;
            case 401:
                toast.error('No autorizado');
                localStorage.removeItem('token');
                window.location.href = '/login';
                break;
            case 403:
                toast.error('Acceso denegado');
                break;
            case 404:
                toast.error('Recurso no encontrado');
                break;
            case 500:
                toast.error('Error del servidor');
                break;
            default:
                toast.error('Error inesperado');
        }

        return Promise.reject(error);
    }
);

export default api;