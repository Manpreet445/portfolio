/* Chapter 4 — the journey. A quiet vertical timeline, recruiter-skimmable. */

import { milestones, type ProjectStatus } from "@/data/projects";
import {
  GrowLine,
  PopItem,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from "@/components/aurora/Reveal";

const DOT: Record<ProjectStatus, string> = {
  completed: "bg-mint",
  "in-production": "bg-ember",
  concept: "border-2 border-dust bg-transparent",
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  completed: "done",
  "in-production": "now",
  concept: "next",
};

export default function JourneySection() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <SectionHeading
          id="journey-title"
          eyebrow="05 · Journey"
          title={"Where I've been,\nwhere this is *going.*"}
        />

        <RevealGroup className="relative mt-14 max-w-2xl">
          {/* the line draws itself as you scroll */}
          <GrowLine className="absolute top-1 bottom-1 left-[4px] w-[2px] bg-[linear-gradient(180deg,var(--color-ember)_0%,var(--color-ember)_35%,var(--color-orchid)_35%,var(--color-orchid)_70%,var(--color-dust)_70%)] opacity-50" />
          <ol className="space-y-10">
            {milestones.map((milestone) => (
              <RevealItem key={milestone.title} as="li" className="relative pl-10">
                  <PopItem className="absolute top-1.5 left-0">
                    <span
                      aria-hidden
                      className={`block h-[10px] w-[10px] ${DOT[milestone.status]}`}
                    />
                  </PopItem>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-mono text-base text-dust">
                      {milestone.year} · {STATUS_LABEL[milestone.status]}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-fog">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 max-w-prose text-[15px] leading-relaxed text-mist">
                    {milestone.note}
                  </p>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}
