"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const flows = [
  {
    id: "welcome",
    label: "Welcome Series",
    trigger: "Triggers on: New subscriber",
    revenue: "Avg. 12–18% of total flow revenue",
    emails: [
      { step: "Email 1", timing: "Immediately", subject: "Welcome — here's what we do differently", note: "Brand story + one product. No discounts yet." },
      { step: "Email 2", timing: "Day 2", subject: "The [Brand] difference, explained", note: "Product education + social proof. Build conviction." },
      { step: "Email 3", timing: "Day 4", subject: "What 4,000 customers told us", note: "UGC + reviews. Trust before the ask." },
      { step: "Email 4", timing: "Day 7", subject: "Your welcome offer expires tonight", note: "10% off with urgency. Now the discount earns it." },
    ],
  },
  {
    id: "post-purchase",
    label: "Post-Purchase",
    trigger: "Triggers on: First order placed",
    revenue: "Avg. 22–28% of total flow revenue",
    emails: [
      { step: "Email 1", timing: "1 hour after order", subject: "Your order is confirmed — here's what's next", note: "Confirmation + set delivery expectations. Reduce anxiety." },
      { step: "Email 2", timing: "Day 3", subject: "While you wait — how to get the most out of [product]", note: "Education. Reduce returns, increase satisfaction." },
      { step: "Email 3", timing: "Day 7 (post-delivery)", subject: "How's everything going?", note: "Check-in + review request. Social proof flywheel." },
      { step: "Email 4", timing: "Day 14", subject: "Customers who bought [product] also love this", note: "Cross-sell. Earned because you've built trust first." },
      { step: "Email 5", timing: "Day 30", subject: "Time to restock?", note: "Replenishment trigger based on product consumption rate." },
    ],
  },
  {
    id: "abandon",
    label: "Abandoned Cart",
    trigger: "Triggers on: Cart abandoned 1h+ ago",
    revenue: "Avg. 30–38% of total flow revenue",
    emails: [
      { step: "Email 1", timing: "1 hour", subject: "You left something behind", note: "Soft reminder. Product image + direct cart link. No discount." },
      { step: "Email 2", timing: "24 hours", subject: "Still thinking about it?", note: "Address the objection. Reviews, guarantee, easy returns." },
      { step: "Email 3", timing: "72 hours", subject: "Last chance — your cart expires today", note: "Urgency + 10% off. Only if they haven't bought." },
    ],
  },
  {
    id: "winback",
    label: "Win-Back",
    trigger: "Triggers on: 90 days no purchase",
    revenue: "Avg. 8–14% of total flow revenue",
    emails: [
      { step: "Email 1", timing: "Day 90", subject: "We miss you — here's what's new", note: "New arrivals. No heavy sell. Curiosity first." },
      { step: "Email 2", timing: "Day 97", subject: "Something we think you'll love", note: "Personalised rec based on past purchase category." },
      { step: "Email 3", timing: "Day 104", subject: "A gift from us — 15% off your next order", note: "Discount only after two non-promotional touches." },
      { step: "Email 4", timing: "Day 120", subject: "Is this goodbye?", note: "Re-permission email. Keeps list clean if no engagement." },
    ],
  },
];

export default function EmailFlows() {
  const [active, setActive] = useState("welcome");
  const current = flows.find((f) => f.id === active)!;

  return (
    <section className="py-24 md:py-32 px-5 md:px-8 lg:px-10" id="how-we-work" aria-label="Email flows we build">
      <div className="max-w-[1280px] mx-auto">

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1)} className="mb-14">
          <motion.div variants={fadeUp} className="section-label mb-6">What we build</motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-display-2 font-light max-w-[620px]" style={{ color: "#F4F2EE" }}>
            Every lifecycle flow, built from scratch for your brand.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body-lg mt-4 max-w-[520px]" style={{ color: "rgba(244,242,238,0.5)" }}>
            No templates. No copy-paste sequences. Every flow is written in your brand voice, timed to your customers&apos; behaviour, and optimised against revenue.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp}>
          {/* Flow tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {flows.map((flow) => (
              <button
                key={flow.id}
                onClick={() => setActive(flow.id)}
                className="px-4 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200"
                style={{
                  background: active === flow.id ? "#F4F2EE" : "rgba(28,28,31,0.8)",
                  color: active === flow.id ? "#0D0D0F" : "rgba(244,242,238,0.55)",
                  border: `1px solid ${active === flow.id ? "#F4F2EE" : "#252528"}`,
                  letterSpacing: "-0.01em",
                }}
              >
                {flow.label}
              </button>
            ))}
          </div>

          {/* Flow detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EXPO_OUT }}
            >
              {/* Header row */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-t-xl"
                style={{ background: "#161618", border: "1px solid #252528", borderBottom: "none" }}
              >
                <div>
                  <h3 className="text-base font-medium mb-0.5" style={{ color: "#F4F2EE", letterSpacing: "-0.015em" }}>
                    {current.label}
                  </h3>
                  <p className="text-xs" style={{ color: "#4A4A50" }}>{current.trigger}</p>
                </div>
                <div
                  className="text-xs font-medium px-3 py-1.5 rounded-full shrink-0"
                  style={{ background: "rgba(200,255,87,0.08)", border: "1px solid rgba(200,255,87,0.15)", color: "#C8FF57" }}
                >
                  {current.revenue}
                </div>
              </div>

              {/* Email rows */}
              <div style={{ border: "1px solid #252528", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                {current.emails.map((email, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-4 p-5 items-start"
                    style={{
                      borderTop: i > 0 ? "1px solid #1C1C1F" : "none",
                      background: i % 2 === 0 ? "rgba(13,13,15,0.5)" : "rgba(22,22,24,0.5)",
                    }}
                  >
                    {/* Step + timing */}
                    <div className="col-span-12 sm:col-span-2">
                      <p className="text-xs font-medium mb-0.5" style={{ color: "#8A8680" }}>{email.step}</p>
                      <p className="text-xs" style={{ color: "#4A4A50" }}>{email.timing}</p>
                    </div>

                    {/* Subject line */}
                    <div className="col-span-12 sm:col-span-5">
                      <p className="text-xs mb-1" style={{ color: "#4A4A50" }}>Subject line</p>
                      <p className="text-sm font-medium" style={{ color: "#F4F2EE", letterSpacing: "-0.01em" }}>
                        {email.subject}
                      </p>
                    </div>

                    {/* Strategic note */}
                    <div className="col-span-12 sm:col-span-5">
                      <p className="text-xs mb-1" style={{ color: "#4A4A50" }}>Why</p>
                      <p className="text-sm" style={{ color: "rgba(244,242,238,0.5)", lineHeight: "1.6" }}>
                        {email.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="mt-4 text-xs" style={{ color: "#4A4A50" }}>
            These are example structures. Every flow is rebuilt from scratch for each brand — timing, copy, and logic adjusted to your customer data.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
