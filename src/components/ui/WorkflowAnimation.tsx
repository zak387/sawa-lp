"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Canvas ────────────────────────────────────────────────────── */
const VW = 500;
const VH = 450;
const CX = 250;  // centre x
const CY = 214;  // centre y
const NR = 26;   // node radius

/* ── Tool nodes ─────────────────────────────────────────────────── */
const TOOLS = [
  { id: "slack",    label: "Slack",    x: 66,  y: 88,  color: "#4A154B", bg: "#FAF0FA" },
  { id: "notion",   label: "Notion",   x: 250, y: 34,  color: "#1A1A1A", bg: "#F5F5F4" },
  { id: "hubspot",  label: "HubSpot",  x: 434, y: 88,  color: "#FF7A59", bg: "#FFF2EF" },
  { id: "gmail",    label: "Gmail",    x: 434, y: 340, color: "#EA4335", bg: "#FEF1F0" },
  { id: "airtable", label: "Airtable", x: 250, y: 394, color: "#FCB400", bg: "#FFFBEB" },
  { id: "klaviyo",  label: "Klaviyo",  x: 66,  y: 340, color: "#1B48C4", bg: "#EEF2FF" },
];

/* ── Live activity notifications ─────────────────────────────────── */
const NOTIFS = [
  { text: "Cart abandon triggered",   sub: "4,281 contacts entered flow",  dot: "#38BDF8" },
  { text: "Revenue attributed",       sub: "+$4,200 in last 24 hours",     dot: "#22C55E" },
  { text: "Segment synced",           sub: "VIP Buyers · 1,240 contacts",  dot: "#1B48C4" },
  { text: "Subject line A/B winner",  sub: "Variant B: +28% open rate",    dot: "#F59E0B" },
  { text: "Welcome series live",      sub: "67% average open rate",        dot: "#38BDF8" },
  { text: "12 flows active · 0 errors", sub: "All systems running",        dot: "#22C55E" },
];

/* ── Bezier path helpers ─────────────────────────────────────────── */
function getArc(x: number, y: number) {
  const mx = (x + CX) / 2, my = (y + CY) / 2;
  const dx = CX - x, dy = CY - y;
  const len = Math.hypot(dx, dy) || 1;
  const qx = mx - (dy / len) * 22;
  const qy = my + (dx / len) * 22;
  return `M ${x} ${y} Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${CX} ${CY}`;
}

