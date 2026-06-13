"use client";

import { motion } from "motion/react";
import { staggerContainer, riseIn, stampIn } from "@/lib/motion";
import StatusBadge from "@/components/ui/StatusBadge";
import Doodle from "@/components/ui/Doodle";
import { milestones } from "@/data/projects";

const DOT_FILL: Record<string, string> = {
  completed: "bg-leaf border-leaf",
  "in-production": "bg-tangerine border-tangerine",
  concept: "bg-cream border-ink-faint border-dashed",
};

/** A hand-drawn roadmap: an inked spine that draws itself + status-stamped milestones. */
export default function RoadmapSpread({ active }: { active: boolean }) {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      animate={active ? "show" : "hidden"}
      className="flex h-full w-full flex-col justify-center gap-5 p-6 sm:p-8 md:p-12"
    >
      <motion.header variants={riseIn} className="relative">
        <span className="font-hand text-2xl text-coral-deep">the road so far &amp; ahead —</span>
        <h2 className="relative mt-1 w-fit font-display text-3xl font-bold text-ink sm:text-4xl">
          Roadmap
          <Doodle
            kind="star"
            play={active}
            color="var(--color-sun)"
            fill
            strokeWidth={2}
            className="absolute -right-9 -top-3 h-7 w-7"
            delay={0.5}
          />
        </h2>
      </motion.header>

      <div className="relative">
        {/* self-drawing inked spine */}
        <svg
          className="pointer-events-none absolute left-0 top-0 h-full w-10"
          viewBox="0 0 40 1000"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <motion.path
            d="M20 16 C 30 120, 12 200, 20 296 C 30 400, 12 500, 20 596 C 30 700, 12 800, 20 896 C 24 940, 20 970, 20 990"
            stroke="var(--color-ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="0.5 0"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ opacity: 0.55 }}
          />
        </svg>

        <ol className="space-y-4 sm:space-y-5">
          {milestones.map((m, i) => (
            <li key={m.title} className="relative flex items-start gap-4 sm:gap-6">
              {/* node on the spine */}
              <div className="relative z-10 flex w-10 shrink-0 justify-center pt-1.5">
                <motion.span
                  variants={stampIn(0)}
                  className={`block h-4 w-4 rounded-full border-2 shadow-sm ${DOT_FILL[m.status]}`}
                />
              </div>

              {/* milestone card */}
              <motion.div
                variants={riseIn}
                whileHover={{ x: 3 }}
                className="flex flex-1 flex-col gap-1 rounded-xl border border-ink/5 bg-white/55 p-3.5 shadow-sm backdrop-blur-[1px] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-display text-lg font-semibold text-ink">{m.title}</h3>
                    <span className="font-hand text-lg text-ink-faint">{m.year}</span>
                  </div>
                  <p className="font-serif text-sm leading-snug text-ink-soft">{m.note}</p>
                </div>
                <div className="shrink-0">
                  <StatusBadge
                    status={m.status}
                    play={active}
                    rotate={i % 2 ? 3 : -3}
                  />
                </div>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>

      <motion.p variants={riseIn} className="pl-10 font-hand text-xl text-ink-soft">
        …more pages to fill. <span aria-hidden>↪</span>
      </motion.p>
    </motion.div>
  );
}
