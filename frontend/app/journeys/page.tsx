"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Map, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JourneysPage() {
    const journeys = [
        {
            title: "Mountain Trails",
            desc: "Exploring the high altitudes where culture meets the clouds.",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070",
            location: "Nepal Himalayas"
        },
        {
            title: "Coastal Echoes",
            desc: "The rhythm of the tides and the stories they wash ashore.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073",
            location: "Pacific Coast"
        },
        {
            title: "Urban Rhythms",
            desc: "Finding patterns in the chaos of modern city life.",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2070",
            location: "Tokyo Metropolitans"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <Navbar />

            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mb-24"
                >
                    <span className="text-emerald-500 font-black tracking-widest uppercase text-xs mb-6 block">Exploration & Discovery</span>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8">
                        Journeys
                    </h1>
                    <p className="text-2xl text-slate-500 font-medium leading-tight">
                        Travel is more than movement — it's a recalibration of perspective.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {journeys.map((j, index) => (
                        <motion.div
                            key={j.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[600px] overflow-hidden rounded-3xl"
                        >
                            <img
                                src={j.image}
                                alt={j.title}
                                className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12">
                                <span className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-4 block flex items-center gap-2">
                                    <Compass className="w-4 h-4" />
                                    {j.location}
                                </span>
                                <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-6 group-hover:text-emerald-400 transition-colors">
                                    {j.title}
                                </h3>
                                <p className="text-slate-300 font-medium text-lg leading-relaxed mb-8">
                                    {j.desc}
                                </p>
                                <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-white group/btn">
                                    View Journal
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
