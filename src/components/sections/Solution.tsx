"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOptions } from "@/lib/utils";

const what = [
  { label: "Lifecycle flows", detail: "Welcome · Post-purchase · Win-back · VIP" },
  { label: "Campaign management", detail: "Promotional · Seasonal · Product launches" },
  { label: "Segmentation", detail: "RFM · Behavioral · Predictive CLV" },
  { label: "Copywriting", detail: "Brand-voice · Subject lines · A/B testing" },
  { label: "Email infrastructure", detail: "ESP setup · Deliverability · List hygiene" },
  { label: "Revenue reporting", detail: "Attribution · Cohorts · Monthly optimization" },
];

const differentiators = ["Human copywriting", "AI-native workflows", "Revenue accountability"];

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const staggerFadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: EXPO_OUT },
  },
});

export default function Solution() {
  return (
    <section
      className="py-24 md:py-32 px-5 md:px-8 lg:px-10"
      style={{ background: "#161618" }}
      aria-label="What Sawa does"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left column ────────────────────────────── */}
          <div>
            {/* Label */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOptions}
              variants={fadeUp} className="mb-6"
            >
              <div className="section-label">What we do</div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial="hidden" whileInView="visible" viewport={viewportOptions}
              variants={staggerFadeUp(0)}
              className="font-display text-display-2 font-light mb-6"
              style={{ color: "#F4F2EE" }}
            >
              End-to-end email marketing. We own the entire channel.
            </motion.h2>

            {/* Body */}
            <motion.p
              initial="hidden" whileInView="visible" viewport={viewportOptions}
              variants={staggerFadeUp(0.08)}
              className="text-body-lg mb-8"
              style={{ color: "rgba(244,242,238,0.55)" }}
            >
              Most agencies manage one piece. We run everything — the
              infrastructure, the flows, the campaigns, the copy, and
              the reporting. One team, full accountability.
            </motion.p>

            {/* Pills */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOptions}
              variants={staggerFadeUp(0.14)}
              className="flex flex-wrap gap-2 mb-8"
            >
              {differentiators.map((d) => (
                <div
                  key={d}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(28,28,31,0.9)",
                    border: "1px solid #343438",
                    color: "#F4F2EE",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {d}
                </div>
              ))}
            </motion.div>

            {/* Benchmark callout */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOptions}
              variants={staggerFadeUp(0.2)}
              className="p-5 rounded-xl"
              style={{
                background: "rgba(200,255,87,0.05)",
                border: "1px solid rgba(200,255,87,0.12)",
              }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: "#C8FF57" }}>
                Average result across active clients
              </p>
              <p className="text-sm" style={{ color: "rgba(244,242,238,0.55)" }}>
                Email revenue share moves from{" "}
                <span style={{ color: "#F4F2EE" }}>~18%</span> to{" "}
                <span style={{ color: "#F4F2EE" }}>35–45%</span> of total
                ecommerce revenue within 6 months.
              </p>
            </motion.div>
          </div>

          {/* ── Right column: what's included grid ─────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:mt-16">
            {what.map((item, i) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                variants={staggerFadeUp(i * 0.07)}
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(13,13,15,0.6)",
                  border: "1px solid #252528",
                }}
              >
                <p
                  className="text-sm font-medium mb-1.5"
                  style={{ color: "#F4F2EE", letterSpacing: "-0.01em" }}
                >
                  {item.label}
                </p>
                <p className="text-xs" style={{ color: "#4A4A50", lineHeight: "1.6" }}>
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
