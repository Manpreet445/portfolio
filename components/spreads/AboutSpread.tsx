"use client";

import { motion } from "motion/react";
import { staggerContainer, riseIn } from "@/lib/motion";
import Doodle from "@/components/ui/Doodle";
import { WcSplash } from "@/components/Desk/WatercolorShapes";
import { profile } from "@/data/projects";

const FACTS = [
  { k: "based", v: "remote · worldwide" },
  { k: "doing", v: "design + full-stack" },
  { k: "fuel", v: "coffee & watercolours" },
  { k: "status", v: "open to work" },
];

const BIO = [
  "I'm a software developer who likes to own the whole picture — from the first messy sketch to the deployed, polished thing.",
  "I care a lot about how software feels: the motion, the texture, the little moments of delight. This sketchbook is exactly that, turned into a portfolio.",
];

/** The opening "about me" leaf of the notebook. */
export default function AboutSpread({ active }: { active: boolean }) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate={active ? "show" : "hidden"}
      className="grid h-full w-full grid-cols-1 gap-5 p-6 sm:p-8 md:grid-cols-[0.85fr_1fr] md:gap-10 md:p-12"
    >
      {/* portrait + facts */}
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <motion.div variants={riseIn} className="relative">
          <WcSplash className="h-40 w-40 sm:h-48 sm:w-48" />
          <span className="absolute inset-0 flex items-center justify-center font-display text-6xl font-bold text-white/90">
            {profile.name.charAt(0)}
          </span>
          <Doodle
            kind="spark"
            play={active}
            color="var(--color-sun)"
            className="absolute -right-2 -top-2 h-8 w-8"
            delay={0.6}
          />
        </motion.div>
        <motion.span variants={riseIn} className="font-hand text-2xl text-coral-deep">
          {profile.name} — {profile.role.toLowerCase()}
        </motion.span>
        <motion.ul variants={riseIn} className="grid grid-cols-2 gap-2 text-left">
          {FACTS.map((f) => (
            <li key={f.k} className="rounded-lg border border-ink/5 bg-white/55 px-3 py-2">
              <span className="block font-display text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint">
                {f.k}
              </span>
              <span className="font-display text-sm font-semibold text-ink">{f.v}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* bio */}
      <div className="flex flex-col justify-center gap-3">
        <motion.div variants={riseIn} className="relative w-fit">
          <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">About me</h2>
          <Doodle
            kind="underline"
            play={active}
            color="var(--color-coral)"
            strokeWidth={5}
            className="absolute -bottom-3 left-0 h-4 w-full"
            delay={0.4}
          />
        </motion.div>
        {BIO.map((p, i) => (
          <motion.p
            key={i}
            variants={riseIn}
            className="max-w-prose font-serif text-[1.08rem] leading-relaxed text-ink-soft"
          >
            {p}
          </motion.p>
        ))}
        <motion.p variants={riseIn} className="mt-2 font-hand text-2xl text-ink-soft">
          turn the page to see what I do →
        </motion.p>
      </div>
    </motion.div>
  );
}
