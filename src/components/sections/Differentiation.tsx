"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";

const comparisons = [
  { label: "What we measure", sawa: "Email-attributed revenue", traditional: "Open rates & click rates" },
  { label: "Copy approach", sawa: "Written for your brand voice", traditional: "Template-based" },
  { label: "Automation depth", sawa: "5–11 email flows, personalised", traditional: "3-email basics" },
  { label: "Segmentation", sawa: "RFM + behavioural + CLV", traditional: "Subscribers vs. buyers" },
  { label: "Ownership", sawa: "Full channel — we run everything", traditional: "Deliverables only" },
  { label: "Optimisation", sawa: "Monthly revenue-led roadmap", traditional: "Quarterly PDF reports" },
];

const facts = [
  { stat: "35–45%", label: "Where your email revenue share should be", note: "Most brands we onboard start at 12–20%." },
  { stat: "Day 30", label: "When most clients see measurable lift", note: "Welcome flow and first campaigns live within 2 weeks." },
  { stat: "Zero", label: "Templates used across client work", note: "Every flow and every email is written from scratch." },
];

export default function Differentiation() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 lg:px-10" style={{ background: "#161618" }} aria-label="Why Sawa">
      <div className="max-w-[1280px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Left: header */}
          <div>
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1)}>
              <motion.div variants={fadeUp} className="section-label mb-6">Why Sawa</motion.div>
              <motion.h2 variants={fadeUp} className="font-display text-display-2 font-light" style={{ color: "#F4F2EE" }}>
                We run the email channel like it&apos;s our own business.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-body-lg mt-5" style={{ color: "rgba(244,242,238,0.5)" }}>
                Because we measure revenue, not reports, every decision we make is
                oriented toward one number: how much money your email programme
                generated this month vs. last.
              </motion.p>
            </motion.div>

            {/* Fact cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1, 0.2)} className="mt-10 grid grid-cols-1 gap-3">
              {facts.map((f) => (
                <motion.div key={f.stat} variants={fadeUp} className="flex gap-5 p-5 rounded-xl" style={{ background: "rgba(13,13,15,0.6)", border: "1px solid #252528" }}>
                  <div className="font-display text-3xl font-light shrink-0" style={{ color: "#F4F2EE", letterSpacing: "-0.03em" }}>{f.stat}</div>
                  <div>
                    <p className="text-sm font-medium mb-0.5" style={{ color: "#F4F2EE", letterSpacing: "-0.01em" }}>{f.label}</p>
                    <p className="text-xs" style={{ color: "#4A4A50" }}>{f.note}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: comparison */}
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.07, 0.2)}>
            {/* Column headers */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pb-3 mb-1 border-b" style={{ borderColor: "#252528" }}>
              <p className="text-caption-label" style={{ color: "#F4F2EE" }}>Sawa</p>
              <p className="text-caption-label" style={{ color: "#4A4A50" }}>Standard agency</p>
            </motion.div>

            {comparisons.map((row) => (
              <motion.div key={row.label} variants={fadeUp} className="grid grid-cols-2 gap-4 py-4 border-b" style={{ borderColor: "#1C1C1F" }}>
                <div>
                  <p className="text-caption-label mb-1.5" style={{ color: "#343438" }}>{row.label}</p>
                  <p className="text-sm font-medium" style={{ color: "rgba(244,242,238,0.85)", letterSpacing: "-0.01em" }}>{row.sawa}</p>
                </div>
                <div>
                  <p className="text-caption-label mb-1.5 opacity-0">{row.label}</p>
                  <p className="text-sm line-through" style={{ color: "#343438" }}>{row.traditional}</p>
                </div>
              </motion.div>
            ))}

            {/* Pull quote */}
            <motion.div variants={fadeUp} className="mt-8 p-5 rounded-xl" style={{ background: "rgba(200,255,87,0.04)", border: "1px solid rgba(200,255,87,0.1)" }}>
              <p className="text-sm font-medium" style={{ color: "rgba(244,242,238,0.8)", lineHeight: "1.75", letterSpacing: "-0.01em" }}>
                &ldquo;We don&apos;t report on open rates. We report on how much money
                your email channel generated — and we hold ourselves accountable
                to growing that number every month.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
