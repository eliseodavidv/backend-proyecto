import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/layout/Layout';

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white">Cargando VidaFit...</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white">Cargando VidaFit...</p>
                </div>
            </div>
        );
    }

    return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}

function AppContent() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />

                <Route path="/" element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Navigate to="/dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="publicaciones" element={<div className="text-white">Publicaciones - Próximamente</div>} />
                    <Route path="grupos" element={<div className="text-white">Grupos - Próximamente</div>} />
                    <Route path="metas" element={<div className="text-white">Metas - Próximamente</div>} />
                    <Route path="progreso" element={<div className="text-white">Progreso - Próximamente</div>} />
                    <Route path="entrenamientos" element={<div className="text-white">Entrenamientos - Próximamente</div>} />
                    <Route path="calendario" element={<div className="text-white">Calendario - Próximamente</div>} />
                    <Route path="logros" element={<div className="text-white">Logros - Próximamente</div>} />
                    <Route path="configuracion" element={<div className="text-white">Configuración - Próximamente</div>} />
                </Route>
            </Routes>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#1e293b',
                        color: '#fff',
                        border: '1px solid #ff6b35'
                    }
                }}
            />
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;