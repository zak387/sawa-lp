"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";
import TiltCard from "@/components/ui/TiltCard";
import Link from "next/link";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

function useCountUp(target: number, duration: number, shouldStart: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    let frame: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setValue(target);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, shouldStart]);
  return value;
}

function StatItem({ prefix, value, suffix, label, context, inView }: {
  prefix?: string; value: number; suffix: string; label: string; context: string; inView: boolean;
}) {
  const n = useCountUp(value, 1600, inView);
  return (
    <motion.div variants={fadeUp}>
      <div className="font-display font-light mb-2 tabular-nums"
        style={{ fontSize: "clamp(2.75rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#EEF4FF" }}
        aria-label={`${prefix ?? ""}${value}${suffix} - ${label}`}>
        {prefix && <span style={{ color: "rgba(238,244,255,0.45)", fontSize: "0.6em" }}>{prefix}</span>}
        {n.toLocaleString()}
        <span style={{ color: "#38BDF8" }}>{suffix}</span>
      </div>
      <p className="text-sm font-medium mb-1" style={{ color: "#EEF4FF", letterSpacing: "-0.01em" }}>{label}</p>
      <p className="text-xs" style={{ color: "rgba(238,244,255,0.45)", lineHeight: "1.6" }}>{context}</p>
    </motion.div>
  );
}

const stats = [
  { prefix: "$", value: 47, suffix: "M+", label: "Revenue generated from email", context: "Total attributed across all active client programmes since 2022" },
  { value: 38, suffix: "%", label: "Average email revenue share", context: "Up from ~18% at programme start. Measured at 6 months" },
  { value: 4, suffix: ".2×", label: "Average return on Sawa spend", context: "Revenue generated vs. total programme cost. Across all clients" },
];

const testimonials = [
  {
    quote: "Before Sawa, email was 14% of our revenue. They rebuilt our welcome series, post-purchase flow, and win-back from scratch - in three weeks. Six months later email is 38% of revenue and growing.",
    name: "Sarah K.",
    title: "Founder",
    company: "8-figure fashion brand",
    result: "14% → 38% email revenue share",
  },
  {
    quote: "The copy alone was worth it. Every other agency we tried sent emails that didn't sound like us. Sawa's writers got our voice immediately - and our open rates went from 18% to 34% in the first 60 days.",
    name: "Marcus T.",
    title: "CMO",
    company: "DTC wellness brand, $22M ARR",
    result: "18% → 34% open rate in 60 days",
  },
  {
    quote: "Their abandoned cart sequence generates $40K a month consistently. We had a three-email sequence before. They rebuilt it with personalisation logic based on what was in the cart. The difference was immediate.",
    name: "Priya M.",
    title: "Head of Growth",
    company: "Beauty brand, $18M ARR",
    result: "$40K/month from cart abandon alone",
  },
];

const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-5 md:px-8 lg:px-10 overflow-hidden" style={{ background: "#060E20" }} aria-label="Results">

      {/* Glowing grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Glowing orbs */}
      <motion.div className="absolute pointer-events-none"
        style={{ left: "-10%", top: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(27,72,196,0.18) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{ right: "-5%", bottom: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
      />

      {/* Ghost number typography */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {["$47M", "38%", "4.2×", "30d"].map((txt, i) => (
          <motion.div key={txt}
            className="absolute font-display font-light"
            style={{
              fontSize: "clamp(4rem, 8vw, 9rem)",
              color: "rgba(238,244,255,0.025)",
              letterSpacing: "-0.05em",
              left: `${[5, 30, 58, 80][i]}%`,
              top: `${[10, 55, 20, 65][i]}%`,
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 7 + i * 1.5, ease: "easeInOut", delay: i * 0.8 }}
          >
            {txt}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.08)} className="mb-16">
          <motion.div variants={fadeUp} className="section-label-light mb-6">Results</motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-display-2 max-w-[560px]" style={{ color: "#EEF4FF" }}>
            Revenue numbers. Not open rates.
          </motion.h2>
        </motion.div>

        {/* Stats */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.12, 0.1)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 mb-10 pb-10 border-b" style={{ borderColor: "rgba(238,244,255,0.1)" }}>
          {stats.map((s) => <StatItem key={s.label} {...s} inView={inView} />)}
        </motion.div>

        {/* Inline CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16 py-6 px-6 rounded-2xl"
          style={{ background: "rgba(238,244,255,0.05)", border: "1px solid rgba(238,244,255,0.1)" }}>
          <p className="text-sm" style={{ color: "rgba(238,244,255,0.6)" }}>
            These are real results from real programmes.{" "}
            <span style={{ color: "#EEF4FF", fontWeight: 500 }}>Yours starts with a free audit.</span>
          </p>
          <Link href="#contact"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200"
            style={{ background: "#1B48C4", color: "#FFFFFF" }}>
            Request an audit <ArrowRight />
          </Link>
        </motion.div>

        {/* Testimonials */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp}>
              <TiltCard className="p-7 md:p-8 flex flex-col justify-between gap-7 h-full rounded-xl"
                style={{ background: "rgba(238,244,255,0.05)", border: "1px solid rgba(238,244,255,0.1)" }}>
                <blockquote>
                  <p className="text-sm" style={{ color: "rgba(238,244,255,0.65)", lineHeight: "1.82" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium mb-4"
                    style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.25)", color: "#38BDF8" }}>
                    {t.result}
                  </div>
                  <div className="pt-4 border-t" style={{ borderColor: "rgba(238,244,255,0.1)" }}>
                    <p className="text-sm font-medium" style={{ color: "#EEF4FF", letterSpacing: "-0.01em" }}>{t.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(238,244,255,0.4)" }}>{t.title}, {t.company}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
