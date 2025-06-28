export const formatUtils = {
    formatWeight: (weight) => {
        if (!weight) return '0 kg';
        return `${weight.toFixed(1)} kg`;
    },

    formatPercent: (value) => {
        if (!value) return '0%';
        return `${Math.round(value)}%`;
    },

    formatDuration: (minutes) => {
        if (!minutes) return '0 min';
        if (minutes < 60) return `${minutes} min`;

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (remainingMinutes === 0) return `${hours}h`;
        return `${hours}h ${remainingMinutes}min`;
    },

    formatCalories: (calories) => {
        if (!calories) return '0 cal';
        return `${calories.toLocaleString()} cal`;
    },

    formatCount: (count) => {
        if (!count) return '0';
        if (count < 1000) return count.toString();
        if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
        return `${(count / 1000000).toFixed(1)}M`;
    },

    capitalizeFirst: (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    truncateText: (text, maxLength = 100) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    formatSeries: (series, repeticiones) => {
        return `${series} x ${repeticiones}`;
    },

    formatRestTime: (seconds) => {
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (remainingSeconds === 0) return `${minutes}min`;
        return `${minutes}min ${remainingSeconds}s`;
    }
};