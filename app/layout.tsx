import type { Metadata, Viewport } from "next";
import { Nunito, Pixelify_Sans, VT323 } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/* Body / UI sans — round and cozy, stays readable at length */
const nunito = Nunito({
  variable: "--ff-sans",
  subsets: ["latin"],
  display: "swap",
});

/* Display headings — chunky pixel face */
const pixelify = Pixelify_Sans({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Meta labels, tags, timestamps — terminal pixel mono */
const vt323 = VT323({
  variable: "--ff-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const SITE = {
  name: "Manpreet Singh — Full-Stack Developer",
  title: "Manpreet Singh · Full-Stack Developer",
  description:
    "Portfolio of Manpreet Singh, a full-stack developer in Calgary building TypeScript-first web apps and cross-platform mobile apps with Next.js, React Native, Supabase and Firebase.",
  url: SITE_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s · Manpreet",
  },
  description: SITE.description,
  keywords: [
    "Manpreet Singh",
    "full-stack developer",
    "Calgary developer",
    "portfolio",
    "Next.js",
    "TypeScript",
    "React Native",
    "Expo",
    "Supabase",
    "Firebase",
    "SAIT",
  ],
  authors: [{ name: "Manpreet Singh" }],
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
  themeColor: "#1d1730",
  colorScheme: "dark",
  // let the page paint into the notch area; safe-area insets handle the rest
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${pixelify.variable} ${vt323.variable}`}
    >
      <body className="scanlines min-h-dvh antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
