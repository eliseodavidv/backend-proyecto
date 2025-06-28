export const generalUtils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    },

    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            return false;
        }
    },

    downloadAsJSON: (data, filename = 'data.json') => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    parseJSON: (str, defaultValue = null) => {
        try {
            return JSON.parse(str);
        } catch {
            return defaultValue;
        }
    },

    randomColor: () => {
        const colors = [
            '#FF6B35', '#E55A2B', '#10B981', '#3B82F6',
            '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    getInitials: (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }
};