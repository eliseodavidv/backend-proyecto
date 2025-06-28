export const validationUtils = {
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isValidPassword: (password) => {
        return password && password.length >= 6;
    },

    isValidWeight: (weight) => {
        const w = parseFloat(weight);
        return !isNaN(w) && w > 0 && w < 1000;
    },

    isValidAge: (age) => {
        const a = parseInt(age);
        return !isNaN(a) && a >= 13 && a <= 120;
    },

    isValidHeight: (height) => {
        const h = parseFloat(height);
        return !isNaN(h) && h > 50 && h < 300;
    },

    isValidDate: (date) => {
        const d = new Date(date);
        return d instanceof Date && !isNaN(d);
    },

    isValidPositiveNumber: (number) => {
        const n = parseFloat(number);
        return !isNaN(n) && n > 0;
    },

    validateForm: (data, rules) => {
        const errors = {};

        Object.keys(rules).forEach(field => {
            const value = data[field];
            const rule = rules[field];

            if (rule.required && (!value || value.trim() === '')) {
                errors[field] = `${rule.label || field} es requerido`;
                return;
            }

            if (value && rule.type === 'email' && !validationUtils.isValidEmail(value)) {
                errors[field] = 'Email no válido';
            }

            if (value && rule.type === 'password' && !validationUtils.isValidPassword(value)) {
                errors[field] = 'La contraseña debe tener al menos 6 caracteres';
            }

            if (value && rule.minLength && value.length < rule.minLength) {
                errors[field] = `Debe tener al menos ${rule.minLength} caracteres`;
            }

            if (value && rule.maxLength && value.length > rule.maxLength) {
                errors[field] = `No puede tener más de ${rule.maxLength} caracteres`;
            }
        });

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};