"use client";

import { motion } from "motion/react";
import { staggerContainer, riseIn } from "@/lib/motion";
import TapedPhoto from "@/components/ui/TapedPhoto";
import Tag from "@/components/ui/Tag";
import StatusBadge from "@/components/ui/StatusBadge";
import Doodle from "@/components/ui/Doodle";
import type { Project } from "@/data/projects";

/** A single project, laid out like a designer's notebook entry across a spread. */
export default function ProjectSpread({
  project,
  active,
  pageNumber,
}: {
  project: Project;
  active: boolean;
  pageNumber: number;
}) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate={active ? "show" : "hidden"}
      className="grid h-full w-full grid-cols-1 gap-4 p-6 sm:p-8 md:grid-cols-2 md:gap-8 md:p-12"
    >
      {/* LEFT PAGE — taped-in photos */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-[62%] max-w-[300px] sm:w-[78%] sm:max-w-[340px]">
          {project.images[0] && (
            <TapedPhoto image={project.images[0]} className="relative z-20" />
          )}
          {project.images[1] && (
            <TapedPhoto
              image={project.images[1]}
              tapeTone="bg-coral-soft/80"
              className="absolute -bottom-10 -right-6 z-10 hidden w-[62%] sm:-right-10 sm:block"
            />
          )}
          {/* doodle arrow pointing from notes toward the photo */}
          <Doodle
            kind="arrow"
            play={active}
            color="var(--color-coral)"
            className="absolute -left-10 top-2 hidden h-12 w-20 -scale-x-100 md:block"
            delay={0.5}
          />
        </div>
      </div>

      {/* RIGHT PAGE — annotations */}
      <div className="flex flex-col justify-center gap-3 md:pl-4">
        <motion.div variants={riseIn} className="flex items-center gap-3">
          <span className="font-hand text-2xl text-coral-deep">
            №{String(pageNumber).padStart(2, "0")}
          </span>
          <span className="font-display text-xs font-medium uppercase tracking-[0.25em] text-ink-faint">
            {project.year}
          </span>
        </motion.div>

        <motion.div variants={riseIn} className="relative w-fit">
          <h3 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {project.title}
          </h3>
          <Doodle
            kind="underline"
            play={active}
            color="var(--color-sun)"
            strokeWidth={4}
            className="absolute -bottom-2 left-0 h-3 w-full"
            delay={0.35}
          />
        </motion.div>

        <motion.p
          variants={riseIn}
          className="font-display text-sm font-medium uppercase tracking-wide text-ink-soft"
        >
          {project.role}
        </motion.p>

        <motion.p
          variants={riseIn}
          className="max-w-prose font-serif text-[1.05rem] leading-relaxed text-ink-soft"
        >
          {project.description}
        </motion.p>

        <motion.div variants={riseIn} className="mt-1 flex flex-wrap gap-2">
          {project.tags.map((t, i) => (
            <Tag key={t} label={t} index={i} />
          ))}
        </motion.div>

        <motion.div variants={riseIn} className="mt-3 flex items-center gap-4">
          <StatusBadge status={project.status} play={active} />
          {project.note && (
            <span className="font-hand text-xl text-ink-soft">
              <span className="text-coral">✎</span> {project.note}
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
