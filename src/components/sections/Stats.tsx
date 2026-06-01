"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";
import Link from "next/link";
import TiltCard from "@/components/ui/TiltCard";

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

interface StatProps {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  context: string;
  shouldAnimate: boolean;
}

function Stat({ prefix, value, suffix, label, context, shouldAnimate }: StatProps) {
  const n = useCountUp(value, 1600, shouldAnimate);
  return (
    <motion.div variants={fadeUp}>
      <div
        className="font-display font-light mb-2 tabular-nums"
        style={{ fontSize: "clamp(2.75rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F4F2EE" }}
        aria-label={`${prefix ?? ""}${value}${suffix} — ${label}`}
      >
        {prefix && <span style={{ color: "#C8FF57", fontSize: "0.6em" }}>{prefix}</span>}
        {n.toLocaleString()}
        <span style={{ color: "#C8FF57" }}>{suffix}</span>
      </div>
      <p className="text-sm font-medium mb-1" style={{ color: "#F4F2EE", letterSpacing: "-0.01em" }}>{label}</p>
      <p className="text-xs" style={{ color: "#4A4A50", lineHeight: "1.6" }}>{context}</p>
    </motion.div>
  );
}

interface CaseCardProps {
  category: string;
  headline: string;
  tags: string[];
  metric: string;
  before: string;
  after: string;
}

function CaseCard({ category, headline, tags, metric, before, after }: CaseCardProps) {
  return (
    <motion.div variants={fadeUp}>
    <TiltCard className="card-surface p-6 md:p-8 flex flex-col gap-6 group cursor-pointer">
      <div>
        <div className="section-label mb-4">{category}</div>
        <h3 className="font-display font-light text-heading-2 mb-4" style={{ color: "#F4F2EE" }}>{headline}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(28,28,31,0.9)", border: "1px solid #343438", color: "#8A8680" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div>
        {/* Before / After */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b" style={{ borderColor: "#252528" }}>
          <div>
            <p className="text-caption-label mb-1" style={{ color: "#4A4A50" }}>Before</p>
            <p className="text-sm font-medium" style={{ color: "#8A8680" }}>{before}</p>
          </div>
          <div style={{ color: "#252528" }}>→</div>
          <div>
            <p className="text-caption-label mb-1" style={{ color: "#4A4A50" }}>After</p>
            <p className="text-sm font-medium" style={{ color: "#C8FF57" }}>{after}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: "#4A4A50" }}>{metric}</p>
          <div className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 group-hover:gap-2.5" style={{ color: "#8A8680" }}>
            Read case study
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </TiltCard>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats: StatProps[] = [
    { prefix: "$", value: 47, suffix: "M+", label: "Email revenue generated", context: "Total attributed across all active client programs since 2022", shouldAnimate: inView },
    { value: 38, suffix: "%", label: "Average email share of revenue", context: "Up from ~18% at programme start. Measured at 6 months", shouldAnimate: inView },
    { value: 4, suffix: ".2×", label: "Average return on Sawa spend", context: "Revenue generated vs. total programme cost. Across all clients", shouldAnimate: inView },
  ];

  const cases: CaseCardProps[] = [
    {
      category: "Fashion · $28M ARR",
      headline: "$2.3M in email revenue, 14 months",
      tags: ["Lifecycle Build", "Segmentation", "Copywriting"],
      metric: "Programme started with zero flows in Klaviyo",
      before: "Email = 11% of revenue",
      after: "Email = 39% of revenue",
    },
    {
      category: "Beauty · $45M ARR",
      headline: "Welcome flow alone generates $180K/month",
      tags: ["Welcome Series", "Post-Purchase", "Infrastructure"],
      metric: "5-email welcome series, rebuilt from scratch",
      before: "3-email generic welcome",
      after: "11-touch segmented series",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-5 md:px-8 lg:px-10" aria-label="Results">
      <div className="max-w-[1280px] mx-auto">

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1)} className="mb-16">
          <motion.div variants={fadeUp} className="section-label mb-6">Results</motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-display-2 font-light max-w-[560px]" style={{ color: "#F4F2EE" }}>
            Revenue numbers. Not open rates.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOptions}
          variants={staggerContainer(0.12, 0.1)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 mb-16 pb-16 border-b"
          style={{ borderColor: "#252528" }}
        >
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1, 0.1)} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {cases.map((c) => <CaseCard key={c.category} {...c} />)}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp}>
          <Link
            href="#work"
            className="inline-flex items-center gap-2 text-sm font-medium group transition-colors duration-200"
            style={{ color: "#8A8680" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F4F2EE")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8680")}
          >
            View all case studies
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
              <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
