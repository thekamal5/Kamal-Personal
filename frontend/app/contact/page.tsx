"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 font-sans">
            <Navbar />

            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-xl"
                    >
                        <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-6 block">Get in Touch</span>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 italic">
                            Let's Connect
                        </h1>
                        <p className="text-2xl text-slate-500 font-medium leading-tight mb-12">
                            Open for collaborations, professional fieldwork inquiries, and meaningful conversations.
                        </p>

                        <div className="space-y-8">
                            <ContactMethod
                                icon={<Mail className="w-6 h-6" />}
                                label="Email"
                                value="hello@kamalshrestha.com.np"
                                href="mailto:hello@kamalshrestha.com.np"
                            />
                            <ContactMethod
                                icon={<MapPin className="w-6 h-6" />}
                                label="Based in"
                                value="Kathmandu, Nepal"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-50 dark:bg-slate-900 p-12 rounded-[40px] border border-slate-100 dark:border-slate-800"
                    >
                        <form className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl p-6 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                    placeholder="Your Full Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl p-6 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Message</label>
                                <textarea
                                    rows={5}
                                    className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl p-6 focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none"
                                    placeholder="Tell me about your project or inquiry..."
                                />
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white p-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all hover:scale-[1.02]">
                                Send Message
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

function ContactMethod({ icon, label, value, href }: any) {
    const Wrapper = href ? "a" : "div";
    return (
        <Wrapper
            href={href}
            className="flex items-center gap-6 group cursor-pointer"
        >
            <div className="p-4 bg-slate-100 dark:bg-slate-800 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <span className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{label}</span>
                <span className="block text-xl font-bold text-slate-900 dark:text-white">{value}</span>
            </div>
        </Wrapper>
    );
}
