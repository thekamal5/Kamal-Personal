"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, MapPin } from "lucide-react";

export function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 700], [0, 140]);
    const textY = useTransform(scrollY, [0, 700], [0, 60]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">

            {/* ── BACKGROUND: Full gradient matching the photo ── */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "linear-gradient(118deg, #f0f2ff 0%, #dce1fb 18%, #aab3f0 38%, #6677e8 58%, #3b52e0 76%, #2535b8 100%)",
                }}
            />

            {/* ── NOISE TEXTURE for depth ── */}
            <div
                className="absolute inset-0 z-0 opacity-[0.04]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "128px 128px",
                }}
            />

            {/* ── PHOTO: Kamal on the left (save your photo as /public/kamal-hero.png) ── */}
            <motion.div
                style={{ y }}
                className="absolute bottom-0 left-0 h-[105%] w-[55%] z-10 pointer-events-none"
            >
                <img
                    src="/kamal-hero.png"
                    alt="Kamal Shrestha"
                    className="h-full w-full object-contain object-bottom select-none"
                    style={{ objectPosition: "left bottom" }}
                    draggable={false}
                />
                {/* Soft fade on the right edge of photo so it blends into gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(59,82,224,0.55)]" />
            </motion.div>

            {/* ── DECORATIVE: vertical rule line ── */}
            <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute left-1/2 top-20 bottom-20 w-px bg-white/10 z-10 hidden lg:block"
            />

            {/* ── FLOATING LOCATION BADGE ── */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute top-36 right-8 lg:right-16 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
            >
                <MapPin className="w-3 h-3 text-blue-200" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Documenting the world</span>
            </motion.div>

            {/* ── MAIN CONTENT: RIGHT side ── */}
            <motion.div
                style={{ y: textY, opacity }}
                className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-end"
            >
                <div className="w-full lg:w-[52%] xl:w-[50%] flex flex-col gap-8 lg:gap-10 pt-28 pb-20">

                    {/* ── LABEL ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex items-center gap-3"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-white/15 backdrop-blur-md text-white rounded-full border border-white/20">
                            Personal Journal
                        </span>
                        <div className="h-px w-10 bg-white/30" />
                        <span className="text-[10px] font-bold uppercase tracking-wide text-white/50">
                            {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
                        </span>
                    </motion.div>

                    {/* ── HEADLINE ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.35 }}
                    >
                        <h1
                            className="font-black tracking-tighter leading-[0.88] text-white"
                            style={{
                                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                            }}
                        >
                            Follow
                            <br />
                            <span
                                className="italic relative inline-block"
                                style={{ color: "#c1ccff" }}
                            >
                                My
                                {/* Underline accent */}
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.2, delay: 1.1 }}
                                    className="absolute bottom-1 left-0 h-[3px] rounded-full"
                                    style={{
                                        background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0))",
                                    }}
                                />
                            </span>
                            <br />
                            Footprints.
                        </h1>
                    </motion.div>

                    {/* ── TAGLINE ── */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.55 }}
                        className="text-base sm:text-lg font-medium text-white/65 leading-relaxed max-w-md border-l-2 border-white/25 pl-5"
                        style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                    >
                        I observe people, places, ideas, and change — reflecting on what they teach me along the way.
                    </motion.p>

                    {/* ── STAT PILLS ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="flex flex-wrap gap-4"
                    >
                        {[
                            { num: "120+", label: "Stories Written" },
                            { num: "40+", label: "Places Visited" },
                            { num: "10yrs", label: "On the Road" },
                        ].map(({ num, label }) => (
                            <div
                                key={label}
                                className="flex flex-col px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15"
                            >
                                <span className="text-xl font-black text-white">{num}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* ── CTA BUTTONS ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.85 }}
                        className="flex flex-col sm:flex-row gap-4 pt-2"
                    >
                        <button
                            className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 font-black uppercase text-xs tracking-widest rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg shadow-black/20"
                        >
                            Read My Story
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                        <button
                            className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/25 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all duration-300"
                        >
                            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <Play className="w-3 h-3 fill-white" />
                            </span>
                            Watch Highlights
                        </button>
                    </motion.div>

                </div>
            </motion.div>

            {/* ── BOTTOM SCROLL HINT ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
                />
            </motion.div>

        </section>
    );
}
