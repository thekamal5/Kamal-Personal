"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { User, Award, Globe, Mic, Zap } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

            <section className="pt-40 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        {/* Image Section */}
                        <div className="flex-1 relative">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="aspect-[4/5] bg-slate-100 dark:bg-slate-900 rounded-[40px] overflow-hidden relative shadow-2xl"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974"
                                    alt="Kamal Shrestha"
                                    className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
                                />
                            </motion.div>

                            {/* Floating Tag */}
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-3xl shadow-xl max-w-xs">
                                <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Primary Vision</span>
                                <p className="text-xl font-black italic tracking-tight">"Truth is not found in the soundbite, but in the nuance."</p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 space-y-12">
                            <div>
                                <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-6 block">Personal Narrative</span>
                                <h1 className="text-6xl md:text-8xl font-black text-editorial tracking-tighter mb-8 leading-[0.9]">Kamal <br />Shrestha.</h1>
                                <p className="text-xl text-slate-500 font-medium font-inter leading-relaxed">
                                    Kamal Shrestha is a media entrepreneur and deep-narrative journalist focused on the intersection of human identity
                                    and digital advancement. With over a decade of experience in cinematic storytelling and investigative reporting,
                                    his work seeks to bridge the gap between complex data and visceral human experience.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <StatItem icon={<Globe className="w-5 h-5" />} label="Global Reports" value="120+" />
                                <StatItem icon={<Award className="w-5 h-5" />} label="Media Awards" value="15" />
                                <StatItem icon={<Mic className="w-5 h-5" />} label="Talks & Keynotes" value="40+" />
                                <StatItem icon={<Zap className="w-5 h-5" />} label="Productions" value="200+" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="bg-black py-32">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Zap className="w-12 h-12 text-blue-500 mx-auto mb-10" />
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-12 leading-tight">Driven by a hunger for context in a world of summaries.</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto" />
                </div>
            </section>
        </main>
    );
}

function StatItem({ icon, label, value }: any) {
    return (
        <div className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="p-3 bg-white dark:bg-slate-800 text-blue-600 rounded-xl shadow-sm">
                {icon}
            </div>
            <div>
                <span className="block text-2xl font-black">{value}</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest opacity-40">{label}</span>
            </div>
        </div>
    );
}
