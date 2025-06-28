export const storageUtils = {
    setItem: (key, value) => {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    getItem: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },

    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    getToken: () => storageUtils.getItem('token'),

    setToken: (token) => storageUtils.setItem('token', token),

    removeToken: () => storageUtils.removeItem('token'),

    getUserPreferences: () => storageUtils.getItem('userPreferences', {
        theme: 'dark',
        language: 'es',
        notifications: true
    }),

    setUserPreferences: (preferences) => storageUtils.setItem('userPreferences', preferences)
};