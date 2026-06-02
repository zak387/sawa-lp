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
const EMAIL_FULL = `Hey Sarah,

You left something behind two days ago. We get it — timing isn't always right.

But here's the thing: the Linen Blazer in your size is almost gone. Only 2 left.

We're holding it for you until midnight tonight.

Use code COMEBACK15 for 15% off at checkout.

— The Team at Maison`;

function CopywritingPanel({ active }: { active: boolean }) {
  const [subject, setSubject] = useState("");
  const [body, setBody]       = useState("");
  const [done, setDone]       = useState(false);

  const SUBJECT = "We saved something for you, Sarah.";

  useEffect(() => {
    if (!active) { setSubject(""); setBody(""); setDone(false); return; }

    // Type subject first
    let si = 0;
    const subjectTimer = setInterval(() => {
      si++;
      setSubject(SUBJECT.slice(0, si));
      if (si >= SUBJECT.length) {
        clearInterval(subjectTimer);
        // Then type body
        let bi = 0;
        const bodyTimer = setInterval(() => {
          bi++;
          setBody(EMAIL_FULL.slice(0, bi));
          if (bi >= EMAIL_FULL.length) {
            clearInterval(bodyTimer);
            setTimeout(() => setDone(true), 500);
          }
        }, 18);
      }
    }, 45);

    return () => clearInterval(subjectTimer);
  }, [active]);

  const isTypingSubject = subject.length < SUBJECT.length && subject.length > 0;
  const isTypingBody    = subject.length >= SUBJECT.length && body.length < EMAIL_FULL.length;

  return (
    <Shell title="sawa · new-email.tsx">
      {/* To / From row */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 10, marginBottom: 10 }}>
        {[
          { label: "From", value: "sawa@maison.co" },
          { label: "To",   value: "sarah@customer.com" },
        ].map(row => (
          <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
            <span style={{ fontSize: 10.5, color: MUTED, fontFamily: "system-ui, sans-serif", width: 34, flexShrink: 0 }}>{row.label}</span>
            <span style={{ fontSize: 11.5, color: INK, fontFamily: "system-ui, sans-serif" }}>{row.value}</span>
          </div>
        ))}
        {/* Subject */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10.5, color: MUTED, fontFamily: "system-ui, sans-serif", width: 34, flexShrink: 0 }}>Subject</span>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: INK, fontFamily: "system-ui, sans-serif" }}>
            {subject}
            {isTypingSubject && (
              <motion.span animate={{ opacity: [1,0,1] }} transition={{ repeat: Infinity, duration: 0.5 }}
                style={{ display: "inline-block", width: 1.5, height: 11, background: P, marginLeft: 1, verticalAlign: "middle" }} />
            )}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ minHeight: 200, position: "relative" }}>
        <pre style={{
          fontSize: 12, lineHeight: 1.75, color: "#334155",
          fontFamily: "system-ui, sans-serif", whiteSpace: "pre-wrap",
          margin: 0, wordBreak: "break-word",
        }}>
          {body}
          {isTypingBody && (
            <motion.span animate={{ opacity: [1,0,1] }} transition={{ repeat: Infinity, duration: 0.5 }}
              style={{ display: "inline-block", width: 1.5, height: 12, background: P, verticalAlign: "middle" }} />
          )}
        </pre>
      </div>

      {/* Done state */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EXPO }}
            style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12, marginTop: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["Personalized", "Brand Voice", "Optimized"].map((b, i) => (
                <motion.span key={b}
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3, ease: EXPO }}
                  style={{ fontSize: 10, fontWeight: 600, color: "#22C55E", background: "rgba(34,197,94,0.08)", borderRadius: 100, padding: "3px 9px", fontFamily: "system-ui, sans-serif" }}
                >
                  ✓ {b}
                </motion.span>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.35, ease: EXPO }}
              style={{ background: P, color: "#fff", borderRadius: 100, padding: "5px 14px", fontSize: 11, fontWeight: 700, fontFamily: "system-ui, sans-serif", cursor: "pointer" }}
            >
              Send →
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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(curr => {
        const idx = TABS.indexOf(curr);
        return TABS[(idx + 1) % TABS.length];
      });
    }, 20000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleTabClick = (tab: Tab) => {
    setActive(tab);
    startTimer(); // reset 20s timer on manual click
  };

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
            onClick={() => handleTabClick(tab)}
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
