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

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

                {/* ── MAIN GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-24">

                    {/* Brand Section */}
                    <div className="md:col-span-12 lg:col-span-5">
                        <Link href="/" className="inline-block group mb-8">
                            <span className="text-4xl font-black tracking-tighter text-white">
                                KS<span className="text-blue-400">.</span>
                            </span>
                        </Link>
                        <p className="text-xl font-medium text-white/50 leading-relaxed max-w-md mb-12" style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}>
                            Exploring the intersection of cinematic storytelling,
                            human experiences, and digital transformation.
                        </p>

                        {/* Social Links */}
                        <div className="flex flex-wrap gap-4">
                            {SOCIALS.map((soc) => (
                                <motion.a
                                    key={soc.name}
                                    href={soc.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -4, scale: 1.05 }}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                                    aria-label={soc.name}
                                >
                                    <soc.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="md:col-span-4 lg:col-span-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8">Narratives</h4>
                        <ul className="space-y-5">
                            <FooterLink href="/archive">Archive</FooterLink>
                            <FooterLink href="/videos">Videos</FooterLink>
                            <FooterLink href="/opinions">Opinions</FooterLink>
                            <FooterLink href="/about">About Me</FooterLink>
                        </ul>
                    </div>

                    <div className="md:col-span-4 lg:col-span-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8">System</h4>
                        <ul className="space-y-5">
                            <FooterLink href="/admin/login">Editorial Gate</FooterLink>
                            <FooterLink href="#">Work with Me</FooterLink>
                            <FooterLink href="#">Privacy Policy</FooterLink>
                            <FooterLink href="#">Newsletter</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8">Direct Access</h4>
                        <p className="text-sm font-medium text-white/40 mb-8 leading-relaxed italic">Deep dives into my latest stories, delivered directly to you.</p>

                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="narrative@ks.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                            <button className="absolute right-2 top-2 bottom-2 px-5 bg-white text-slate-900 rounded-xl flex items-center gap-2 hover:bg-blue-50 transition-colors group">
                                <span className="text-[10px] font-black uppercase tracking-widest">Join</span>
                                <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── BOTTOM BAR ── */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/15">
                            © 2026 KAMAL SHRESTHA MEDIA
                        </p>
                        <p className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                            Based in Nepal • Global Narrative
                        </p>
                    </div>

                    <div className="flex items-center gap-10">
                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">
                            RSS Feed
                        </Link>
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
