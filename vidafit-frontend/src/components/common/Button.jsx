export default function Button({
                                   children,
                                   variant = 'primary',
                                   size = 'md',
                                   onClick,
                                   disabled = false,
                                   className = '',
                                   ...props
                               }) {
    const baseClasses = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5',
        secondary: 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600',
        outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white',
        ghost: 'text-slate-300 hover:text-white hover:bg-slate-700/50'
    };

    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`;

    return (
        <button
            className={classes}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}