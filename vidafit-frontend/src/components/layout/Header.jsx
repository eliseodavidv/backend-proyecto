import { useState } from 'react';
import { Menu, X, User, Bell, Search, Dumbbell, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-200/50 shadow-lg">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 gradient-blue rounded-2xl flex items-center justify-center icon-3d animate-pulse-glow">
                                <Dumbbell className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-extrabold gradient-text">VidaFit</h1>
                                <p className="text-xs text-blue-600 font-medium">💪 Tu mejor versión</p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-6 flex-1 max-w-md mx-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="🔍 Buscar entrenamientos, grupos..."
                                className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative p-3 text-gray-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                        </button>

                        <button className="relative p-2 gradient-blue rounded-xl icon-3d animate-float">
                            <Sparkles className="w-5 h-5 text-white" />
                        </button>

                        <div className="flex items-center space-x-3 bg-white rounded-2xl p-2 shadow-md border border-gray-100">
                            <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-semibold text-gray-900">Usuario Pro</p>
                                <p className="text-xs text-blue-600">🏆 Atleta Elite</p>
                            </div>
                        </div>

                        <button
                            className="md:hidden p-2 text-gray-600 hover:text-blue-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}