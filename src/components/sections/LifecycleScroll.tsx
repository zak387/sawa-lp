"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const flows = [
  {
    number: "01",
    name: "Welcome Series",
    timing: "Days 1–14",
    emails: "5–11 emails",
    stat: "12–18%",
    statLabel: "of flow revenue",
    description: "Brand story, education, social proof — then the offer. Most brands lead with a discount. We lead with value.",
    steps: ["Brand story", "Product education", "Social proof", "Offer — earned"],
    color: "#C8FF57",
  },
  {
    number: "02",
    name: "Abandoned Cart",
    timing: "1h → 24h → 72h",
    emails: "3 emails",
    stat: "30–38%",
    statLabel: "of flow revenue",
    description: "Soft reminder, then objection handling, then urgency. Never lead with a discount — you'll train customers to abandon on purpose.",
    steps: ["Soft reminder", "Objection handling", "Urgency + offer"],
    color: "#E8704A",
  },
  {
    number: "03",
    name: "Post-Purchase",
    timing: "Days 1–30",
    emails: "5 emails",
    stat: "22–28%",
    statLabel: "of flow revenue",
    description: "Confirmation, education, check-in, cross-sell, replenishment. Turn one-time buyers into repeat customers with a system.",
    steps: ["Confirmation", "Product education", "Review request", "Cross-sell", "Replenishment"],
    color: "#8B9FF4",
  },
  {
    number: "04",
    name: "Win-Back",
    timing: "Days 90–120",
    emails: "4 emails",
    stat: "8–14%",
    statLabel: "of flow revenue",
    description: "We win back lapsed customers before they become permanently inactive — and clean the ones who won't return.",
    steps: ["New arrivals", "Personalised rec", "15% offer", "Re-permission"],
    color: "#F4C842",
  },
  {
    number: "05",
    name: "VIP & Loyalty",
    timing: "Behavioural triggers",
    emails: "Ongoing",
    stat: "Top 10%",
    statLabel: "of customers = 40%+ revenue",
    description: "Your highest-LTV customers deserve more than a generic newsletter. Early access, exclusive offers, and personal treatment.",
    steps: ["LTV threshold trigger", "Exclusive early access", "VIP rewards", "Loyalty events"],
    color: "#C8FF57",
  },
  {
    number: "06",
    name: "Browse Abandon",
    timing: "1h → 24h",
    emails: "2 emails",
    stat: "Intent signal",
    statLabel: "captured before add-to-cart",
    description: "Most brands only capture cart abandonment. Browse abandon fires earlier — when intent is already high but the cart hasn't been started.",
    steps: ["Product viewed 2×+", "Soft product feature", "Social proof + CTA"],
    color: "#E8704A",
  },
];

// ── LifecycleScroll ────────────────────────────────────────────
// Horizontal-scroll section driven by vertical scroll.
// Section is 300vh tall. As user scrolls through it,
// cards translate horizontally — left to right reveal.

export default function LifecycleScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map 0→1 scroll progress to translateX
  // Cards total width ≈ 6 × (340 + 20) = 2160px minus viewport ≈ 1160px of travel
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-62%"]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "320vh", background: "#161618" }}
      aria-label="Lifecycle email flows"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Header */}
        <div className="px-5 md:px-8 lg:px-10 pt-20 pb-10 shrink-0">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EXPO_OUT }}
                className="section-label mb-4"
              >
                The lifecycle system
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EXPO_OUT, delay: 0.08 }}
                className="font-display text-display-2 font-light"
                style={{ color: "#F4F2EE" }}
              >
                Six flows. One complete system.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-sm max-w-[300px] shrink-0"
              style={{ color: "#4A4A50", lineHeight: "1.7" }}
            >
              Scroll to explore every flow we build →
            </motion.p>
          </div>
        </div>

        {/* Scrolling track */}
        <div className="flex-1 flex items-center overflow-hidden px-5 md:px-8 lg:px-10">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-5 will-change-transform"
          >
            {flows.map((flow, i) => (
              <motion.div
                key={flow.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: EXPO_OUT, delay: i * 0.04 }}
                className="shrink-0 rounded-2xl p-6 flex flex-col"
                style={{
                  width: "clamp(280px, 30vw, 360px)",
                  height: "clamp(320px, 42vh, 440px)",
                  background: "rgba(13,13,15,0.7)",
                  border: "1px solid #252528",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="font-mono text-xs" style={{ color: "#4A4A50" }}>{flow.number}</span>
                    <h3
                      className="font-display text-xl font-light mt-1"
                      style={{ color: "#F4F2EE", letterSpacing: "-0.02em" }}
                    >
                      {flow.name}
                    </h3>
                  </div>
                  {/* Revenue stat pill */}
                  <div
                    className="text-right shrink-0 ml-4"
                  >
                    <p className="text-lg font-medium" style={{ color: flow.color, letterSpacing: "-0.03em" }}>
                      {flow.stat}
                    </p>
                    <p className="text-xs" style={{ color: "#4A4A50" }}>{flow.statLabel}</p>
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex gap-3 mb-5">
                  <div
                    className="px-2.5 py-1 rounded-full text-xs"
                    style={{ background: "rgba(28,28,31,0.8)", border: "1px solid #252528", color: "#8A8680" }}
                  >
                    {flow.timing}
                  </div>
                  <div
                    className="px-2.5 py-1 rounded-full text-xs"
                    style={{ background: "rgba(28,28,31,0.8)", border: "1px solid #252528", color: "#8A8680" }}
                  >
                    {flow.emails}
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-sm mb-5 flex-1"
                  style={{ color: "rgba(244,242,238,0.5)", lineHeight: "1.75" }}
                >
                  {flow.description}
                </p>

                {/* Steps */}
                <div>
                  <p className="text-caption-label mb-2.5" style={{ color: "#4A4A50" }}>Flow steps</p>
                  <div className="flex flex-wrap gap-1.5">
                    {flow.steps.map((step, j) => (
                      <span
                        key={step}
                        className="px-2.5 py-1 rounded-full text-xs"
                        style={{
                          background: j === 0 ? `${flow.color}12` : "transparent",
                          border: `1px solid ${j === 0 ? `${flow.color}25` : "#252528"}`,
                          color: j === 0 ? flow.color : "rgba(244,242,238,0.45)",
                        }}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* End card — CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EXPO_OUT, delay: 0.24 }}
              className="shrink-0 rounded-2xl p-6 flex flex-col items-start justify-between"
              style={{
                width: "clamp(240px, 26vw, 300px)",
                height: "clamp(320px, 42vh, 440px)",
                background: "rgba(200,255,87,0.04)",
                border: "1px solid rgba(200,255,87,0.12)",
              }}
            >
              <div>
                <p className="text-sm font-medium mb-3" style={{ color: "#C8FF57" }}>
                  All six flows, built for your brand.
                </p>
                <p className="text-sm" style={{ color: "rgba(244,242,238,0.45)", lineHeight: "1.75" }}>
                  We don&apos;t use templates. Every flow is rebuilt from scratch — timing, copy, and logic adjusted to your customer data and product category.
                </p>
              </div>
              <a
                href="#contact"
                className="btn-signal mt-6"
              >
                Get a free audit
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll progress indicator */}
        <div className="px-5 md:px-8 lg:px-10 pb-8 shrink-0">
          <div className="max-w-[1280px] mx-auto">
            <div className="h-px w-full" style={{ background: "#1C1C1F" }}>
              <motion.div
                className="h-px"
                style={{
                  background: "linear-gradient(to right, #C8FF57, rgba(200,255,87,0.3))",
                  scaleX: scrollYProgress,
                  transformOrigin: "left",
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
