"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Menu, X, PlayCircle, Newspaper, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { name: "Archive", href: "/archive", icon: <Newspaper className="w-4 h-4" /> },
    { name: "Videos", href: "/videos", icon: <PlayCircle className="w-4 h-4" /> },
    { name: "Opinions", href: "/opinions", icon: <User className="w-4 h-4" /> },
    { name: "About", href: "/about", icon: <Settings className="w-4 h-4" /> },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
    const headerBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            style={{ opacity: headerOpacity, backdropFilter: headerBlur }}
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
                scrolled ? "bg-white/80 dark:bg-slate-900/80 shadow-sm border-b" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-300">
                            KS<span className="text-black dark:text-white">.</span>
                        </span>
                        <div className="flex flex-col leading-none">
                            <span className="text-xs font-bold tracking-widest uppercase opacity-60">Kamal</span>
                            <span className="text-sm font-black uppercase">Shrestha</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group flex items-center gap-2 text-sm font-semibold tracking-wide hover:text-blue-600 transition-colors duration-300"
                            >
                                <span className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300">
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        ))}
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-4" />
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-300">
                            <Search className="w-5 h-5 text-slate-500" />
                        </button>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                            <Search className="w-5 h-5 text-slate-500" />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-700 dark:text-slate-200"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
                >
                    <div className="px-4 py-8 space-y-6">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 text-xl font-bold p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                            >
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                                    {item.icon}
                                </div>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}
