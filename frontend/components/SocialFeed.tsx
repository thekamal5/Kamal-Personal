"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const FEED_DATA = [
    {
        id: 1,
        platform: "Instagram",
        icon: <Instagram className="w-4 h-4" />,
        handle: "findkamalshrestha",
        content: "Gulmi & Palpa | Jan–Feb 2026. A productive field visit to Gulmi and Palpa. Learned about the local resilience and culture. Field insights... Real conversations... Lasting memories...",
        date: "Feb 2026",
        url: "https://www.instagram.com/p/DF9A-S6S_H3/", // Example post link structure
        image: "https://images.unsplash.com/photo-1506466010722-395ee2bef877?auto=format&fit=crop&q=80&w=2070", // Nepali landscape style
    },
    {
        id: 2,
        platform: "LinkedIn",
        icon: <Linkedin className="w-4 h-4" />,
        handle: "Kamal Shrestha",
        content: "Reflecting on my recent work with NRCTC-Nepal. The Gulmi & Palpa field visit provided deep insights into community development and stakeholder engagement. Resilience is a quiet persistence.",
        date: "Recent",
        url: "https://www.linkedin.com/in/findkamalshrestha/recent-activity/all/",
    },
    {
        id: 3,
        platform: "Twitter",
        icon: <Twitter className="w-4 h-4" />,
        handle: "@petalsofkamal",
        content: "Primary vision: Truth is not found in the soundbite, but in the nuance. (Recent post coming soon as I expand my digital narrative platform).",
        date: "Pending",
        url: "https://x.com/petalsofkamal",
    },
    {
        id: 4,
        platform: "Instagram",
        icon: <Instagram className="w-4 h-4" />,
        handle: "findkamalshrestha",
        content: "Observation is a discipline. Listening is a responsibility. Reflection is growth. Every field visit is a new chapter in the journey of a lifelong learner.",
        date: "Jan 2026",
        url: "https://www.instagram.com/findkamalshrestha/",
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=2070",
    }
];

export function SocialFeed() {
    return (
        <section className="py-32 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-blue-600 font-black tracking-widest uppercase text-xs mb-6 block"
                        >
                            Live Dispatches
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-editorial tracking-tighter leading-none"
                        >
                            The Social <br />Stream.
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <button className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
                            Follow the journey
                            <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                                <ExternalLink className="w-4 h-4" />
                            </div>
                        </button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEED_DATA.map((post, index) => (
                        <SocialCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function SocialCard({ post, index }: { post: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-slate-950 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                        {post.icon}
                    </div>
                    <div>
                        <span className="block text-sm font-black tracking-tight">{post.handle}</span>
                        <span className="block text-[10px] font-bold uppercase tracking-widest opacity-40">{post.platform}</span>
                    </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">{post.date}</span>
            </div>

            <div className="flex-1">
                <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
                    {post.content}
                </p>

                {post.image && (
                    <div className="relative rounded-2xl overflow-hidden aspect-square mb-6 grayscale hover:grayscale-0 transition-all duration-700">
                        <img src={post.image} alt="Social feed content" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    </div>
                )}
            </div>

            <div className="pt-6 border-t border-slate-50 dark:border-slate-900 mt-auto">
                <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 group/btn cursor-pointer inline-flex"
                >
                    View Post
                    <div className="w-4 h-[1px] bg-blue-600 transition-all group-hover/btn:w-8" />
                </a>
            </div>
        </motion.div>
    );
}
