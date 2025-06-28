import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Dumbbell, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData.email, formData.password);

        if (result.success) {
            toast.success('¡Bienvenido a VidaFit!');
            navigate('/dashboard');
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 fitness-pattern flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Dumbbell className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold gradient-text mb-2">VidaFit</h1>
                    <p className="text-slate-400">Inicia sesión para continuar tu transformación</p>
                </div>

                <div className="card-gym p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-12 text-white placeholder-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-slate-700 text-orange-500 focus:ring-orange-500" />
                                <span className="ml-2 text-sm text-slate-300">Recordarme</span>
                            </label>
                            <Link to="/forgot-password" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-400">
                            ¿No tienes cuenta?{' '}
                            <Link to="/register" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-500">
                        Al iniciar sesión, aceptas nuestros{' '}
                        <Link to="/terms" className="text-orange-400 hover:text-orange-300">
                            Términos de Servicio
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}