"use client";

/* Chapter 3 — how I think. Bio + capability bento. */

import { skills, type Skill } from "@/data/projects";
import {
  PopItem,
  Reveal,
  RevealGroup,
  SectionHeading,
} from "@/components/aurora/Reveal";
import Disclosure from "@/components/aurora/Disclosure";
import {
  Bolt,
  Code,
  Layout,
  Pen,
  Spark,
  Stack,
} from "@/components/aurora/icons";
import type { SVGProps } from "react";

const ICONS: Record<Skill["icon"], (p: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  layout: Layout,
  stack: Stack,
  pen: Pen,
  bolt: Bolt,
  spark: Spark,
  code: Code,
};

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionHeading
              id="about-title"
              eyebrow="03 · About"
              title={"Deliberate process,\n*shipped* results."}
            />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-mist">
                <p>
                  I&apos;m a full-stack developer in Calgary, finishing my
                  Software Development diploma at SAIT in September 2026. I
                  work TypeScript-first — Next.js on the web, React Native and
                  Expo on mobile — and I like owning the whole path: the
                  schema, the API, the interface, the deploy.
                </p>
                <p>
                  My bias is toward software that holds up under pressure.
                  That means schema-enforced AI responses with typed fallbacks
                  so nothing breaks mid-outage, Firestore rules written before
                  the feature ships, and unit tests around the maths that
                  actually matters. Simple on the surface, rigorous underneath.
                </p>
                <p className="text-dust">
                  Eligible for a Canadian PGWP — no LMIA or sponsorship
                  required.
                </p>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:col-span-3">
            {skills.map((skill) => {
              const Icon = ICONS[skill.icon];
              return (
                <PopItem key={skill.label}>
                  <Disclosure
                    className="panel p-5"
                    label={skill.label}
                    headingClass="font-display text-base font-semibold text-fog"
                    lead={
                      <span className="mb-3 inline-flex h-10 w-10 items-center justify-center border-2 border-line text-ember-bright">
                        <Icon className="h-5 w-5" />
                      </span>
                    }
                  >
                    <p className="text-sm leading-relaxed text-mist">
                      {skill.blurb}
                    </p>
                  </Disclosure>
                </PopItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
