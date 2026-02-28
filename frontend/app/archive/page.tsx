"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { SectionGrid } from "@/components/SectionGrid";
import { motion } from "framer-motion";
import { Search, Filter, Clock } from "lucide-react";
import { useState } from "react";

export default function ArchivePage() {
    const [search, setSearch] = useState("");
    const { data: posts, isLoading } = useQuery({
        queryKey: ['archive-posts'],
        queryFn: () => getPosts({ status: 'PUBLISHED' }),
    });

    return (
        <main className="min-h-screen bg-[#fdfdfd] dark:bg-slate-950">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-2xl">
                            <span className="text-blue-600 font-black tracking-widest uppercase text-[10px] mb-4 block">Central Archive</span>
                            <h1 className="text-5xl md:text-7xl font-black text-editorial tracking-tighter mb-6 leading-[0.9]">Narrative Timeline.</h1>
                            <p className="text-xl text-slate-500 font-medium">Every story, every report, every insight. Use the global search to filter through the years of journalism.</p>
                        </div>

                        <div className="w-full md:w-96">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search narratives..."
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/20 font-inter font-medium text-sm transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="py-24">
                {isLoading ? (
                    <div className="max-w-7xl mx-auto px-4 space-y-12">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-slate-50 dark:bg-slate-900 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <SectionGrid
                        id="archive-results"
                        title="Full Catalog"
                        slots={posts?.map((p: any) => ({ slotId: p.id, content: p, isOverride: false })) || []}
                    />
                )}
            </section>
        </main>
    );
}
