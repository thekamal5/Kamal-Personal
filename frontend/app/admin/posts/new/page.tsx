"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import {
    ChevronLeft,
    Save,
    Send,
    Image as ImageIcon,
    Type,
    Layout,
    Eye,
    Settings,
    Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewPostPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        headline: "",
        subheadline: "",
        body: "",
        type: "ARTICLE",
        categoryId: "",
        featuredImage: "",
        isHeadline: false,
    });

    const createPostMutation = useMutation({
        mutationFn: (data: any) => api.post('/posts', data),
        onSuccess: () => {
            router.push("/admin/dashboard");
        }
    });

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => api.get('/categories').then(res => res.data),
    });

    const handleSave = (status: string) => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        createPostMutation.mutate({
            ...formData,
            status,
            authorId: user.id
        });
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header / Toolbar */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-[100] flex items-center justify-between px-8">
                <div className="flex items-center gap-6">
                    <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                    <span className="text-sm font-black uppercase tracking-widest opacity-40">Creative Workspace</span>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => handleSave('DRAFT')} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Save size={16} />
                        Save Draft
                    </button>
                    <button onClick={() => handleSave('PUBLISHED')} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-black text-white rounded-xl text-sm font-black transition-all shadow-lg shadow-blue-500/20">
                        <Send size={16} />
                        Publish Narrative
                    </button>
                </div>
            </div>

            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Editor Surface */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[40px] p-12 shadow-sm border border-slate-200 dark:border-slate-800">
                        <input
                            value={formData.headline}
                            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                            placeholder="Headline goes here..."
                            className="w-full text-5xl md:text-7xl font-black tracking-tighter text-editorial bg-transparent border-none focus:ring-0 placeholder:opacity-10 mb-8"
                        />

                        <textarea
                            value={formData.subheadline}
                            onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                            placeholder="The story in a nutshell. Brief, visceral, engaging."
                            className="w-full text-xl font-medium text-slate-500 bg-transparent border-none focus:ring-0 placeholder:opacity-20 mb-12 resize-none h-24"
                        />

                        <div className="h-px bg-slate-100 dark:bg-slate-800 mb-12" />

                        <textarea
                            value={formData.body}
                            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                            placeholder="Write the narrative..."
                            className="w-full min-h-[500px] text-lg leading-relaxed font-inter bg-transparent border-none focus:ring-0 placeholder:opacity-10"
                        />
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <ControlSection title="Format & Metadata" icon={<Settings size={16} />}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Content Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['ARTICLE', 'VIDEO', 'OPINION'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setFormData({ ...formData, type })}
                                            className={cn(
                                                "py-2 px-4 rounded-xl text-[10px] font-black tracking-widest border transition-all",
                                                formData.type === type
                                                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Category</label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-600/20 outline-none"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories?.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Primary Visual</label>
                                <div className="aspect-video rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-blue-500 transition-all">
                                    <ImageIcon className="w-8 h-8 opacity-20 group-hover:opacity-100 group-hover:text-blue-500 transition-all" />
                                    <span className="text-[10px] font-black opacity-30 select-none">Drop narrative visual or click to browse</span>
                                </div>
                            </div>
                        </div>
                    </ControlSection>

                    <ControlSection title="Placement" icon={<Layout size={16} />}>
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-600/20"
                                    checked={formData.isHeadline}
                                    onChange={(e) => setFormData({ ...formData, isHeadline: e.target.checked })}
                                />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Set as Master Headline</span>
                            </label>
                        </div>
                    </ControlSection>
                </div>
            </div>
        </main>
    );
}

function ControlSection({ title, icon, children }: any) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-lg">{icon}</div>
                <h3 className="text-xs font-black uppercase tracking-widest">{title}</h3>
            </div>
            {children}
        </div>
    );
}
