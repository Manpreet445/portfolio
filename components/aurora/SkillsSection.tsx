/* Chapter 4 — what I build with.

   Two layers on purpose. The tag row is the scannable one: a recruiter
   reading at speed sees the vendor names without clicking anything. The
   points underneath are the slower read, and say what was actually
   understood rather than which logo was touched — which is the difference
   between having used a thing and being able to build with it.

   Laid out in columns rather than a grid. These areas have genuinely
   different amounts to say — eight tags and no commentary in one, three
   tags and four points in another — and a grid stretches every card in a
   row to match its tallest neighbour, which padded the short ones with
   dead space and left a single orphan on the last row. Columns let each
   card end where its content ends. */

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
          className="mt-12 columns-1 gap-5 md:columns-2 xl:columns-3"
          aria-label="Skill areas"
        >
          {skillAreas.map((area) => (
            <PopItem key={area.label} as="li" className="mb-5 break-inside-avoid">
              <article className="panel press-touch p-5">
                {/* the rule gives the eye somewhere to land before the tags */}
                <h3 className="border-b-2 border-line/60 pb-3 font-display text-lg font-semibold text-fog">
                  {area.label}
                </h3>

                {/* the scannable row — filled rather than outlined, because
                    66 hard-bordered chips across the section read as noise */}
                <ul
                  aria-label={`${area.label} technologies`}
                  className="mt-4 flex flex-wrap gap-1.5"
                >
                  {area.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border-2 border-ember/25 bg-ember/10 px-2 py-1 font-mono text-xs tracking-[0.04em] text-ember-bright"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {area.points && (
                  <ul className="mt-4 space-y-2.5">
                    {area.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-sm leading-relaxed text-mist"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 bg-ember"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </PopItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
