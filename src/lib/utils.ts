import type { Variants } from "framer-motion";

// ── Easing ────────────────────────────────────────────────────
// Typed as const tuple — Framer Motion requires [n,n,n,n] not number[]
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

// ── Animation Variants ────────────────────────────────────────
// Reusable Framer Motion variants following the Sawa motion system.
// Expo out — decisive, controlled. Not floaty.

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EXPO_OUT,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: EXPO_OUT,
    },
  },
};

export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// ── Viewport options ──────────────────────────────────────────
// once: true — elements animate in once and stay.
// margin: triggers slightly before element enters view.
export const viewportOptions = {
  once: true,
  margin: "-80px",
} as const;

// ── Class name utility ────────────────────────────────────────
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
