import api from './api';

export const progresoService = {
    getAll: async () => {
        try {
            const response = await api.get('/api/progresos');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al obtener progreso'
            };
        }
    },

    create: async (progresoData) => {
        try {
            const response = await api.post('/api/progresos', progresoData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al crear progreso'
            };
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/api/progresos/${id}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al obtener progreso'
            };
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/api/progresos/${id}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al eliminar progreso'
            };
        }
    },

    createPublicacionProgreso: async (fechaInicio, fechaFin) => {
        try {
            const response = await api.post(`/api/publicaciones/progreso?inicio=${fechaInicio}&fin=${fechaFin}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al crear publicación de progreso'
            };
        }
    }
};