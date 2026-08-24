import PaperGrain from "@/components/ui/PaperGrain";
import { accentHex, statusMeta, type Project } from "@/data/projects";

/** A single project's sketchbook cover — the closed "book" in the stack. */
export default function ProjectCover({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const c = accentHex[project.accent];
  const status = statusMeta[project.status];

  return (
    <div
      className="relative h-full w-full select-none overflow-hidden rounded-l-[8px] rounded-r-[18px]"
      style={{ background: c.base, boxShadow: "var(--shadow-lift)" }}
    >
      {/* lighting + cloth + grain */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `radial-gradient(120% 90% at 36% 28%, ${c.base} 0%, ${c.deep} 100%)` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.2) 0 1px, transparent 1px 3px)",
        }}
      />
      <PaperGrain opacity={0.6} />

      {/* line-art marks */}
      <svg
        aria-hidden
        viewBox="0 0 900 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-40"
        style={{ filter: "url(#rough)" }}
      >
        <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M60 90 q14 -12 28 0 M120 70 l20 0 M130 60 l0 20" />
          <path d="M740 460 q22 -18 44 0 t44 0" />
          <circle cx="800" cy="120" r="22" />
          <path d="M70 500 l8 18 l19 1 l-15 12 l5 19 l-17 -11 l-17 11 l5 -19 l-15 -12 l19 -1 Z" />
        </g>
      </svg>

      {/* left binding */}
      <div aria-hidden className="absolute inset-y-0 left-0 w-3 bg-black/25" />

      <div className="relative flex h-full flex-col justify-between p-7 sm:p-10">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-white/80">
            Project Nº{String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full bg-white/90 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider" style={{ color: c.deep }}>
            {status.label}
          </span>
        </div>

        <div>
          <h3 className="font-display text-5xl font-bold leading-[0.9] text-white drop-shadow-sm sm:text-7xl">
            {project.title}
          </h3>
          <p className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-white/85">
            {project.role} · {project.year}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((t) => (
              <span key={t} className="washi rounded-[5px] bg-white/20 px-2.5 py-1 font-display text-xs font-medium text-white">
                {t}
              </span>
            ))}
          </div>
          <span className="shrink-0 font-hand text-2xl text-white/90">open me →</span>
        </div>
      </div>

      {/* elastic + sheen */}
      <div
        aria-hidden
        className="absolute inset-y-0"
        style={{
          left: "84%",
          width: "14px",
          background: "linear-gradient(90deg, rgba(0,0,0,0.25), rgba(255,255,255,0.5) 50%, rgba(0,0,0,0.25))",
          opacity: 0.5,
        }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.18), transparent 28%)" }} />
    </div>
  );
}
