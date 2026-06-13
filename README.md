# The Sketchbook — Manpreet's Portfolio

A vibrant, motion-rich personal portfolio that feels like flipping through an
artist's working sketchbook. You land on a clean white desk, scroll, and a
coral sketchbook **opens and turns its pages** to reveal projects, skills and a
roadmap.

> **2D, not 3D.** Depth comes only from soft diffuse shadows, layered stacking
> and paper texture — no perspective, no `rotateY`, no WebGL. Page turns are a
> flat lift + slide + fade with a swelling shadow.

## Stack

- **Next.js 16 (App Router) + TypeScript**
- **Tailwind CSS v4** — palette defined as `@theme` tokens in `app/globals.css`
- **Motion** (`motion`, formerly Framer Motion) — floating objects, hover
  states, badge pop-ins, staggered reveals, springs
- **GSAP + ScrollTrigger** — scroll-scrubbed cover lift, page turns + snapping
- **Inline SVG** (`pathLength`) — doodles, the roadmap spine, skill icons that
  draw themselves in
- Procedural paper texture (`feTurbulence`) and placeholder mockups — no binary
  assets required to run

Everything honours `prefers-reduced-motion` (a stacked, fade-in fallback) and
animations are transform/opacity-only.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

```
app/                  layout (fonts + metadata), page (the scroll sequence), globals.css, icon/robots/sitemap
components/Desk/       hero desk + floating objects (art.tsx, FloatingObject, HeroDesk)
components/Sketchbook/ Cover, Page, SketchbookStage (the GSAP orchestrator)
components/spreads/    Intro, Project, Features, Roadmap spreads
components/ui/         doodles, badges, tags, taped photos, mockups, paper grain, scroll cue
data/projects.ts       typed content — projects, skills, roadmap, profile  ← edit me
lib/motion.ts          shared spring presets, reveal variants, pointer parallax hook
public/art/            drop real screenshots here, then set `src` in data/projects.ts
```

## Make it yours

1. **Content** — edit `data/projects.ts` (`profile`, `projects`, `skills`,
   `milestones`). Each project has a typed `status: 'concept' | 'in-production'
   | 'completed'` that drives the roadmap stamps.
2. **Images** — see [`public/art/README.md`](public/art/README.md).
3. **Cover colour / palette** — change the `--color-*` tokens in
   `app/globals.css` (`--color-coral` is the cover hue).
4. **Deploy** — push to GitHub and import on Vercel. Set
   `NEXT_PUBLIC_SITE_URL` to your domain so `robots.txt`/`sitemap.xml` and
   Open Graph URLs are correct.

🤖 Scaffolded with [Claude Code](https://claude.com/claude-code)
