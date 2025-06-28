import { forwardRef } from 'react';

const Input = forwardRef(({
                              label,
                              error,
                              icon: Icon,
                              className = '',
                              ...props
                          }, ref) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-slate-300">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                )}
                <input
                    ref={ref}
                    className={`w-full bg-slate-800 border border-slate-700 rounded-xl py-3 ${Icon ? 'pl-12' : 'pl-4'} pr-4 text-white placeholder-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all ${error ? 'border-red-500' : ''} ${className}`}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-red-400 text-sm">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;