"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";
import Link from "next/link";

const INK = "#0B1E3D";
const INK55 = "rgba(11,30,61,0.55)";
const MUTED = "#6485A8";
const BORDER = "rgba(11,30,61,0.08)";

const auditItems = [
  "Current email revenue share vs. benchmark",
  "Deliverability and inbox placement health",
  "Lifecycle flow gaps and quick wins",
  "List segmentation opportunities",
  "Estimated revenue upside",
];

export default function CTA() {
  return (
    <section id="contact" className="py-24 md:py-32 px-5 md:px-8 lg:px-10 relative overflow-hidden"
      aria-label="Get your free audit">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(27,72,196,0.15), transparent)" }} aria-hidden="true" />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(11,30,61,0.06) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
      }} />
      <motion.div className="absolute pointer-events-none"
        style={{ left: "60%", top: "-20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{ left: "-10%", bottom: "-10%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(27,72,196,0.1) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: CTA */}
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1)}>
            <motion.div variants={fadeUp} className="section-label mb-6">Free email audit</motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-display-2 mb-5" style={{ color: INK }}>
              Find out what your email programme is{" "}
              <span style={{ color: "#1B48C4" }}>actually</span>{" "}
              generating.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body-lg mb-8" style={{ color: INK55 }}>
              We review your current setup and send you a specific, written breakdown of
              your email programme - what it&apos;s making, what it&apos;s missing, and
              what we&apos;d fix first.{" "}
              <span style={{ color: INK, fontWeight: 500 }}>No call required. No pitch. Just the audit.</span>
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col items-start gap-3">
              <Link href="mailto:hello@sawa.co?subject=Email Revenue Audit Request" className="btn-signal text-sm">
                Request your free email audit
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p className="text-caption-label" style={{ color: MUTED }}>
                Delivered within 48 hours &nbsp;·&nbsp; No call required
              </p>
            </motion.div>
          </motion.div>

          {/* Right: What's in the audit */}
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.08, 0.2)}>
            <motion.div variants={fadeUp} className="section-label mb-6">What&apos;s in the audit</motion.div>
            <motion.ul variants={staggerContainer(0.07)} className="space-y-3">
              {auditItems.map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center"
                    style={{ background: "rgba(27,72,196,0.08)", border: `1px solid rgba(27,72,196,0.15)` }} aria-hidden="true">
                    <svg width="7" height="6" viewBox="0 0 7 6" fill="none">
                      <path d="M1 3L2.5 4.5L6 1" stroke="#1B48C4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm" style={{ color: INK55, lineHeight: "1.65" }}>{item}</p>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8 p-5 rounded-xl" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
              <p className="text-xs" style={{ color: MUTED, lineHeight: "1.7" }}>
                We&apos;ve run audits for brands on Klaviyo, Attentive, Drip, and Mailchimp.
                We work best with brands doing{" "}
                <span style={{ color: "#1B48C4" }}>$3M+ in annual revenue</span>{" "}
                who are ready to take email seriously.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
