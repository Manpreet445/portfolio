/* Chapter 3 — experience. Deeper than a project card: the problem, the
   areas I owned, and the engineering decision inside each one. */

import { experiences } from "@/data/projects";
import {
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from "@/components/aurora/Reveal";

/** BAETT mark — rebuilt as vector so it stays crisp at any size. */
function BaettMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="BAETT logo"
      className={className}
    >
      <rect width="64" height="64" rx="15" fill="#2C6BE8" />
      <rect x="10" y="10" width="20" height="20" rx="5" fill="#FFFFFF" />
      <rect x="34" y="10" width="20" height="20" rx="5" fill="#93B0F5" />
      <rect x="10" y="34" width="20" height="20" rx="5" fill="#93B0F5" />
      <rect x="34" y="34" width="20" height="20" rx="5" fill="#C3D5FB" />
    </svg>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          id="experience-title"
          eyebrow="02 · Experience"
          title={"Shipping with a *team,* on a real brief."}
        />

        {experiences.map((job) => (
          <Reveal key={job.product} delay={0.1}>
            <article className="panel mt-12 p-6 md:p-10">
              {/* masthead */}
              <div className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-line-soft pb-6">
                <div className="flex items-center gap-4">
                  <BaettMark className="h-12 w-12 shrink-0" />
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-fog">
                      {job.product}
                    </h3>
                    <p className="mt-0.5 font-mono text-sm uppercase tracking-[0.12em] text-ember-bright">
                      {job.company}
                    </p>
                  </div>
                </div>
                <div className="font-mono text-sm text-dust md:text-right">
                  <p className="text-mist">{job.role}</p>
                  <p className="mt-1 text-ember-bright/90">
                    {job.employment} · {job.duration}
                  </p>
                  <p className="mt-0.5">
                    {job.context} · {job.year}
                  </p>
                </div>
              </div>

              {/* the brief */}
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-mist">
                {job.problem}
              </p>
              <p className="mt-4 font-display text-lg text-fog">{job.lead}</p>
              {job.nda && (
                <p className="mt-3 max-w-2xl border-l-2 border-ember/50 pl-3 text-sm leading-relaxed text-dust">
                  {job.nda}
                </p>
              )}

              {/* what I owned */}
              <RevealGroup
                as="ul"
                className="mt-8 grid grid-cols-1 items-start gap-5 md:grid-cols-3"
              >
                {job.areas.map((area, i) => (
                  <RevealItem key={area} as="li" direction="up">
                    <div className="border-2 border-line bg-abyss/40 p-5">
                      <span className="block font-mono text-sm text-ember-bright">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="mt-1 font-display text-lg font-semibold text-fog">
                        {area}
                      </h4>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
