/** Public portfolio content. Experience copy intentionally stays NDA-safe. */
export type ProjectStatus = "live" | "in-development" | "completed";
export type ProjectAccent = "coral" | "sky" | "leaf" | "sun" | "tangerine";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  detail?: string;
  role: string;
  context?: string;
  year: string;
  images: ProjectImage[];
  tags: string[];
  status: ProjectStatus;
  accent: ProjectAccent;
  secondary?: boolean;
  repo?: string;
  live?: string;
};

export type SkillCategory = "interface" | "systems" | "cloud" | "quality";
export type SkillArea = {
 label: string;
 category: SkillCategory;
 symbol: string;
 tags: string[];
 capabilities: string[];
 learning?: string;
};

export type MilestoneStatus = "completed" | "in-development" | "available";
export type Milestone = {
  title: string;
  note: string;
  year: string;
  status: MilestoneStatus;
};

export const BAETT_DATES = "May–August 2026";

export const profile = {
  name: "Manpreet",
  fullName: "Manpreet Singh",
  role: "Full-Stack Developer",
  location: "Calgary, Alberta",
  tagline: "I build web and mobile applications with TypeScript, React, and Next.js.",
  summary: "Recent SAIT Software Development graduate with experience in team-based development, cloud integrations, and automated testing. Available for full-time roles in Calgary and across Alberta.",
  locationProse: "Based in Calgary, Alberta, open to remote and on-site work",
  // Set only after adding the actual file under public/. No empty download links.
  resume: { href: "/resume/Manpreet_Singh_Resume.pdf", fileName: "Manpreet_Singh_Resume.pdf" } as { href: string; fileName: string } | null,
  photos: [
    { src: "/photos/desk.webp", alt: "Manpreet at a monitor mid-build, headphones on" },
    { src: "/photos/portrait.webp", alt: "Portrait of Manpreet Singh" },
    { src: "/photos/street.webp", alt: "Manpreet outside a stone building in the evening" },
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
    description: "A pantry-first cooking app: match recipes to ingredients on hand, create multi-day AI meal plans, and combine missing ingredients into one shopping list.",
    detail: "Gemini returns schema-constrained JSON validated with Zod. Transient failures trigger retries and fallback models; exhausted attempts show an error. Vitest covers ingredient matching, nutrition calculations, and generation responses.",
    role: "Full-stack developer · Solo",
    year: "2026",
    images: [{
      src: "/projects/recepie-live.webp",
      alt: "Recepie’s live home page with pantry ingredient matching and multi-day meal planning entry points.",
      width: 1270,
      height: 893,
      caption: "Live application · Pantry-first cooking and meal planning",
    }],
    tags: ["TypeScript", "Next.js", "React", "Gemini API", "Supabase", "Zod", "Vitest"],
    status: "live",
    accent: "sun",
    repo: "https://github.com/Manpreet445/Recepie",
    live: "https://recepie-app-gilt.vercel.app/",
  },
  {
    slug: "studyspot",
    title: "StudySpot",
    description: "A campus study-spot finder in development, built with React Native and Expo. Uses Firestore listeners for crowd-level updates, native maps on mobile, and Leaflet on web.",
    role: "Mobile and web developer · Solo",
    year: "2026",
    images: [],
    tags: ["React Native", "Expo", "Firebase", "Firestore", "Leaflet"],
    status: "in-development",
    accent: "sky",
    repo: "https://github.com/Manpreet445/StudySpot",
  },
  {
    slug: "conveyor",
    title: "Automated Conveyor Sorting System",
    context: "Emergex · SAIT INTP302",
    role: "Cloud and Data Lead · Team of 2",
    year: "August 2026",
    description: "Led the cloud and data work for a two-person conveyor sorting project. Built an Azure backend to ingest classification events from a Raspberry Pi rig, designed the Cosmos DB data model, and implemented agent decision logic to turn sensor readings into sorting actions. Presented the project to industry guests at the SAIT INTP302 showcase.",
    images: [{
      src: "/projects/conveyor-rig.webp",
      alt: "The conveyor project’s physical sorting rig, showing its Raspberry Pi, camera, breadboard wiring, and motor-driven sorting arm.",
      width: 750,
      height: 1344,
      caption: "Project hardware · Raspberry Pi sorting rig",
    }],
    tags: ["Azure", "Azure Functions", "Cosmos DB", "Azure AI Agent Service", "Python"],
    status: "completed",
    accent: "leaf",
  },
  {
    slug: "movies",
    title: "Movie Booking System",
    description: "A Python command-line booking system with movie, customer, and booking management. Modelled in UML and organized into model, service, and CLI layers.",
    role: "Solo · Coursework",
    year: "2025",
    images: [],
    tags: ["Python", "OOP", "UML", "CLI"],
    status: "completed",
    accent: "leaf",
    secondary: true,
    repo: "https://github.com/Manpreet445/Movies-System-",
  },
];

