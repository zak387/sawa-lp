"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/utils";
import Link from "next/link";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const INK    = "#0B1E3D";
const INK45  = "rgba(11,30,61,0.45)";
const BORDER = "rgba(11,30,61,0.08)";
const ROYAL  = "#1B48C4";
const SKY    = "#38BDF8";

/* ─────────────────────────────────────────────────────────────────
   SHARED SHELL — macOS-style window chrome
───────────────────────────────────────────────────────────────── */
function DemoShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid rgba(11,30,61,0.09)",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 24px 64px rgba(11,30,61,0.10), 0 4px 16px rgba(11,30,61,0.05)",
    }}>
      {/* Chrome */}
      <div style={{
        background: "#F7F9FF",
        borderBottom: "1px solid rgba(11,30,61,0.07)",
        padding: "10px 14px",
        display: "flex", alignItems: "center", gap: 10,
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
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DEMO 1 — Lifecycle Flows (vertical step flow)
───────────────────────────────────────────────────────────────── */
const flowSteps = [
  { label: "Welcome series",      sub: "Triggers on sign-up · 3 emails",    count: 198, color: ROYAL   },
  { label: "Day 3 browse nudge",  sub: "If not purchased · 1 email",         count: 142, color: SKY     },
  { label: "Day 7 offer",         sub: "10% off + social proof · 1 email",   count: 87,  color: ROYAL   },
  { label: "Win-back",            sub: "30-day inactive · 2 emails",         count: 31,  color: "#F59E0B"},
];

function FlowBuilderDemo({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(0);
  const [entered, setEntered] = useState(0);
  const [pulse, setPulse]     = useState(0);

  useEffect(() => {
    if (!active) return;
    let s = 0;
    const t1 = setInterval(() => { s++; setVisible(s); if (s >= flowSteps.length) clearInterval(t1); }, 260);
    let v = 0;
    const t2 = setInterval(() => { v = Math.min(v + 6, 243); setEntered(v); if (v >= 243) clearInterval(t2); }, 35);
    const t3 = setInterval(() => setPulse(n => (n + 1) % flowSteps.length), 1400);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, [active]);

  return (
    <DemoShell title="Lifecycle Flow Builder">
      <div style={{ position: "relative", paddingLeft: 8 }}>
        {/* Track line */}
        <div style={{ position: "absolute", left: 22, top: 15, bottom: 15, width: 1, background: "rgba(11,30,61,0.07)" }}>
          <motion.div
            animate={active ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.4, ease: [0.4,0,0.2,1], delay: 0.4 }}
            style={{ width: "100%", height: "100%", background: `linear-gradient(to bottom, ${ROYAL}, ${SKY})`, transformOrigin: "top" }}
          />
        </div>

        {flowSteps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: 16 }}
            animate={i < visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.38, ease: EXPO_OUT }}
            style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: i < flowSteps.length - 1 ? 10 : 0 }}
          >
            {/* Dot */}
            <div style={{
              width: 28, height: 28, borderRadius: "50%", flexShrink: 0, position: "relative", zIndex: 1,
              background: pulse === i ? step.color : "white",
              border: `2px solid ${pulse === i ? step.color : "rgba(11,30,61,0.12)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.35s ease",
              boxShadow: pulse === i ? `0 0 14px ${step.color}40` : "none",
            }}>
              {pulse === i && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "white", display: "block" }} />}
            </div>
            {/* Card */}
            <div style={{
              flex: 1, padding: "8px 12px", borderRadius: 10,
              background: pulse === i ? "white" : "rgba(11,30,61,0.02)",
              border: `1px solid ${pulse === i ? "rgba(27,72,196,0.14)" : "rgba(11,30,61,0.07)"}`,
              boxShadow: pulse === i ? "0 4px 14px rgba(27,72,196,0.07)" : "none",
              transition: "all 0.35s ease",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: pulse === i ? INK : INK45, letterSpacing: "-0.01em" }}>{step.label}</span>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: step.color, background: `${step.color}14`, padding: "2px 8px", borderRadius: 20 }}>
                  {step.count} active
                </span>
              </div>
              <div style={{ fontSize: 10, color: "#6485A8", marginTop: 2 }}>{step.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, padding: "9px 14px", borderRadius: 10, background: "rgba(27,72,196,0.04)", border: "1px solid rgba(27,72,196,0.08)" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", display: "block", boxShadow: "0 0 6px rgba(34,197,94,0.5)" }} />
        <span style={{ fontSize: 11, color: INK45 }}>Live</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: ROYAL, marginLeft: "auto" }}>{entered} contacts entered today</span>
      </div>
    </DemoShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DEMO 2 — Segmentation (contact table)
───────────────────────────────────────────────────────────────── */
const contacts = [
  { name: "Sarah K.",  orders: 7, ltv: "$840", segment: "VIP",     segColor: ROYAL     },
  { name: "Marcus T.", orders: 2, ltv: "$210", segment: "Active",  segColor: "#22C55E" },
  { name: "Priya M.",  orders: 1, ltv: "$95",  segment: "At-Risk", segColor: "#F59E0B" },
  { name: "James L.",  orders: 4, ltv: "$480", segment: "VIP",     segColor: ROYAL     },
  { name: "Olivia R.", orders: 0, ltv: "$60",  segment: "Dormant", segColor: "#6485A8" },
];

function SegmentTableDemo({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(0);
  const [flash, setFlash]     = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;
    let r = 0;
    const t1 = setInterval(() => { r++; setVisible(r); if (r >= contacts.length) clearInterval(t1); }, 180);
    const t2 = setInterval(() => setFlash(n => ((n ?? -1) + 1) % contacts.length), 1400);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [active]);

  return (
    <DemoShell title="Audience Segments">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 52px 58px 76px", padding: "0 10px 8px", borderBottom: "1px solid rgba(11,30,61,0.07)" }}>
        {["Contact","Orders","LTV","Segment"].map(h => (
          <span key={h} style={{ fontSize: 9, fontWeight: 600, color: "rgba(11,30,61,0.3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>{h}</span>
        ))}
      </div>
      {contacts.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 4 }}
          animate={i < visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.28, ease: EXPO_OUT }}
          style={{
            display: "grid", gridTemplateColumns: "1fr 52px 58px 76px",
            padding: "9px 10px",
            background: flash === i ? "rgba(27,72,196,0.03)" : "transparent",
            borderBottom: i < contacts.length - 1 ? "1px solid rgba(11,30,61,0.05)" : "none",
            transition: "background 0.3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%",
              background: `hsl(${i * 55 + 200}, 38%, 85%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, fontWeight: 700, color: `hsl(${i * 55 + 200}, 38%, 38%)`, flexShrink: 0,
            }}>{c.name[0]}</div>
            <span style={{ fontSize: 11, fontWeight: 500, color: INK }}>{c.name}</span>
          </div>
          <span style={{ fontSize: 11, color: INK45, display: "flex", alignItems: "center" }}>{c.orders}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: INK, display: "flex", alignItems: "center" }}>{c.ltv}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <motion.span
              animate={flash === i ? { scale: [1, 1.07, 1] } : {}}
              transition={{ duration: 0.25 }}
              style={{ fontSize: 9.5, fontWeight: 700, color: c.segColor, background: `${c.segColor}16`, border: `1px solid ${c.segColor}30`, padding: "2px 8px", borderRadius: 20 }}
            >{c.segment}</motion.span>
          </div>
        </motion.div>
      ))}
      <div style={{ display: "flex", gap: 20, padding: "11px 10px 2px", borderTop: "1px solid rgba(11,30,61,0.07)" }}>
        {[["1,240","VIP buyers"],["38%","email rev share"],["3.2×","LTV vs. avg"]].map(([v,l]) => (
          <div key={l}>
            <div style={{ fontSize: 13, fontWeight: 800, color: ROYAL, letterSpacing: "-0.03em" }}>{v}</div>
            <div style={{ fontSize: 9, color: "#6485A8" }}>{l}</div>
          </div>
        ))}
      </div>
    </DemoShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DEMO 3 — Copywriting (A/B subject line test)
