"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";
import Link from "next/link";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const INK = "#0B1E3D";
const INK55 = "rgba(11,30,61,0.55)";
const MUTED = "#6485A8";
const BORDER = "rgba(11,30,61,0.08)";

const problems = [
  {
    number: "01",
    title: "Email is underperforming your other channels",
    description: "Most brands generate 15-20% of revenue from email. A well-run programme delivers 35-45%. That gap - between what you're making and what you should be making - is the exact problem we fix.",
  },
  {
    number: "02",
    title: "You're running campaigns, not a system",
    description: "One-off sends and basic welcome flows don't build compounding revenue. You need a lifecycle system - welcome, post-purchase, abandon, win-back - each sending the right message at the right time.",
  },
  {
    number: "03",
    title: "Your copy doesn't sound like your brand",
    description: "Template-heavy emails train your list to ignore you. When every send looks generic, open rates fall, unsubscribes rise, and revenue per email declines month over month.",
  },
];

const flows = [
  {
    id: "welcome",
    label: "Welcome Series",
    trigger: "Triggers on: New subscriber",
    revenue: "Avg. 12-18% of flow revenue",
    emails: [
      { step: "Email 1", timing: "Immediately", subject: "Welcome - here's what we do differently", note: "Brand story + one product. No discounts yet." },
      { step: "Email 2", timing: "Day 2", subject: "The [Brand] difference, explained", note: "Product education + social proof. Build conviction." },
      { step: "Email 3", timing: "Day 4", subject: "What 4,000 customers told us", note: "UGC + reviews. Trust before the ask." },
      { step: "Email 4", timing: "Day 7", subject: "Your welcome offer expires tonight", note: "10% off with urgency. Now the discount earns it." },
    ],
  },
  {
    id: "post-purchase",
    label: "Post-Purchase",
    trigger: "Triggers on: First order placed",
    revenue: "Avg. 22-28% of flow revenue",
    emails: [
      { step: "Email 1", timing: "1 hour after purchase", subject: "Your order is confirmed - here's what's next", note: "Confirmation + set expectations. Reduce anxiety." },
      { step: "Email 2", timing: "Day 3", subject: "While you wait - how to get the most out of [product]", note: "Education. Reduce returns, increase satisfaction." },
      { step: "Email 3", timing: "Day 7 (post-delivery)", subject: "How's everything going?", note: "Check-in + review request. Social proof flywheel." },
      { step: "Email 4", timing: "Day 14", subject: "Customers who bought [product] also love this", note: "Cross-sell. Earned because you've built trust first." },
      { step: "Email 5", timing: "Day 30", subject: "Time to restock?", note: "Replenishment trigger based on product usage rate." },
    ],
  },
  {
    id: "abandon",
    label: "Abandoned Cart",
    trigger: "Triggers on: Cart abandoned 1h+ ago",
    revenue: "Avg. 30-38% of flow revenue",
    emails: [
      { step: "Email 1", timing: "1 hour", subject: "You left something behind", note: "Soft reminder. Product image + direct link. No discount." },
      { step: "Email 2", timing: "24 hours", subject: "Still thinking about it?", note: "Address the objection. Reviews, guarantee, easy returns." },
      { step: "Email 3", timing: "72 hours", subject: "Last chance - your cart expires today", note: "Urgency + 10% off. Only if they haven't bought." },
    ],
  },
  {
    id: "winback",
    label: "Win-Back",
    trigger: "Triggers on: 90 days no purchase",
    revenue: "Avg. 8-14% of flow revenue",
    emails: [
      { step: "Email 1", timing: "Day 90", subject: "We miss you - here's what's new", note: "New arrivals. No heavy sell. Curiosity first." },
      { step: "Email 2", timing: "Day 97", subject: "Something we think you'll love", note: "Personalised rec based on past purchase category." },
      { step: "Email 3", timing: "Day 104", subject: "A gift from us - 15% off your next order", note: "Discount only after two non-promotional touches." },
      { step: "Email 4", timing: "Day 120", subject: "Is this goodbye?", note: "Re-permission email. Keeps list clean if no engagement." },
    ],
  },
];

