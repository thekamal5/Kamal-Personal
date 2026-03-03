"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Eye, Target, Shield, BookOpen, Heart, Zap } from "lucide-react";

export default function VisionPage() {
    const visionThemes = [
        {
            title: "Ethical public engagement",
            icon: <Shield className="w-6 h-6 text-blue-500" />,
            description: "Fostering transparency and integrity in every interaction."
        },
        {
            title: "Responsible storytelling",
            icon: <BookOpen className="w-6 h-6 text-purple-500" />,
            description: "Narratives that honor truth and diverse perspectives."
        },
        {
            title: "Research grounded in humanity",
            icon: <Heart className="w-6 h-6 text-red-500" />,
            description: "Centering people and lived experiences in academic and professional inquiry."
        },
        {
            title: "Lifelong learning",
            icon: <Zap className="w-6 h-6 text-yellow-500" />,
            description: "Continuous growth and adaptation in an ever-changing world."
        },
        {
            title: "Purpose-driven impact",
            icon: <Target className="w-6 h-6 text-green-500" />,
            description: "Meaningful contributions that serve the greater good."
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <Navbar />

            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-6 block">Future & Aspirations</span>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-12">
                        Vision
                    </h1>
                    <div className="space-y-8">
                        <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 font-medium leading-tight italic">
                            "Life is a continuous journey of learning and becoming. My aspirations are grounded in service, growth, and meaningful contribution."
                        </p>
                    </div>
                </motion.div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visionThemes.map((theme, index) => (
                        <motion.div
                            key={theme.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform duration-300">
                                {theme.icon}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight">
                                {theme.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                {theme.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
