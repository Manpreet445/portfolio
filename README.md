# Manpreet Singh — Portfolio

A pixel-art portfolio built around an animated lofi scene. The hero pins to the
viewport while the rest of the page rises over it like a curtain; the artwork
animates on a stepped, sprite-sheet cadence while the interface itself moves
smoothly.

**Live:** _add your Vercel URL here_

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v4** — the whole palette lives as `@theme` tokens in
  `app/globals.css`
- **Motion** (formerly Framer Motion) — scroll-linked transforms, reveals,
  spring-driven pointer interactions
- **Lenis** — momentum smooth scrolling

## Design notes

The one rule the motion follows: **pixel art animates in `steps()`, UI glides.**
Stars, steam and the hero loop advance frame-by-frame like a sprite sheet;
cards, headings and buttons ease on a long expo-out curve. Stepping a 40px card
travel reads as jank rather than charm, so the two never mix.

Depth comes from construction, not blur — 2px ink borders and hard offset
shadows, square corners, no glassmorphism. The full system is written up in
[`design-system/MASTER.md`](design-system/MASTER.md).

## Performance & accessibility

- Artwork ships as right-sized WebP with `srcset`, so a phone pulls ~130KB of
  images instead of several megabytes
- The hero loop pauses once it scrolls out of sight, and falls back to a still
  frame on Data Saver or slow connections
- Everything honours `prefers-reduced-motion`: the scene freezes, reveals
  become instant, smooth scrolling switches off
- WCAG AA contrast, visible focus rings, 44px touch targets, keyboard-operable
  disclosures and nav

## Security

Security headers are set in [`next.config.ts`](next.config.ts): a
production-only CSP, HSTS, `frame-ancestors 'none'`, `nosniff`,
`Referrer-Policy` and a `Permissions-Policy` that switches off camera,
microphone and geolocation. The framework header is disabled.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Layout

```
app/                 layout (fonts, metadata, headers), page, globals.css
components/aurora/   every section, plus the motion and interaction primitives
data/projects.ts     typed content — profile, projects, experience, skills, journey
design-system/       the design system this site is built against
public/              pixel artwork (WebP) and the hero loop
```

Content is data-driven: edit `data/projects.ts` and the sections follow.
