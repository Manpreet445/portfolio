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

export type ProjectAccent = "coral" | "sky" | "leaf" | "sun" | "tangerine";

export type Project = {
  slug: string;
  title: string;
  description: string;
  role: string;
  year: string;
  images: ProjectImage[];
  tags: string[];
  status: ProjectStatus;
  /** cover hue for this project's sketchbook in the stack */
  accent: ProjectAccent;
  /** a short handwritten margin note */
  note?: string;
  /** public source */
  repo?: string;
  /** deployed app */
  live?: string;
};

export const accentHex: Record<ProjectAccent, { base: string; deep: string }> = {
  coral: { base: "#ff5a4d", deep: "#e2473b" },
  sky: { base: "#4d9de0", deep: "#357ec0" },
  leaf: { base: "#2bb673", deep: "#1f9e63" },
  sun: { base: "#ffc93c", deep: "#e6ab1f" },
  tangerine: { base: "#ff8a3d", deep: "#e2701f" },
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
  fullName: "Manpreet Singh",
  role: "Full-Stack Developer",
  tagline:
    "I build TypeScript-first web apps and cross-platform mobile apps — from the data model to the last pixel.",
  /** compact form for mono/meta chips */
  location: "Canada · remote or on-site",
  /** natural form for running sentences */
  locationProse: "Based in Canada, open to both remote and on-site",
  email: "manpreetzandu45@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Manpreet445" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/manpreet-singh-z" },
    { label: "Email", href: "mailto:manpreetzandu45@gmail.com" },
  ],
};

export const projects: Project[] = [
  {
    slug: "recepie",
    title: "Recepie",
    description:
      "An AI meal-planning platform that turns your goals into a week of food. Gemini writes the recipes against a strict JSON schema, a Mifflin-St Jeor calculator sizes every macro, and a typed fallback keeps the app usable even when the AI is down.",
    role: "Full-stack · Solo",
    year: "2026",
    images: [
      {
        alt: "Recepie meal planner interface",
        src: "/art/recepie.webp",
        mockup: "web",
        tone: "sun",
      },
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "React 19",
      "Tailwind v4",
      "Gemini API",
      "Supabase",
      "Zod",
      "Vitest",
    ],
    status: "completed",
    accent: "sun",
    repo: "https://github.com/Manpreet445/Recepie",
    live: "https://recepie-app-gilt.vercel.app",
  },
  {
    slug: "studyspot",
    title: "StudySpot",
    description:
      "A real-time campus study-spot finder. Firestore listeners push crowd levels to every device the moment they change — no polling, no refresh — with native Google Maps on mobile and Leaflet on web from one shared codebase.",
    role: "Mobile + web · Solo",
    year: "2026",
    images: [
      {
        alt: "StudySpot map and spot list",
        src: "/art/studyspot.webp",
        mockup: "mobile",
        tone: "sky",
      },
    ],
    tags: [
      "React Native",
      "Expo SDK 55",
      "Firebase",
      "Firestore",
      "react-native-maps",
      "Leaflet",
    ],
    status: "in-production",
    accent: "sky",
    repo: "https://github.com/Manpreet445/StudySpot",
  },
  {
    slug: "movies",
    title: "Movie Booking System",
    description:
      "An OOP-first booking engine in Python: CRUD across movies, customers and bookings, modelled in UML and split into clean model, service and CLI layers.",
    role: "Solo · Coursework",
    year: "2025",
    images: [
      {
        alt: "Cinema seat booking screen",
        src: "/art/movie-booking.webp",
        mockup: "web",
        tone: "leaf",
      },
    ],
    tags: ["Python", "OOP", "UML", "CLI"],
    status: "completed",
    accent: "leaf",
    repo: "https://github.com/Manpreet445/Movies-System-",
  },
];

