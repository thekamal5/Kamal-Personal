"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { SectionGrid } from "@/components/SectionGrid";
import { motion } from "framer-motion";
import { MessageSquare, Quote } from "lucide-react";

export default function OpinionsPage() {
    const { data: opinions, isLoading } = useQuery({
        queryKey: ['opinion-posts'],
        queryFn: () => getPosts({ type: 'OPINION' }),
    });

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

            {/* Editorial Header */}
            <section className="pt-40 pb-24 relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 dark:bg-slate-900/50 -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-xl">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Columns & Perspectives</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-editorial tracking-tighter italic mb-12">The <span className="text-blue-600 not-italic">Deep Cut.</span></h1>
                        <p className="text-2xl font-medium text-slate-500 leading-relaxed border-l-4 border-blue-600 pl-8 font-inter">
                            Analytical commentary on the shifting landscapes of media, technology, and identity.
                            Where the soundbite dies and the discourse begins.
                        </p>
                    </div>
                </div>
            </section>

            {/* Opinions List */}
            <section className="pb-32">
                {isLoading ? (
                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-80 bg-slate-50 dark:bg-slate-900 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <SectionGrid
                        id="opinion-list"
                        title="Latest Columns"
                        slots={opinions?.map((p: any) => ({ slotId: p.id, content: p, isOverride: false })) || []}
                        layout="grid"
                    />
                )}
            </section>
        </main>
    );
}
