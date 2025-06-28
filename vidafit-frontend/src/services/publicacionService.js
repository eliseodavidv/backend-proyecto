import api from './api';

export const publicacionService = {
    getAll: async (page = 0, size = 10) => {
        try {
            const response = await api.get(`/api/publicaciones?page=${page}&size=${size}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al obtener publicaciones'
            };
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/api/publicaciones/${id}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al obtener publicación'
            };
        }
    },

    create: async (titulo, contenido) => {
        try {
            const response = await api.post('/api/publicaciones', {
                titulo,
                contenido
            });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al crear publicación'
            };
        }
    },

    getByAuthor: async () => {
        try {
            const response = await api.get('/api/publicaciones/autor');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al obtener publicaciones del autor'
            };
        }
    },

    getRutinas: async (page = 0, size = 10) => {
        try {
            const response = await api.get(`/api/publicaciones/rutinas?page=${page}&size=${size}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al obtener rutinas'
            };
        }
    },

    createRutina: async (rutinaData) => {
        try {
            const response = await api.post('/api/publicaciones/rutinas', rutinaData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al crear rutina'
            };
        }
    },

    getPlanes: async () => {
        try {
            const response = await api.get('/api/publicaciones/planes');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al obtener planes'
            };
        }
    },

    createPlan: async (planData) => {
        try {
            const response = await api.post('/api/publicaciones/planes', planData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al crear plan'
            };
        }
    }
};