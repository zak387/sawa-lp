"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import WorkflowAnimation from "@/components/ui/WorkflowAnimation";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const reveal = (delay: number) => ({
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { delay, duration: 0.75, ease: EXPO_OUT } },
});

const fadeSlide = (delay: number) => ({
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.65, ease: EXPO_OUT } },
});

/* ── Aurora canvas background ─────────────────────────────────── */
function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.15, y: 0.3,  r: 0.45, h: 210, s: 0.65, l: 0.82, speed: 0.0008 },
      { x: 0.75, y: 0.6,  r: 0.4,  h: 195, s: 0.70, l: 0.80, speed: 0.0006 },
      { x: 0.5,  y: 0.15, r: 0.35, h: 225, s: 0.55, l: 0.85, speed: 0.001  },
      { x: 0.85, y: 0.2,  r: 0.3,  h: 200, s: 0.60, l: 0.82, speed: 0.0009 },
    ];

    const draw = () => {
      t += 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b, i) => {
        const ox = Math.sin(t * b.speed + i * 1.5) * 0.08;
        const oy = Math.cos(t * b.speed * 0.7 + i) * 0.06;
        const cx = (b.x + ox) * w;
        const cy = (b.y + oy) * h;
        const radius = b.r * Math.min(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `hsla(${b.h}, ${b.s * 100}%, ${b.l * 100}%, 0.55)`);
        grad.addColorStop(0.5, `hsla(${b.h}, ${b.s * 100}%, ${b.l * 100}%, 0.15)`);
        grad.addColorStop(1, `hsla(${b.h}, ${b.s * 100}%, ${b.l * 100}%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/* ── Animated grid ────────────────────────────────────────────── */
function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(27,72,196,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(27,72,196,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />
    </div>
  );
}


/* ── Floating stat cards ──────────────────────────────────────── */
function FloatCard({ label, value, sub, delay, style }: {
  label: string; value: string; sub: string; delay: number;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: EXPO_OUT }}
      style={{ position: "absolute", ...style }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3.5 + delay, ease: "easeInOut" }}
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(11,30,61,0.1)",
          borderRadius: 12,
          padding: "10px 14px",
          boxShadow: "0 8px 24px rgba(11,30,61,0.08)",
          minWidth: 120,
        }}
      >
        <div style={{ fontSize: 10, color: "#6485A8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#0B1E3D", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 9, color: "rgba(11,30,61,0.4)", marginTop: 2 }}>{sub}</div>
      </motion.div>
    </motion.div>
  );
}

/* ── Logo marquee data ────────────────────────────────────────── */
const logos = [
  {
    name: "Shopify",
    color: "#96BF48",
    svg: (
      <svg viewBox="0 0 109 124" style={{ width: 28, height: 28, fill: "#96BF48" }}>
        <path d="M74.7 14.8s-1.4.4-3.7 1.1c-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5-2-2.2-4.6-3.2-7.7-3.1-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5C9.3 41 0 111.3 0 111.3l75.6 13.1V14.5c-.3.1-.6.2-.9.3zm-17 5.2c-4 1.2-8.4 2.6-12.7 3.9 1.2-4.7 3.6-9.4 6.4-12.5 1.1-1.1 2.6-2.4 4.3-3.1 1.7 3.4 2 8.2 2 11.7zm-8.4-15.7c1.4 0 2.6.3 3.6.9-1.6.8-3.2 2.1-4.7 3.6-3.8 4.1-6.7 10.5-7.9 16.6-3.6 1.1-7.2 2.2-10.5 3.2 1.9-9.4 9.5-23.9 19.5-24.3zm-4.9 52.9c.4 6.4 17.3 7.8 18.3 22.9.7 11.9-6.3 20-16.4 20.6-12.2.8-18.9-6.4-18.9-6.4l2.6-11s6.7 5.1 12.1 4.7c3.5-.2 4.8-3.1 4.7-5.1-.5-8.4-14.3-7.9-15.2-21.7-.8-11.6 6.9-23.4 23.7-24.5 6.5-.4 9.8 1.2 9.8 1.2l-3.8 14.4s-4.3-2-9.4-1.6c-7.4.5-7.5 5.2-7.5 6.5zm26.7-38.5c0-3.2-.4-7.7-1.8-11.5 4.6.9 6.8 6 7.8 9.1-1.8.6-3.8 1.3-6 1.9v.5z"/>
      </svg>
    ),
    wordmark: "Shopify",
  },
  {
    name: "Klaviyo",
    color: "#1A1A1A",
    svg: null,
    wordmark: "Klaviyo",
  },
  {
    name: "HubSpot",
    color: "#FF7A59",
    svg: (
      <svg viewBox="0 0 512 512" style={{ width: 28, height: 28, fill: "#FF7A59" }}>
        <path d="M309.1 205.4V156c11.3-5.5 19.1-17.2 19.1-30.8V124c0-18.9-15.3-34.2-34.2-34.2h-1.2c-18.9 0-34.2 15.3-34.2 34.2v1.2c0 13.6 7.8 25.3 19.1 30.8v49.4c-16.2 2.5-31.3 9-44.2 19.1L111.6 120.9c.9-3.1 1.4-6.3 1.4-9.7 0-21.3-17.3-38.6-38.6-38.6S35.8 89.9 35.8 111.2s17.3 38.6 38.6 38.6c7.3 0 14.2-2 20-5.5l118 101.3c-11.1 16.4-17.6 36.2-17.6 57.5 0 21.9 6.8 42.2 18.5 58.9l-34.9 34.9c-2.8-1-5.8-1.6-8.9-1.6-15.1 0-27.4 12.3-27.4 27.4s12.3 27.4 27.4 27.4 27.4-12.3 27.4-27.4c0-3.1-.5-6.1-1.6-8.9l34.6-34.6c17.1 12.4 38.1 19.7 60.8 19.7 57.2 0 103.5-46.3 103.5-103.5-.1-49.7-35.1-91.4-82.1-101.6zm-21 154.3c-29.8 0-53.9-24.1-53.9-53.9s24.1-53.9 53.9-53.9 53.9 24.1 53.9 53.9-24.1 53.9-53.9 53.9z"/>
      </svg>
    ),
    wordmark: "HubSpot",
  },
  {
    name: "Stripe",
    color: "#635BFF",
    svg: (
      <svg viewBox="0 0 60 25" style={{ width: 50, height: 20, fill: "#635BFF" }}>
        <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 01-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.23c0-1.85-1.07-2.58-2.06-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 013.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.03 6.26c.4.44.98.78 1.94.78 1.52 0 2.54-1.65 2.54-3.9 0-2.18-1.04-3.95-2.54-3.95zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.87zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 01-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 01-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 00-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.87z"/>
      </svg>
    ),
    wordmark: "Stripe",
  },
  {
    name: "Mailchimp",
    color: "#FFE01B",
    svg: (
      <svg viewBox="0 0 80 80" style={{ width: 30, height: 30 }}>
        <rect width="80" height="80" rx="16" fill="#FFE01B"/>
        <path fill="#241C15" d="M55.2 42.8c-1.1-.5-2.2-.6-3.2-.4-.2-.8-.5-1.6-.9-2.4-1.9-3.9-6.6-7.8-13.9-6.8-2.5.4-4.6 1.3-6.2 2.8-1.4-.7-2.9-1.2-4.6-1.4-1.7-2.2-2.6-4.9-2.3-7.3.3-3 2.2-5.3 5.3-6.6 5.4-2.2 12.9-.7 16.3 3.2l.4.4.5-.2c.1 0 5.3-1.6 8.7 1.4 1.7 1.5 2.5 3.9 2.2 7.2 0 .4.1.8.4 1.1.3.3.7.4 1.1.3 1.1-.2 2 .1 2.4.9.6 1-.2 2.5-1 3.8-1.3 1.4-3.3 2.4-5.2 2z"/>
        <ellipse cx="40" cy="50" rx="14" ry="10" fill="#FF9B00" opacity=".3"/>
      </svg>
    ),
    wordmark: "Mailchimp",
  },
  {
    name: "Attentive",
    color: "#6B3FA0",
    svg: null,
    wordmark: "Attentive",
  },
  {
    name: "Drip",
    color: "#EA4B35",
    svg: null,
    wordmark: "Drip",
  },
  {
    name: "Recharge",
    color: "#5A31F4",
    svg: null,
    wordmark: "Recharge",
  },
  {
    name: "Gorgias",
    color: "#1F3C88",
    svg: null,
    wordmark: "Gorgias",
  },
  {
    name: "Yotpo",
    color: "#0070F3",
    svg: null,
    wordmark: "Yotpo",
  },
  {
    name: "LoyaltyLion",
    color: "#F4821F",
    svg: null,
    wordmark: "LoyaltyLion",
  },
  {
    name: "Okendo",
    color: "#13C2C2",
    svg: null,
    wordmark: "Okendo",
  },
];

/* ── Logo marquee ─────────────────────────────────────────────── */
function LogoMarquee() {
  const track = [...logos, ...logos]; // doubled for seamless loop

  return (
    <div className="relative w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          width: "max-content",
          animation: "marquee 32s linear infinite",
        }}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
              opacity: 0.6,
              transition: "opacity 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.6")}
          >
            {logo.svg && logo.svg}
            <span style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: logo.color,
              whiteSpace: "nowrap",
            }}>
              {logo.wordmark}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });
  const orb1X = useTransform(springX, [0, 1], ["-5%", "15%"]);
  const orb1Y = useTransform(springY, [0, 1], ["-10%", "10%"]);
  const orb2X = useTransform(springX, [0, 1], ["85%", "65%"]);
  const orb2Y = useTransform(springY, [0, 1], ["55%", "35%"]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-5 md:px-8 lg:px-10 overflow-hidden"
      aria-label="Hero"
    >
      {/* Layers */}
      <AuroraBackground />
      <GridBackground />

      {/* Mouse-tracking orbs */}
      <motion.div className="absolute pointer-events-none" style={{ left: orb1X, top: orb1Y, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(27,72,196,0.08) 0%, transparent 65%)" }} />
      <motion.div className="absolute pointer-events-none" style={{ left: orb2X, top: orb2Y, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 65%)" }} />

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Left col */}
          <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: EXPO_OUT }} className="mb-8 inline-flex">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{ background: "rgba(27,72,196,0.06)", borderColor: "rgba(27,72,196,0.15)" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: "#38BDF8" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#38BDF8" }} />
                </span>
                <span className="text-xs font-medium" style={{ color: "#1B48C4", letterSpacing: "0.02em" }}>
                  Email marketing for growing brands
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-1">
              <motion.h1 initial="hidden" animate="visible" variants={reveal(0.3)}
                className="font-display text-display-1" style={{ color: "#0B1E3D" }}>
                Sawa helps brands
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1 initial="hidden" animate="visible" variants={reveal(0.45)}
                className="font-display text-display-1" style={{ color: "#0B1E3D" }}>
                turn email into{" "}
                <span style={{ color: "#38BDF8" }}>
                  predictable revenue.
                </span>
              </motion.h1>
            </div>

            {/* Sub */}
            <motion.p initial="hidden" animate="visible" variants={fadeSlide(0.65)}
              className="text-body-lg max-w-[480px] mb-10" style={{ color: "rgba(11,30,61,0.55)" }}>
              We build, write, segment, and optimise lifecycle email systems for ambitious brands - combining human copywriting with AI-native workflows.
            </motion.p>

            {/* CTAs */}
            <motion.div initial="hidden" animate="visible" variants={fadeSlide(0.78)}
              className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="#contact" className="btn-signal text-sm">
                Get a free email audit <ArrowRight />
              </Link>
              <Link href="#how-we-work" className="btn-ghost text-sm">
                See how we work <ArrowRight />
              </Link>
            </motion.div>

            {/* Proof + marquee */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6, ease: EXPO_OUT }}>
              <hr className="rule mb-5" />
              <p className="text-caption-label mb-5" style={{ color: "#6485A8" }}>
                Trusted by brands doing <span style={{ color: "#1B48C4" }}>$5M–$100M+ in revenue</span>
              </p>
              <LogoMarquee />
            </motion.div>
          </div>

          {/* Right col — workflow animation + floating stat cards */}
          <div className="hidden lg:block relative" style={{ minHeight: 540 }}>
            <WorkflowAnimation />

            {/* Floating stat cards — positioned around the network graph */}
            <FloatCard label="Revenue share" value="38%" sub="up from 18% at start" delay={1.2}
              style={{ top: 14, right: -18 }} />
            <FloatCard label="Avg. ROI" value="4.2×" sub="on Sawa programme spend" delay={1.45}
              style={{ top: 160, left: -44 }} />
            <FloatCard label="Time to live" value="30d" sub="audit to running flows" delay={1.6}
              style={{ bottom: 68, right: -18 }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(10,37,32,0.25)" }} aria-hidden="true">
        <motion.div
          style={{ width: 1, height: 32, background: "rgba(10,37,32,0.15)", borderRadius: 1 }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>scroll</span>
      </motion.div>
    </section>
  );
}