const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ProblemFlows() {
  const [active, setActive] = useState("welcome");
  const current = flows.find((f) => f.id === active)!;

  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 lg:px-10 overflow-hidden" aria-label="Why brands come to us">

      {/* Background dots grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(11,30,61,0.08) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      }} />

      {/* Decorative large ring — right */}
      <motion.div className="absolute pointer-events-none hidden md:block"
        style={{ right: "-8%", top: "5%", width: 420, height: 420, borderRadius: "50%", border: "1px solid rgba(27,72,196,0.12)" }}
        animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />
      <motion.div className="absolute pointer-events-none hidden md:block"
        style={{ right: "-4%", top: "9%", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(56,189,248,0.1)" }}
        animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      />

      {/* Decorative ring — left */}
      <motion.div className="absolute pointer-events-none hidden md:block"
        style={{ left: "-6%", bottom: "8%", width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(27,72,196,0.1)" }}
        animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">

        {/* Problem */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.08)} className="mb-16">
          <motion.div variants={fadeUp} className="section-label mb-6">Why brands come to us</motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-display-2 mb-12 max-w-[680px]" style={{ color: INK }}>
            Email should be your highest-margin channel.{" "}
            <span style={{ color: "#38BDF8" }}>Most brands are leaving 40-60% of it on the table.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {problems.map((p, i) => (
              <motion.div
                key={p.number}
                initial="hidden" whileInView="visible" viewport={viewportOptions}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: EXPO_OUT } } }}
                className="card-surface p-7"
              >
                <div className="font-display text-5xl font-light mb-5 select-none" style={{ color: "rgba(11,30,61,0.07)" }} aria-hidden="true">{p.number}</div>
                <h3 className="text-base font-medium mb-3" style={{ color: INK, letterSpacing: "-0.015em" }}>{p.title}</h3>
                <p className="text-sm" style={{ color: INK55, lineHeight: "1.75" }}>{p.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Inline CTA */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOptions}
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-2xl"
            style={{ background: "#0B1E3D" }}
          >
            <div>
              <p className="text-base font-medium mb-1" style={{ color: "#EEF4FF" }}>
                Want to know what's missing from your email programme?
              </p>
              <p className="text-sm" style={{ color: "rgba(238,244,255,0.55)" }}>
                We'll audit it for free - no call required, delivered in 48 hours.
              </p>
            </div>
            <Link href="#contact"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200"
              style={{ background: "#1B48C4", color: "#FFFFFF" }}
            >
              Get a free audit <ArrowRight />
            </Link>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp}
          className="mb-14 pb-14 border-b flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{ borderColor: BORDER }}>
          <p className="text-body-lg font-light max-w-[540px]" style={{ color: INK55 }}>
            Here's exactly how we fix it - every lifecycle flow,{" "}
            <span style={{ color: INK }}>built from scratch for your brand.</span>
          </p>
          <p className="text-sm shrink-0" style={{ color: MUTED }}>No templates. No copy-paste sequences.</p>
        </motion.div>

        {/* Email Flows */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp} id="how-we-work">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {flows.map((flow) => (
              <button key={flow.id} onClick={() => setActive(flow.id)}
                className="px-4 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200"
                style={{
                  background: active === flow.id ? "#0B1E3D" : "rgba(11,30,61,0.05)",
                  color: active === flow.id ? "#EEF4FF" : INK55,
                  border: `1px solid ${active === flow.id ? "#0B1E3D" : BORDER}`,
                  letterSpacing: "-0.01em",
                }}>
                {flow.label}
              </button>
            ))}
          </div>

          {/* Flow detail */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EXPO_OUT }}>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-t-xl"
                style={{ background: "#FFFFFF", border: `1px solid ${BORDER}`, borderBottom: "none" }}>
                <div>
                  <h3 className="text-base font-medium mb-0.5" style={{ color: INK, letterSpacing: "-0.015em" }}>{current.label}</h3>
                  <p className="text-xs" style={{ color: MUTED }}>{current.trigger}</p>
                </div>
                <div className="text-xs font-medium px-3 py-1.5 rounded-full shrink-0"
                  style={{ background: "rgba(27,72,196,0.07)", border: `1px solid rgba(27,72,196,0.12)`, color: "#1B48C4" }}>
                  {current.revenue}
                </div>
              </div>

              {/* Email rows */}
              <div style={{ border: `1px solid ${BORDER}`, borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                {current.emails.map((email, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 p-5 items-start"
                    style={{ borderTop: i > 0 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? "#FFFFFF" : "#F5F8FF" }}>
                    <div className="col-span-12 sm:col-span-2">
                      <p className="text-xs font-medium mb-0.5" style={{ color: "#1B48C4" }}>{email.step}</p>
                      <p className="text-xs" style={{ color: MUTED }}>{email.timing}</p>
                    </div>
                    <div className="col-span-12 sm:col-span-5">
                      <p className="text-xs mb-1" style={{ color: MUTED }}>Subject line</p>
                      <p className="text-sm font-medium" style={{ color: INK, letterSpacing: "-0.01em" }}>{email.subject}</p>
                    </div>
                    <div className="col-span-12 sm:col-span-5">
                      <p className="text-xs mb-1" style={{ color: MUTED }}>Why</p>
                      <p className="text-sm" style={{ color: INK55, lineHeight: "1.6" }}>{email.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="mt-4 text-xs" style={{ color: MUTED }}>
            These are example structures. Every flow is rebuilt from scratch for each brand - timing, copy, and logic adjusted to your data.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
