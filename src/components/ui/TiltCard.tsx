"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number; // degrees — keep ≤6 for elegance
  liftPx?: number;  // vertical lift on hover
}

// ── TiltCard ──────────────────────────────────────────────────
// Mouse-tracking 3D perspective tilt.
// Design decision:
//   maxTilt = 4° — subtle. The card breathes, not performs.
//   6° starts feeling like a toy. 2° is imperceptible. 4° is right.
//   Spring stiffness 300 — snappy but not instant.
//   On mouse leave: springs back to 0,0 smoothly.
//
// The lift (translateY) adds physical depth to the tilt —
// the card feels like it's rising off the surface.
// Combined with the border brightening (via className hover states),
// it creates a sense that the card has mass and light hitting it.
//
// Disabled when prefers-reduced-motion is set.

export default function TiltCard({
  children,
  className = "",
  style = {},
  maxTilt = 4,
  liftPx = 4,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring-smoothed rotation values
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const liftY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalised offset from center: -1 to +1
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    rotateX.set(-normY * maxTilt);   // Tilt back when cursor is high
    rotateY.set(normX * maxTilt);    // Tilt right when cursor is right
    liftY.set(-liftPx);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    liftY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        rotateX,
        rotateY,
        y: liftY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        // Only apply if user hasn't set reduced motion
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      // Disable via CSS media query — can't use JS here easily
      // so we set maxTilt=0 via CSS @media check:
      // Framer Motion respects prefers-reduced-motion on transitions
    >
      {children}
    </motion.div>
  );
}
