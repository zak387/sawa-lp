"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AmbientBackground from "@/components/ui/AmbientBackground";
import TabShowcase from "@/components/ui/TabShowcase";

const INK    = "#0B1E3D";
const P      = "#1E9BF0";
const S      = "#60BFFF";
const MUTED  = "#6485A8";
const BORDER = "rgba(11,30,61,0.08)";
const EXPO   = [0.16, 1, 0.3, 1] as const;

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="32" height="22" viewBox="0 0 46 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill={P} />
        <circle cx="30" cy="16" r="13" fill={S} />
        <path d="M23 4.5 C27.5 7.5 27.5 24.5 23 27.5 C18.5 24.5 18.5 7.5 23 4.5Z" fill="#A8DEFF" opacity="0.9" />
      </svg>
      <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: 18, fontWeight: 600, color: INK, letterSpacing: "-0.04em" }}>
        sawa
      </span>
    </div>
  );
}

export default function OnePager() {
  const [email, setEmail]         = useState("");
  const [open, setOpen]           = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#F0F5FF", minHeight: "100vh", position: "relative" }}>
      <AmbientBackground />

      {/* NAV */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EXPO }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 40px", height: 64,
          background: "rgba(240,245,255,0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <Logo />
        <button
          onClick={() => setOpen(true)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: INK, color: "#fff", borderRadius: 100,
            padding: "9px 20px", fontSize: 13, fontWeight: 600,
            letterSpacing: "-0.01em", border: "none", cursor: "pointer",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}
        >
          Get your audit
        </button>
      </motion.nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px 40px 60px", maxWidth: 1200, margin: "0 auto",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", width: "100%" }}>

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
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: S, display: "block" }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: P, letterSpacing: "0.02em", fontFamily: "var(--font-geist), sans-serif" }}>
                Email marketing for 7-8 figure brands
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
              }}
            >
              Email that turns<br />
              <span style={{ color: P }}>your list</span> into<br />
              <span style={{
                background: `linear-gradient(135deg, ${P}, ${S})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>revenue.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: EXPO }}
              style={{
                fontSize: 17, lineHeight: 1.7, color: MUTED,
                maxWidth: 440, marginBottom: 36,
                fontFamily: "var(--font-geist), sans-serif",
              }}
            >
              We build, write, and run your entire email channel: setup, copywriting, campaigns, and analytics. You focus on the business. We handle the inbox.
            </motion.p>

            {/* CTA — button morphs into email form on click */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: EXPO }}
              style={{ maxWidth: 420 }}
            >
              <AnimatePresence mode="wait">

                {/* State 1: Button */}
                {!open && !submitted && (
                  <motion.button
                    key="btn"
                    onClick={() => setOpen(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: EXPO }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: INK, color: "#fff",
                      border: "none", borderRadius: 100,
                      padding: "13px 26px", fontSize: 15, fontWeight: 600,
                      cursor: "pointer", letterSpacing: "-0.01em",
                      fontFamily: "var(--font-geist), sans-serif",
                    }}
                  >
                    Get your free audit
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                )}

                {/* State 2: Email input */}
                {open && !submitted && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, width: "60%", scale: 0.97 }}
                    animate={{ opacity: 1, width: "100%", scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EXPO }}
                    style={{
                      display: "flex", alignItems: "center",
                      background: "#fff",
                      border: `1.5px solid ${BORDER}`,
                      borderRadius: 100,
                      padding: "5px 5px 5px 20px",
                      boxShadow: "0 4px 24px rgba(11,30,61,0.08)",
                    }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="type your email"
                      required
                      autoFocus
                      style={{
                        flex: 1, border: "none", background: "transparent",
                        fontSize: 14, color: INK, outline: "none", minWidth: 0,
                        fontFamily: "var(--font-geist), sans-serif",
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        flexShrink: 0, padding: "11px 22px",
                        background: INK, color: "#fff",
                        border: "none", borderRadius: 100,
                        fontSize: 14, fontWeight: 600, cursor: "pointer",
                        letterSpacing: "-0.01em",
                        fontFamily: "var(--font-geist), sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Send
                    </button>
                  </motion.form>
                )}

                {/* State 3: Success */}
                {submitted && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EXPO }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: "#fff", border: `1.5px solid rgba(34,197,94,0.3)`,
                      borderRadius: 100, padding: "12px 20px",
                      boxShadow: "0 4px 24px rgba(11,30,61,0.08)",
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "rgba(34,197,94,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12l5 5L20 7" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: INK, fontFamily: "var(--font-geist), sans-serif" }}>
                      You're on the list. Audit incoming within 48hrs.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {!submitted && (
                <p style={{ fontSize: 12, color: "rgba(11,30,61,0.35)", marginTop: 12, paddingLeft: 4, fontFamily: "var(--font-geist), sans-serif" }}>
                  Free · No obligation · 48hr turnaround
                </p>
              )}
            </motion.div>
          </div>

          {/* Tab Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EXPO }}
          >
            <TabShowcase />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
