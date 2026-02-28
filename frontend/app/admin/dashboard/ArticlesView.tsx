"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import {
    Search,
    Plus,
    CheckCircle,
    Clock,
    FileText,
    AlertCircle,
    ExternalLink,
    Trash2,
    Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

export function ArticlesView() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    const { data: posts, isLoading } = useQuery({
        queryKey: ['admin-posts'],
        queryFn: () => api.get('/posts?status=all').then(res => res.data),
    });

    const deletePostMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/posts/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
        }
    });

    const filteredPosts = posts?.filter((p: any) =>
        p.headline.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <div className="p-20 text-center font-black opacity-20 animate-pulse">RECONSTRUCTING NARRATIVES...</div>;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-editorial">Content Engine</h1>
                    <p className="text-slate-500 font-medium">Manage editorial workflows and system slots.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm py-3 pl-10 pr-4 w-64 focus:ring-2 focus:ring-blue-600/10 transition-all font-inter"
                            placeholder="Find narratives..."
                        />
                    </div>
                    <Link href="/admin/posts/new" className="px-6 py-3 bg-blue-600 hover:bg-black text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20">
                        <Plus size={18} />
                        New Content
                    </Link>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Live Stories" count={posts?.filter((p: any) => p.status === 'PUBLISHED').length || 0} icon={<CheckCircle className="text-green-500" />} />
                <StatCard label="In Review" count={posts?.filter((p: any) => p.status === 'REVIEW').length || 0} icon={<Clock className="text-orange-500" />} />
                <StatCard label="Drafts" count={posts?.filter((p: any) => p.status === 'DRAFT').length || 0} icon={<FileText className="text-blue-500" />} />
                <StatCard label="Total Reach" count="1.2M" icon={<AlertCircle className="text-red-500" />} />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Headline</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Section</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Status</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {filteredPosts?.map((post: any) => (
                            <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="p-6">
                                    <span className="block text-sm font-bold truncate max-w-xs">{post.headline}</span>
                                    <span className="block text-[10px] font-medium opacity-40 mt-1">{post.slug}</span>
                                </td>
                                <td className="p-6">
                                    <span className="text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded uppercase tracking-widest">{post.category?.name}</span>
                                </td>
                                <td className="p-6">
                                    <StatusBadge status={post.status} />
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/posts/${post.slug}`} target="_blank" className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-blue-600 transition-all border border-transparent">
                                            <Eye size={14} />
                                        </Link>
                                        <button className="px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg text-[10px] font-black uppercase tracking-widest">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { if (confirm('Purge this narrative?')) deletePostMutation.mutate(post.id) }}
                                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatCard({ label, count, icon }: any) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl">{icon}</div>
                <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Live</span>
            </div>
            <div className="text-3xl font-black mb-1">{count}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        PUBLISHED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        DRAFT: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
        REVIEW: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        ARCHIVED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return (
        <span className={cn("text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest", styles[status] || styles.DRAFT)}>
            {status}
        </span>
    );
}
