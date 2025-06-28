import api from './api';

export const metaService = {
    getByUser: async (userId) => {
        try {
            const response = await api.get(`/api/metas/usuario/${userId}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al obtener metas'
            };
        }
    },

    create: async (metaData, userId) => {
        try {
            const response = await api.post(`/api/metas/crear?userId=${userId}`, metaData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al crear meta'
            };
        }
    },

    marcarCumplida: async (metaId) => {
        try {
            const response = await api.put(`/api/metas/${metaId}/cumplida`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al marcar meta como cumplida'
            };
        }
    }
};