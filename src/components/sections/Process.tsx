"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";

const phases = [
  {
    number: "01",
    name: "Email Audit",
    timeline: "Week 1",
    description:
      "We audit your current ESP, review your existing flows, check deliverability health, analyse your list segmentation, and identify your highest-value revenue gaps. You get a written breakdown of what's working, what isn't, and what we'd fix first.",
    outputs: ["Full Klaviyo audit", "Deliverability health check", "Revenue gap analysis", "Prioritised fix list"],
  },
  {
    number: "02",
    name: "Infrastructure & Flow Build",
    timeline: "Weeks 2–5",
    description:
      "We configure your sending infrastructure, build your segmentation model, and launch your core lifecycle flows — welcome series, post-purchase, and abandon sequences. All copy written in your brand voice, all logic built to your customer data.",
    outputs: ["Domain auth configured", "Segmentation model live", "Welcome series (live)", "Post-purchase flow (live)", "Abandon sequences (live)"],
  },
  {
    number: "03",
    name: "Campaigns & Optimisation",
    timeline: "Month 2 onwards",
    description:
      "Your campaign calendar is planned, written, and executed by us. Every send is tracked against revenue. Monthly we bring a written optimisation report — what we tested, what we learned, and what we're changing next month.",
    outputs: ["Monthly campaign calendar", "A/B subject line tests", "Revenue attribution", "Monthly opt. report"],
  },
  {
    number: "04",
    name: "Scale",
    timeline: "Month 3+",
    description:
      "Once the core programme is running, we expand: VIP flows, replenishment triggers, predictive CLV segments, SMS integration where relevant. The programme compounds — each month the infrastructure gets more sophisticated and the revenue grows.",
    outputs: ["VIP & loyalty flows", "Replenishment triggers", "CLV-based segments", "Quarterly programme review"],
  },
];

export default function Process() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 lg:px-10" aria-label="How we work">
      <div className="max-w-[1280px] mx-auto">

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1)} className="mb-16">
          <motion.div variants={fadeUp} className="section-label mb-6">How we work</motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-display-2 font-light max-w-[620px]" style={{ color: "#F4F2EE" }}>
            From audit to running programme in under 30 days.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body-lg mt-4 max-w-[500px]" style={{ color: "rgba(244,242,238,0.5)" }}>
            We move fast because we&apos;ve done this before. The audit-to-live
            timeline for most clients is 3–4 weeks.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.1, 0.1)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phases.map((phase) => (
            <motion.div key={phase.number} variants={fadeUp} className="card-surface p-7 md:p-8 relative overflow-hidden">
              {/* Background number */}
              <div
                className="absolute -top-4 -right-2 font-display font-light select-none pointer-events-none"
                style={{ fontSize: "7rem", lineHeight: 1, color: "rgba(22,22,24,1)", letterSpacing: "-0.04em" }}
                aria-hidden="true"
              >
                {phase.number}
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mb-5" style={{ background: "rgba(244,242,238,0.06)", border: "1px solid rgba(244,242,238,0.1)", color: "#8A8680" }}>
                  {phase.timeline}
                </div>
                <h3 className="text-base font-medium mb-3" style={{ color: "#F4F2EE", letterSpacing: "-0.015em" }}>{phase.name}</h3>
                <p className="text-sm mb-5" style={{ color: "rgba(244,242,238,0.45)", lineHeight: "1.78" }}>{phase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {phase.outputs.map((o) => (
                    <span key={o} className="px-2.5 py-1 rounded text-xs" style={{ background: "rgba(13,13,15,0.8)", border: "1px solid #252528", color: "#8A8680" }}>
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp} className="mt-10 pt-7 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: "#252528" }}>
          <p className="text-sm" style={{ color: "#8A8680" }}>
            <span style={{ color: "#F4F2EE", fontWeight: 500 }}>Most clients see measurable revenue lift within 30 days.</span>
            {" "}Core flows live in 2–3 weeks from kickoff.
          </p>
          <div className="flex items-center gap-1.5 shrink-0" style={{ color: "#4A4A50" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C8FF57" }} aria-hidden="true" />
            <span className="text-caption-label">Programmes currently running</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
