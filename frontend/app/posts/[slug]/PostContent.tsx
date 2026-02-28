"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Calendar, Tag, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PostContent({ post }: { post: any }) {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

            {/* Editorial Header */}
            <article className="pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 mb-12 hover:translate-x-[-4px] transition-transform duration-300"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                                {post.category?.name || "Uncategorized"}
                            </span>
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40">
                                <Clock className="w-3 h-3" />
                                8 min read
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-editorial leading-[1.1] tracking-tighter">
                            {post.headline}
                        </h1>

                        {post.subheadline && (
                            <p className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400 italic">
                                {post.subheadline}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-6 py-8 border-y border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                                <div>
                                    <span className="block text-[10px] font-bold uppercase tracking-widest opacity-50">Author</span>
                                    <span className="block text-sm font-black">{post.author?.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                                    <Calendar className="w-4 h-4 opacity-50" />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold uppercase tracking-widest opacity-50">Published</span>
                                    <span className="block text-sm font-black">
                                        {new Date(post.publishDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="my-16 aspect-video rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 relative shadow-2xl"
                    >
                        <img
                            src={post.featuredImage || 'https://images.unsplash.com/photo-1542204113-e935400bdc21?auto=format&fit=crop&q=80&w=2070'}
                            alt={post.headline}
                            className="w-full h-full object-cover"
                        />
                        {post.imageCaption && (
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                                <p className="text-xs text-white/80 font-medium">{post.imageCaption}</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Article Body */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed"
                    >
                        <div dangerouslySetInnerHTML={{ __html: post.body }} />
                    </motion.div>

                    {/* Tags */}
                    <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                        {post.tags?.map((tag: any) => (
                            <span key={tag.id} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                                <Tag className="w-3 h-3" />
                                {tag.name}
                            </span>
                        ))}
                    </div>

                </div>
            </article>
        </main>
    );
}
