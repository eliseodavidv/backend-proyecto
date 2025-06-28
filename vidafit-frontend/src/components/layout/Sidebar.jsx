import { NavLink } from 'react-router-dom';
import {
    Home,
    FileText,
    Users,
    Target,
    TrendingUp,
    Calendar,
    Award,
    Settings,
    LogOut,
    Activity,
    Zap,
    Star,
    Trophy
} from 'lucide-react';

export default function Sidebar() {
    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home, color: 'gradient-blue', emoji: '🏠' },
        { name: 'Publicaciones', href: '/publicaciones', icon: FileText, color: 'gradient-emerald', emoji: '📝' },
        { name: 'Mis Grupos', href: '/grupos', icon: Users, color: 'gradient-orange', emoji: '👥' },
        { name: 'Mis Metas', href: '/metas', icon: Target, color: 'gradient-purple', emoji: '🎯' },
        { name: 'Mi Progreso', href: '/progreso', icon: TrendingUp, color: 'gradient-pink', emoji: '📈' },
        { name: 'Entrenamientos', href: '/entrenamientos', icon: Activity, color: 'gradient-blue', emoji: '💪' },
        { name: 'Calendario', href: '/calendario', icon: Calendar, color: 'gradient-emerald', emoji: '📅' },
        { name: 'Logros', href: '/logros', icon: Award, color: 'gradient-orange', emoji: '🏆' },
    ];

    const bottomNavigation = [
        { name: 'Configuración', href: '/configuracion', icon: Settings, emoji: '⚙️' },
        { name: 'Cerrar Sesión', href: '/logout', icon: LogOut, emoji: '👋' },
    ];

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white/90 backdrop-blur-md border-r border-gray-200/50 overflow-y-auto bright-pattern">
            <nav className="p-4 space-y-2">

                {/* Progress Card 3D */}
                <div className="mb-8">
                    <div className="card-3d p-6 animate-float">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-gray-700">🔥 Progreso Semanal</span>
                            <div className="flex items-center space-x-1">
                                <Zap className="w-4 h-4 text-orange-500" />
                                <span className="text-sm text-emerald-500 font-bold">+15%</span>
                            </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                            <div className="gradient-blue h-3 rounded-full w-4/5 animate-pulse-glow"></div>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-600">6 de 7 entrenamientos</p>
                            <div className="flex space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                {navigation.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                `flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                                    isActive
                                        ? `${item.color} text-white shadow-lg transform scale-105 animate-pulse-glow`
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-md'
                                }`
                            }
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                ({ isActive }) => isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'
                            }`}>
                                <span className="text-lg mr-2">{item.emoji}</span>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-semibold">{item.name}</span>

                            {/* Glowing effect for active items */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </NavLink>
                    );
                })}

                {/* Stats Mini Cards */}
                <div className="pt-6 space-y-3">
                    <div className="glass-card p-3 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Trophy className="w-4 h-4 text-yellow-500" />
                                <span className="text-xs font-medium text-gray-700">Racha</span>
                            </div>
                            <span className="text-sm font-bold text-blue-600">7 días</span>
                        </div>
                    </div>

                    <div className="glass-card p-3 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Activity className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-medium text-gray-700">Nivel</span>
                            </div>
                            <span className="text-sm font-bold gradient-text">Pro</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="pt-8 mt-8 border-t border-gray-200/50">
                    {bottomNavigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className="flex items-center space-x-4 px-4 py-3 rounded-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200 mb-2"
                            >
                                <span className="text-lg">{item.emoji}</span>
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}