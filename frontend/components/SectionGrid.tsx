"use client";

import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface Post {
    id: string;
    headline: string;
    subheadline?: string;
    body: string;
    type: 'ARTICLE' | 'VIDEO' | 'OPINION';
    featuredImage?: string;
    category: { name: string };
    publishDate: string;
    author: { name: string };
}

interface SlotData {
    slotId: string;
    content: Post | null;
    isOverride: boolean;
}

interface SectionGridProps {
    id: string;
    title: string;
    description?: string;
    slots: SlotData[];
    layout?: 'grid' | 'rows' | 'magazine';
}

export function SectionGrid({ id, title, description, slots, layout = 'grid' }: SectionGridProps) {
    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-end mb-16 gap-4">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-editorial mb-4">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-lg text-slate-500 font-medium">{description}</p>
                    )}
                </div>
            </div>

            <div className={cn(
                "grid gap-8 gap-y-16",
                layout === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
                {slots.map((slot, index) => (
                    slot.content ? (
                        <ArticleCard
                            key={slot.slotId}
                            post={slot.content}
                            isLarge={index === 0 && layout === 'grid'}
                        />
                    ) : (
                        <div key={slot.slotId} className="aspect-video bg-slate-50 dark:bg-slate-900 rounded-2xl animate-pulse" />
                    )
                ))}
            </div>
        </section>
    );
}

function ArticleCard({ post, isLarge }: { post: Post; isLarge?: boolean }) {
    return (
        <div className={cn("group cursor-pointer", isLarge ? "md:col-span-2 lg:col-span-1" : "")}>
            <div className="overflow-hidden rounded-2xl mb-6 aspect-[16/10] bg-slate-100 dark:bg-slate-800 relative shadow-sm transition-all duration-500 group-hover:shadow-xl">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    style={{ backgroundImage: `url(${post.featuredImage || 'https://images.unsplash.com/photo-1542204113-e935400bdc21?auto=format&fit=crop&q=80&w=2070'})` }}
                />
                {post.type === 'VIDEO' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-110 group-hover:scale-125 transition-transform duration-300">
                            <Play className="w-6 h-6 fill-current" />
                        </div>
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {post.category.name}
                    </span>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black text-editorial leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {post.headline}
                </h3>
                {post.subheadline && (
                    <p className="text-slate-500 dark:text-slate-400 font-medium line-clamp-2">{post.subheadline}</p>
                )}
                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">By {post.author.name}</span>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40">
                        {new Date(post.publishDate).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
