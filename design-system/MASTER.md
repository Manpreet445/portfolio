# Lofi Pixel — Design System (Master)

Global source of truth for Manpreet's portfolio. Page-specific overrides live in
`design-system/pages/` and take precedence when present.
(v2 — supersedes the "Afterglow" aurora system; same structure, new skin.)

## Positioning

- **Audience:** recruiters & hiring managers — the first viewport must answer
  *who / what role / is he good / how do I contact* within 5 seconds.
- **Concept:** "Lofi Pixel" — a cozy dusk-purple night sky with hand-animated
  pixel weather: twinkling stars, drifting blocky clouds, a patient moon,
  a steaming mug, a sleeping cat. Warm lamp-glow amber is the primary accent.
- **Signature move:** everything decorative moves on `steps()` timing so it
  reads as sprite animation, never as a smooth tween. One-page narrative
  scroll: arrival → proof of work → how I work → journey → contact.

## Color tokens

| Token                   | Value                      | Use                                |
| ----------------------- | -------------------------- | ---------------------------------- |
| `--color-abyss`         | `#14101F`                  | deepest sky band / button text     |
| `--color-night`         | `#1D1730`                  | base background                    |
| `--color-raised`        | `#262040`                  | panel fill                         |
| `--color-fog`           | `#F3EDDA` (warm cream)     | primary text (≈13:1 on night)      |
| `--color-mist`          | `#BDB3D6` (lavender gray)  | secondary text (AA)                |
| `--color-dust`          | `#8D81AD`                  | faint meta text (≥4.5:1 — AA)      |
| `--color-ember`         | `#FFB454` / `#FFC87A`      | lamp-glow amber — primary accent   |
| `--color-orchid`        | `#A78BFA` / `#C4B5FD`      | twilight lavender                  |
| `--color-blush`         | `#FF9DB8`                  | sunset pink                        |
| `--color-mint`          | `#7FD8A4`                  | "shipped" green                    |
| `--color-ink`           | `#0F0C1C`                  | 2px pixel borders                  |
| `--color-line`          | `rgba(243,237,218,0.14)`   | hairline separators                |

Rules: never pure `#000`. CTA buttons: ember fill + abyss text (≈8:1).
Functional colors always pair with a label, never color alone.

## Typography

- **Display:** Pixelify Sans 400–700 — chunky pixel face, no negative tracking.
  Hero: `clamp(2.4rem, 6.5vw, 5rem)`. Section titles: `clamp(1.9rem, 4vw, 3rem)`.
- **Body:** Nunito 400/700, 16–18px, line-height 1.6–1.75 — round and cozy,
  carries all long-form reading (pixel faces are display-only).
- **Meta/labels:** VT323, 16px minimum (it renders small), uppercase,
  tracking +0.14em.
- Gradient text `.text-sunset` (ember → blush → orchid) on one phrase per view.

## Space, shape, depth

- Spacing: 8px rhythm; sections `py-24 … py-36`; container `max-w-6xl px-6`.
- Shape: square corners (2px max). Chips and tags are bordered rectangles.
- Depth = pixel construction, zero blur on UI: 2px `--color-ink` borders +
  hard offset shadows (`4px 4px 0`). Buttons "travel into their shadow" on
  press (translate 2px, shadow shrinks). Ambient light (lamp glow radial) is
  the only soft element allowed.
- Bento: 6-col grid; feature project spans 4, secondary 2, tertiary full-width.

## Motion

- Decorative motion: `steps()` only — twinkle 2–6s, cloud drift 110–180s,
  steam 2.4s/6 steps, cat tail 4s. Sprite feel, not tween feel.
- Micro-interactions: 140–250ms on the glide curve; button hover lifts 1px
  into a grown hard shadow, press travels 2px into it.
- **The motion split:** pixel art animates in `steps()` (starfield, steam,
  cat, hero video); UI animates smoothly. Stepping a 40px card travel reads
  as jank, not charm.
- Scroll reveals: expo-out glide `cubic-bezier(0.16, 1, 0.3, 1)` (GLIDE in
  Reveal.tsx), 0.5–0.7s, stagger 70ms, trigger once. Section titles rise word
  by word (WordRise); tiles and dots scale-pop (PopItem); bento cards glide in
  from alternating directions (RevealItem direction prop).
- Cinematic scroll: the hero is `sticky top-0` directly in `<main>` — it stays
  pinned while the opaque content curtain slides up over it; the scene zooms
  1→1.09 and dims 0→0.6 across the first viewport of scroll. Velocity-reactive mono marquee at the top of
  the curtain. Nav hides on scroll-down past 240px, returns on scroll-up
  (CSS transition, no rAF).
- `prefers-reduced-motion`: weather freezes, reveals become instant.
  Enforced via `MotionConfig reducedMotion="user"` + CSS media query.
- Never block input; transform/opacity only.
- Pixel sprites: SVG rect grids with `image-rendering: pixelated` +
  `shape-rendering: crispEdges` (`.pixel-art`); faint CRT scanlines overlay
  on `<body>` at 10% opacity.

## Accessibility (WCAG AA, non-negotiable)

- Text contrast ≥4.5:1 (checked per token above); large display text ≥3:1.
- `:focus-visible`: 2px teal outline, 3px offset, on every interactive element.
- Skip link to `#main`. Sequential headings h1→h2→h3. `aria-label` on icon-only
  links. Touch targets ≥44px. No emoji as icons — inline SVG, stroke 1.75,
  one style family.

## Anti-patterns (reject on sight)

- Blur/glassmorphism on pixel UI — soft shadows and pixels don't mix.
- Pixel fonts for body text (display + labels only; body stays Nunito).
- Smooth easing on decorative sprites — weather always moves in steps().
- Emoji as icons; rounded-full chips; symmetric cookie-cutter card grids.
- Gray-on-gray sub-AA text; pure black backgrounds.

## Stack

Next.js 16 (App Router) · Tailwind v4 (`@theme` tokens) · `motion` (Framer)
for reveals & micro-interactions · fonts via `next/font`
(Pixelify Sans / Nunito / VT323).
