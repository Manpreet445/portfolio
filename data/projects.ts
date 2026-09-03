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

/* A skills area: the vendor names stay visible so the section is scannable,
   and the points underneath say what was actually understood rather than
   just which logo was touched. Deliberately written as capability — what I
   know how to build — and never tied back to whose system it was built in. */
export type SkillArea = {
  label: string;
  /** scannable keywords — the row a recruiter reads first */
  tags: string[];
  /** optional: some areas are a list of names and nothing more, and padding
      those out with invented commentary would only dilute the ones that
      genuinely have something to say */
  points?: string[];
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
  /** a few real photos for the About section — drop files in /public/photos
      and list them here; drawn pixel polaroids stand in while this is empty */
  photos: [
    {
      src: "/photos/desk.webp",
      alt: "Manpreet at a monitor mid-build, headphones on",
    },
    { src: "/photos/portrait.webp", alt: "Portrait of Manpreet Singh" },
    {
      src: "/photos/street.webp",
      alt: "Manpreet outside a stone building in the evening",
    },
  ] as { src: string; alt: string }[],
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

export const skillAreas: SkillArea[] = [
  {
    label: "Languages",
    tags: ["TypeScript", "JavaScript", "Python", "C#", "Java", "SQL", "HTML", "CSS"],
  },
  {
    label: "Web & mobile",
    tags: [
      "Next.js 16",
      "React",
      "React Native",
      "Expo",
      "Tailwind CSS",
      "Framer Motion",
      ".NET",
      ".NET MAUI",
      "Blazor Hybrid",
    ],
    points: ["App Router with server actions."],
  },
  {
    label: "Backend & data",
    tags: [
      "Node.js",
      "Prisma ORM",
      "PostgreSQL",
      "Neon",
      "Supabase",
      "Azure Cosmos DB",
      "Cloud Firestore",
      "SQLite",
    ],
    points: [
      "Schema design, and migrations run as a deploy step.",
      "Multi-tenant isolation enforced at the query layer.",
      "REST API design.",
    ],
  },
  {
    label: "Auth & authorization",
    tags: ["Clerk", "RBAC", "Firestore security rules"],
    points: [
      "Hosted sign-in, sessions and organizations.",
      "Role-based access control, designed to fail closed.",
      "Server-side route protection rather than client-side hiding.",
    ],
  },
  {
    label: "Payments",
    tags: ["Stripe", "Stripe Elements", "Subscriptions"],
    points: [
      "Checkout, with customer and plan modelling.",
      "Usage metering against plan allowances.",
      "An atomic conditional UPDATE to prevent double-spend under concurrency.",
    ],
  },
  {
    label: "Webhooks",
    tags: ["Svix", "Stripe", "Signature verification"],
    points: [
      "Validating against the raw body before trusting a payload.",
    ],
  },
  {
    label: "Cloud & storage",
    tags: [
      "Azure",
      "Azure AI Agent Service",
      "Cloudflare R2",
      "S3-compatible",
      "Firebase",
      "Google Cloud",
      "Vercel",
      "AWS",
    ],
    points: [
      "Presigned URLs and the SigV4 signing model, including that content type is unsigned unless declared.",
      "Immutable version history.",
      "Firebase across Firestore, Auth and Storage.",
      "AWS Cloud Practitioner in progress.",
    ],
  },
  {
    label: "AI",
    tags: ["Google Gemini API", "Structured JSON", "Agents"],
    points: [
      "responseSchema-enforced structured output.",
      "Typed fallback paths, so the interface holds when the model does not.",
      "Agent decision logic.",
    ],
  },
  {
    label: "DevOps",
    tags: ["Docker", "GitHub Actions", "CI/CD"],
    points: [
      "Multi-stage container builds.",
      "CI gating every push on lint, type-check, test and build.",
      "Container deployment to a cloud host, with environment and secret management.",
    ],
  },
  {
    label: "Testing & QA",
    tags: ["Vitest", "Mocking", "Postgres in CI"],
    points: [
      "Unit and integration tests, run against a real Postgres instance rather than a stub.",
      "Test cases written from requirements; defects tracked by severity and priority, with Pareto analysis.",
      "Unit, functional, regression and performance testing treated as distinct activities.",
    ],
  },
  {
    label: "Engineering practice",
    tags: ["Git", "Code review", "OOP", "UML", "SDLC", "Agile"],
    points: [
      "Branches, pull requests, review and merge conflicts in a shared repository.",
      "Reading and extending code you did not write.",
    ],
  },
  {
    label: "Tools",
    tags: ["VS Code", "Visual Studio", "Android Studio", "Figma", "GitHub"],
  },
  {
    label: "Libraries",
    tags: ["Zod", "react-native-maps", "Leaflet", "CSV data handling"],
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
    title: "Graduated from SAIT",
    note: "Finished the Software Development diploma on 20 August 2026.",
    year: "2026",
    status: "completed",
  },
  {
    title: "Open to full-time roles",
    note: "Available now for full-time work — Calgary, remote or on-site.",
    year: "2026",
    status: "in-production",
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
  /** shown in place of detail this engagement cannot disclose */
  nda?: string;
  /** the areas I owned — labels only, no detail */
  areas: string[];
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
    problem: "An EMS system.",
    lead: "I owned three areas of the build.",
    nda: "Under NDA — implementation specifics are kept deliberately brief.",
    areas: ["Authentication", "Document storage", "Billing"],
  },
];
