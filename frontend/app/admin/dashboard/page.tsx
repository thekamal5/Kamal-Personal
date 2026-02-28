"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Settings,
    User as UserIcon,
    Layout,
    LogOut,
    Menu,
    X,
    Database
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ArticlesView } from "./ArticlesView";
import { UsersView } from "./UsersView";

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [activeView, setActiveView] = useState<'dashboard' | 'articles' | 'users' | 'settings'>('articles');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) {
            router.push("/admin/login");
        } else {
            setUser(JSON.parse(savedUser));
        }
    }, [router]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/admin/login");
    };

    if (!user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-black text-white">AUTHENTICATING IDENTITY...</div>;

    const renderView = () => {
        switch (activeView) {
            case 'articles': return <ArticlesView />;
            case 'users': return <UsersView />;
            default: return <ArticlesView />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
            {/* Sidebar */}
            <aside className={cn(
                "fixed h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col p-6 z-[100] transition-all duration-300",
                isSidebarOpen ? "w-64" : "w-20"
            )}>
                <div className="mb-12 flex items-center justify-between">
                    {isSidebarOpen && (
                        <div className="px-2">
                            <span className="text-2xl font-black tracking-tighter text-blue-600">KS<span className="text-black dark:text-white">.</span></span>
                            <span className="block text-[8px] font-black uppercase tracking-widest opacity-40 mt-1">Management Hub</span>
                        </div>
                    )}
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 space-y-4">
                    <SidebarNavItem
                        icon={<Layout size={20} />}
                        label="Dashboard"
                        active={activeView === 'dashboard'}
                        collapsed={!isSidebarOpen}
                        onClick={() => setActiveView('dashboard')}
                    />
                    <SidebarNavItem
                        icon={<FileText size={20} />}
                        label="Articles"
                        active={activeView === 'articles'}
                        collapsed={!isSidebarOpen}
                        onClick={() => setActiveView('articles')}
                    />
                    <SidebarNavItem
                        icon={<UserIcon size={20} />}
                        label="Authorities"
                        active={activeView === 'users'}
                        collapsed={!isSidebarOpen}
                        onClick={() => setActiveView('users')}
                    />
                    <SidebarNavItem
                        icon={<Settings size={20} />}
                        label="System"
                        active={activeView === 'settings'}
                        collapsed={!isSidebarOpen}
                        onClick={() => setActiveView('settings')}
                    />
                </nav>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    {isSidebarOpen && (
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black ring-4 ring-blue-600/10">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <span className="block text-xs font-black leading-tight">{user.name}</span>
                                <span className="block text-[9px] font-bold uppercase tracking-widest opacity-40">{user.role}</span>
                            </div>
                        </div>
                    )}
                    <button onClick={logout} className={cn(
                        "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 p-2 w-full transition-colors",
                        !isSidebarOpen && "justify-center"
                    )}>
                        <LogOut size={16} />
                        {isSidebarOpen && "Sign Out"}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={cn(
                "flex-1 transition-all duration-300 p-10 min-h-screen",
                isSidebarOpen ? "ml-64" : "ml-20"
            )}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeView}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderView()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

function SidebarNavItem({ icon, label, active, collapsed, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-4 w-full px-4 py-3 rounded-2xl transition-all group",
                active
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            )}
        >
            <div className={cn("shrink-0", active ? "scale-110" : "group-hover:scale-110 transition-transform")}>
                {icon}
            </div>
            {!collapsed && (
                <span className="text-sm font-black tracking-tight">{label}</span>
            )}
        </button>
    );
}
