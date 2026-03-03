"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Image as ImageIcon, Camera } from "lucide-react";

export default function VisualStoriesPage() {
    const images = [
        "https://images.unsplash.com/photo-1492691523567-6170f0295dbd?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1542204113-e935400bdc21?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1501854140801-50d01674bc4e?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2071",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1874",
        "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=1770",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1770",
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1770"
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
                    <span className="text-rose-500 font-black tracking-widest uppercase text-xs mb-6 block">Moments Translated</span>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8">
                        Visual Stories
                    </h1>
                    <p className="text-2xl text-slate-500 font-medium leading-tight max-w-2xl">
                        Captured from travel, fieldwork, and professional life — where images carry narratives beyond words.
                    </p>
                </motion.div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="mb-8 break-inside-avoid"
                        >
                            <div className="relative group overflow-hidden rounded-3xl cursor-pointer">
                                <img
                                    src={img}
                                    alt="Visual Narrative"
                                    className="w-full grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 flex items-center gap-3">
                                    <div className="p-3 bg-white text-black rounded-full shadow-lg">
                                        <Camera className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-black text-white uppercase tracking-widest drop-shadow-md">
                                        View Detail
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
