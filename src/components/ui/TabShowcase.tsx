"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkflowAnimation from "./WorkflowAnimation";

const EXPO = [0.16, 1, 0.3, 1] as const;
const P    = "#1E9BF0";
const S    = "#60BFFF";
const A    = "#A8DEFF";
const INK  = "#0B1E3D";
const MUTED = "#6485A8";
const BORDER = "rgba(11,30,61,0.08)";

const TABS = ["Setup", "Copywriting", "Campaigns", "Analytics"] as const;
type Tab = typeof TABS[number];

/* ── Shell: browser chrome wrapper ─────────────────────────────── */
function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 18,
      border: `1px solid ${BORDER}`,
      boxShadow: "0 20px 60px rgba(11,30,61,0.10), 0 4px 16px rgba(11,30,61,0.05)",
      overflow: "hidden",
    }}>
      <div style={{
        background: "#F7F9FF", borderBottom: `1px solid ${BORDER}`,
        padding: "10px 16px", display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF6057","#FFBC2E","#28C840"].map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(11,30,61,0.4)", fontFamily: "system-ui, sans-serif" }}>
          {title}
        </span>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB 1 — SETUP (WorkflowAnimation)
══════════════════════════════════════════════════════════════════ */
function SetupPanel() {
  return <WorkflowAnimation />;
}

/* ══════════════════════════════════════════════════════════════════
   TAB 2 — COPYWRITING
══════════════════════════════════════════════════════════════════ */
const SUBJECT = "We saved your cart, Sarah.";
const BADGES = ["Personalized", "Brand Voice", "Optimized"];

function CopywritingPanel({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  // step 0: nothing, 1: subject, 2: header, 3: hero img, 4: greeting+body, 5: product card, 6: cta, 7: footer, 8: badges

  useEffect(() => {
    if (!active) { setStep(0); return; }
    const delays = [300, 700, 1100, 1600, 2200, 2900, 3500, 4200];
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, [active]);

  const show = (n: number) => step >= n;

  return (
    <Shell title="sawa · abandon-cart.html">

      {/* Subject line meta row */}
      <div style={{
        display: "flex", gap: 8, alignItems: "center",
        background: "#F7F9FF", border: `1px solid ${BORDER}`,
        borderRadius: 10, padding: "9px 14px", marginBottom: 12,
      }}>
        <span style={{ fontSize: 9.5, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "system-ui, sans-serif", flexShrink: 0 }}>Subject</span>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: INK, fontFamily: "system-ui, sans-serif" }}>
          {show(1) ? SUBJECT : (
            <motion.span animate={{ opacity: [1,0,1] }} transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ display: "inline-block", width: 1.5, height: 13, background: P, verticalAlign: "middle" }} />
          )}
        </span>
      </div>

      {/* Email preview */}
      <div style={{
        border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden",
        background: "#ffffff", fontSize: 0,
      }}>

        {/* Brand header */}
        <AnimatePresence>
          {show(2) && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EXPO }}
              style={{
                background: "#0B1E3D", padding: "14px 20px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", fontFamily: "system-ui, sans-serif" }}>MAISON</span>
              <div style={{ display: "flex", gap: 14 }}>
                {["New In", "Sale", "About"].map(l => (
                  <span key={l} style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "system-ui, sans-serif", cursor: "pointer" }}>{l}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero image */}
        <AnimatePresence>
          {show(3) && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.7 }} animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.5, ease: EXPO }}
              style={{
                height: 90, transformOrigin: "top",
                background: "linear-gradient(135deg, #E8F0FF 0%, #C8DEFF 50%, #D4EAFF 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Clothing illustration placeholder */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.4">
                <path d="M14 8 L8 16 L16 18 L16 40 L32 40 L32 18 L40 16 L34 8 L28 12 C26 14 22 14 20 12 Z" fill="#1B48C4" />
              </svg>
              <div style={{ position: "absolute", top: 10, right: 12, fontSize: 9, fontWeight: 600, color: "#1B48C4", background: "rgba(27,72,196,0.1)", borderRadius: 100, padding: "3px 8px", fontFamily: "system-ui, sans-serif" }}>
                Low Stock
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ padding: "16px 20px" }}>

          {/* Greeting + body */}
          <AnimatePresence>
            {show(4) && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EXPO }}>
                <p style={{ fontSize: 12, color: INK, lineHeight: 1.7, margin: "0 0 12px", fontFamily: "system-ui, sans-serif" }}>
                  Hey <span style={{ fontWeight: 700 }}>Sarah</span>,
                </p>
                <p style={{ fontSize: 12, color: "#4A5568", lineHeight: 1.7, margin: "0 0 14px", fontFamily: "system-ui, sans-serif" }}>
                  You left something behind. The <span style={{ color: INK, fontWeight: 600 }}>Linen Blazer</span> in your cart is almost gone — only <span style={{ color: "#E53E3E", fontWeight: 600 }}>2 left in your size</span>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product card */}
          <AnimatePresence>
            {show(5) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EXPO }}
                style={{
                  display: "flex", gap: 12, alignItems: "center",
                  background: "#F7F9FF", border: `1px solid ${BORDER}`,
                  borderRadius: 10, padding: "10px 12px", marginBottom: 14,
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                  background: "linear-gradient(135deg, #C8DEFF, #E8F0FF)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                    <path d="M14 8 L8 16 L16 18 L16 40 L32 40 L32 18 L40 16 L34 8 L28 12 C26 14 22 14 20 12 Z" fill="#1B48C4" opacity="0.5"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: INK, fontFamily: "system-ui, sans-serif" }}>Linen Blazer — Sand</div>
                  <div style={{ fontSize: 10.5, color: MUTED, fontFamily: "system-ui, sans-serif" }}>Size S · Qty 1</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, fontFamily: "system-ui, sans-serif" }}>$148</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA button */}
          <AnimatePresence>
            {show(6) && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: EXPO }}>
                <div style={{
                  background: "#0B1E3D", color: "#fff",
                  borderRadius: 8, padding: "11px",
                  textAlign: "center", fontSize: 12, fontWeight: 700,
                  fontFamily: "system-ui, sans-serif", marginBottom: 10, cursor: "pointer",
                  letterSpacing: "0.03em",
                }}>
                  Complete My Order →
                </div>
                <div style={{ textAlign: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 10.5, color: P, fontFamily: "system-ui, sans-serif", cursor: "pointer", textDecoration: "underline" }}>
                    Use code COMEBACK15 for 15% off
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer links */}
          <AnimatePresence>
            {show(7) && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: EXPO }}
                style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 10, display: "flex", justifyContent: "center", gap: 16 }}
              >
                {["View Collection", "Track Order", "Unsubscribe"].map(l => (
                  <span key={l} style={{ fontSize: 9.5, color: MUTED, fontFamily: "system-ui, sans-serif", cursor: "pointer", textDecoration: "underline" }}>{l}</span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Badges */}
      <AnimatePresence>
        {show(8) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EXPO }}
            style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}
          >
            {BADGES.map((b, i) => (
              <motion.div key={b} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.35, ease: EXPO }}
                style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "#22C55E", background: "rgba(34,197,94,0.08)", borderRadius: 100, padding: "4px 10px", fontFamily: "system-ui, sans-serif" }}
              >
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {b}
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.4, ease: EXPO }}
              style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: P, borderRadius: 100, padding: "4px 12px", fontFamily: "system-ui, sans-serif" }}
            >
              Ready to Send →
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB 3 — CAMPAIGNS
══════════════════════════════════════════════════════════════════ */
const FLOW_STEPS = [
  { label: "Welcome Email",    rate: "67%", stat: "Open Rate",   count: "1,245 sent" },
  { label: "Product Story",    rate: "51%", stat: "Open Rate",   count: "892 opened" },
  { label: "Customer Review",  rate: "8.4%",stat: "Click Rate",  count: "743 engaged" },
  { label: "Special Offer",    rate: "22%", stat: "Converted",   count: "$12,400 rev" },
  { label: "Win Back",         rate: "34%", stat: "Re-engaged",  count: "280 returned" },
];

