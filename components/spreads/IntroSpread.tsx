"use client";

import { motion } from "motion/react";
import { staggerContainer, riseIn } from "@/lib/motion";
import Doodle from "@/components/ui/Doodle";
import { profile } from "@/data/projects";

const CONTENTS = [
  { n: "01", label: "Selected projects" },
  { n: "02", label: "What I do" },
  { n: "03", label: "Roadmap & status" },
];

/** Inside-cover welcome page — the first spread revealed when the cover lifts. */
export default function IntroSpread({ active }: { active: boolean }) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate={active ? "show" : "hidden"}
      className="grid h-full w-full grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-2 md:gap-10 md:p-12"
    >
      {/* left page — greeting */}
      <div className="flex flex-col justify-center gap-3">
        <motion.span variants={riseIn} className="font-hand text-2xl text-coral-deep">
          hello, I&apos;m
        </motion.span>
        <motion.h2
          variants={riseIn}
          className="relative w-fit font-display text-5xl font-bold leading-[0.95] text-ink sm:text-6xl"
        >
          {profile.name}
          <Doodle
            kind="underline"
            play={active}
            color="var(--color-coral)"
            strokeWidth={5}
            className="absolute -bottom-3 left-0 h-4 w-full"
            delay={0.4}
          />
        </motion.h2>
        <motion.p
          variants={riseIn}
          className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-ink-soft"
        >
          {profile.role}
        </motion.p>
        <motion.p
          variants={riseIn}
          className="mt-2 max-w-sm font-serif text-lg italic leading-relaxed text-ink-soft"
        >
          {profile.tagline}
        </motion.p>
      </div>

      {/* right page — hand-written contents */}
      <div className="flex flex-col justify-center">
        <motion.div
          variants={riseIn}
          className="relative rounded-2xl border border-ink/5 bg-white/50 p-6 shadow-sm"
        >
          <span className="font-hand text-2xl text-ink-soft">contents</span>
          <ul className="mt-3 space-y-3">
            {CONTENTS.map((c) => (
              <motion.li
                key={c.n}
                variants={riseIn}
                className="flex items-center gap-3 border-b border-dashed border-ink/10 pb-3 last:border-0 last:pb-0"
              >
                <span className="font-display text-sm font-bold text-coral">{c.n}</span>
                <span className="font-display text-lg text-ink">{c.label}</span>
                <span className="ml-auto font-hand text-lg text-ink-faint">→</span>
              </motion.li>
            ))}
          </ul>
          <Doodle
            kind="spark"
            play={active}
            color="var(--color-sun)"
            className="absolute -right-3 -top-3 h-8 w-8"
            delay={0.7}
          />
        </motion.div>
        <motion.p variants={riseIn} className="mt-4 pl-1 font-hand text-xl text-ink-soft">
          keep scrolling to turn the page →
        </motion.p>
      </div>
    </motion.div>
  );
}
