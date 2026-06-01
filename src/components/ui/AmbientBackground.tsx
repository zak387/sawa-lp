"use client";

import { useEffect, useRef } from "react";

/*
  AmbientBackground — slowly drifting dots on a canvas.
  Fixed behind all content, pointer-events none.
  ~60 tiny dots moving in random directions, very low opacity.
  Respects prefers-reduced-motion.
*/

const DOT_COUNT  = 70;
const DOT_RADIUS = 1.6;
const SPEED      = 0.22;   // px per frame
const OPACITY    = 0.35;
const COLOR      = "27,72,196"; // royal blue (RGB)

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  r: number; o: number;
}

function makeDot(w: number, h: number): Dot {
  const angle = Math.random() * Math.PI * 2;
  const speed = SPEED * (0.5 + Math.random());
  return {
    x:  Math.random() * w,
    y:  Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r:  DOT_RADIUS * (0.6 + Math.random() * 0.8),
    o:  OPACITY   * (0.6 + Math.random() * 0.6),
  };
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let   raf    = 0;
    let   w = 0, h = 0;
    let   dots: Dot[] = [];

    function resize() {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
      dots = Array.from({ length: DOT_COUNT }, () => makeDot(w, h));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        // drift
        d.x += d.vx;
        d.y += d.vy;
        // wrap around edges
        if (d.x < -10)  d.x = w + 10;
        if (d.x > w+10) d.x = -10;
        if (d.y < -10)  d.y = h + 10;
        if (d.y > h+10) d.y = -10;
        // draw
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},${d.o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
