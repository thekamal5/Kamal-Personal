"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid credentials. Sample: admin@kamal-shrestha.com.np / admin123");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#fdfdfd] dark:bg-slate-950 flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-blue-50 dark:bg-blue-900/40 text-blue-600 rounded-2xl mb-4">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-editorial mb-2">Editorial Gate</h1>
                    <p className="text-slate-500 font-medium text-sm italic">Authorized personnel only.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email System</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/20 transition-all font-inter font-medium"
                                placeholder="admin@kamal-shrestha.com.np"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Key Phrase</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/20 transition-all font-inter font-medium"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 dark:bg-red-900/20 py-3 rounded-lg border border-red-100 dark:border-red-900/40">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Access Dashboard"}
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <Link href="/" className="block text-center text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                        Return to public platform
                    </Link>
                </form>
            </motion.div>
        </main>
    );
}
