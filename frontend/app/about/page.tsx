"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { User, Award, Globe, Mic, Zap, Eye, Ear, Compass } from "lucide-react";

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
                                    src="/kamal-hero.jpg"
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
                                <div className="space-y-6 text-xl text-slate-500 font-medium font-inter leading-relaxed">
                                    <p>I see myself as a lifelong learner.</p>
                                    <p>My work in social research and development has allowed me to engage with diverse communities, policies, and lived realities. But beyond data and reports, I am interested in the human dimension — the emotions, tensions, and quiet resilience that shape our world.</p>
                                    <p>I believe observation is a discipline. Listening is a responsibility. Reflection is growth.</p>
                                    <p>Through this website, I document what I see, what I question, and what I continue to learn.</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                {[
                                    { word: "Listening", icon: <Ear className="w-5 h-5" /> },
                                    { word: "Observing", icon: <Eye className="w-5 h-5" /> },
                                    { word: "Understanding", icon: <Compass className="w-5 h-5" /> }
                                ].map(({ word, icon }, i) => (
                                    <motion.div
                                        key={word}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="flex items-center gap-4 px-8 py-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800"
                                    >
                                        <div className="text-blue-600">
                                            {icon}
                                        </div>
                                        <span className="text-2xl font-black text-slate-800 dark:text-white italic tracking-tight">{word}.</span>
                                    </motion.div>
                                ))}
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

            <Footer />
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