export const skillAreas: SkillArea[] = [
  {
    "label": "Languages",
    "category": "interface",
    "symbol": "</>",
    "tags": [
      "TypeScript",
      "JavaScript",
      "Python",
      "SQL",
      "C#",
      "Java",
      "HTML",
      "CSS"
    ],
    "capabilities": [
      "Typed application code and object-oriented programming.",
      "Semantic HTML, responsive CSS, and relational queries."
    ]
  },
  {
    "label": "Web interfaces",
    "category": "interface",
    "symbol": "{ }",
    "tags": [
      "React",
      "Next.js 16",
      "Tailwind CSS",
      "Framer Motion"
    ],
    "capabilities": [
      "App Router, server actions, and reusable React components.",
      "Responsive layouts and purposeful interface animation."
    ]
  },
  {
    "label": "Mobile & cross-platform",
    "category": "interface",
    "symbol": "[ ]",
    "tags": [
      "React Native",
      "Expo",
      ".NET MAUI",
      "Blazor Hybrid",
      "react-native-maps",
      "Leaflet"
    ],
    "capabilities": [
      "Shared mobile and web interfaces, including native maps.",
      "Cross-platform development with React and .NET."
    ]
  },
  {
    "label": "Backend & databases",
    "category": "systems",
    "symbol": "DB",
    "tags": [
      "Node.js",
      ".NET",
      "Prisma",
      "PostgreSQL",
      "Neon",
      "Supabase",
      "Cosmos DB",
      "Firestore",
      "SQLite"
    ],
    "capabilities": [
      "REST API design, schema modelling, and database migrations.",
      "Multi-tenant query isolation and real-time data listeners."
    ]
  },
  {
    "label": "Authentication & permissions",
    "category": "systems",
    "symbol": "KEY",
    "tags": [
      "Clerk",
      "Firebase Auth",
      "RBAC",
      "Firestore rules"
    ],
    "capabilities": [
      "Hosted sign-in, sessions, organizations, and admin-managed roles.",
      "Fail-closed authorization and server-side route protection."
    ]
  },
  {
    "label": "Payments & webhooks",
    "category": "systems",
    "symbol": "↔",
    "tags": [
      "Stripe",
      "Stripe Elements",
      "Svix"
    ],
    "capabilities": [
      "Subscriptions, checkout, plan allowances, and usage metering.",
      "Concurrency-safe balance updates and raw-body signature verification."
    ]
  },
  {
    "label": "AI integrations",
    "category": "systems",
    "symbol": "AI",
    "tags": [
      "Gemini API",
      "Zod",
      "Azure AI Agent Service"
    ],
    "capabilities": [
      "Schema-constrained JSON, validation, retries, and typed error paths.",
      "Agent decision logic that turns input data into application actions."
    ]
  },
  {
    "label": "Cloud & storage",
    "category": "cloud",
    "symbol": "↑",
    "tags": [
      "Azure",
      "Azure Functions",
      "Cloudflare R2",
      "Firebase Storage",
      "Google Cloud",
      "Vercel"
    ],
    "capabilities": [
      "Cloud integrations and S3-compatible object storage.",
      "Presigned uploads, request signing, and immutable file versions."
    ],
    "learning": "AWS Cloud Practitioner — in progress"
  },
  {
    "label": "Delivery & automation",
    "category": "cloud",
    "symbol": ">_",
    "tags": [
      "Git",
      "GitHub Actions",
      "Docker"
    ],
    "capabilities": [
      "Multi-stage containers and cloud-hosted deployment.",
      "CI gates for lint, type checks, tests, and builds; environment and secret management."
    ]
  },
  {
    "label": "Testing & QA",
    "category": "quality",
    "symbol": "✓",
    "tags": [
      "Vitest",
      "Unit testing",
      "Integration testing",
      "Mocking"
    ],
    "capabilities": [
      "Database-backed integration tests and CI with PostgreSQL.",
      "Requirements-based test cases, regression checks, defect prioritization, and Pareto analysis."
    ]
  },
  {
    "label": "Engineering practice",
    "category": "quality",
    "symbol": "//",
    "tags": [
      "Code review",
      "Pull requests",
      "OOP",
      "UML",
      "SDLC",
      "Agile"
    ],
    "capabilities": [
      "Shared repositories, branch workflows, and merge conflict resolution.",
      "Reading and extending existing code; modelling systems before implementation."
    ]
  },
  {
    "label": "Development tools",
    "category": "quality",
    "symbol": "⌘",
    "tags": [
      "VS Code",
      "Visual Studio",
      "Android Studio",
      "Figma",
      "GitHub"
    ],
    "capabilities": [
      "Web and mobile development environments and collaborative design handoff.",
      "CSV parsing and structured data handling."
    ]
  }
];

