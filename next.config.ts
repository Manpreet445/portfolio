import type { NextConfig } from "next";

/* Content-Security-Policy.
   Everything this site loads is same-origin: fonts are self-hosted by
   next/font, the pixel art and hero video sit in /public, and there are no
   third-party scripts, embeds or analytics. So the policy can be tight.

   The one loosening is script/style 'unsafe-inline': Next's App Router
   inlines its hydration bootstrap, and Framer Motion writes inline styles.
   Locking those down properly needs per-request nonces via middleware, which
   would force dynamic rendering on an otherwise fully static site — a poor
   trade here. 'unsafe-eval' is dev-only (React Refresh needs it). */
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self'" + (isDev ? " ws://localhost:* http://localhost:*" : ""),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  /* CSP is production-only: the dev server needs eval for React Refresh and a
     websocket for HMR, and loosening the policy enough to allow those would
     mean shipping a policy weaker than the one we actually want in prod. */
  ...(isDev ? [] : [{ key: "Content-Security-Policy", value: csp }]),
  // clickjacking: frame-ancestors above is the modern rule, this backs it up
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // don't advertise the framework/version to attackers
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
