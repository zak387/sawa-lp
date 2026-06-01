"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, viewportOptions } from "@/lib/utils";

const INK = "#0B1E3D";
const MUTED = "#6485A8";
const STONE = "#1B48C4";
const BORDER = "rgba(11,30,61,0.08)";

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.93-1.956 1.886v2.287h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="px-5 md:px-8 lg:px-10 pb-8 pt-14 border-t"
      style={{ borderColor: BORDER, background: "#F0F5FF" }} aria-label="Site footer">
      <div className="max-w-[1280px] mx-auto">

        {/* Top row */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp}
          className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-10">

          {/* Logo + tagline + socials */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit" aria-label="Sawa home">
              <svg width="36" height="22" viewBox="0 0 46 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="13" fill="#1B48C4" />
                <circle cx="30" cy="16" r="13" fill="#38BDF8" />
                <path d="M23 4.5 C27.5 7.5 27.5 24.5 23 27.5 C18.5 24.5 18.5 7.5 23 4.5Z" fill="#60A5FA" opacity="0.9" />
              </svg>
              <span className="font-display text-base font-semibold" style={{ color: INK, letterSpacing: "-0.04em" }}>sawa</span>
            </Link>
            <p className="text-sm max-w-[220px]" style={{ color: MUTED, lineHeight: "1.65" }}>
              Revenue from relationships. Email done properly.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Sawa on ${s.label}`}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer"
                  style={{ color: MUTED, border: "1px solid rgba(11,30,61,0.12)", background: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = STONE;
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,72,196,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(27,72,196,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = MUTED;
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(11,30,61,0.12)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm transition-colors duration-200"
                style={{ color: MUTED }}
                onMouseEnter={(e) => (e.currentTarget.style.color = STONE)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <p className="text-caption-label" style={{ color: "rgba(11,30,61,0.3)" }}>Get in touch</p>
            <Link href="mailto:hello@sawa.co" className="text-sm transition-colors duration-200"
              style={{ color: MUTED }}
              onMouseEnter={(e) => (e.currentTarget.style.color = STONE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
              hello@sawa.co
            </Link>
          </div>
        </motion.div>

        {/* Bottom row */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeUp}
          className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          style={{ borderColor: BORDER }}>
          <p className="text-xs" style={{ color: "rgba(11,30,61,0.3)" }}>
            © {new Date().getFullYear()} Sawa. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs transition-colors duration-200" style={{ color: "rgba(11,30,61,0.3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = STONE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(11,30,61,0.3)")}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs transition-colors duration-200" style={{ color: "rgba(11,30,61,0.3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = STONE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(11,30,61,0.3)")}>
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
