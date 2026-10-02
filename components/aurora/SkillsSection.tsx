"use client";

import { useState } from "react";
import { skillAreas, type SkillCategory } from "@/data/projects";
import { SectionHeading } from "@/components/aurora/Reveal";
import ScrollScene from "@/components/aurora/ScrollScene";
import ReactiveSurface from "@/components/aurora/ReactiveSurface";

const filters: { label: string; value: SkillCategory | "all" }[] = [
  { label: "Everything", value: "all" },
  { label: "Interface", value: "interface" },
  { label: "Systems", value: "systems" },
  { label: "Cloud", value: "cloud" },
  { label: "Quality & practice", value: "quality" },
];

export default function SkillsSection() {
  const [active, setActive] = useState<SkillCategory | "all">("all");
  const visible = skillAreas.filter(area => active === "all" || area.category === active);

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-32">
        <div className="section-intro">
          <SectionHeading id="skills-title" eyebrow="04 · The toolkit" title={"From interface\nto *infrastructure.*"} />
          <p className="max-w-sm text-base leading-relaxed text-mist">
            The languages, tools, and engineering practices I use to connect the whole application.
          </p>
        </div>
        <div className="skills-toolbar">
          <div role="group" aria-label="Filter technical skills" className="skill-filters">
            {filters.map(filter => (
              <button key={filter.value} type="button" aria-pressed={active === filter.value}
                aria-controls="skill-results" onClick={() => setActive(filter.value)} className="skill-filter">
                {filter.label}
              </button>
            ))}
          </div>
          <p className="font-mono text-xs text-mist" aria-live="polite" aria-atomic="true">
            {visible.length} of {skillAreas.length} areas
          </p>
        </div>
        <ul id="skill-results" aria-label="Technical skill groups" className="skill-grid">
          {visible.map((area, index) => (
            /* keyed on the filter so a new selection remounts and the scene
               replays its entrance — the list item itself no longer animates,
               so there is exactly one thing moving each card */
            <li key={`${active}-${area.label}`}>
              <ScrollScene index={index} className="h-full">
              <ReactiveSurface className="h-full">
                <div className="skill-card">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span aria-hidden className="skill-symbol">{area.symbol}</span>
                    <span aria-hidden className="font-mono text-xs text-dust">
                      {String(skillAreas.indexOf(area) + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-fog">{area.label}</h3>
                  <ul aria-label={`${area.label} technologies`} className="mt-4 flex flex-wrap gap-2">
                    {area.tags.map(tag => <li key={tag} className="tech-chip">{tag}</li>)}
                  </ul>
                  <ul aria-label={`${area.label} capabilities`} className="skill-capabilities">
                    {area.capabilities.map(point => <li key={point}>{point}</li>)}
                  </ul>
                  {area.learning && <p className="skill-learning">{area.learning}</p>}
                </div>
              </ReactiveSurface>
              </ScrollScene>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