function CampaignsPanel({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!active) { setVisible(0); setCounter(0); return; }
    let c = 0;
    const t1 = setInterval(() => {
      setCounter(n => n < 1245 ? n + 41 : 1245);
      if (++c > 30) clearInterval(t1);
    }, 40);
    const t2 = setInterval(() => {
      setVisible(n => {
        if (n >= FLOW_STEPS.length) { clearInterval(t2); return n; }
        return n + 1;
      });
    }, 380);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [active]);

  return (
    <Shell title="sawa · campaign-flow.tsx">
      {/* Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          marginBottom: 16, padding: "8px 12px",
          background: `${P}10`, borderRadius: 10, border: `1px solid ${P}25`,
        }}
      >
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E" }}>
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E" }}
          />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: INK, fontFamily: "system-ui, sans-serif" }}>
          {counter.toLocaleString()} customers in sequence
        </span>
      </motion.div>

      {/* Flow */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {FLOW_STEPS.map((step, i) => (
          <div key={step.label}>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={i < visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease: EXPO }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: i < visible ? "#fff" : "transparent",
                border: `1px solid ${i < visible ? BORDER : "transparent"}`,
                borderRadius: 12, padding: "10px 14px",
                boxShadow: i < visible ? "0 2px 12px rgba(11,30,61,0.05)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: `${P}15`, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK, fontFamily: "system-ui, sans-serif" }}>{step.label}</div>
                  <div style={{ fontSize: 10, color: MUTED, fontFamily: "system-ui, sans-serif" }}>{step.count}</div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={i < visible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.3, ease: EXPO }}
                style={{ textAlign: "right" }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: P, fontFamily: "system-ui, sans-serif", letterSpacing: "-0.02em" }}>{step.rate}</div>
                <div style={{ fontSize: 9.5, color: MUTED, fontFamily: "system-ui, sans-serif" }}>{step.stat}</div>
              </motion.div>
            </motion.div>

            {/* Connector */}
            {i < FLOW_STEPS.length - 1 && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={i + 1 < visible ? { scaleY: 1, opacity: 1 } : {}}
                transition={{ duration: 0.3, ease: EXPO }}
                style={{
                  width: 1.5, height: 14, background: `${P}40`,
                  margin: "0 auto", transformOrigin: "top",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB 4 — ANALYTICS
══════════════════════════════════════════════════════════════════ */
const TOASTS = [
  { text: "Campaign exceeded benchmark",  sub: "Open rate 2.1× industry avg", dot: "#22C55E" },
  { text: "Top performing email found",   sub: "Summer Drop · 68% open rate",  dot: P },
  { text: "Revenue spike detected",       sub: "+$8,240 in last 6 hours",      dot: "#F59E0B" },
];

const BAR_HEIGHTS = [28, 42, 36, 55, 48, 70, 62, 80, 74, 88, 76, 95];

function AnalyticsPanel({ active }: { active: boolean }) {
  const [rev, setRev]           = useState(0);
  const [openRate, setOpenRate] = useState(0);
  const [clickRate, setClickRate] = useState(0);
  const [barsVisible, setBarsVisible] = useState(false);
  const [toastIdx, setToastIdx]   = useState(0);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      setRev(0); setOpenRate(0); setClickRate(0);
      setBarsVisible(false); setToastIdx(0); setToastVisible(false);
      return;
    }

    let start = 0;
    const dur = 1400;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setRev(Math.floor(e * 48290));
      setOpenRate(parseFloat((e * 48.2).toFixed(1)));
      setClickRate(parseFloat((e * 8.6).toFixed(1)));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const t1 = setTimeout(() => setBarsVisible(true), 400);
    const t2 = setTimeout(() => {
      setToastVisible(true);
      const t3 = setInterval(() => setToastIdx(n => (n + 1) % TOASTS.length), 2600);
      return () => clearInterval(t3);
    }, 800);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  const toast = TOASTS[toastIdx];

  return (
    <Shell title="sawa · analytics.tsx">
      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Revenue", value: `$${rev.toLocaleString()}`, change: "+18%", color: "#22C55E" },
          { label: "Open Rate", value: `${openRate}%`, change: "↑ 12%", color: P },
          { label: "Click Rate", value: `${clickRate}%`, change: "↑ 31%", color: S },
        ].map(k => (
          <div key={k.label} style={{
            background: "#F7F9FF", border: `1px solid ${BORDER}`,
            borderRadius: 12, padding: "12px 14px",
          }}>
            <div style={{ fontSize: 9.5, color: MUTED, marginBottom: 4, fontFamily: "system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {k.label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: INK, letterSpacing: "-0.04em", fontFamily: "system-ui, sans-serif", lineHeight: 1 }}>
              {k.value}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: k.color, marginTop: 3, fontFamily: "system-ui, sans-serif" }}>
              {k.change}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{
        background: "#F7F9FF", border: `1px solid ${BORDER}`,
        borderRadius: 12, padding: "14px", marginBottom: 14,
      }}>
        <div style={{ fontSize: 10, color: MUTED, marginBottom: 10, fontFamily: "system-ui, sans-serif", fontWeight: 500 }}>
          Revenue · Last 12 months
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 70 }}>
          {BAR_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={barsVisible ? { height: `${h}%` } : {}}
              transition={{ delay: i * 0.05, duration: 0.5, ease: EXPO }}
              style={{
                flex: 1, borderRadius: 4,
                background: i === BAR_HEIGHTS.length - 1
                  ? `linear-gradient(180deg, ${P}, ${S})`
                  : `${P}35`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence mode="wait">
        {toastVisible && (
          <motion.div
            key={toastIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EXPO }}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "#fff", border: `1px solid ${BORDER}`,
              borderRadius: 10, padding: "9px 12px",
              boxShadow: "0 4px 16px rgba(11,30,61,0.07)",
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: toast.dot, flexShrink: 0, boxShadow: `0 0 6px ${toast.dot}99` }} />
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: INK, fontFamily: "system-ui, sans-serif" }}>{toast.text}</div>
              <div style={{ fontSize: 10, color: MUTED, fontFamily: "system-ui, sans-serif" }}>{toast.sub}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════ */
export default function TabShowcase() {
  const [active, setActive] = useState<Tab>("Setup");

  return (
    <div>
      {/* Tab pills */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 20,
        background: "rgba(11,30,61,0.04)", borderRadius: 100,
        padding: 4, width: "fit-content",
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              padding: "7px 18px", borderRadius: 100,
              border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600,
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              letterSpacing: "-0.01em",
              background: active === tab ? "#fff" : "transparent",
              color: active === tab ? INK : MUTED,
              boxShadow: active === tab ? "0 2px 10px rgba(11,30,61,0.10)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.35, ease: EXPO }}
        >
          {active === "Setup"       && <SetupPanel />}
          {active === "Copywriting" && <CopywritingPanel active={active === "Copywriting"} />}
          {active === "Campaigns"   && <CampaignsPanel   active={active === "Campaigns"} />}
          {active === "Analytics"   && <AnalyticsPanel   active={active === "Analytics"} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
