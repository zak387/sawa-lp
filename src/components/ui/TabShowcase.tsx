"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Monochrome palette ─────────────────────────────────────────── */
const BLACK = "#0A0A0A";
const GREY  = "#71717A";
const LIGHT = "#A1A1AA";
const FAINT = "#F4F4F5";
const BORDER = "rgba(0,0,0,0.09)";
const GREEN = "#22C55E";

const TABS = ["Grow", "Newsletter", "Launch"] as const;
type Tab = typeof TABS[number];

/* ── Shell: browser chrome wrapper ─────────────────────────────── */
function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 18,
      border: `1px solid ${BORDER}`,
      boxShadow: "0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}>
      <div style={{
        background: "#FAFAFA", borderBottom: `1px solid ${BORDER}`,
        padding: "10px 16px", display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#E5E5E5","#D4D4D4","#C4C4C4"].map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{ fontSize: 11, fontWeight: 500, color: LIGHT, fontFamily: "system-ui, sans-serif" }}>
          {title}
        </span>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

/* ── Animated counter hook ──────────────────────────────────────── */
function useCounter(target: number, active: boolean, duration = 1600, start = 0) {
  const [val, setVal] = useState(start);
  useEffect(() => {
    if (!active) { setVal(start); return; }
    let raf = 0, begin = 0;
    const step = (ts: number) => {
      if (!begin) begin = ts;
      const p = Math.min((ts - begin) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(start + e * (target - start)));
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, start]);
  return val;
}

/* ══════════════════════════════════════════════════════════════════
   TAB 1 — GROW (the magnet)
══════════════════════════════════════════════════════════════════ */
const SOURCES = ["Instagram", "YouTube", "TikTok", "X"];
const SUBS = [
  { initials: "JM", name: "j****@gmail.com" },
  { initials: "AK", name: "a****@outlook.com" },
  { initials: "RS", name: "r****@icloud.com" },
  { initials: "TL", name: "t****@gmail.com" },
  { initials: "MP", name: "m****@proton.me" },
];

function GrowPanel({ active }: { active: boolean }) {
  const count = useCounter(20000, active, 2000);

  return (
    <Shell title="sawa · list-growth">
      {/* Counter header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 38, fontWeight: 800, color: BLACK, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: "system-ui, sans-serif" }}>
            {count.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: GREY, marginTop: 4, fontFamily: "system-ui, sans-serif" }}>subscribers & climbing</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.1)", borderRadius: 100, padding: "4px 10px" }}>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "block" }} />
          <span style={{ fontSize: 10.5, fontWeight: 600, color: "#16A34A", fontFamily: "system-ui, sans-serif" }}>+127 / day</span>
        </div>
      </div>

      {/* Source → subscriber conversion */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {SOURCES.map((s, i) => (
          <motion.div key={s}
            animate={active ? { opacity: [0.4, 1, 0.4] } : {}}
            transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.3 }}
            style={{ fontSize: 10, fontWeight: 500, color: GREY, background: FAINT, border: `1px solid ${BORDER}`, borderRadius: 100, padding: "3px 9px", fontFamily: "system-ui, sans-serif" }}
          >
            {s}
          </motion.div>
        ))}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LIGHT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
        <span style={{ fontSize: 10, fontWeight: 600, color: BLACK, background: "rgba(34,197,94,0.12)", borderRadius: 100, padding: "3px 9px", fontFamily: "system-ui, sans-serif" }}>
          Subscriber
        </span>
      </div>

      {/* All subscriber rows — always visible */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {SUBS.map((sub) => (
          <div key={sub.initials} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "#fff", border: `1px solid ${BORDER}`,
            borderRadius: 10, padding: "8px 12px",
          }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: BLACK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700, fontFamily: "system-ui, sans-serif", flexShrink: 0 }}>
              {sub.initials}
            </div>
            <span style={{ fontSize: 12, color: BLACK, fontFamily: "system-ui, sans-serif", flex: 1 }}>{sub.name}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7"/>
            </svg>
          </div>
        ))}
      </div>

      {/* Case study caption */}
      <div style={{ marginTop: 14, borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: LIGHT, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>Case study</div>
        <div style={{ fontSize: 11.5, color: BLACK, fontWeight: 600, fontFamily: "system-ui, sans-serif" }}>Clean Kitchen Nutrition · 0 → 20K in under 3 months</div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB 2 — NEWSLETTER (compose, send, opens cascade)
══════════════════════════════════════════════════════════════════ */
const GRID = Array.from({ length: 60 });
const LIT_TARGET = Math.round(60 * 0.55);

function NewsletterPanel({ active }: { active: boolean }) {
  const [litCount, setLitCount] = useState(0);
  const openRate  = useCounter(55, active, 1400);
  const clickRate = useCounter(4,  active, 1400);

  useEffect(() => {
    if (!active) { setLitCount(0); return; }
    const t = setInterval(() => setLitCount(n => (n >= LIT_TARGET ? n : n + 1)), 28);
    return () => clearInterval(t);
  }, [active]);

  return (
    <Shell title="sawa · weekly-edition">
      {/* Newsletter preview — always fully visible */}
      <div style={{ border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ background: BLACK, padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "0.12em", fontFamily: "system-ui, sans-serif" }}>THE WEEKLY</div>
          <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", marginTop: 2, fontFamily: "system-ui, sans-serif" }}>ISSUE #47 · FRIDAY</div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: BLACK, lineHeight: 1.3, marginBottom: 10, fontFamily: "system-ui, sans-serif" }}>
            The one habit that doubled my output this year
          </div>
          {[100, 92, 96, 70].map((w, i) => (
            <div key={i} style={{ height: 6, width: `${w}%`, background: FAINT, borderRadius: 3, marginBottom: 7 }} />
          ))}
          <div style={{ height: 6, width: "40%", background: "rgba(34,197,94,0.25)", borderRadius: 3, marginTop: 4 }} />
        </div>
      </div>

      {/* Opens dot grid — animates continuously */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(20, 1fr)", gap: 4, marginBottom: 14 }}>
        {GRID.map((_, i) => (
          <div key={i} style={{ width: "100%", paddingBottom: "100%", borderRadius: "50%", position: "relative" }}>
            <motion.div
              initial={false}
              animate={{ background: i < litCount ? GREEN : "#E4E4E7" }}
              transition={{ duration: 0.2 }}
              style={{ position: "absolute", inset: 0, borderRadius: "50%" }}
            />
          </div>
        ))}
      </div>

      {/* Stats — always visible */}
      <div style={{ display: "flex", gap: 10 }}>
        {[
          { val: `${openRate}%`, label: "Open rate", sub: "industry ~35%" },
          { val: `${clickRate}%`, label: "Click rate", sub: "industry ~2%" },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: FAINT, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: BLACK, letterSpacing: "-0.03em", lineHeight: 1, fontFamily: "system-ui, sans-serif" }}>{s.val}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: BLACK, marginTop: 5, fontFamily: "system-ui, sans-serif" }}>{s.label}</div>
            <div style={{ fontSize: 9.5, color: LIGHT, marginTop: 2, fontFamily: "system-ui, sans-serif" }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB 3 — LAUNCH (revenue ticker)
══════════════════════════════════════════════════════════════════ */
const SEQUENCE = [
  { label: "Teaser",     bump: 3400 },
  { label: "Launch",     bump: 7200 },
  { label: "Last call",  bump: 10000 },
];
const TOASTS = [
  { text: "Sale", amt: "+$249" },
  { text: "Sale", amt: "+$1,800" },
  { text: "Order confirmed", amt: "+$420" },
];
const BARS = [20, 35, 28, 48, 62, 55, 78, 70, 90, 100];

function LaunchPanel({ active }: { active: boolean }) {
  const rev = useCounter(10000, active, 2000);
  const [toastIdx, setToastIdx] = useState(0);

  useEffect(() => {
    if (!active) { setToastIdx(0); return; }
    const t = setInterval(() => setToastIdx(n => (n + 1) % TOASTS.length), 2200);
    return () => clearInterval(t);
  }, [active]);

  return (
    <Shell title="sawa · launch-day">
      {/* Product card — always visible */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: BLACK, borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "system-ui, sans-serif" }}>Book Launch</div>
            <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.5)", fontFamily: "system-ui, sans-serif" }}>Sequence to 4,200 buyers</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "block" }} />
          <span style={{ fontSize: 10, fontWeight: 600, color: "#fff", fontFamily: "system-ui, sans-serif" }}>LIVE</span>
        </div>
      </div>

      {/* Revenue counter — always visible, animates on entry */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: BLACK, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: "system-ui, sans-serif" }}>
          ${rev.toLocaleString()}
        </div>
        <div style={{ fontSize: 11, color: GREY, marginTop: 5, fontFamily: "system-ui, sans-serif" }}>revenue on launch day</div>
      </div>

      {/* Sequence nodes — all shown, all black (sent) */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {SEQUENCE.map((s) => (
          <div key={s.label} style={{ flex: 1 }}>
            <div style={{ width: "100%", borderRadius: 8, background: BLACK, border: `1px solid ${BLACK}`, padding: "8px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span style={{ fontSize: 10, fontWeight: 600, color: "#fff", fontFamily: "system-ui, sans-serif" }}>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart — always visible */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 48, marginBottom: 12 }}>
        {BARS.map((h, i) => (
          <motion.div key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: EXPO }}
            style={{ flex: 1, borderRadius: 3, background: i === BARS.length - 1 ? GREEN : "#E4E4E7" }}
          />
        ))}
      </div>

      {/* Cycling toast */}
      <AnimatePresence mode="wait">
        <motion.div key={toastIdx}
          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.3, ease: EXPO }}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.08)", border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 10, padding: "8px 12px" }}
        >
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(34,197,94,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
          </div>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: BLACK, fontFamily: "system-ui, sans-serif" }}>{TOASTS[toastIdx].text}</span>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#16A34A", marginLeft: "auto", fontFamily: "system-ui, sans-serif" }}>{TOASTS[toastIdx].amt}</span>
        </motion.div>
      </AnimatePresence>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════ */
export default function TabShowcase() {
  const [active, setActive] = useState<Tab>("Grow");
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
    startTimer();
  };

  const LABELS: Record<Tab, string> = {
    Grow: "Grow your list",
    Newsletter: "Run your newsletter",
    Launch: "Launch your products",
  };

  return (
    <div>
      {/* Tab pills */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap",
        background: "rgba(0,0,0,0.04)", borderRadius: 100,
        padding: 4, width: "fit-content",
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            style={{
              padding: "7px 16px", borderRadius: 100,
              border: "none", cursor: "pointer",
              fontSize: 12.5, fontWeight: 600,
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              letterSpacing: "-0.01em",
              background: active === tab ? "#fff" : "transparent",
              color: active === tab ? BLACK : GREY,
              boxShadow: active === tab ? "0 2px 10px rgba(0,0,0,0.10)" : "none",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Panel — all three are stacked in a single grid cell so the
          container's height is fixed to the tallest panel. Switching
          tabs only cross-fades opacity, so nothing moves vertically
          and the rest of the page never shifts up or down. */}
      <div style={{ display: "grid" }}>
        {TABS.map(tab => (
          <motion.div
            key={tab}
            aria-hidden={active !== tab}
            initial={false}
            animate={{ opacity: active === tab ? 1 : 0 }}
            transition={{ duration: 0.35, ease: EXPO }}
            style={{
              gridArea: "1 / 1",
              pointerEvents: active === tab ? "auto" : "none",
            }}
          >
            {tab === "Grow"       && <GrowPanel       active={active === "Grow"} />}
            {tab === "Newsletter" && <NewsletterPanel active={active === "Newsletter"} />}
            {tab === "Launch"     && <LaunchPanel     active={active === "Launch"} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
