"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Play, MapPin, Compass, Camera } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, memo } from "react";
import { FootstepCanvas } from "./FootstepCanvas";

/* ─── Typing hook ─────────────────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 38, startDelay = 1800) {
    const [displayed, setDisplayed] = useState("");
    const [started, setStarted] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setStarted(true), startDelay);
        return () => clearTimeout(t);
    }, [startDelay]);
    useEffect(() => {
        if (!started) return;
        if (displayed.length >= text.length) return;
        const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
        return () => clearTimeout(t);
    }, [started, displayed, text, speed]);
    return { displayed, done: displayed.length === text.length };
}

/* ─── Floating particle (Memoized for efficiency) ─────────────────────────── */
const Particle = memo(({ x, y, size, delay, duration }: { x: number; y: number; size: number; delay: number; duration: number }) => {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: "rgba(255,255,255,0.15)" }}
            animate={{ y: [0, -24, 0], opacity: [0.15, 0.45, 0.15] }}
            transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
        />
    );
});

Particle.displayName = "Particle";

/* ─── Constants ───────────────────────────────────────────────────────────── */
const HEADLINE_WORDS = ["Follow", "My", "Footprints."];
const CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

const wordVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -35, filter: "blur(12px)" },
    visible: (i: number) => ({
        opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
        transition: { duration: 0.8, delay: 0.3 + i * 0.18, ease: CUBIC },
    }),
};

