/* ------------------------------------------------------------------ *
   Typed content for The Sketchbook.
   Placeholder copy for now — swap in real projects / images last.
 * ------------------------------------------------------------------ */

export type ProjectStatus = "concept" | "in-production" | "completed";

/** A taped-in image. Leave `src` undefined to render a procedural mockup. */
export type ProjectImage = {
  alt: string;
  /** real image path under /public, e.g. "/art/project-1.webp" */
  src?: string;
  /** procedural placeholder kind, used when `src` is absent */
  mockup?: "web" | "mobile" | "dashboard" | "chart";
  /** accent token name for the placeholder ("coral" | "sun" | "sky" | "leaf") */
  tone?: "coral" | "sun" | "sky" | "leaf";
  /** hand-placed rotation in degrees */
  rotate?: number;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  role: string;
  year: string;
  images: ProjectImage[];
  tags: string[];
  status: ProjectStatus;
  /** a short handwritten margin note */
  note?: string;
};

export type Skill = {
  label: string;
  blurb: string;
  /** which self-drawing line icon to render */
  icon: "code" | "layout" | "spark" | "stack" | "pen" | "bolt";
};

export type Milestone = {
  title: string;
  note: string;
  year: string;
  status: ProjectStatus;
};

export const profile = {
  name: "Manpreet",
  role: "Software Developer",
  tagline: "I design and build things for the web — calmly, carefully, end to end.",
  location: "Available worldwide · remote",
  email: "amritzandu08@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Email", href: "mailto:amritzandu08@gmail.com" },
  ],
};

export const projects: Project[] = [
  {
    slug: "atlas",
    title: "Atlas Analytics",
    description:
      "A real-time analytics dashboard that turns noisy event streams into calm, legible charts. Built for teams who want answers, not spreadsheets.",
    role: "Full-stack · Lead",
    year: "2025",
    note: "favourite project so far!",
    images: [
      { alt: "Atlas dashboard overview", mockup: "dashboard", tone: "sky", rotate: -3 },
      { alt: "Atlas mobile report", mockup: "mobile", tone: "coral", rotate: 4 },
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "D3", "WebSockets"],
    status: "completed",
  },
  {
    slug: "fern",
    title: "Fern",
    description:
      "A tiny plant-care companion app with a soft, tactile interface. Gentle reminders, a growing collection, and watercolor illustrations throughout.",
    role: "Design + iOS",
    year: "2025",
    note: "watercolor everything",
    images: [
      { alt: "Fern app home", mockup: "mobile", tone: "leaf", rotate: 3 },
      { alt: "Fern plant detail", mockup: "mobile", tone: "sun", rotate: -4 },
    ],
    tags: ["SwiftUI", "Figma", "Core Data", "Motion"],
    status: "in-production",
  },
  {
    slug: "press",
    title: "Press Kit Studio",
    description:
      "A drag-and-drop builder for beautiful, link-in-bio press kits. Pick a paper, drop in your story, publish in a minute.",
    role: "Solo · Concept",
    year: "2026",
    note: "still sketching this one",
    images: [
      { alt: "Press Kit editor", mockup: "web", tone: "coral", rotate: -2 },
      { alt: "Published press kit", mockup: "chart", tone: "sun", rotate: 5 },
    ],
    tags: ["React", "Canvas", "Supabase", "Stripe"],
    status: "concept",
  },
];

export const skills: Skill[] = [
  {
    label: "Front-end craft",
    blurb: "React, Next.js & TypeScript with an obsessive eye for motion and detail.",
    icon: "layout",
  },
  {
    label: "Systems & APIs",
    blurb: "Node, Postgres and clean, well-tested service layers that hold up.",
    icon: "stack",
  },
  {
    label: "Interaction design",
    blurb: "Prototyping feel-first interfaces in Figma before a line of code.",
    icon: "pen",
  },
  {
    label: "Performance",
    blurb: "Fast by default — measuring, trimming and lazy-loading the heavy bits.",
    icon: "bolt",
  },
  {
    label: "Animation",
    blurb: "Framer Motion & GSAP for physics-y, organic, never-robotic movement.",
    icon: "spark",
  },
  {
    label: "End-to-end",
    blurb: "From the first sketch to the Vercel deploy — happy owning the whole thing.",
    icon: "code",
  },
];

export const milestones: Milestone[] = [
  {
    title: "Foundations",
    note: "Learned the craft, shipped first client sites, fell for clean code.",
    year: "2022",
    status: "completed",
  },
  {
    title: "Atlas Analytics",
    note: "Led a real-time dashboard from empty repo to production launch.",
    year: "2025",
    status: "completed",
  },
  {
    title: "Fern",
    note: "A tactile plant-care app — currently in the App Store review pipeline.",
    year: "2025",
    status: "in-production",
  },
  {
    title: "Press Kit Studio",
    note: "A no-code press-kit builder. Sketching the editor & data model now.",
    year: "2026",
    status: "concept",
  },
  {
    title: "Open source year",
    note: "Plan: publish the motion + paper-texture toolkit behind this site.",
    year: "2026",
    status: "concept",
  },
];

export const statusMeta: Record<
  ProjectStatus,
  { label: string; tone: string; ring: string; fill: string }
> = {
  concept: {
    label: "Concept",
    tone: "text-ink-faint",
    ring: "border-ink-faint/60",
    fill: "bg-transparent",
  },
  "in-production": {
    label: "In Production",
    tone: "text-tangerine",
    ring: "border-tangerine",
    fill: "bg-tangerine/10",
  },
  completed: {
    label: "Completed",
    tone: "text-leaf",
    ring: "border-leaf",
    fill: "bg-leaf/10",
  },
};