export const milestones: Milestone[] = [
  {
    title: "Started at SAIT",
    note: "Began the Software Development diploma in Calgary: OOP, databases, web development, and UI/UX.",
    year: "2025", status: "completed",
  },
  {
    title: "Movie Booking System",
    note: "Built a UML-modelled Python booking system with separate service and CLI layers.",
    year: "2025", status: "completed",
  },
  {
    title: "StudySpot",
    note: "Developing a campus study-spot finder with React Native, Expo, and Firebase.",
    year: "2026", status: "in-development",
  },
  {
    title: "Recepie",
    note: "Built a pantry-first cooking app with ingredient matching, AI meal plans, and a consolidated shopping list.",
    year: "2026", status: "completed",
  },
  {
    title: "BAETT-EMS · SAIT capstone",
    note: "Worked with industry partner BAETT on a five-person team. Contributed authentication and role-based permissions, document storage, and subscription billing.",
    year: BAETT_DATES, status: "completed",
  },
  {
    title: "Automated Conveyor Sorting System",
    note: "Cloud and Data Lead on a two-person project, presented at the SAIT INTP302 industry showcase.",
    year: "August 2026", status: "completed",
  },
  {
    title: "Graduated from SAIT",
    note: "Finished the Software Development diploma on 20 August 2026.",
    year: "August 2026", status: "completed",
  },
  {
    title: "Open to junior software developer roles",
    note: "Available for full-time roles in Calgary and across Alberta, remote or on-site.",
    year: "2026", status: "available",
  },
];

export type Experience = {
  company: string;
  product: string;
  role: string;
  employment: string;
  context: string;
  dates: string;
  problem: string;
  lead: string;
  nda: string;
  areas: string[];
};

export const experiences: Experience[] = [{
  company: "BAETT",
  product: "BAETT-EMS",
  role: "Full-Stack Developer",
  employment: "SAIT capstone · Industry partner",
  context: "Team of 5",
  dates: BAETT_DATES,
  problem: "An EMS system for engineering consultancies.",
  lead: "My contributions",
  nda: "Project under NDA. Implementation details are confidential.",
  areas: ["Authentication & role-based permissions", "Document storage", "Subscription billing"],
}];
