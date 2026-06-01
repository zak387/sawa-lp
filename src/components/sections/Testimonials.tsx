"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";
import TiltCard from "@/components/ui/TiltCard";

const testimonials = [
  {
    quote: "Before Sawa, email was 14% of our revenue. They rebuilt our welcome series, post-purchase flow, and win-back from scratch — in three weeks. Six months later email is 38% of revenue and growing.",
    name: "Sarah K.",
    title: "Founder",
    company: "8-figure fashion brand",
    result: "14% → 38% email revenue share",
    detail: "6 months",
  },
  {
    quote: "The copy alone was worth it. Every other agency we tried sent emails that didn't sound like us. Sawa's writers got our voice immediately — and our open rates went from 18% to 34% in the first 60 days.",
    name: "Marcus T.",
    title: "CMO",
    company: "DTC wellness brand, $22M ARR",
    result: "18% → 34% open rate",
    detail: "60 days",
  },
  {
    quote: "Their abandoned cart sequence generates $40K a month consistently. We had a three-email sequence before. They rebuilt it to seven emails with personalisation logic based on what was in the cart. The difference was immediate.",
    name: "Priya M.",
    title: "Head of Growth",
    company: "Beauty brand, $18M ARR",
    result: "$40K/month from cart abandon",
    detail: "Single flow",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 lg:px-10" aria-label="Client results">
      <div className="max-w-[1280px] mx-auto">

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1)} className="mb-14">
          <motion.div variants={fadeUp} className="section-label mb-6">From our clients</motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-display-2 font-light max-w-[540px]" style={{ color: "#F4F2EE" }}>
            Numbers and specifics, not adjectives.
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1, 0.1)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp}>
            <TiltCard className="card-surface p-7 md:p-8 flex flex-col justify-between gap-7">
              <blockquote>
                <p className="text-sm" style={{ color: "rgba(244,242,238,0.7)", lineHeight: "1.82" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <div>
                <div className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium mb-4" style={{ background: "rgba(200,255,87,0.07)", border: "1px solid rgba(200,255,87,0.14)", color: "#C8FF57" }}>
                  {t.result}
                </div>
                <div className="pt-4 border-t" style={{ borderColor: "#252528" }}>
                  <p className="text-sm font-medium" style={{ color: "#F4F2EE", letterSpacing: "-0.01em" }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#4A4A50" }}>{t.title}, {t.company}</p>
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