───────────────────────────────────────────────────────────────── */
const abVariants = [
  { label: "A", subject: "Your cart is still waiting...",  open: 18.2, winner: false },
  { label: "B", subject: "Still thinking about it? 👀",    open: 34.6, winner: true  },
];

function ABTestDemo({ active }: { active: boolean }) {
  const [bars, setBars] = useState([0, 0]);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setBars([18.2, 34.6]), 450);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <DemoShell title="Subject Line A/B Test">
      {/* From strip */}
      <div style={{ padding: "9px 12px", borderRadius: 8, marginBottom: 14, background: "rgba(11,30,61,0.03)", border: "1px solid rgba(11,30,61,0.07)" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 9, color: "#6485A8", textTransform: "uppercase", letterSpacing: "0.08em" }}>From</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: INK }}>Sawa · hello@sawa.co</span>
        </div>
        <div style={{ fontSize: 10, color: INK45, fontStyle: "italic" }}>
          "We saved your bag — here's a little something to help you decide…"
        </div>
      </div>

      {abVariants.map((v, i) => (
        <motion.div
          key={v.label}
          initial={{ opacity: 0, y: 8 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.18 + 0.25, duration: 0.38, ease: EXPO_OUT }}
          style={{ marginBottom: 14 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                background: v.winner ? ROYAL : "rgba(11,30,61,0.07)",
                color: v.winner ? "white" : INK45,
                fontSize: 9, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{v.label}</span>
              <span style={{ fontSize: 11, fontWeight: v.winner ? 600 : 400, color: v.winner ? INK : INK45 }}>{v.subject}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginLeft: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: v.winner ? ROYAL : INK45 }}>{v.open}%</span>
              {v.winner && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={active ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.3, duration: 0.35, ease: EXPO_OUT }}
                  style={{ fontSize: 9, fontWeight: 700, color: "#22C55E", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", padding: "2px 7px", borderRadius: 20 }}
                >WINNER</motion.span>
              )}
            </div>
          </div>
          <div style={{ height: 5, borderRadius: 99, background: "rgba(11,30,61,0.06)", overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${(bars[i] / 42) * 100}%` }}
              initial={{ width: "0%" }}
              transition={{ duration: 1.1, ease: [0.4,0,0.2,1], delay: 0.55 + i * 0.15 }}
              style={{ height: "100%", background: v.winner ? `linear-gradient(to right, ${ROYAL}, ${SKY})` : "rgba(11,30,61,0.18)", borderRadius: 99 }}
            />
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.4 }}
        style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(27,72,196,0.05)", border: "1px solid rgba(27,72,196,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <span style={{ fontSize: 11, color: INK45 }}>Open rate lift from this test</span>
        <span style={{ fontSize: 17, fontWeight: 800, color: ROYAL, letterSpacing: "-0.03em" }}>+16.4pp</span>
      </motion.div>
    </DemoShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DEMO 4 — Campaigns (scheduled send list)
───────────────────────────────────────────────────────────────── */
const campaigns = [
  { date: "Jun 3",  name: "Summer Sale Teaser",  status: "sent",      rev: "$3,200", opens: "31%" },
  { date: "Jun 7",  name: "VIP Early Access",     status: "sent",      rev: "$8,400", opens: "44%" },
  { date: "Jun 10", name: "New Collection Drop",  status: "scheduled", rev: null,     opens: null  },
  { date: "Jun 14", name: "Re-engagement Blast",  status: "draft",     rev: null,     opens: null  },
  { date: "Jun 18", name: "Flash Sale · 48hrs",   status: "draft",     rev: null,     opens: null  },
];

function CampaignListDemo({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(0);
  const [highlight, setHighlight] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;
    let n = 0;
    const t1 = setInterval(() => { n++; setVisible(n); if (n >= campaigns.length) clearInterval(t1); }, 150);
    const t2 = setInterval(() => setHighlight(h => h === 0 ? 1 : 0), 1800);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [active]);

  const ss = (s: string) => {
    if (s === "sent")      return { color: "#22C55E", bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.2)"   };
    if (s === "scheduled") return { color: ROYAL,     bg: "rgba(27,72,196,0.08)",   border: "rgba(27,72,196,0.2)"   };
    return                        { color: "#6485A8", bg: "rgba(11,30,61,0.04)",    border: "rgba(11,30,61,0.1)"    };
  };

  return (
    <DemoShell title="Campaign Calendar · Jun 2025">
      {campaigns.map((c, i) => {
        const style = ss(c.status);
        return (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -10 }}
            animate={i < visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, ease: EXPO_OUT }}
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 4px",
              borderBottom: i < campaigns.length - 1 ? "1px solid rgba(11,30,61,0.05)" : "none",
              background: highlight === i && c.status === "sent" ? "rgba(27,72,196,0.025)" : "transparent",
              borderRadius: 6, transition: "background 0.35s ease",
            }}
          >
            <span style={{ fontSize: 10, color: "#6485A8", minWidth: 36, flexShrink: 0 }}>{c.date}</span>
            <span style={{ fontSize: 11, fontWeight: 500, color: INK, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
            {c.rev  && <span style={{ fontSize: 11, fontWeight: 700, color: ROYAL, flexShrink: 0 }}>{c.rev}</span>}
            {c.opens && <span style={{ fontSize: 10, color: "#6485A8", flexShrink: 0 }}>{c.opens}</span>}
            <span style={{ fontSize: 9, fontWeight: 600, color: style.color, background: style.bg, border: `1px solid ${style.border}`, padding: "2px 7px", borderRadius: 20, flexShrink: 0 }}>
              {c.status}
            </span>
          </motion.div>
        );
      })}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(11,30,61,0.07)" }}>
        <span style={{ fontSize: 10, color: "#6485A8" }}>5 campaigns · 2 sent this month</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: ROYAL }}>$11,600 attributed</span>
      </div>
    </DemoShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DEMO 5 — Infrastructure (deliverability health)
───────────────────────────────────────────────────────────────── */
const dnsRows = [
  { label: "DKIM record configured", key: "dkim" },
  { label: "SPF policy active",      key: "spf"  },
  { label: "DMARC policy set",       key: "dmarc"},
];

function InboxHealthDemo({ active }: { active: boolean }) {
  const [checked, setChecked]   = useState(0);
  const [score, setScore]       = useState(0);
  const [bar, setBar]           = useState(0);

  useEffect(() => {
    if (!active) return;
    let c = 0;
    const t1 = setInterval(() => { c++; setChecked(c); if (c >= dnsRows.length) clearInterval(t1); }, 520);
    let s = 0;
    const t2 = setInterval(() => { s = Math.min(s + 3, 98); setScore(s); if (s >= 98) clearInterval(t2); }, 22);
    const t3 = setTimeout(() => setBar(94), 700);
    return () => { clearInterval(t1); clearInterval(t2); clearTimeout(t3); };
  }, [active]);

  return (
    <DemoShell title="Deliverability Health Check">
      <div style={{ marginBottom: 16 }}>
        {dnsRows.map((row, i) => {
          const ok = checked > i;
          return (
            <motion.div
              key={row.key}
              initial={{ opacity: 0, x: -8 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.28 + 0.2, duration: 0.36, ease: EXPO_OUT }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 13px", borderRadius: 9, marginBottom: 8,
                background: ok ? "rgba(34,197,94,0.04)" : "rgba(11,30,61,0.03)",
                border: `1px solid ${ok ? "rgba(34,197,94,0.15)" : BORDER}`,
                transition: "all 0.4s ease",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 500, color: INK45 }}>{row.label}</span>
              <motion.span
                initial={{ scale: 0 }}
                animate={ok ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 14 }}
                style={{ fontSize: 10, fontWeight: 700, color: "#22C55E", background: "rgba(34,197,94,0.1)", padding: "2px 8px", borderRadius: 20 }}
              >✓ PASS</motion.span>
            </motion.div>
          );
        })}
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: INK45, fontWeight: 500 }}>Inbox placement rate</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: ROYAL }}>{bar}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 99, background: "rgba(11,30,61,0.07)", overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${bar}%` }}
            initial={{ width: "0%" }}
            transition={{ duration: 1.2, ease: [0.4,0,0.2,1], delay: 0.5 }}
            style={{ height: "100%", background: `linear-gradient(to right, ${ROYAL}, ${SKY})`, borderRadius: 99 }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "linear-gradient(135deg, rgba(27,72,196,0.05), rgba(56,189,248,0.05))", border: "1px solid rgba(27,72,196,0.1)" }}>
        <div>
          <div style={{ fontSize: 9.5, color: "#6485A8", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 3 }}>Deliverability Score</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: ROYAL, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {score}<span style={{ fontSize: 14, fontWeight: 400, color: "#6485A8" }}>/100</span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={active && score >= 98 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: EXPO_OUT }}
          style={{ fontSize: 11, fontWeight: 600, color: "#22C55E", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", padding: "6px 12px", borderRadius: 20 }}
        >Excellent</motion.div>
      </div>
    </DemoShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DEMO 6 — Reporting (revenue chart + KPIs)
───────────────────────────────────────────────────────────────── */
const chartBars = [62, 74, 81, 88, 112, 142];
const chartMonths = ["Jan","Feb","Mar","Apr","May","Jun"];

function RevenueDemo({ active }: { active: boolean }) {
  const [barsVis, setBarsVis]  = useState(false);
  const [counter, setCounter]  = useState(0);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setBarsVis(true), 300);
    let v = 0;
    const t2 = setInterval(() => { v = Math.min(v + 4, 142); setCounter(v); if (v >= 142) clearInterval(t2); }, 16);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, [active]);

  const maxH = 80;
  const maxV = Math.max(...chartBars);

  return (
    <DemoShell title="Revenue Attribution · Jun 2025">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 18 }}>
        {[
          { label: "Email revenue",  value: `$${counter}K`, delta: "+23%",   color: ROYAL     },
          { label: "Open rate",      value: "34.2%",         delta: "+6pts",  color: SKY       },
          { label: "Rev / email",    value: "$4.80",          delta: "+$0.60", color: "#22C55E" },
        ].map(m => (
          <div key={m.label} style={{ padding: "10px 11px", borderRadius: 8, background: "rgba(11,30,61,0.03)", border: "1px solid rgba(11,30,61,0.07)" }}>
            <div style={{ fontSize: 9, color: "#6485A8", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, letterSpacing: "-0.03em", lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: 9.5, color: m.color, fontWeight: 600, marginTop: 3 }}>↑ {m.delta}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: maxH + 24 }}>
        {chartBars.map((v, i) => {
          const h = (v / maxV) * maxH;
          const isLast = i === chartBars.length - 1;
          return (
            <div key={chartMonths[i]} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{ width: "100%", height: maxH, display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative" }}>
                <motion.div
                  animate={barsVis ? { height: h } : { height: 0 }}
                  initial={{ height: 0 }}
                  transition={{ duration: 0.65, ease: [0.4,0,0.2,1], delay: i * 0.07 }}
                  style={{
                    width: "100%", borderRadius: "4px 4px 0 0",
                    background: isLast ? `linear-gradient(to top, ${ROYAL}, ${SKY})` : "rgba(27,72,196,0.14)",
                    position: "relative",
                  }}
                >
                  {isLast && barsVis && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 }}
                      style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 700, color: ROYAL, whiteSpace: "nowrap" }}
                    >$142K</motion.div>
                  )}
                </motion.div>
              </div>
              <span style={{ fontSize: 8.5, color: "#6485A8" }}>{chartMonths[i]}</span>
            </div>
          );
        })}
      </div>
    </DemoShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SHOWCASE SECTION — alternating layout with scroll reveal
