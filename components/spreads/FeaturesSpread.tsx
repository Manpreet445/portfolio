"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { staggerContainer, riseIn } from "@/lib/motion";
import SkillIcon from "@/components/ui/SkillIcon";
import Doodle from "@/components/ui/Doodle";
import { skills } from "@/data/projects";

const ICON_TONES = [
  "var(--color-coral)",
  "var(--color-sky)",
  "var(--color-leaf)",
  "var(--color-tangerine)",
  "var(--color-coral-deep)",
  "var(--color-sun)",
];

/** "More" spread — skills/services as illustrated notebook cards with self-drawing icons. */
export default function FeaturesSpread({ active }: { active: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      variants={staggerContainer(0.07)}
      initial="hidden"
      animate={active ? "show" : "hidden"}
      className="flex h-full w-full flex-col justify-center gap-5 p-6 sm:p-8 md:p-12"
    >
      <motion.header variants={riseIn} className="relative">
        <span className="font-hand text-2xl text-coral-deep">a few things I do —</span>
        <h2 className="relative mt-1 w-fit font-display text-3xl font-bold text-ink sm:text-4xl">
          What I bring to the page
          <Doodle
            kind="squiggle"
            play={active}
            color="var(--color-coral)"
            strokeWidth={3}
            className="absolute -bottom-3 left-0 h-3 w-2/3"
            delay={0.4}
          />
        </h2>
      </motion.header>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
        {skills.map((skill, i) => {
          const playIcon = active && (hovered === null || hovered === i);
          return (
            <motion.article
              key={skill.label}
              variants={riseIn}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ y: -4, rotate: i % 2 ? 0.8 : -0.8 }}
              className="rounded-xl border border-ink/5 bg-white/55 p-4 shadow-sm backdrop-blur-[1px] transition-shadow hover:shadow-md"
            >
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-coral-wash/70">
                <SkillIcon
                  icon={skill.icon}
                  play={playIcon}
                  color={ICON_TONES[i % ICON_TONES.length]}
                  className="h-7 w-7"
                />
              </div>
              <h3 className="font-display text-base font-semibold text-ink">{skill.label}</h3>
              <p className="mt-1 font-serif text-sm leading-snug text-ink-soft">{skill.blurb}</p>
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
}
