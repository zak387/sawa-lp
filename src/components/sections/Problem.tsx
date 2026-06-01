"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";

const problems = [
  {
    number: "01",
    title: "Email is underperforming your paid channels",
    description:
      "Most 7-figure brands generate 15–20% of revenue from email. The benchmark for a well-run program is 35–45%. That gap — between what you're making and what you should be making — is the exact problem we fix.",
  },
  {
    number: "02",
    title: "You're running campaigns, not a program",
    description:
      "One-off sends and basic welcome flows don't build compounding revenue. You need a lifecycle system: welcome, post-purchase, browse abandon, cart abandon, win-back, VIP — each segment sending the right message at the right time.",
  },
  {
    number: "03",
    title: "Your copy doesn't sound like your brand",
    description:
      "Template-heavy emails train your list to ignore you. When every send looks like a generic promotion, your open rates fall, your unsubscribes rise, and your revenue per email declines month over month.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 lg:px-10" aria-label="The problem">
      <div className="max-w-[1280px] mx-auto">

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp} className="mb-12">
          <div className="section-label">Why brands come to us</div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp} className="mb-16 max-w-[720px]">
          <h2 className="font-display text-display-2 font-light" style={{ color: "#F4F2EE" }}>
            Email should be your{" "}
            <em style={{ color: "#C8FF57", fontStyle: "italic" }}>highest-margin channel.</em>
            {" "}Most brands are leaving 40–60% of it on the table.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOptions}
          variants={staggerContainer(0.1, 0.05)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {problems.map((p) => (
            <motion.div key={p.number} variants={fadeUp} className="card-surface p-7 md:p-8">
              <div
                className="font-display text-5xl font-light mb-5 select-none"
                style={{ color: "rgba(37,37,40,0.8)" }}
                aria-hidden="true"
              >
                {p.number}
              </div>
              <h3 className="text-base font-medium mb-3" style={{ color: "#F4F2EE", letterSpacing: "-0.015em" }}>
                {p.title}
              </h3>
              <p className="text-sm" style={{ color: "rgba(138,134,128,0.85)", lineHeight: "1.75" }}>
                {p.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp} className="mt-12 pt-8 border-t" style={{ borderColor: "#252528" }}>
          <p className="text-sm" style={{ color: "#4A4A50" }}>
            Sawa was built specifically to close this gap — for brands that are serious about email revenue.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
