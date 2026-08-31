"use client";

/* Chapter 3 — how I think. Bio + capability bento. */

import { motion, useReducedMotion } from "motion/react";
import { profile, skills, type Skill } from "@/data/projects";
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

/* Placeholder photos, drawn rather than imported: pixel polaroids taped to
   the page, each with its own tiny scene. They hold the layout (and the
   room-full-of-taped-photos feeling) until real photos land in
   profile.photos, at which point they are replaced automatically. */
const PHOTO_SLOTS = [
  { id: "calgary", tilt: "-2.5deg", tape: "var(--color-ember)" },
  { id: "the-desk", tilt: "1.5deg", tape: "var(--color-orchid)" },
  { id: "off-duty", tilt: "-1deg", tape: "var(--color-blush)" },
] as const;

function SlotScene({ index }: { index: number }) {
  const common = { className: "pixel-art h-full w-full", shapeRendering: "crispEdges" as const };
  if (index === 0)
    // skyline at night
    return (
      <svg viewBox="0 0 30 40" {...common}>
        <rect width="30" height="40" fill="#1b1530" />
        <rect x="13" y="6" width="2" height="12" fill="#4a3f6b" />
        <rect x="12" y="17" width="4" height="18" fill="#5b4d80" />
        <rect x="3" y="20" width="6" height="15" fill="#463a63" />
        <rect x="19" y="23" width="7" height="12" fill="#42375d" />
        <rect x="0" y="35" width="30" height="5" fill="#120e22" />
        {[[4,23],[7,27],[20,26],[23,30],[13,21],[14,26]].map(([x,y],k)=>(
          <rect key={k} x={x} y={y} width="1" height="1" fill="#ffb454" />
        ))}
      </svg>
    );
  if (index === 1)
    // desk + lamp glow
    return (
      <svg viewBox="0 0 30 40" {...common}>
        <rect width="30" height="40" fill="#20182f" />
        <circle cx="8" cy="14" r="6" fill="#ffb454" opacity="0.16" />
        <rect x="6" y="11" width="4" height="2" fill="#ffb454" />
        <rect x="7" y="13" width="2" height="7" fill="#6b5a3a" />
        <rect x="4" y="20" width="8" height="1" fill="#8d6a3f" />
        <rect x="15" y="14" width="11" height="7" fill="#3a3157" />
        <rect x="16" y="15" width="9" height="5" fill="#7fd8a4" opacity="0.5" />
        <rect x="2" y="24" width="26" height="2" fill="#7a5330" />
        <rect x="0" y="26" width="30" height="14" fill="#191227" />
      </svg>
    );
  // cat curled up
  return (
    <svg viewBox="0 0 30 40" {...common}>
      <rect width="30" height="40" fill="#1d1730" />
      <rect x="4" y="26" width="22" height="8" fill="#3b2f5c" />
      <ellipse cx="15" cy="24" rx="8" ry="5" fill="#c9762f" />
      <rect x="19" y="18" width="7" height="6" fill="#d98436" />
      <rect x="19" y="17" width="2" height="1" fill="#d98436" />
      <rect x="24" y="17" width="2" height="1" fill="#d98436" />
      <rect x="20" y="20" width="1" height="1" fill="#14101f" />
      <rect x="24" y="20" width="1" height="1" fill="#14101f" />
      <rect x="5" y="22" width="4" height="1" fill="#b5682a" />
    </svg>
  );
}

/* The polaroid itself — frame, tape and the flash. Real photos and the drawn
   placeholders share it, so swapping one for the other changes the picture
   and nothing else. Only the drawn version is aria-hidden: a real photo of
   me is content, a decorative pixel sketch is not.

   The wide bottom border stays even with no caption on it: that margin is
   what reads as a polaroid rather than a bordered photo. */
function Polaroid({
  tilt,
  tape,
  index,
  decorative,
  children,
}: {
  tilt: string;
  tape: string;
  index: number;
  decorative?: boolean;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden={decorative}
      style={{ transform: `rotate(${tilt})` }}
      className="group relative bg-fog p-1.5 pb-5 shadow-[3px_3px_0_rgba(15,12,28,0.55)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 active:scale-[0.97] active:rotate-0"
    >
      {/* a strip of tape holding it to the page */}
      <span
        className="absolute -top-2 left-1/2 h-3 w-9 -translate-x-1/2 -rotate-2 opacity-70"
        style={{ background: tape }}
      />
      <div className="aspect-[3/4] w-full overflow-hidden bg-abyss">
        {children}
      </div>

      {/* The flash: the shot going off as each photo arrives. Blows out fast
          and falls away slowly, the way a bulb actually behaves, and fires
          once. Staggered so the three read as three exposures, not one
          strobe. Skipped entirely under reduced motion — a full-bleed white
          blink is exactly what that setting exists to prevent. */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.85, 0] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.6,
            times: [0, 0.06, 1],
            ease: "easeOut",
            delay: 0.1 + index * 0.14,
          }}
        />
      )}
    </div>
  );
}

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
                  I&apos;m a full-stack developer in Calgary. I finished my
                  Software Development diploma at SAIT in August 2026, and I
                  work TypeScript-first — Next.js on the web, React Native and
                  Expo on mobile — with a habit of owning the whole path: the
                  schema, the API, the interface, the deploy.
                </p>
                <p>
                  My bias is toward software that holds up under pressure.
                  That means schema-enforced AI responses with typed fallbacks
                  so nothing breaks mid-outage, Firestore rules written before
                  the feature ships, and unit tests around the maths that
                  actually matters. Simple on the surface, rigorous underneath.
                </p>
              </div>
            </Reveal>

            {/* Real photos once profile.photos is filled in; until then the
                same grid holds empty frames so the layout is visible. */}
            <RevealGroup
              as="ul"
              className="mt-8 grid grid-cols-3 gap-3"
              aria-label="Photos"
            >
              {profile.photos.length > 0
                ? profile.photos.map((photo, i) => (
                    <PopItem key={photo.src} as="li">
                      <Polaroid
                        index={i}
                        tilt={PHOTO_SLOTS[i % PHOTO_SLOTS.length].tilt}
                        tape={PHOTO_SLOTS[i % PHOTO_SLOTS.length].tape}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element --
                            fixed-size decorative crop; next/image adds no value */}
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          width={600}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </Polaroid>
                    </PopItem>
                  ))
                : PHOTO_SLOTS.map((slot, i) => (
                    <PopItem key={slot.id} as="li">
                      <Polaroid tilt={slot.tilt} tape={slot.tape} index={i} decorative>
                        <SlotScene index={i} />
                      </Polaroid>
                    </PopItem>
                  ))}
            </RevealGroup>
          </div>

          <RevealGroup className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:col-span-3">
            {skills.map((skill) => {
              const Icon = ICONS[skill.icon];
              return (
                <PopItem key={skill.label}>
                  <Disclosure
                    className="panel press-touch p-5"
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
