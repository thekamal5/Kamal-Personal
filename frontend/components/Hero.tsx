"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play, MessageSquare, Newspaper, Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, 200]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-slate-950 pt-32 pb-24 md:pt-40 lg:pt-48">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-indigo-500/10 blur-[100px] rounded-full" />
                <div className="absolute top-[20%] right-[10%] w-[15%] h-[15%] bg-blue-100 dark:bg-blue-900/10 blur-[60px] rounded-full" />

                {/* Editorial Pattern (Subtle dots) */}
                <div className="absolute inset-x-0 bottom-0 top-[20%] opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Main Editorial Header */}
                    <div className="lg:col-span-12 mb-12 lg:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black tracking-widest uppercase bg-blue-600 text-white rounded-full">
                                Featured Report
                            </span>
                            <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
                            <span className="text-xs font-bold uppercase tracking-wide opacity-50 dark:opacity-40">March 2026 Edition</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-6xl md:text-8xl lg:text-[120px] leading-[0.9] font-black tracking-tighter text-editorial mb-8 text-black dark:text-white"
                        >
                            Unveiling the <br />
                            <span className="text-blue-600 dark:text-blue-500 italic relative inline-block">
                                Modern Narrative
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.2, delay: 1 }}
                                    className="absolute bottom-1 left-0 h-2 bg-blue-100/50 dark:bg-blue-900/30 -z-10"
                                />
                            </span>
                        </motion.h1>
                    </div>

                    {/* Subheader & Meta (Left Column) */}
                    <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="space-y-6"
                        >
                            <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-600 dark:text-slate-400 max-w-lg">
                                Kamal Shrestha explores the intersection of journalism, technology, and branding in an ever-evolving digital landscape.
                            </p>

                            {/* Meta Tags */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-2 group cursor-pointer">
                                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold uppercase tracking-wide opacity-50">Author</span>
                                        <span className="block text-sm font-bold">Kamal S.</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 group cursor-pointer">
                                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <Tag className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold uppercase tracking-wide opacity-50">Topic</span>
                                        <span className="block text-sm font-bold">Media Trends</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                                <button className="w-full sm:w-auto px-8 py-5 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-sm tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
                                    Read full story
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <button className="w-full sm:w-auto px-8 py-5 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600 transition-colors duration-300 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3">
                                    Watch Highlights
                                    <Play className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Featured Visual (Stacked right column) */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <motion.div
                            style={{ y, scale }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden group shadow-2xl"
                        >
                            {/* Image Placeholder with high-premium feel */}
                            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 overflow-hidden animate-pulse" />
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070")' }}
                            />
                            {/* Overlay Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                            {/* Caption Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    className="p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white"
                                >
                                    <span className="text-xs font-black uppercase tracking-widest mb-1 block opacity-80">Photo Focus</span>
                                    <p className="text-sm font-medium leading-tight">Digital narrative exploration at Kamal Personal Media Studios.</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
