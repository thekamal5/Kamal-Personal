"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Play, PlayCircle, Clock, Tag, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function VideosPage() {
    const { data: videos, isLoading } = useQuery({
        queryKey: ['videos'],
        queryFn: () => getPosts({ type: 'VIDEO' }),
    });

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Cinematic Header */}
            <section className="pt-40 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
                    >
                        <PlayCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-white/80">Cinema Portfolio</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter text-playfair italic mb-8 leading-[0.9]"
                    >
                        Visceral <br />
                        <span className="text-blue-500 not-italic">Storytelling.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl font-medium text-slate-400 max-w-2xl mx-auto mb-12 font-inter"
                    >
                        Experience narrative journalism through a cinematic lens. Our high-production portfolio explores the human condition.
                    </motion.p>
                </div>
            </section>

            {/* Video Grid */}
            <section className="pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="aspect-video bg-white/5 rounded-3xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-20">
                            {videos?.map((video: any) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

function VideoCard({ video }: { video: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-slate-900 border border-white/5 shadow-2xl cursor-pointer">
                <div
                    className="absolute inset-0 bg-cover bg-center brightness-50 group-hover:brightness-75 transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${video.featuredImage || 'https://images.unsplash.com/photo-1492691523567-6170f0295dbd?auto=format&fit=crop&q=80&w=2070'})` }}
                />

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform duration-500 border border-white/30">
                        <Play className="w-8 h-8 fill-current" />
                    </div>
                </div>

                {/* Floating Tag */}
                <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-lg">
                        {video.category.name}
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-2xl font-black text-white hover:text-blue-500 transition-colors duration-300 leading-tight">
                    {video.headline}
                </h3>
                <p className="text-slate-500 font-medium line-clamp-2">
                    {video.subheadline || "A compelling visual narrative by Kamal Shrestha Exploring themes of technology and identity."}
                </p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        4:20 Duration
                    </div>
                    <Link href={`/posts/${video.slug}`} className="flex items-center gap-1 hover:text-white transition-colors">
                        Full Details
                        <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
