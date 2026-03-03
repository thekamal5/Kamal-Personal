"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StoriesPage() {
    const stories = [
        {
            title: "Gulmi & Palpa — Field Insights",
            excerpt: "In my recent visit to Gulmi and Palpa, I learned that resilience often speaks in quiet tones. Community strength is not loud — it is steady.",
            date: "March 2024",
            category: "Field Notes"
        },
        {
            title: "Listening Before Speaking",
            excerpt: "Every field engagement begins with observation. The most important stories are often found in silence.",
            date: "February 2024",
            category: "Reflections"
        },
        {
            title: "Between Policy and People",
            excerpt: "Development work exists in the space between intention and lived reality.",
            date: "January 2024",
            category: "Perspectives"
        }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 font-sans">
            <Navbar />

            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mb-24"
                >
                    <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-6 block">Writings & Observations</span>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8">
                        Stories
                    </h1>
                    <p className="text-2xl text-slate-500 font-medium leading-tight">
                        A collection of reflections from the field, personal narratives, and professional observations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-12">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-100 dark:border-slate-800"
                        >
                            <div className="md:col-span-1">
                                <span className="text-sm font-black uppercase tracking-widest text-slate-400">
                                    {story.date}
                                </span>
                            </div>
                            <div className="md:col-span-3">
                                <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                    {story.category}
                                </span>
                                <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-blue-600 transition-colors">
                                    {story.title}
                                </h3>
                                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-2xl">
                                    {story.excerpt}
                                </p>
                                <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest group/btn">
                                    Read Full Story
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
