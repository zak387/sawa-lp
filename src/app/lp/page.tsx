"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AmbientBackground from "@/components/ui/AmbientBackground";
import TabShowcase from "@/components/ui/TabShowcase";
import Cal, { getCalApi } from "@calcom/embed-react";

const INK    = "#0A0A0A";
const P      = "#0A0A0A";
const BORDER = "rgba(0,0,0,0.09)";
const EXPO   = [0.16, 1, 0.3, 1] as const;

// Cal.com link: "username/event-slug"
const CAL_LINK = "zakaria-laajily-dqkhjn/30min";

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="32" height="22" viewBox="0 0 46 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="#0A0A0A" />
        <circle cx="30" cy="16" r="13" fill="#A1A1AA" />
        <path d="M23 4.5 C27.5 7.5 27.5 24.5 23 27.5 C18.5 24.5 18.5 7.5 23 4.5Z" fill="#52525B" opacity="0.9" />
      </svg>
      <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: 18, fontWeight: 600, color: INK, letterSpacing: "-0.04em" }}>
        sawa
      </span>
    </div>
  );
}

export default function OnePager() {
  // Initialize the Cal.com embed once. Any element with the matching
  // data-cal-* attributes below will open the booking popup.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "book-a-call" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#0A0A0A" },
          dark: { "cal-brand": "#0A0A0A" },
        },
        layout: "month_view",
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", position: "relative" }}>
      <style>{`
        .lp-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
          width: 100%;
        }
        .lp-showcase { display: block; }
        @media (max-width: 768px) {
          .lp-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .lp-showcase { display: none; }
          .lp-section {
            padding: 90px 20px 48px !important;
          }
          .lp-nav {
            padding: 0 20px !important;
          }
          .lp-nav-btn span { display: none; }
        }
      `}</style>
      <AmbientBackground color="60,60,67" opacity={1.8} />

      {/* NAV */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EXPO }}
        className="lp-nav"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 40px", height: 64,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <Logo />
        <a
          href="#book"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: INK, color: "#fff", borderRadius: 100,
            padding: "9px 20px", fontSize: 13, fontWeight: 600,
            letterSpacing: "-0.01em", border: "none", cursor: "pointer",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            textDecoration: "none",
          }}
        >
          Book intro call
        </a>
      </motion.nav>

      {/* HERO */}
      <section className="lp-section" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px 40px 60px", maxWidth: 1200, margin: "0 auto",
        position: "relative", zIndex: 1,
      }}>
        <div className="lp-hero-grid">

          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EXPO }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: `${P}12`, border: `1px solid ${P}30`,
                borderRadius: 100, padding: "5px 14px", marginBottom: 28,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "block" }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: INK, letterSpacing: "0.02em", fontFamily: "var(--font-geist), sans-serif" }}>
                End-to-end email systems for creators
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: EXPO }}
              style={{
                fontSize: "clamp(42px, 5vw, 66px)",
                fontWeight: 700, lineHeight: 1.05,
                letterSpacing: "-0.04em", color: INK,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                marginBottom: 24,
                textShadow: "0 1px 18px rgba(255,255,255,0.92), 0 0 6px rgba(255,255,255,0.92)",
              }}
            >
              Email that turns<br />
              <span style={{ color: INK }}>your audience</span><br />
              into revenue.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: EXPO }}
              style={{
                fontSize: 17, lineHeight: 1.7, color: INK,
                maxWidth: 440, marginBottom: 36,
                fontFamily: "var(--font-geist), sans-serif",
                textShadow: "0 1px 14px rgba(255,255,255,0.95), 0 0 5px rgba(255,255,255,0.95)",
              }}
            >
              We build and run the whole system: grow your list, run your newsletter every week, and launch your products. You create. We handle the inbox.
            </motion.p>

            {/* CTA — opens the Cal.com booking popup */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: EXPO }}
              style={{ maxWidth: 420 }}
            >
              <a
                href="#book"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: INK, color: "#fff",
                  border: "none", borderRadius: 100,
                  padding: "13px 26px", fontSize: 15, fontWeight: 600,
                  cursor: "pointer", letterSpacing: "-0.01em",
                  fontFamily: "var(--font-geist), sans-serif",
                  textDecoration: "none",
                }}
              >
                Book an intro call
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", marginTop: 16, paddingLeft: 4, fontFamily: "var(--font-geist), sans-serif" }}>
                30-min intro call · No commitment
              </p>
            </motion.div>
          </div>

          {/* Tab Showcase — hidden on mobile */}
          <motion.div
            className="lp-showcase"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EXPO }}
          >
            <TabShowcase />
          </motion.div>
        </div>
      </section>

      {/* BOOKING — inline Cal.com embed (book without leaving the page) */}
      <section id="book" className="lp-section" style={{
        padding: "20px 40px 100px", maxWidth: 1080, margin: "0 auto",
        position: "relative", zIndex: 1, scrollMarginTop: 80,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EXPO }}
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          <h2 style={{
            fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700,
            letterSpacing: "-0.03em", color: INK, marginBottom: 12,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            textShadow: "0 1px 18px rgba(255,255,255,0.92), 0 0 6px rgba(255,255,255,0.92)",
          }}>
            Pick a time that works
          </h2>
          <p style={{
            fontSize: 16, color: INK, lineHeight: 1.6,
            fontFamily: "var(--font-geist), sans-serif",
            textShadow: "0 1px 14px rgba(255,255,255,0.95), 0 0 5px rgba(255,255,255,0.95)",
          }}>
            30-min intro call · No commitment · Book directly below
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EXPO }}
          style={{
            background: "#fff", borderRadius: 24,
            border: `1px solid ${BORDER}`,
            boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
            padding: 8, overflow: "hidden",
          }}
        >
          <Cal
            namespace="book-a-call"
            calLink={CAL_LINK}
            style={{ width: "100%", height: "700px", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "light" }}
          />
        </motion.div>
      </section>
    </div>
  );
}
