import api from './api';

export const grupoService = {
    getAll: async () => {
        try {
            const response = await api.get('/grupos');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al obtener grupos'
            };
        }
    },

    getPublicos: async () => {
        try {
            const response = await api.get('/grupos/publicos');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al obtener grupos públicos'
            };
        }
    },

    create: async (grupoData, adminId) => {
        try {
            const response = await api.post(`/grupos/crear?adminId=${adminId}`, grupoData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al crear grupo'
            };
        }
    },

    agregarMiembro: async (grupoId, userId) => {
        try {
            const response = await api.post(`/grupos/${grupoId}/agregar-miembro?userId=${userId}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al agregar miembro'
            };
        }
    },

    unirseAGrupo: async (grupoId, userId) => {
        try {
            const response = await api.post(`/grupos/${grupoId}/unirse?userId=${userId}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Error al unirse al grupo'
            };
        }
    }
};