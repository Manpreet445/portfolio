import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Fraunces, Caveat } from "next/font/google";
import "./globals.css";

/* Body / UI sans (General Sans-like) */
const inter = Inter({
  variable: "--ff-sans",
  subsets: ["latin"],
  display: "swap",
});

/* Display headings (Clash Display / Cabinet Grotesk-like) */
const spaceGrotesk = Space_Grotesk({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/* Soft serif for notebook annotations */
const fraunces = Fraunces({
  variable: "--ff-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

/* Marker / handwritten for doodle labels */
const caveat = Caveat({
  variable: "--ff-hand",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const SITE = {
  name: "Manpreet — Software Developer",
  title: "Manpreet · The Sketchbook",
  description:
    "The working sketchbook of Manpreet, a software developer. Scroll to open the book and flip through projects, skills and what's next.",
  url: "https://example.com",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s · The Sketchbook",
  },
  description: SITE.description,
  keywords: [
    "Manpreet",
    "software developer",
    "portfolio",
    "web developer",
    "frontend",
    "full-stack",
  ],
  authors: [{ name: "Manpreet" }],
  openGraph: {
    type: "website",
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${caveat.variable}`}
    >
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
