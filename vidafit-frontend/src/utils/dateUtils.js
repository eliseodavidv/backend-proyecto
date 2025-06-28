export const dateUtils = {
    formatDate: (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    formatDateTime: (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    formatRelativeTime: (date) => {
        if (!date) return '';
        const now = new Date();
        const past = new Date(date);
        const diffInSeconds = Math.floor((now - past) / 1000);

        if (diffInSeconds < 60) return 'hace unos segundos';
        if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} minutos`;
        if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} horas`;
        if (diffInSeconds < 2592000) return `hace ${Math.floor(diffInSeconds / 86400)} días`;

        return dateUtils.formatDate(date);
    },

    isToday: (date) => {
        const today = new Date();
        const checkDate = new Date(date);
        return today.toDateString() === checkDate.toDateString();
    },

    formatDateForInput: (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    },

    getDaysFromNow: (date) => {
        const now = new Date();
        const target = new Date(date);
        const diffTime = target - now;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    isOverdue: (date) => {
        return new Date(date) < new Date();
    }
};