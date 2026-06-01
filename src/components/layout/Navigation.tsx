"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
];

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   SAWA LOGO MARK — "Together"
   Two entities that meet and connect. Brand meaning encoded.
───────────────────────────────────────────────────────────── */
function SawaLogo({ size = 32 }: { size?: number }) {
  return (
    // CONCEPT: Two overlapping circles — classic "union" / "together" mark.
    // Dark navy left circle + sky blue right circle, overlap glows lighter.
    // Minimal, timeless, scales perfectly at any size.
    <svg width={size} height={size * 0.7} viewBox="0 0 46 32" fill="none" aria-hidden="true">
      {/* Left circle — dark navy */}
      <circle cx="16" cy="16" r="13" fill="#1B48C4" />
      {/* Right circle — sky blue, overlapping */}
      <circle cx="30" cy="16" r="13" fill="#38BDF8" />
      {/* Overlap lens — slightly lighter blend */}
      <path
        d="M23 4.5 C27.5 7.5 27.5 24.5 23 27.5 C18.5 24.5 18.5 7.5 23 4.5Z"
        fill="#60A5FA"
        opacity="0.9"
      />
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EXPO_OUT }}
        className="fixed top-0 left-0 right-0 z-50"
        role="banner"
      >
        <div
          className="transition-all duration-300"
          style={{
            background: scrolled ? "rgba(240,245,255,0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
            borderBottom: scrolled ? "1px solid rgba(11,30,61,0.08)" : "1px solid transparent",
          }}
        >
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">
            <div className="flex items-center justify-between h-16 md:h-18">

              {/* Logo */}
              <Link href="/" className="relative z-10 flex items-center gap-2.5 group" aria-label="Sawa - home">
                <SawaLogo size={30} />
                <span className="font-display text-lg font-semibold" style={{ color: "#0B1E3D", letterSpacing: "-0.04em" }}>
                  sawa
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
                    style={{ color: "rgba(11,30,61,0.5)", letterSpacing: "-0.01em" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#1B48C4";
                      (e.currentTarget as HTMLElement).style.background = "rgba(27,72,196,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(11,30,61,0.5)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-3">
                <Link href="#contact" className="btn-signal text-sm" style={{ paddingTop: "0.625rem", paddingBottom: "0.625rem" }}>
                  Get Audit
                  <ArrowRight />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200"
                style={{ background: mobileOpen ? "rgba(27,72,196,0.08)" : "transparent", border: "1px solid rgba(11,30,61,0.15)" }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <motion.span className="block h-px w-full" style={{ background: "#0B1E3D", transformOrigin: "center" }}
                    animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: EXPO_OUT }} />
                  <motion.span className="block h-px w-full" style={{ background: "#0B1E3D" }}
                    animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }} />
                  <motion.span className="block h-px w-full" style={{ background: "#0B1E3D", transformOrigin: "center" }}
                    animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: EXPO_OUT }} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EXPO_OUT }}
            className="fixed inset-0 z-40 flex flex-col px-5 pt-24 pb-10"
            style={{ background: "#F0F5FF" }}
            aria-modal="true" role="dialog" aria-label="Navigation menu"
          >
            <nav className="flex flex-col gap-1 mb-10" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div key={link.label}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: EXPO_OUT }}>
                  <Link href={link.href}
                    className="block py-4 font-display text-4xl font-light transition-colors duration-200"
                    style={{ color: "#0B1E3D", borderBottom: "1px solid rgba(11,30,61,0.08)" }}
                    onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.3, ease: EXPO_OUT }}>
              <Link href="#contact" className="btn-signal" onClick={() => setMobileOpen(false)}>
                Get a free audit <ArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