───────────────────────────────────────────────────────────────── */
interface Showcase {
  id: string;
  label: string;
  labelColor: string;
  headline: string;
  body: string;
  bullets: { text: string; sub: string }[];
  metric: { value: string; label: string };
  reversed: boolean;
  demo: (active: boolean) => React.ReactNode;
}

function ShowcaseSection({ s }: { s: Showcase }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const copyX  = s.reversed ? 28 : -28;
  const demoX  = s.reversed ? -28 : 28;

  return (
    <div ref={ref} className="py-20 md:py-28 border-b" style={{ borderColor: BORDER }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Copy */}
        <motion.div
          className={s.reversed ? "lg:order-2" : "lg:order-1"}
          initial={{ opacity: 0, x: copyX }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: EXPO_OUT, delay: 0.08 }}
        >
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.labelColor, display: "block" }} />
            <span className="text-caption-label" style={{ color: s.labelColor }}>{s.label}</span>
          </div>

          {/* Headline */}
          <h3 className="font-display text-display-3 mb-5" style={{ color: INK }}>{s.headline}</h3>

          {/* Body */}
          <p className="text-body-lg mb-10" style={{ color: INK45, maxWidth: 440, lineHeight: "1.72" }}>{s.body}</p>

          {/* Bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
            {s.bullets.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: EXPO_OUT, delay: 0.22 + i * 0.09 }}
                style={{ display: "flex", gap: 12 }}
              >
                <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 2, background: "rgba(27,72,196,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4.5 7.5L8.5 3" stroke={ROYAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK, letterSpacing: "-0.01em", marginBottom: 2 }}>{b.text}</div>
                  <div style={{ fontSize: 12.5, color: INK45, lineHeight: 1.55 }}>{b.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Metric chip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.55, ease: EXPO_OUT, delay: 0.52 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 18px", borderRadius: 12, background: "rgba(27,72,196,0.05)", border: "1px solid rgba(27,72,196,0.12)" }}
          >
            <span style={{ fontSize: 22, fontWeight: 800, color: ROYAL, letterSpacing: "-0.04em" }}>{s.metric.value}</span>
            <span style={{ fontSize: 11, color: INK45, maxWidth: 140, lineHeight: 1.45 }}>{s.metric.label}</span>
          </motion.div>
        </motion.div>

        {/* Demo visual */}
        <motion.div
          className={s.reversed ? "lg:order-1" : "lg:order-2"}
          initial={{ opacity: 0, x: demoX, scale: 0.97 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: EXPO_OUT, delay: 0.04 }}
        >
          {s.demo(inView)}
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SHOWCASES DATA
───────────────────────────────────────────────────────────────── */
const showcases: Showcase[] = [
  {
    id: "flows",
    label: "Lifecycle Flows",
    labelColor: ROYAL,
    headline: "Lifecycle flows.",
    body: "Welcome, post-purchase, cart abandon, win-back — every automation built from scratch and personalised to your customer data. We own the whole thing.",
    bullets: [
      { text: "Fully built and managed by us",  sub: "We write every email, configure every trigger — you don't touch a thing." },
      { text: "Data-driven branching",          sub: "CLV-based sequences, RFM triggers, and dynamic personalisation built in." },
      { text: "Live in 2–3 weeks",              sub: "Core flows running before most agencies finish their discovery phase." },
    ],
    metric: { value: "$40K/mo", label: "average cart abandon flow revenue across our client base" },
    reversed: false,
    demo: (active) => <FlowBuilderDemo active={active} />,
  },
  {
    id: "segmentation",
    label: "Segmentation",
    labelColor: SKY,
    headline: "Segmentation.",
    body: "Every contact scored, labelled, and routed into the right sequence. RFM models and predictive CLV so your emails feel 1:1 at any list size.",
    bullets: [
      { text: "RFM scoring engine",         sub: "Recency, frequency, and monetary value segments updated in real time." },
      { text: "Predictive CLV modelling",   sub: "Know which customers are about to churn before they do." },
      { text: "Dynamic content blocks",     sub: "One email, infinite personalised variants — no extra sends." },
    ],
    metric: { value: "1,240", label: "VIP contacts identified in first segment audit" },
    reversed: true,
    demo: (active) => <SegmentTableDemo active={active} />,
  },
  {
    id: "copy",
    label: "Copywriting",
    labelColor: ROYAL,
    headline: "Copywriting.",
    body: "No templates, no AI spam. Every subject line and email body written to match your brand voice — then tested systematically until it performs.",
    bullets: [
      { text: "Deep brand voice audit",   sub: "We study your tone, customers, and competitors before writing a single word." },
      { text: "Subject line A/B testing", sub: "Every send has a tested subject. Winners compound over months." },
      { text: "One action per email",     sub: "No cluttered layouts. Every email built around a single, clear conversion." },
    ],
    metric: { value: "+28%", label: "average open rate lift from our A/B testing programme" },
    reversed: false,
    demo: (active) => <ABTestDemo active={active} />,
  },
  {
    id: "campaigns",
    label: "Campaign Management",
    labelColor: SKY,
    headline: "Campaign management.",
    body: "Your send calendar owned, written, and executed every week. Every campaign tracked against actual revenue — not just opens and clicks.",
    bullets: [
      { text: "Weekly send ownership",        sub: "Brief, write, review, send — all on our side. You just approve." },
      { text: "Revenue-attributed tracking",  sub: "Every campaign measured against direct and assisted revenue." },
      { text: "Promotional planning",         sub: "Flash sales, product launches, and seasonal pushes — all handled." },
    ],
    metric: { value: "$11.6K", label: "average monthly campaign revenue for brands on our programme" },
    reversed: true,
    demo: (active) => <CampaignListDemo active={active} />,
  },
  {
    id: "infra",
    label: "Infrastructure",
    labelColor: ROYAL,
    headline: "Deliverability.",
    body: "Domain authentication, list hygiene, and deliverability warm-up — the technical foundation without which nothing else works.",
    bullets: [
      { text: "Full DNS setup and monitoring", sub: "DKIM, SPF, and DMARC configured and watched. You never hit spam." },
      { text: "List hygiene programme",        sub: "Automated suppression, bounce handling, and re-engagement windows." },
      { text: "Deliverability health scores",  sub: "Weekly tracking with proactive fixes before problems emerge." },
    ],
    metric: { value: "94%", label: "average inbox placement rate across our client base" },
    reversed: false,
    demo: (active) => <InboxHealthDemo active={active} />,
  },
  {
    id: "reporting",
    label: "Reporting",
    labelColor: SKY,
    headline: "Reporting.",
    body: "Monthly reports built around what actually matters: attributed revenue, flow performance, and a clear roadmap for what we're optimising next.",
    bullets: [
      { text: "Attributed revenue tracking",    sub: "See exactly how much each flow and campaign contributed." },
      { text: "Month-over-month benchmarks",    sub: "Your programme measured against your own baseline, not industry averages." },
      { text: "Forward-looking optimisation",   sub: "Every report ends with what we're testing and improving next month." },
    ],
    metric: { value: "38%", label: "of total revenue attributed to email for top-performing clients" },
    reversed: true,
    demo: (active) => <RevenueDemo active={active} />,
  },
];

