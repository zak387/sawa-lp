"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const INK = "#0B1E3D";
const INK55 = "rgba(11,30,61,0.55)";
const MUTED = "#6485A8";
const BORDER = "rgba(11,30,61,0.08)";

const faqs = [
  {
    q: "What exactly does Sawa do?",
    a: "We build, write, and manage your entire email programme — lifecycle flows, campaigns, segmentation, and copywriting. We handle everything from strategy to execution, so your team doesn't have to. You get a fully operational email channel that generates predictable, compounding revenue.",
  },
  {
    q: "How is this different from hiring an email marketing agency?",
    a: "Most agencies send blasts and report on open rates. We build lifecycle systems — welcome, post-purchase, abandoned cart, win-back — all custom-written to sound like your brand. We measure success in revenue generated, not vanity metrics. And unlike most agencies, we don't use templates or copy-paste sequences.",
  },
  {
    q: "What platforms do you work with?",
    a: "We work across Klaviyo, Attentive, Drip, Mailchimp, HubSpot, and most major email service providers. We'll work within your existing stack or help you migrate to a platform better suited to your revenue goals.",
  },
  {
    q: "How long until we see results?",
    a: "Most clients see measurable revenue lift within the first 30 days. The welcome and abandoned cart flows alone typically generate immediate returns. Full lifecycle programmes — with post-purchase, win-back, and segmented campaigns — compound over 60 to 90 days as the data builds.",
  },
  {
    q: "Do I need a large email list to work with you?",
    a: "No. List size matters less than how well that list is worked. We've generated significant returns for brands with 10,000 subscribers and for brands with 500,000. What matters is having a proper lifecycle system in place — which most brands don't.",
  },
  {
    q: "What does the free audit include?",
    a: "We review your current email setup and send you a written breakdown covering: your current email revenue share vs. benchmark, deliverability and inbox placement health, lifecycle flow gaps and quick wins, list segmentation opportunities, and an estimate of the revenue upside. No call required. Delivered within 48 hours.",
  },
  {
    q: "How do you handle copywriting — will the emails sound like our brand?",
    a: "Brand voice is where most agencies fail, and where we invest the most time. Before writing a single email, we go deep on your brand — tone, audience, product, positioning. Every email is written from scratch. We don't use AI to generate copy, and we don't recycle sequences from other clients.",
  },
  {
    q: "What's your pricing model?",
    a: "We work on a monthly retainer based on programme scope. Pricing depends on the number of flows, campaign volume, and whether you need copywriting, strategy, or full management. The free audit gives you a clear picture of what we'd recommend before any commitment.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOptions}
      transition={{ delay: index * 0.05, duration: 0.45, ease: EXPO_OUT }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full text-left cursor-pointer group"
        style={{
          background: open ? "rgba(27,72,196,0.04)" : "transparent",
          border: `1px solid ${open ? "rgba(27,72,196,0.15)" : BORDER}`,
          borderRadius: 14,
          padding: "20px 24px",
          transition: "all 200ms cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={(e) => {
          if (!open) {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,72,196,0.2)";
            (e.currentTarget as HTMLElement).style.background = "rgba(27,72,196,0.02)";
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            (e.currentTarget as HTMLElement).style.borderColor = BORDER;
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-medium" style={{ color: INK, letterSpacing: "-0.015em" }}>
            {q}
          </span>
          <div
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: open ? "#1B48C4" : "rgba(11,30,61,0.06)",
              border: `1px solid ${open ? "#1B48C4" : BORDER}`,
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1V10M1 5.5H10" stroke={open ? "#FFFFFF" : "#6485A8"} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EXPO_OUT }}
              style={{ overflow: "hidden" }}
            >
              <p className="text-sm mt-4 pr-10" style={{ color: INK55, lineHeight: "1.8" }}>
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 lg:px-10 overflow-hidden" aria-label="Frequently asked questions">

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(11,30,61,0.06) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
      }} />

      {/* Soft glow top-right */}
      <div className="absolute pointer-events-none" style={{
        right: "-5%", top: "-10%", width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 65%)",
      }} />

      {/* Divider line at top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: "linear-gradient(to right, transparent, rgba(11,30,61,0.08), transparent)"
      }} />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 lg:gap-20">

          {/* Left: label + heading */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOptions}
            variants={staggerContainer(0.08)}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <motion.div variants={fadeUp} className="section-label mb-6">FAQs</motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-display-2 mb-5" style={{ color: INK }}>
              Everything you&apos;re wondering about.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm mb-8" style={{ color: INK55, lineHeight: "1.8" }}>
              Still have questions? Email us at{" "}
              <a href="mailto:hello@sawa.co" className="transition-colors duration-200" style={{ color: "#1B48C4" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1539A3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1B48C4")}>
                hello@sawa.co
              </a>{" "}
              — we reply within one business day.
            </motion.p>

            {/* Stat block */}
            <motion.div variants={fadeUp}
              className="p-5 rounded-2xl"
              style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
              <div className="flex items-start gap-3 mb-4 pb-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(27,72,196,0.08)", border: "1px solid rgba(27,72,196,0.12)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L8.8 5.2L13.5 5.6L10 8.8L11 13.5L7 11L3 13.5L4 8.8L0.5 5.6L5.2 5.2L7 1Z" fill="#1B48C4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium mb-0.5" style={{ color: INK }}>Free audit. No commitment.</p>
                  <p className="text-xs" style={{ color: MUTED, lineHeight: "1.6" }}>Written breakdown delivered in 48 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.15)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="#38BDF8" strokeWidth="1.5" />
                    <path d="M4.5 7L6.5 9L9.5 5" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium mb-0.5" style={{ color: INK }}>Results in 30 days.</p>
                  <p className="text-xs" style={{ color: MUTED, lineHeight: "1.6" }}>Most clients see measurable revenue lift within a month.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: FAQ accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
