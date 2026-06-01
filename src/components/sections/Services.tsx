"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";
import Link from "next/link";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    number: "01",
    name: "Email Infrastructure & Deliverability",
    tagline: "The foundation. If emails don't land in the inbox, nothing else matters.",
    description:
      "We configure your ESP (Klaviyo, Attentive, or similar), set up domain authentication (DKIM, SPF, DMARC), warm your sending reputation, clean your list, and build the segmentation architecture your flows will run on.",
    deliverables: ["ESP setup / migration", "Domain auth (DKIM, SPF, DMARC)", "Deliverability audit & warm-up", "List hygiene & suppression", "Segmentation architecture"],
  },
  {
    number: "02",
    name: "Lifecycle Automation",
    tagline: "Revenue that runs while you sleep — welcome, post-purchase, abandon, win-back.",
    description:
      "We design, write, and build every lifecycle flow from scratch: welcome series (5–11 emails), post-purchase (onboarding + cross-sell + replenishment), cart & browse abandon, and win-back. Every flow is personalised to purchase history, browse behaviour, and predicted LTV.",
    deliverables: ["Welcome series (5–11 emails)", "Post-purchase flow", "Cart & browse abandon", "Win-back campaign", "VIP & loyalty flow", "Replenishment triggers"],
  },
  {
    number: "03",
    name: "Segmentation & Personalisation",
    tagline: "Stop sending the same email to your entire list.",
    description:
      "We build RFM segments (Recency, Frequency, Monetary), identify your high-LTV cohorts, flag churn risks early, and set up dynamic content blocks so every email feels relevant to the person reading it — at scale, automatically.",
    deliverables: ["RFM segmentation model", "Predictive CLV scoring", "Engagement-based segments", "Dynamic content blocks", "Suppression logic"],
  },
  {
    number: "04",
    name: "Campaign Management",
    tagline: "Consistent, on-brand campaigns — planned, written, built, and sent by us.",
    description:
      "We own your full campaign calendar: promotional sends, product launches, seasonal campaigns, and content emails. Every send is strategically timed, A/B tested on subject lines, and measured against revenue — not open rates.",
    deliverables: ["Monthly campaign calendar", "Subject line A/B testing", "Promotional strategy", "Seasonal planning", "Revenue attribution reporting"],
  },
  {
    number: "05",
    name: "Copywriting",
    tagline: "Emails that sound like your brand, not like every other brand.",
    description:
      "Our writers learn your voice, your products, and your customers before writing a single line. We develop brand-specific copy guidelines, write every subject line, preheader, body, and CTA — and test systematically until we find what converts.",
    deliverables: ["Brand voice guidelines", "Subject line & preheader", "Body copy & CTAs", "A/B copy testing", "Ongoing optimisation"],
  },
  {
    number: "06",
    name: "Revenue Reporting & Optimisation",
    tagline: "We track email revenue, not email metrics.",
    description:
      "Monthly reporting against email-attributed revenue, flow performance, campaign ROI, and list health. Each month we bring a prioritised optimisation roadmap — what to test, what to rebuild, where the next $X is hiding in your programme.",
    deliverables: ["Monthly revenue report", "Flow performance audit", "A/B test roadmap", "List health monitoring", "Quarterly programme review"],
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 px-5 md:px-8 lg:px-10" style={{ background: "#161618" }} aria-label="Services">
      <div className="max-w-[1280px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1)}>
            <motion.div variants={fadeUp} className="section-label mb-6">Services</motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-display-2 font-light" style={{ color: "#F4F2EE" }}>
              Six disciplines. One team. Complete ownership.
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp} className="lg:pt-16 lg:pl-8">
            <p className="text-body-lg" style={{ color: "rgba(244,242,238,0.5)" }}>
              Every service we offer feeds into the others. Deliverability
              enables flows. Flows feed campaigns. Copy optimises both.
              Reporting improves everything. We run the system, not just the parts.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOptions}
          variants={staggerContainer(0.05, 0.1)}
          className="border-t" style={{ borderColor: "#252528" }}
        >
          {services.map((s, i) => (
            <motion.div key={s.number} variants={fadeUp} className="border-b" style={{ borderColor: "#252528" }}>
              <button
                className="w-full text-left py-6 md:py-7 grid grid-cols-12 gap-4 items-start cursor-pointer"
                onClick={() => setActive(active === i ? null : i)}
                aria-expanded={active === i}
                aria-controls={`svc-${i}`}
              >
                <div className="col-span-1 font-mono text-xs pt-1" style={{ color: "#4A4A50" }} aria-hidden="true">{s.number}</div>
                <div className="col-span-10 lg:col-span-7">
                  <h3 className="text-base font-medium mb-1 transition-colors duration-200" style={{ color: active === i ? "#F4F2EE" : "rgba(244,242,238,0.75)", letterSpacing: "-0.015em" }}>
                    {s.name}
                  </h3>
                  <p className="text-sm" style={{ color: "#4A4A50" }}>{s.tagline}</p>
                </div>
                <div className="col-span-1 lg:col-span-4 flex justify-end items-center">
                  <motion.div
                    animate={{ rotate: active === i ? 45 : 0 }}
                    transition={{ duration: 0.22, ease: EXPO_OUT }}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: active === i ? "rgba(200,255,87,0.1)" : "rgba(28,28,31,0.8)", border: `1px solid ${active === i ? "rgba(200,255,87,0.25)" : "#252528"}` }}
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 2V8M2 5H8" stroke={active === i ? "#C8FF57" : "#8A8680"} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {active === i && (
                  <motion.div
                    id={`svc-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: EXPO_OUT }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="pb-7 pl-[calc(8.33%+1rem)] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                      <p className="text-sm" style={{ color: "rgba(244,242,238,0.5)", lineHeight: "1.8" }}>{s.description}</p>
                      <div>
                        <p className="text-caption-label mb-3" style={{ color: "#4A4A50" }}>What&apos;s included</p>
                        <ul className="space-y-2">
                          {s.deliverables.map((d) => (
                            <li key={d} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(244,242,238,0.65)" }}>
                              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#8A8680" }} aria-hidden="true" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp} className="mt-10 text-center">
          <p className="text-sm mb-4" style={{ color: "#8A8680" }}>Not sure where to start?</p>
          <Link href="#contact" className="btn-signal">
            Get a free email audit
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