/* ─────────────────────────────────────────────────────────────────
   PROCESS SECTION (How We Work)
───────────────────────────────────────────────────────────────── */
const StepIcons = [
  <svg key="audit" width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.8"/><path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="build" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3L21 8L12 13L3 8L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M3 13L12 18L21 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="send" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="scale" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 7H21V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

const phases = [
  { number: "01", name: "Audit",     timeline: "Week 1",    desc: "We review your ESP, flows, and deliverability. You get a written breakdown of every gap." },
  { number: "02", name: "Build",     timeline: "Weeks 2–5", desc: "Core flows written, segmentation live, infrastructure configured. All in your voice." },
  { number: "03", name: "Campaigns", timeline: "Month 2+",  desc: "We own your full campaign calendar — planned, written, and tracked against revenue." },
  { number: "04", name: "Scale",     timeline: "Month 3+",  desc: "VIP flows, predictive segments, and compounding revenue. The system gets smarter monthly." },
];

function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 70%", "end 40%"] });
  const rawLine  = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidth = useSpring(rawLine, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    phaseRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActivePhase(i); }, { threshold: 0.5 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div ref={sectionRef} className="pt-24 pb-16 border-t" style={{ borderColor: BORDER }} id="how-we-work">
      <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.08)} className="mb-16">
        <motion.div variants={fadeUp} className="section-label mb-4">How we work</motion.div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.h2 variants={fadeUp} className="font-display text-display-2 max-w-[480px]" style={{ color: INK }}>Live in 30 days.</motion.h2>
          <motion.p variants={fadeUp} className="text-sm md:pb-1 max-w-[280px]" style={{ color: INK45 }}>From first audit to running programme — most clients are live in under a month.</motion.p>
        </div>
      </motion.div>

      {/* Desktop steps */}
      <div className="hidden md:block mb-10">
        <div className="relative mb-10">
          <div className="h-px w-full" style={{ background: "rgba(11,30,61,0.08)" }} />
          <motion.div className="absolute top-0 left-0 h-px origin-left" style={{ width: lineWidth, background: ROYAL }} />
        </div>
        <div className="grid grid-cols-4 gap-6">
          {phases.map((p, i) => (
            <motion.div
              key={p.number}
              ref={el => { phaseRefs.current[i] = el; }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EXPO_OUT, delay: i * 0.08 }}
              className="relative"
            >
              <div className="absolute -top-[41px] left-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{ background: activePhase >= i ? ROYAL : "#F0F5FF", borderColor: activePhase >= i ? ROYAL : "rgba(11,30,61,0.15)", transition: "all 0.4s ease" }}>
                {activePhase === i && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#fff" }} />}
              </div>
              <div className="p-5 rounded-2xl h-full" style={{ background: activePhase === i ? "#fff" : "rgba(255,255,255,0.5)", border: `1px solid ${activePhase === i ? "rgba(27,72,196,0.15)" : BORDER}`, boxShadow: activePhase === i ? "0 8px 24px rgba(27,72,196,0.08)" : "none", transition: "all 0.4s ease" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: activePhase >= i ? "rgba(27,72,196,0.08)" : "rgba(11,30,61,0.04)", color: activePhase >= i ? ROYAL : "rgba(11,30,61,0.25)", transition: "all 0.4s ease" }}>
                  {StepIcons[i]}
                </div>
                <span className="text-xs font-mono mb-1 block" style={{ color: activePhase >= i ? ROYAL : "rgba(11,30,61,0.25)" }}>{p.timeline}</span>
                <h3 className="text-base font-semibold mb-2" style={{ color: activePhase === i ? INK : "rgba(11,30,61,0.35)", letterSpacing: "-0.02em", transition: "color 0.4s ease" }}>{p.name}</h3>
                <p className="text-sm" style={{ color: activePhase === i ? INK45 : "rgba(11,30,61,0.25)", lineHeight: "1.65", transition: "color 0.4s ease" }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile steps */}
      <div className="md:hidden space-y-3 mb-10">
        {phases.map((p, i) => (
          <motion.div key={p.number} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EXPO_OUT, delay: i * 0.07 }}
            className="flex gap-4 p-5 rounded-2xl" style={{ background: "#fff", border: `1px solid ${BORDER}` }}>
            <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{ background: "rgba(27,72,196,0.08)", color: ROYAL }}>{StepIcons[i]}</div>
            <div>
              <span className="text-xs font-mono" style={{ color: "#6485A8" }}>{p.timeline}</span>
              <h3 className="text-sm font-semibold mb-1 mt-0.5" style={{ color: INK }}>{p.name}</h3>
              <p className="text-xs" style={{ color: INK45, lineHeight: "1.65" }}>{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: BORDER }}>
        <p className="text-sm" style={{ color: INK45 }}>
          <span style={{ color: INK, fontWeight: 600 }}>Revenue lift within 30 days.</span>{" "}Core flows live in 2–3 weeks.
        </p>
        <Link href="#contact" className="btn-signal text-sm shrink-0">
          Start with a free audit
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
export default function StickyServices() {
  return (
    <section id="services" className="px-5 md:px-8 lg:px-10" aria-label="Services">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer(0.08)}
          className="pt-24 pb-16 border-b" style={{ borderColor: BORDER }}>
          <motion.div variants={fadeUp} className="section-label mb-5">Services</motion.div>
          <div className="flex flex-col md:flex-row md:items-end gap-8 justify-between">
            <motion.h2 variants={fadeUp} className="font-display text-display-2 max-w-[520px]" style={{ color: INK }}>
              Everything email. One team.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm max-w-[320px] md:pb-1" style={{ color: INK45, lineHeight: "1.7" }}>
              Every service connects to the others. Infrastructure enables flows. Flows feed campaigns. Copy optimises both.
            </motion.p>
          </div>
        </motion.div>

        {/* Alternating showcases */}
        {showcases.map(s => <ShowcaseSection key={s.id} s={s} />)}

        {/* How We Work */}
        <ProcessSection />

      </div>
    </section>
  );
}
