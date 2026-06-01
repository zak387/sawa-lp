"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

// ── Custom Cursor ─────────────────────────────────────────────
// Spring-physics dot. Expanded ring appears on interactive elements.
// Disabled on touch devices — never shown alongside native cursor.
//
// Design decision: Two-layer cursor.
//   Layer 1 — small dot (6px): follows mouse exactly. instant.
//   Layer 2 — ring (40px): follows with spring lag. reads as "alive".
// The spring lag is what makes this feel like a premium product
// vs a CSS cursor replacement. The ring breathes.
//
// Signal (#C8FF57) ties cursor to the brand's action color.
// On hover over links/buttons: ring scales to 56px, opacity drops —
// this "melts into" the target rather than circling it aggressively.

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Check for touch device and reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    // Don't show on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    setIsVisible(true);
    document.body.style.cursor = "none";

    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  const mouseX = useSpring(0, { stiffness: 800, damping: 50, mass: 0.2 });
  const mouseY = useSpring(0, { stiffness: 800, damping: 50, mass: 0.2 });

  // Ring has more lag — feels like it floats
  const ringX = useSpring(0, { stiffness: 200, damping: 30, mass: 0.5 });
  const ringY = useSpring(0, { stiffness: 200, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!isVisible) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Detect if hovering over interactive element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest("a, button, [role='button'], input, textarea, select, [tabindex]");
      setIsPointer(!!interactive);
    };

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isVisible, mouseX, mouseY, ringX, ringY]);

  if (!isVisible || prefersReduced) return null;

  return (
    <>
      {/* Layer 1 — dot: instant, precise */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isHovering ? 1 : 0.9 }}
      >
        <div
          style={{
            width: isPointer ? 5 : 6,
            height: isPointer ? 5 : 6,
            borderRadius: "50%",
            background: isPointer ? "#C8FF57" : "#F4F2EE",
            transition: "width 0.15s, height 0.15s, background 0.2s",
          }}
        />
      </motion.div>

      {/* Layer 2 — ring: spring lag, expands on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isPointer ? 44 : 32,
            height: isPointer ? 44 : 32,
            opacity: isPointer ? 0.12 : 0.08,
            borderColor: isPointer ? "#C8FF57" : "rgba(244,242,238,0.5)",
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: "50%",
            border: "1px solid rgba(244,242,238,0.5)",
            background: isPointer ? "rgba(200,255,87,0.06)" : "transparent",
          }}
        />
      </motion.div>
    </>
  );
}
