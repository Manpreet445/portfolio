/* Chapter 4 — what I build with.

   Two layers on purpose. The tag row is the scannable one: a recruiter
   reading at speed sees the vendor names without clicking anything. The
   points underneath are the slower read, and say what was actually
   understood rather than which logo was touched — which is the difference
   between having used a thing and being able to build with it. */

import { skillAreas } from "@/data/projects";
import { PopItem, RevealGroup, SectionHeading } from "@/components/aurora/Reveal";

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <SectionHeading
          id="skills-title"
          eyebrow="04 · Skills"
          title={"The stack, and what I\n*actually* know about it."}
        />

        <RevealGroup
          as="ul"
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Skill areas"
        >
          {skillAreas.map((area) => (
            <PopItem key={area.label} as="li">
              <article className="panel press-touch flex h-full flex-col p-5">
                <h3 className="font-display text-base font-semibold text-fog">
                  {area.label}
                </h3>

                {/* the scannable row */}
                <ul
                  aria-label={`${area.label} technologies`}
                  className="mt-3 flex flex-wrap gap-1.5"
                >
                  {area.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border-2 border-line px-2 py-0.5 font-mono text-[11px] tracking-[0.06em] text-ember-bright"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 space-y-2">
                  {area.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-[13px] leading-relaxed text-mist"
                    >
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 bg-ember" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </PopItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
