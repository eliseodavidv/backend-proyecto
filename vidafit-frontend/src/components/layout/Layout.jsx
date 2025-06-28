import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-900 fitness-pattern">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-64 pt-16 p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}