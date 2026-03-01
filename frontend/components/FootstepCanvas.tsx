"use client";

import { useEffect, useRef } from "react";

/* ────────────────────────────────────────────────────────────────────────────
   TYPES & CONFIG
──────────────────────────────────────────────────────────────────────────── */
interface FootPrint {
    id: string;
    x: number;
    y: number;
    angle: number;
    side: "L" | "R";
    born: number;
    scale: number;
}

const PRINT_LIFE_MS = 2800;  // Elegant, ephemeral life
const STEP_DELAY_MS = 380;   // Snappy but sequential
const FOOT_SCALE = 0.58;     // Refined size for elegance

/* ────────────────────────────────────────────────────────────────────────────
   EASING
──────────────────────────────────────────────────────────────────────────── */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* ────────────────────────────────────────────────────────────────────────────
   INTERACTIVE FOOTPRINT RENDERER
   Aesthetic: Minimalist, Futuristic, Floating Glow
   Shape: Matches the reference (Anatomic isolated toes)
──────────────────────────────────────────────────────────────────────────── */
function drawAntiGravityFootprint(
    ctx: CanvasRenderingContext2D,
    s: number,
    alpha: number,
    age: number
) {
    // 1. DYNAMIC FLOATING (Subtle upward drift + Sine oscillation)
    const normalizedAge = age / PRINT_LIFE_MS;
    const driftY = -normalizedAge * 25; // Drift upwards
    const swayX = Math.sin(age * 0.003) * 3;
    ctx.translate(swayX, driftY);

    // 2. GLOW AESTHETIC
    // Core color is a soft electric blue
    const coreColor = `rgba(180, 215, 255, ${alpha * 0.85})`;

    // Outer glow via shadow properties (Baking it in for maximum quality)
    ctx.shadowBlur = 18 * s;
    ctx.shadowColor = `rgba(130, 185, 255, ${alpha * 0.65})`;
    ctx.fillStyle = coreColor;

    // --- HEEL (Soft, irregular shape from reference) ---
    ctx.beginPath();
    ctx.ellipse(0, 24 * s, 10 * s, 12 * s, 0.08, 0, Math.PI * 2);
    ctx.fill();

    // --- ARCH & BALL (Narrow bridge, high-impact ball) ---
    ctx.beginPath();
    // Narrow arch
    ctx.ellipse(-2 * s, 4 * s, 5 * s, 14 * s, -0.1, 0, Math.PI * 2);
    // Broad ball
    ctx.ellipse(-5 * s, -16 * s, 15 * s, 12 * s, 0.06, 0, Math.PI * 2);
    ctx.fill();

    // --- TOES (5 separated orbits as per reference image) ---
    const TOES: [number, number, number, number][] = [
        [12 * s, -26 * s, 3.8 * s, 4.8 * s],   // Pinky
        [7 * s, -33 * s, 4.2 * s, 5.2 * s],
        [0 * s, -38 * s, 4.8 * s, 6 * s],
        [-8 * s, -41 * s, 5.2 * s, 6.8 * s],
        [-18 * s, -32 * s, 7.5 * s, 8.8 * s], // Big toe
    ];

    for (const [dx, dy, rx, ry] of TOES) {
        ctx.beginPath();
        ctx.ellipse(dx, dy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}

/* ────────────────────────────────────────────────────────────────────────────
   MAIN ENGINE
──────────────────────────────────────────────────────────────────────────── */
export function FootstepCanvas({ zIndex = 3 }: { zIndex?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const state = useRef({
        prints: [] as FootPrint[],
        isHovering: false,
        lastStrideTime: 0,
        rafId: 0,
        mouse: { x: 0, y: 0 }
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = canvas?.parentElement;
        if (!canvas || !parent) return;

        const ctx = canvas.getContext("2d", { alpha: true })!;
        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            canvas.width = parent.offsetWidth * dpr;
            canvas.height = parent.offsetHeight * dpr;
            canvas.style.width = `${parent.offsetWidth}px`;
            canvas.style.height = `${parent.offsetHeight}px`;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener("resize", resize);
        resize();

        const timers: NodeJS.Timeout[] = [];

        // One-time Striding Logic
        const triggerStride = (baseX: number, baseY: number) => {
            const now = Date.now();
            if (now - state.current.lastStrideTime < 3500) return;
            state.current.lastStrideTime = now;

            const strideCount = 3;
            for (let i = 0; i < strideCount; i++) {
                const timer = setTimeout(() => {
                    const side = i % 2 === 0 ? "R" : "L";
                    const angle = -Math.PI / 4;
                    const strideDist = i * 75;

                    state.current.prints.push({
                        id: Math.random().toString(36).substring(7),
                        x: baseX + Math.cos(angle) * strideDist + (side === "R" ? 24 : -24),
                        y: baseY + Math.sin(angle) * strideDist,
                        angle,
                        side,
                        born: Date.now(),
                        scale: FOOT_SCALE
                    });
                }, i * STEP_DELAY_MS);
                timers.push(timer);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = parent.getBoundingClientRect();
            state.current.mouse = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };

            // Trigger on initial entry
            if (!state.current.isHovering) {
                state.current.isHovering = true;
                triggerStride(state.current.mouse.x, state.current.mouse.y);
            }
        };

        const handleMouseLeave = () => {
            state.current.isHovering = false;
        };

        parent.addEventListener("mouseenter", handleMouseMove); // Ensure entry trigger
        parent.addEventListener("mousemove", handleMouseMove);
        parent.addEventListener("mouseleave", handleMouseLeave);

        const animate = () => {
            const now = Date.now();
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

            // RENDER PIPELINE
            state.current.prints = state.current.prints.filter(p => {
                const age = now - p.born;
                if (age > PRINT_LIFE_MS) return false;

                // ELEGANT FADE Easing
                const normalized = age / PRINT_LIFE_MS;
                let alpha = 0;

                // Fade In (Fast) / Fade Out (Slow)
                if (normalized < 0.2) {
                    alpha = normalized / 0.2;
                } else {
                    alpha = 1 - (normalized - 0.2) / 0.8;
                }

                // Final alpha cleanup via easing
                alpha = Math.max(0, easeOutCubic(alpha));

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle + Math.PI / 2);

                if (p.side === "L") ctx.scale(-1, 1);

                drawAntiGravityFootprint(ctx, p.scale, alpha, age);

                ctx.restore();
                return alpha > 0.001;
            });

            state.current.rafId = requestAnimationFrame(animate);
        };

        state.current.rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            parent.removeEventListener("mouseenter", handleMouseMove);
            parent.removeEventListener("mousemove", handleMouseMove);
            parent.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(state.current.rafId);
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none select-none transition-opacity duration-700"
            style={{ zIndex }}
        />
    );
}