export const skills: Skill[] = [
  {
    label: "Front-end craft",
    blurb:
      "React 19, Next.js App Router and TypeScript, styled in Tailwind and moved with Framer Motion.",
    icon: "layout",
  },
  {
    label: "Cross-platform mobile",
    blurb:
      "React Native and Expo — one codebase shipping to iOS, Android and the web.",
    icon: "code",
  },
  {
    label: "Data & backend",
    blurb:
      "Supabase/PostgreSQL, Cloud Firestore and SQLite — schemas, auth and security rules.",
    icon: "stack",
  },
  {
    label: "AI integration",
    blurb:
      "Gemini with schema-enforced JSON output and typed fallbacks, so the UI never breaks.",
    icon: "spark",
  },
  {
    label: "Testing & rigor",
    blurb:
      "Vitest unit suites, OOP and UML modelling, SDLC discipline from design through deploy.",
    icon: "bolt",
  },
  {
    label: "Design & ship",
    blurb:
      "UI/UX in Figma, then out to Vercel, Firebase or GCP — happy owning the whole path.",
    icon: "pen",
  },
];

export const milestones: Milestone[] = [
  {
    title: "Started at SAIT",
    note: "Began the Software Development diploma in Calgary — OOP, databases, web and UI/UX.",
    year: "2025",
    status: "completed",
  },
  {
    title: "Movie Booking System",
    note: "First OOP build: a UML-modelled Python booking engine split into clean service layers.",
    year: "2025",
    status: "completed",
  },
  {
    title: "StudySpot",
    note: "Real-time React Native + Firebase app — live crowd levels shared across mobile and web.",
    year: "2026",
    status: "in-production",
  },
  {
    title: "Recepie",
    note: "Shipped an AI meal planner on Next.js, Gemini and Supabase — live on Vercel.",
    year: "2026",
    status: "completed",
  },
  {
    title: "BAETT-EMS contract",
    note: "Four-month part-time contract with BAETT — owned auth, document storage and billing on a five-person build.",
    year: "2026",
    status: "in-production",
  },
  {
    title: "AWS Cloud Practitioner",
    note: "Certification in progress alongside the diploma, deepening the cloud side.",
    year: "2026",
    status: "concept",
  },
  {
    title: "Graduating & hiring",
    note: "Diploma completes September 2026. Open to full-time roles — PGWP eligible, no sponsorship needed.",
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

/* ------------------------------------------------------------------ *
   Work experience — richer than a project card: the problem, the areas
   I owned, and the engineering decisions inside each one.
 * ------------------------------------------------------------------ */

export type ExperienceArea = {
  title: string;
  body: string;
};

export type Experience = {
  company: string;
  product: string;
  role: string;
  /** engagement type, e.g. Contract - Part-time */
  employment: string;
  context: string;
  duration: string;
  year: string;
  problem: string;
  lead: string;
  areas: ExperienceArea[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "BAETT",
    product: "BAETT-EMS",
    role: "Full-Stack Developer · Authentication & Billing",
    employment: "Contract · Part-time",
    context: "SAIT Capstone · Team of 5",
    duration: "4 months",
    year: "2026",
    problem:
      "A document and approvals platform for engineering consultancies — one system of record in place of scattered email threads and spreadsheets.",
    lead: "I owned three areas: authentication, document storage, and billing.",
    areas: [
      {
        title: "Authentication",
        body: "Moved the platform onto a managed identity provider with organization membership and admin-assigned roles, so every session maps to a named person and authorization fails closed.",
      },
      {
        title: "Document storage",
        body: "Direct-to-storage uploads through server-generated presigned URLs, with versioned deliverables so earlier revisions stay retrievable.",
      },
      {
        title: "Billing",
        body: "Subscription plans with metered usage, where each plan limit is enforced atomically in the database so concurrent requests cannot overspend it.",
      },
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Clerk",
      "Stripe",
      "Cloudflare R2",
      "Docker",
      "Azure",
      "Vitest",
    ],
  },
];