/* ── Inline brand icons (pure SVG, no foreignObject) ─────────────── */
function ToolIcon({ id, x, y, color }: { id: string; x: number; y: number; color: string }) {
  if (id === "slack") return (
    <g transform={`translate(${x - 9}, ${y - 9})`}>
      <rect x="0"  y="0"  width="7" height="7" rx="1.5" fill="#E01E5A" />
      <rect x="11" y="0"  width="7" height="7" rx="1.5" fill="#36C5F0" />
      <rect x="0"  y="11" width="7" height="7" rx="1.5" fill="#2EB67D" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#ECB22E" />
    </g>
  );
  if (id === "notion") return (
    <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="800"
      fill={color} fontFamily="Georgia,'Times New Roman',serif">N</text>
  );
  if (id === "hubspot") return (
    <g fill="none">
      <circle cx={x} cy={y - 4}   r="2.5" fill={color} />
      <line x1={x} y1={y - 1.5} x2={x} y2={y + 2} stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx={x} cy={y + 5.5} r="5"   stroke={color} strokeWidth="1.5" />
      <line x1={x - 8} y1={y + 5.5} x2={x - 5} y2={y + 5.5} stroke={color} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
  if (id === "gmail") return (
    <g>
      <rect x={x - 8} y={y - 5.5} width="16" height="12" rx="2"
        fill="none" stroke={color} strokeWidth="1.5" />
      <polyline
        points={`${x - 8},${y - 5.5} ${x},${y + 1} ${x + 8},${y - 5.5}`}
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </g>
  );
  if (id === "airtable") return (
    <g>
      <rect x={x - 7} y={y - 7} width="6" height="6" rx="1" fill="#FCB400" />
      <rect x={x + 1} y={y - 7} width="6" height="6" rx="1" fill="#18BFFF" />
      <rect x={x - 7} y={y + 1} width="6" height="6" rx="1" fill="#F82B60" />
      <rect x={x + 1} y={y + 1} width="6" height="6" rx="1" fill="#FCB400" opacity="0.5" />
    </g>
  );
  if (id === "klaviyo") return (
    <g>
      <rect x={x - 8} y={y - 6} width="16" height="12" rx="2"
        fill="none" stroke={color} strokeWidth="1.5" />
      <polyline
        points={`${x - 8},${y - 6} ${x},${y} ${x + 8},${y - 6}`}
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </g>
  );
  return null;
}

/* ── Component ──────────────────────────────────────────────────── */
export default function WorkflowAnimation() {
  const [notifIdx, setNotifIdx]   = useState(0);
  const [pulseIdx, setPulseIdx]   = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setNotifIdx(n => (n + 1) % NOTIFS.length),  2800);
    const t2 = setInterval(() => setPulseIdx(n => (n + 1) % TOOLS.length),   1700);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const notif = NOTIFS[notifIdx];

  return (
    <div style={{ position: "relative", width: "100%" }}>

      {/* ── SVG network graph ── */}
      <motion.svg
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.0, ease: EXPO }}
        style={{ display: "block", overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          {/* Glow for data packets */}
          <filter id="wfa-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Soft drop shadow for node circles */}
          <filter id="wfa-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(11,30,61,0.07)" />
          </filter>
        </defs>

        {/* ── Connection lines ── */}
        {TOOLS.map((t, i) => (
          <path
            key={`line-${t.id}`}
            d={getArc(t.x, t.y)}
            fill="none"
            stroke={i === pulseIdx ? "rgba(56,189,248,0.28)" : "rgba(11,30,61,0.07)"}
            strokeWidth={i === pulseIdx ? 1.5 : 1}
            strokeDasharray={i === pulseIdx ? "0" : "3 5"}
            style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
          />
        ))}

        {/* ── Animated data packets ── */}
        {TOOLS.map((t, i) => (
          <g key={`pkt-${t.id}`}>
            {/* Primary: sky-blue glowing dot */}
            <circle r="3" fill="#38BDF8" filter="url(#wfa-glow)">
              {/* eslint-disable-next-line react/no-unknown-property */}
              <animateMotion
                path={getArc(t.x, t.y)}
                dur={`${2.1 + i * 0.28}s`}
                repeatCount="indefinite"
                begin={`${-(i * 0.42)}s`}
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.42 0 0.58 1"
              />
            </circle>
            {/* Secondary: smaller royal-blue dot (every other path) */}
            {i % 2 === 0 && (
              <circle r="2" fill="#1B48C4" opacity="0.6">
                {/* eslint-disable-next-line react/no-unknown-property */}
                <animateMotion
                  path={getArc(t.x, t.y)}
                  dur={`${2.1 + i * 0.28}s`}
                  repeatCount="indefinite"
                  begin={`${-(i * 0.42) - 1.05}s`}
                />
              </circle>
            )}
          </g>
        ))}

        {/* ── Centre node outer pulse rings ── */}
        <circle cx={CX} cy={CY} r="52" fill="none" stroke="rgba(27,72,196,0.05)" strokeWidth="1">
          <animate attributeName="r"       values="48;58;48"   dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.1;0.9" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r="41" fill="none" stroke="rgba(56,189,248,0.09)" strokeWidth="1">
          <animate attributeName="r"       values="37;46;37"   dur="4s" repeatCount="indefinite" begin="-1.4s" />
          <animate attributeName="opacity" values="0.9;0.1;0.9" dur="4s" repeatCount="indefinite" begin="-1.4s" />
        </circle>

        {/* ── Centre node: Sawa AI ── */}
        <circle cx={CX} cy={CY} r="34" fill="white"
          stroke="rgba(27,72,196,0.2)" strokeWidth="1.5"
          filter="url(#wfa-shadow)" />
        {/* Sawa logo mark (two overlapping circles + lens) */}
        <g transform={`translate(${CX - 17}, ${CY - 12})`}>
          <circle cx="10"  cy="12" r="9"  fill="#1B48C4" />
          <circle cx="24"  cy="12" r="9"  fill="#38BDF8" />
          <path d="M17 3.2 C21 5.6 21 18.4 17 20.8 C13 18.4 13 5.6 17 3.2Z"
            fill="#60A5FA" opacity="0.9" />
        </g>
        {/* "SAWA AI" label below centre */}
        <text x={CX} y={CY + 52}
          textAnchor="middle" fontSize="8" fontWeight="600"
          fill="rgba(11,30,61,0.3)"
          fontFamily="system-ui,-apple-system,sans-serif"
          letterSpacing="0.1em">
          SAWA AI
        </text>

        {/* ── Tool nodes ── */}
        {TOOLS.map((t, i) => {
          const active = i === pulseIdx;
          return (
            <g key={`nd-${t.id}`}>
              {/* Ripple ring when active */}
              {active && (
                <circle cx={t.x} cy={t.y} r={NR} fill="none"
                  stroke={t.color} strokeWidth="1.5" opacity="0.35">
                  <animate attributeName="r"       from={NR}    to={NR + 16} dur="0.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.35"  to="0"       dur="0.8s" fill="freeze" />
                </circle>
              )}
              {/* Node background */}
              <circle
                cx={t.x} cy={t.y} r={NR}
                fill={active ? t.bg : "white"}
                stroke={active ? t.color : "rgba(11,30,61,0.1)"}
                strokeWidth={active ? 1.5 : 1}
                filter="url(#wfa-shadow)"
                style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }}
              />
              {/* Brand icon */}
              <ToolIcon id={t.id} x={t.x} y={t.y} color={t.color} />
              {/* Label */}
              <text
                x={t.x} y={t.y + NR + 14}
                textAnchor="middle" fontSize="9" fontWeight="500"
                fill="rgba(11,30,61,0.4)"
                fontFamily="system-ui,-apple-system,sans-serif">
                {t.label}
              </text>
            </g>
          );
        })}
      </motion.svg>


    </div>
  );
}
