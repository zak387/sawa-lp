import type { Metadata, Viewport } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

// ── UI Font: Geist ──────────────────────────────────────────
// Technical precision. Designed for screens. From Vercel.
// Invisible at body size — the mark of a great UI font.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// ── Display Font: Inter ─────────────────────────────────────
// The industry standard. Used by Linear, Vercel, Notion, Figma.
// Neutral, precise, extremely readable at all sizes.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ── SEO Metadata ────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Sawa — Email Revenue Partner for Ecommerce Brands",
    template: "%s | Sawa",
  },
  description:
    "Sawa is the AI-native email partner for 7- and 8-figure ecommerce brands. We own your email channel — strategy, automation, copy, and revenue optimization. End-to-end.",
  keywords: [
    "email marketing agency",
    "ecommerce email marketing",
    "klaviyo agency",
    "email revenue optimization",
    "DTC email marketing",
    "lifecycle email automation",
    "email marketing for fashion brands",
    "email marketing for beauty brands",
  ],
  authors: [{ name: "Sawa" }],
  creator: "Sawa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sawa.co",
    siteName: "Sawa",
    title: "Sawa — Email Revenue Partner for Ecommerce Brands",
    description:
      "Your existing customers are your next revenue channel. Sawa builds the email programs that make that real.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sawa — Email Revenue Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sawa — Email Revenue Partner for Ecommerce Brands",
    description:
      "Your existing customers are your next revenue channel. Sawa builds the email programs that make that real.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D0D0F",
};

// ── Root Layout ──────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
