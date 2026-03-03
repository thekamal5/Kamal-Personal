"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Youtube,
    ArrowUpRight,
    Send
} from "lucide-react";

/**
 * SOCIAL MEDIA LINKS
 */
const SOCIALS = [
    { name: "Facebook", href: "https://www.facebook.com/findkamal", icon: Facebook },
    { name: "Instagram", href: "https://www.instagram.com/findkamalshrestha/", icon: Instagram },
    { name: "Twitter", href: "https://x.com/petalsofkamal", icon: Twitter },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/findkamalshrestha/", icon: Linkedin },
    {
        name: "TikTok", href: "https://www.tiktok.com/@findkamalshrestha", icon: (props: any) => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
        )
    },
    { name: "YouTube", href: "https://www.youtube.com/@findkamal", icon: Youtube },
];

export function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#0b0f35] border-t border-white/5 pt-32 pb-16">

            {/* ── CINEMATIC BACKGROUND GLOWS ── */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 flex flex-col items-center text-center">

                {/* ── BRAND IDENTITY ── */}
                <div className="mb-10">
                    <Link href="/" className="inline-block group">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-[20px] overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                                <img
                                    src="/logo.jpg"
                                    alt="KS Logo"
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                            <span className="text-4xl font-black tracking-tighter text-white">
                                Kamal<span className="text-blue-400">.</span>
                            </span>
                        </div>
                    </Link>
                </div>

                {/* ── TAGLINE ── */}
                <p className="text-2xl md:text-3xl font-medium text-white/50 leading-relaxed max-w-2xl mb-12 text-center">
                    Stories from the road, the field, and <br className="hidden md:block" />
                    everyday life — written from experience.
                </p>

                {/* ── SOCIALS ── */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {SOCIALS.map((soc) => (
                        <motion.a
                            key={soc.name}
                            href={soc.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -4, scale: 1.05 }}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                            aria-label={soc.name}
                        >
                            <soc.icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                        </motion.a>
                    ))}
                </div>

                {/* ── DIVIDER & COPYRIGHT ── */}
                <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/15">
                        © 2026 KAMAL SHRESTHA MEDIA
                    </p>

                    <div className="flex items-center gap-10">
                        <Link href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">
                            Back to Top <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="group flex items-center gap-3 text-sm font-bold text-white/40 hover:text-white transition-all duration-300"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-all duration-300" />
                {children}
            </Link>
        </li>
    );
}
