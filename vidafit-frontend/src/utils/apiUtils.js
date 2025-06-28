import toast from 'react-hot-toast';

export const apiUtils = {
    handleApiError: (error, defaultMessage = 'Ha ocurrido un error') => {
        console.error('API Error:', error);

        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            switch (status) {
                case 400:
                    return data?.message || 'Datos inválidos';
                case 401:
                    return 'No autorizado. Por favor, inicia sesión';
                case 403:
                    return 'No tienes permisos para realizar esta acción';
                case 404:
                    return 'Recurso no encontrado';
                case 409:
                    return data?.message || 'Conflicto con los datos existentes';
                case 500:
                    return 'Error interno del servidor';
                default:
                    return data?.message || defaultMessage;
            }
        }

        if (error.request) {
            return 'Error de conexión. Verifica tu internet';
        }

        return error.message || defaultMessage;
    },

    showApiError: (error, defaultMessage) => {
        const message = apiUtils.handleApiError(error, defaultMessage);
        toast.error(message);
        return message;
    },

    buildQueryParams: (params) => {
        const validParams = Object.entries(params)
            .filter(([_, value]) => value !== null && value !== undefined && value !== '')
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        return validParams ? `?${validParams}` : '';
    },

    isNetworkError: (error) => {
        return !error.response && error.request;
    },

    retry: async (fn, maxRetries = 3, delay = 1000) => {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await fn();
            } catch (error) {
                if (i === maxRetries - 1 || !apiUtils.isNetworkError(error)) {
                    throw error;
                }
                await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
            }
        }
    }
};