const PARTICLES = Array.from({ length: 40 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 4,
}));

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
export function Hero() {
    const { scrollY } = useScroll();
    const rawPhotoY = useTransform(scrollY, [0, 700], [0, 80]);
    const rawTextY = useTransform(scrollY, [0, 700], [0, 50]);
    const rawOpacity = useTransform(scrollY, [0, 380], [1, 0]);
    const photoY = useSpring(rawPhotoY, { stiffness: 80, damping: 22 });
    const textY = useSpring(rawTextY, { stiffness: 80, damping: 22 });

    const { displayed: tagline, done: taglineDone } = useTypewriter(
        "I observe people, places, ideas & change — reflecting on what they teach me.",
        36, 1700
    );

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">

            {/* ── BACKGROUND GRADIENT ── */}
            <div
                className="absolute inset-0 z-0"
                style={{ background: "linear-gradient(135deg, #0b0f35 0%, #1a237e 25%, #283593 50%, #3949ab 75%, #5c6bc0 100%)" }}
            />

            {/* ── RADIAL GLOWS ── */}
            <div className="absolute inset-0 z-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 55% 70% at 23% 55%, rgba(130,160,255,0.22) 0%, transparent 70%)" }}
            />
            <div className="absolute inset-0 z-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 55% 60% at 78% 45%, rgba(167,139,250,0.14) 0%, transparent 70%)" }}
            />

            {/* ── NOISE TEXTURE ── */}
            <div
                className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "128px 128px",
                }}
            />

            {/* ── DIAGONAL LIGHT STREAK ── */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.8, delay: 0.5, ease: CUBIC }}
                style={{ transformOrigin: "left center" }}
                className="absolute inset-0 z-0 pointer-events-none"
                aria-hidden
            >
                <div style={{
                    position: "absolute", top: "40%", left: "-5%", width: "110%", height: "1px",
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 75%, transparent 100%)",
                    transform: "rotate(-7deg)",
                }} />
            </motion.div>

            {/* ── MOUNTAIN SILHOUETTE ── */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
            >
                <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full" style={{ height: 160 }}>
                    <path d="M0 200 L180 95 L320 140 L500 55 L650 125 L800 72 L960 135 L1100 62 L1260 115 L1440 82 L1440 200 Z"
                        fill="rgba(20,29,107,0.30)" />
                    <path d="M0 200 L120 148 L240 175 L400 105 L560 158 L700 95 L880 158 L1020 100 L1200 152 L1380 115 L1440 135 L1440 200 Z"
                        fill="rgba(11,15,53,0.45)" />
                </svg>
            </motion.div>

            {/* ═══════════════════ CINEMATIC FOOTSTEP CANVAS ═══════════════════ */}
            {/* Sits above the background layers but behind the photo + text     */}
            <FootstepCanvas zIndex={5} />

            {/* ── FLOATING PARTICLES ── */}
            {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

            {/* ════════════════════ LEFT PANEL — PHOTO ════════════════════ */}
            <motion.div
                initial={{ opacity: 0, x: -60, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: CUBIC }}
                className="absolute left-0 top-0 bottom-0 z-10 hidden lg:flex items-center pointer-events-none"
                style={{ y: photoY, width: "46%" }}
            >
                {/* Decorative rings */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, delay: 0.6, ease: CUBIC }}
                    className="absolute"
                    style={{ inset: "10%", borderRadius: "40% 60% 55% 45% / 45% 50% 60% 40%", border: "1px solid rgba(255,255,255,0.10)" }}
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
                    className="absolute"
                    style={{ inset: "8%", borderRadius: "38% 62% 52% 48% / 48% 52% 58% 42%", border: "1px dashed rgba(255,255,255,0.07)" }}
                />

                {/* Photo frame */}
                <motion.div
                    className="relative mx-auto"
                    style={{ width: "78%", aspectRatio: "3/4", borderRadius: "28px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.10)" }}
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <img
                        src="/kamal-hero.jpg"
                        alt="Kamal Shrestha on a mountain summit"
                        className="w-full h-full object-cover object-center select-none"
                        draggable={false}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,15,53,0.82) 0%, rgba(11,15,53,0.30) 38%, transparent 65%)" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(11,15,53,0.45) 0%, transparent 40%)" }} />

                    {/* Location chip */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.5 }}
                        className="absolute bottom-5 left-5 right-5 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.18)" }}>
                            <MapPin className="w-3 h-3 text-blue-200" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Nepal Himalayas</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                            <Camera className="w-3 h-3 text-white/60" />
                            <span className="text-[10px] font-bold text-white/60">@kamal</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Stat card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 1.8, type: "spring", stiffness: 150 }}
                    className="absolute top-[18%] right-[4%] flex flex-col px-6 py-4 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.18)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
                >
                    <span className="text-xl font-black text-white italic tracking-tighter">Observing.</span>
                </motion.div>

                {/* Spinning compass */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 2.1, type: "spring", stiffness: 130 }}
                    className="absolute bottom-[22%] right-[2%] w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
                        <Compass className="w-5 h-5 text-blue-200/70" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* ── VERTICAL DIVIDER ── */}
            <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute left-[46%] top-20 bottom-20 w-px z-10 hidden lg:block pointer-events-none"
                aria-hidden
            >
                <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </motion.div>

            {/* ════════════════════ RIGHT PANEL — TEXT ════════════════════ */}
            <motion.div
                style={{ y: textY, opacity: rawOpacity }}
                className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-end"
            >
                <div className="w-full lg:w-[56%] xl:w-[52%] flex flex-col pt-28 pb-24 gap-0">

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-full border border-white/20 text-white"
                            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(10px)" }}
                        >
                            ✦ World From My Eyes
                        </span>
                        <div className="h-px w-8 bg-white/20" />
                        <span className="text-[10px] font-bold uppercase tracking-wide text-white/40">
                            {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <div className="mb-8" style={{ perspective: "900px" }}>
                        <h1
                            className="font-black tracking-tighter leading-[0.87] text-white flex flex-col gap-1"
                            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(3rem, 7vw, 6.8rem)" }}
                        >
                            {HEADLINE_WORDS.map((word, i) => (
                                <motion.span
                                    key={word}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="inline-block"
                                    style={i === 1 ? { color: "#c4ceff", fontStyle: "italic", position: "relative" } : {}}
                                >
                                    {word}
                                    {i === 1 && (
                                        <motion.span
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 1.1, delay: 1.0, ease: CUBIC }}
                                            className="absolute left-0 rounded-full"
                                            style={{ bottom: "4px", height: "3px", background: "linear-gradient(90deg, rgba(196,206,255,0.7), rgba(196,206,255,0))" }}
                                        />
                                    )}
                                </motion.span>
                            ))}
                        </h1>
                    </div>

                    {/* Typewriter tagline */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1.5 }}
                        className="mb-10"
                    >
                        <p
                            className="text-base sm:text-lg font-medium text-white/60 leading-relaxed max-w-sm border-l-2 border-white/20 pl-5"
                            style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)", minHeight: "3.5rem" }}
                        >
                            {tagline}
                            {!taglineDone && (
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.55, ease: (t: number) => Math.round(t) }}
                                    className="inline-block w-[2px] h-[1em] ml-[2px] bg-white/50 align-middle"
                                />
                            )}
                        </p>
                    </motion.div>

                    {/* Stat pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.75 }}
                        className="flex flex-wrap gap-3 mb-10"
                    >
                        {["Listening", "Observing", "Understanding"].map((word, i) => (
                            <motion.div
                                key={word}
                                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 + i * 0.12, ease: CUBIC }}
                                whileHover={{ scale: 1.06, y: -2 }}
                                className="flex flex-col px-6 py-4 rounded-2xl cursor-default"
                                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.13)" }}
                            >
                                <span className="text-lg font-black text-white italic tracking-tight">{word}.</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.1 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/stories">
                            <motion.button
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-black/25 hover:bg-blue-50 transition-colors duration-300"
                            >
                                Read My Stories
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </motion.button>
                        </Link>

                        <Link href="/visual">
                            <motion.button
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border font-bold text-xs uppercase tracking-widest text-white transition-all duration-300"
                                style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.20)" }}
                            >
                                <span className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                    style={{ background: "rgba(255,255,255,0.16)" }}>
                                    <Play className="w-3 h-3 fill-white" />
                                </span>
                                Watch Highlights
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Signature */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2.5 }}
                        className="mt-10 text-[11px] font-bold uppercase tracking-[0.22em] text-white/20"
                        style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
                    >
                        — Kamal Shrestha
                    </motion.p>
                </div>
            </motion.div>

            {/* ── SCROLL INDICATOR ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-[9px] font-black uppercase tracking-widest text-white/25">Scroll</span>
                <motion.div
                    animate={{ y: [0, 9, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
                />
            </motion.div>

        </section>
    );
}
