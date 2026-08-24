/* Chapter 2 — proof of work. Asymmetric bento: the eye is directed, not tiled. */

import {
  projects,
  type Project,
  type ProjectAccent,
  type ProjectStatus,
} from "@/data/projects";
import {
  ParallaxDrift,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from "@/components/aurora/Reveal";
import { Tilt } from "@/components/aurora/Interactive";
import { ArrowUpRight, GitHub } from "@/components/aurora/icons";

/* Sketchbook accents remapped onto the cozy dusk palette */
const HUE: Record<ProjectAccent, string> = {
  sky: "var(--color-orchid)",
  leaf: "var(--color-mint)",
  coral: "var(--color-blush)",
  sun: "var(--color-ember)",
  tangerine: "var(--color-ember)",
};

const STATUS: Record<ProjectStatus, { label: string; className: string }> = {
  completed: {
    label: "Shipped",
    className: "border-mint/60 text-mint",
  },
  "in-production": {
    label: "In production",
    className: "border-ember/60 text-ember-bright",
  },
  concept: {
    label: "Concept",
    className: "border-line text-dust",
  },
};

function StatusChip({ status }: { status: ProjectStatus }) {
  const meta = STATUS[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 border-2 px-2.5 py-0.5 font-mono text-sm uppercase tracking-[0.12em] ${meta.className}`}
    >
      <span className="h-1.5 w-1.5 bg-current" aria-hidden />
      {meta.label}
    </span>
  );
}

/* Card visual — a generated pixel-art image when one exists, otherwise a
   procedural product silhouette tinted with the project hue */
function Visual({ project }: { project: Project }) {
  const hue = HUE[project.accent];
  const kind = project.images[0]?.mockup ?? "web";
  const src = project.images[0]?.src;

  if (src) {
    return (
      <div aria-hidden className="relative h-full w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative
            pixel art; next/image would resample the crisp pixels */}
        <img
          src={src}
          srcSet={`${src.replace(".webp", "-sm.webp")} 500w, ${src} 900w`}
          sizes="(max-width: 768px) 100vw, 700px"
          alt=""
          className="pixel-art h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent_0%,transparent_30%,rgba(20,16,31,0.45)_30%,rgba(20,16,31,0.45)_65%,rgba(20,16,31,0.8)_65%)]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="relative h-full w-full overflow-hidden"
      style={{
        background: `radial-gradient(120% 120% at 20% 0%, color-mix(in oklab, ${hue} 22%, transparent) 0%, transparent 60%)`,
      }}
    >
      <svg
        viewBox="0 0 400 240"
        className="pixel-art absolute inset-0 h-full w-full opacity-70"
        fill="none"
        stroke={hue}
        strokeWidth="2.5"
        strokeLinecap="square"
        preserveAspectRatio="xMidYMid slice"
      >
        {kind === "dashboard" && (
          <>
            <rect x="40" y="30" width="320" height="180" rx="12" opacity="0.5" />
            <path d="M60 55h90M60 75h50" opacity="0.35" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={64 + i * 30}
                y={170 - (i % 3) * 22 - i * 6}
                width="16"
                height={20 + (i % 3) * 22 + i * 6}
                rx="4"
                fill={hue}
                opacity="0.18"
                stroke="none"
              />
            ))}
            <path d="M250 160c18-10 26-46 44-46s24 26 46 12" opacity="0.8" />
            <circle cx="340" cy="126" r="3.5" fill={hue} stroke="none" />
          </>
        )}
        {kind === "mobile" && (
          <>
            <rect x="150" y="18" width="100" height="204" rx="20" opacity="0.6" />
            <path d="M180 30h40" opacity="0.4" />
            <rect x="164" y="52" width="72" height="52" rx="8" opacity="0.35" />
            <path d="M164 122h72M164 140h48M164 158h60" opacity="0.35" />
            <circle cx="200" cy="196" r="12" opacity="0.6" />
          </>
        )}
        {kind === "web" && (
          <>
            <rect x="40" y="30" width="320" height="180" rx="12" opacity="0.5" />
            <path d="M40 58h320" opacity="0.4" />
            <circle cx="58" cy="44" r="3" fill={hue} stroke="none" opacity="0.5" />
            <circle cx="70" cy="44" r="3" fill={hue} stroke="none" opacity="0.5" />
            <rect x="64" y="80" width="120" height="106" rx="8" opacity="0.35" />
            <path d="M204 88h130M204 108h96M204 128h110M204 148h72" opacity="0.35" />
          </>
        )}
        {kind === "chart" && (
          <>
            <circle cx="120" cy="120" r="58" opacity="0.5" />
            <path d="M120 62a58 58 0 0 1 55 40" opacity="0.9" strokeWidth="3" />
            <path d="M220 78h120M220 102h84M220 126h108M220 150h64" opacity="0.35" />
          </>
        )}
      </svg>
      {/* stepped bottom fade so text stays readable over the visual */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent_0%,transparent_25%,rgba(20,16,31,0.35)_25%,rgba(20,16,31,0.35)_55%,rgba(20,16,31,0.7)_55%,rgba(20,16,31,0.7)_80%,rgba(20,16,31,0.9)_80%)]" />
    </div>
  );
}

type CardVariant = "feature" | "tall" | "wide";

const VISUAL_HEIGHT: Record<CardVariant, string> = {
  feature: "h-56 md:h-72",
  tall: "h-44",
  wide: "h-44 md:h-auto md:w-2/5 md:shrink-0",
};

function ProjectCard({
  project,
  variant,
}: {
  project: Project;
  variant: CardVariant;
}) {
  const hue = HUE[project.accent];

  return (
    <article
      className={`panel group relative flex h-full flex-col overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
        variant === "feature" ? "radius-organic" : "radius-organic-b"
      } ${variant === "wide" ? "md:flex-row" : ""}`}
    >
      {/* hover: ink border warms to the project hue, shadow stays hard */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-0.5 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          border: `2px solid color-mix(in oklab, ${hue} 70%, var(--color-ink))`,
          boxShadow: `6px 6px 0 color-mix(in oklab, ${hue} 30%, transparent)`,
        }}
      />

      <div className={`overflow-hidden ${VISUAL_HEIGHT[variant]}`}>
        <ParallaxDrift
          className="h-full"
          amount={variant === "feature" ? 16 : variant === "wide" ? 12 : 10}
        >
          <Visual project={project} />
        </ParallaxDrift>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <StatusChip status={project.status} />
          <span className="font-mono text-base text-dust">
            {project.role} · {project.year}
          </span>
        </div>

        <h3
          className={`font-display font-semibold text-fog ${
            variant === "feature" ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {project.title}
        </h3>

        <p className="max-w-prose text-[15px] leading-relaxed text-mist">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-3" aria-label="Built with">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border-2 border-line px-2 py-0.5 font-mono text-sm text-dust"
            >
              {tag}
            </li>
          ))}
        </ul>

        {(project.live || project.repo) && (
          <div className="relative z-20 flex flex-wrap items-center gap-4 pt-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="-my-2 inline-flex min-h-11 items-center gap-1.5 py-2 font-mono text-sm uppercase tracking-[0.1em] text-ember-bright transition-colors duration-200 hover:text-fog"
              >
                Live site
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="-my-2 inline-flex min-h-11 items-center gap-1.5 py-2 font-mono text-sm uppercase tracking-[0.1em] text-mist transition-colors duration-200 hover:text-fog"
              >
                <GitHub className="h-3.5 w-3.5" />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function WorkSection() {
  const [recepie, studyspot, movies] = projects;

  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <SectionHeading
          id="work-title"
          eyebrow="01 · Selected work"
          title={"Work that *shipped,* and what's next."}
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
          <RevealItem direction="left" className="md:col-span-4">
            <Tilt className="h-full" max={4}>
              <ProjectCard project={recepie} variant="feature" />
            </Tilt>
          </RevealItem>
          <RevealItem direction="right" className="md:col-span-2">
            <Tilt className="h-full" max={5}>
              <ProjectCard project={studyspot} variant="tall" />
            </Tilt>
          </RevealItem>
          <RevealItem direction="up" className="md:col-span-6">
            <Tilt className="h-full" max={3}>
              <ProjectCard project={movies} variant="wide" />
            </Tilt>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
