"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AmbientBackground from "@/components/ui/AmbientBackground";
import TabShowcase from "@/components/ui/TabShowcase";
import { supabase } from "@/lib/supabase";

const INK    = "#0A0A0A";
const P      = "#0A0A0A";
const S      = "#71717A";
const MUTED  = "#71717A";
const BORDER = "rgba(0,0,0,0.09)";
const EXPO   = [0.16, 1, 0.3, 1] as const;

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
  const [email, setEmail]         = useState("");
  const [open, setOpen]           = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError("");

    const { error: insertError } = await supabase
      .from("leads")
      .insert({ email, source: "lp" });

    setLoading(false);

    if (insertError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
    setShowPopup(true);
  };

  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh", position: "relative" }}>

      {/* ── Thank-you popup ── */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowPopup(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 20,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: EXPO }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "#fff", borderRadius: 24,
                padding: "44px 40px", maxWidth: 400, width: "100%",
                textAlign: "center", position: "relative",
                boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
              }}
            >
              {/* Close */}
              <button onClick={() => setShowPopup(false)} style={{
                position: "absolute", top: 14, right: 14,
                width: 28, height: 28, borderRadius: "50%",
                border: "1px solid rgba(0,0,0,0.1)", background: "transparent",
                cursor: "pointer", fontSize: 16, color: MUTED,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>×</button>

              {/* Check */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: EXPO }}
                style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(34,197,94,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l5 5L20 7" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>

              <h2 style={{
                fontSize: 22, fontWeight: 700, color: INK,
                letterSpacing: "-0.03em", marginBottom: 12,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}>
                You're in.
              </h2>
              <p style={{
                fontSize: 14, color: MUTED, lineHeight: 1.7,
                fontFamily: "var(--font-geist), sans-serif",
                marginBottom: 24,
              }}>
                Thanks for reaching out. Ziad will be in touch within 24 hours to set up your intro call.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  background: INK, color: "#fff", border: "none",
                  borderRadius: 100, padding: "11px 28px",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  fontFamily: "var(--font-geist), sans-serif",
                }}
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
          background: "rgba(250,250,250,0.88)",
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
          Book intro call
        </button>
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
              }}
            >
              Email that turns<br />
              <span style={{ color: MUTED }}>your audience</span><br />
              into revenue.
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
              We build and run the whole system: grow your list, run your newsletter every week, and launch your products. You create. We handle the inbox.
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
                    Book an intro call
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
                      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
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
                      disabled={loading}
                      style={{
                        flexShrink: 0, padding: "11px 22px",
                        background: INK, color: "#fff",
                        border: "none", borderRadius: 100,
                        fontSize: 14, fontWeight: 600,
                        cursor: loading ? "default" : "pointer",
                        opacity: loading ? 0.6 : 1,
                        letterSpacing: "-0.01em",
                        fontFamily: "var(--font-geist), sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {loading ? "Sending…" : "Send"}
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
                      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
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
                      Thanks. We'll reach out within 24 hours.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <p style={{ fontSize: 12, color: "#E5484D", marginTop: 12, paddingLeft: 4, fontFamily: "var(--font-geist), sans-serif" }}>
                  {error}
                </p>
              )}

              {!submitted && !error && (
                <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", marginTop: 12, paddingLeft: 4, fontFamily: "var(--font-geist), sans-serif" }}>
                  20-min intro call · No commitment
                </p>
              )}
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
    </div>
  );
}
