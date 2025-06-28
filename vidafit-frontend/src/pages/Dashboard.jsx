import { useState, useEffect } from 'react';
import { Activity, Users, Target, TrendingUp, Calendar, Award, Plus, Flame, BarChart3, Zap, Star, Trophy, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { publicacionService } from '../services/publicacionService';
import { grupoService } from '../services/grupoService';
import { metaService } from '../services/metaService';
import { progresoService } from '../services/progresoService';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        publicaciones: 0,
        grupos: 0,
        metas: 0,
        progreso: 0
    });
    const [recentData, setRecentData] = useState({
        publicaciones: [],
        grupos: [],
        metas: [],
        progresos: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            // Cargar datos en paralelo
            const [publicacionesRes, gruposRes, metasRes, progresosRes] = await Promise.all([
                publicacionService.getByAuthor(),
                grupoService.getAll(),
                metaService.getByUser(user?.id || 1),
                progresoService.getAll()
            ]);

            // Actualizar stats
            setStats({
                publicaciones: publicacionesRes.success ? publicacionesRes.data.length : 0,
                grupos: gruposRes.success ? gruposRes.data.length : 0,
                metas: metasRes.success ? metasRes.data.length : 0,
                progreso: progresosRes.success ? progresosRes.data.length : 0
            });

            // Actualizar datos recientes
            setRecentData({
                publicaciones: publicacionesRes.success ? publicacionesRes.data.slice(0, 3) : [],
                grupos: gruposRes.success ? gruposRes.data.slice(0, 3) : [],
                metas: metasRes.success ? metasRes.data.slice(0, 3) : [],
                progresos: progresosRes.success ? progresosRes.data.slice(0, 3) : []
            });

        } catch (error) {
            console.error('Error loading dashboard:', error);
            toast.error('Error al cargar el dashboard');
        } finally {
            setLoading(false);
        }
    };

    const quickActions = [
        { name: 'Nueva Rutina', icon: Plus, color: 'gradient-blue', emoji: '💪', action: () => toast.success('Función próximamente!') },
        { name: 'Unirse a Grupo', icon: Users, color: 'gradient-emerald', emoji: '👥', action: () => toast.success('Función próximamente!') },
        { name: 'Crear Meta', icon: Target, color: 'gradient-orange', emoji: '🎯', action: () => toast.success('Función próximamente!') },
        { name: 'Ver Progreso', icon: TrendingUp, color: 'gradient-purple', emoji: '📈', action: () => toast.success('Función próximamente!') }
    ];

    const recentActivities = [
        { type: 'workout', message: 'Completaste rutina de Pecho y Tríceps', time: '2 horas', icon: Activity, emoji: '💪' },
        { type: 'group', message: 'Te uniste al grupo "Guerreros Fitness"', time: '1 día', icon: Users, emoji: '👥' },
        { type: 'goal', message: 'Cumpliste tu meta semanal de cardio', time: '2 días', icon: Award, emoji: '🏆' },
        { type: 'progress', message: 'Nuevo récord personal en peso muerto', time: '3 días', icon: Flame, emoji: '🔥' }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 gradient-blue rounded-2xl animate-pulse mx-auto mb-4 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium">Cargando tu dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 bright-pattern min-h-screen">
            {/* Header Welcome */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                        ¡Bienvenido de vuelta, <span className="gradient-text">Atleta</span>!
                        <span className="ml-2">🚀</span>
                    </h1>
                    <p className="text-lg text-gray-600">Es hora de superar tus límites hoy ✨</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-3xl font-bold gradient-text">🔥 7</p>
                        <p className="text-sm text-blue-600 font-medium">Días consecutivos</p>
                    </div>
                    <div className="w-20 h-20 gradient-blue rounded-3xl flex items-center justify-center icon-3d animate-float">
                        <Trophy className="w-10 h-10 text-white" />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-3d p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 gradient-blue rounded-2xl flex items-center justify-center icon-3d">
                            <span className="text-2xl">📝</span>
                            <Activity className="w-6 h-6 text-white ml-1" />
                        </div>
                        <span className="text-emerald-500 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-lg">+{stats.publicaciones > 0 ? '12%' : '0%'}</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stats.publicaciones}</h3>
                    <p className="text-gray-600 text-sm font-medium">Publicaciones creadas</p>
                </div>

                <div className="card-3d p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 gradient-emerald rounded-2xl flex items-center justify-center icon-3d">
                            <span className="text-2xl">👥</span>
                            <Users className="w-6 h-6 text-white ml-1" />
                        </div>
                        <span className="text-blue-500 text-sm font-bold bg-blue-50 px-2 py-1 rounded-lg">+{stats.grupos > 0 ? '1' : '0'}</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stats.grupos}</h3>
                    <p className="text-gray-600 text-sm font-medium">Grupos activos</p>
                </div>

                <div className="card-3d p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 gradient-orange rounded-2xl flex items-center justify-center icon-3d">
                            <span className="text-2xl">🎯</span>
                            <Target className="w-6 h-6 text-white ml-1" />
                        </div>
                        <span className="text-orange-500 text-sm font-bold bg-orange-50 px-2 py-1 rounded-lg">{stats.metas} pendientes</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stats.metas}</h3>
                    <p className="text-gray-600 text-sm font-medium">Metas establecidas</p>
                </div>

                <div className="card-3d p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 gradient-purple rounded-2xl flex items-center justify-center icon-3d">
                            <span className="text-2xl">📈</span>
                            <TrendingUp className="w-6 h-6 text-white ml-1" />
                        </div>
                        <span className="text-purple-500 text-sm font-bold bg-purple-50 px-2 py-1 rounded-lg">↗ 8%</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stats.progreso}</h3>
                    <p className="text-gray-600 text-sm font-medium">Registros de progreso</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Quick Actions */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card-3d p-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <Zap className="w-6 h-6 text-orange-500" />
                            <h2 className="text-2xl font-bold text-gray-900">Acciones Rápidas</h2>
                            <span className="text-2xl">⚡</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={index}
                                        onClick={action.action}
                                        className="p-6 rounded-2xl bg-gray-50 border-2 border-transparent hover:border-blue-200 transition-all duration-300 group card-3d hover:scale-105"
                                    >
                                        <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform icon-3d`}>
                                            <span className="text-xl mr-1">{action.emoji}</span>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="text-gray-900 font-semibold text-left">{action.name}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Weekly Progress */}
                    <div className="card-3d p-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <BarChart3 className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-bold text-gray-900">Progreso Semanal</h2>
                            <span className="text-2xl">📊</span>
                        </div>
                        <div className="space-y-4">
                            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day, index) => (
                                <div key={day} className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">{day}</span>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-40 h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div className={`h-3 rounded-full ${index < 3 ? 'gradient-blue' : 'bg-gray-300'} ${index < 3 ? 'animate-pulse-glow' : ''}`}
                                                 style={{width: index < 3 ? '100%' : index === 3 ? '75%' : '0%'}}></div>
                                        </div>
                                        <span className={`text-sm font-bold ${index < 3 ? 'text-emerald-500' : index === 3 ? 'text-orange-500' : 'text-gray-400'}`}>
                      {index < 3 ? '✓' : index === 3 ? '75%' : '⏸️'}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">

                    {/* Recent Activity */}
                    <div className="card-3d p-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <Activity className="w-6 h-6 text-emerald-500" />
                            <h2 className="text-xl font-bold text-gray-900">Actividad Reciente</h2>
                            <span className="text-xl">🕒</span>
                        </div>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => {
                                const Icon = activity.icon;
                                return (
                                    <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <span className="text-lg">{activity.emoji}</span>
                                            <Icon className="w-4 h-4 text-blue-500 ml-1" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                                            <p className="text-xs text-gray-500">hace {activity.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Next Workout */}
                    <div className="card-3d p-6 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <Calendar className="w-6 h-6 text-purple-500" />
                            <h2 className="text-xl font-bold text-gray-900">Próximo Entrenamiento</h2>
                            <span className="text-xl">📅</span>
                        </div>
                        <div className="w-20 h-20 gradient-purple rounded-3xl flex items-center justify-center mx-auto mb-4 icon-3d animate-float">
                            <span className="text-3xl">💪</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Espalda y Bíceps</h3>
                        <p className="text-gray-600 text-sm mb-4">🕖 Mañana a las 7:00 AM</p>
                        <button className="btn-3d w-full">
                            Ver Rutina ✨
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}