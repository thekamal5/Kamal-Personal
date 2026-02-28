"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import {
    Search,
    UserPlus,
    Shield,
    Trash2,
    MoreVertical,
    UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function UsersView() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    const { data: users, isLoading } = useQuery({
        queryKey: ['admin-users'],
        queryFn: () => api.get('/users').then(res => res.data),
    });

    const updateRoleMutation = useMutation({
        mutationFn: ({ id, role }: { id: string, role: string }) =>
            api.patch(`/users/${id}`, { role }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        }
    });

    const deleteUserMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/users/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        }
    });

    const filteredUsers = users?.filter((u: any) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <div className="p-20 text-center font-black opacity-20 animate-pulse">SYNCHRONIZING RECOGNITION...</div>;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-editorial">User Authority</h1>
                    <p className="text-slate-500 font-medium">Manage access levels and editorial identities.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm py-3 pl-10 pr-4 w-64 focus:ring-2 focus:ring-blue-600/10 transition-all font-inter"
                            placeholder="Find by name or email..."
                        />
                    </div>
                </div>
            </header>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Identity</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Access Level</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Registered</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {filteredUsers?.map((user: any) => (
                            <tr key={user.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                            {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full object-cover" /> : <UserCircle className="w-5 h-5 opacity-40" />}
                                        </div>
                                        <div>
                                            <span className="block text-sm font-black text-slate-900 dark:text-white">{user.name}</span>
                                            <span className="block text-xs font-medium text-slate-500">{user.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <select
                                        value={user.role}
                                        onChange={(e) => updateRoleMutation.mutate({ id: user.id, role: e.target.value })}
                                        className="bg-transparent text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 border-none focus:ring-0 cursor-pointer p-0"
                                    >
                                        <option value="SUPER_ADMIN">Super Admin</option>
                                        <option value="MANAGING_EDITOR">Managing Editor</option>
                                        <option value="SECTION_EDITOR">Section Editor</option>
                                        <option value="JOURNALIST">Journalist</option>
                                        <option value="CONTRIBUTOR">Contributor</option>
                                    </select>
                                </td>
                                <td className="p-6">
                                    <span className="text-xs font-bold text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</span>
                                </td>
                                <td className="p-6 text-right">
                                    <button
                                        onClick={() => { if (confirm('Exert absolute deletion on this identity?')) deleteUserMutation.mutate(user.id) }}
                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
