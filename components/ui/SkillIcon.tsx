"use client";

import { motion } from "motion/react";
import { drawPath } from "@/lib/motion";
import type { Skill } from "@/data/projects";

const ICONS: Record<Skill["icon"], string[]> = {
  code: ["M18 16 L8 24 L18 32", "M30 16 L40 24 L30 32", "M26 12 L22 36"],
  layout: ["M6 10 H42 V38 H6 Z", "M18 10 V38", "M18 22 H42"],
  spark: ["M24 6 V20 M24 28 V42 M6 24 H20 M28 24 H42", "M13 13 L18 18 M30 30 L35 35 M35 13 L30 18 M18 30 L13 35"],
  stack: ["M24 8 L42 17 L24 26 L6 17 Z", "M6 24 L24 33 L42 24", "M6 31 L24 40 L42 31"],
  pen: ["M14 34 L30 10 L38 16 L22 40 L12 42 Z", "M30 10 L38 16", "M16 30 L24 36"],
  bolt: ["M26 6 L12 28 H24 L20 42 L36 18 H24 Z"],
};

/** A line icon that inks itself in when its card becomes active / hovered. */
export default function SkillIcon({
  icon,
  play = false,
  className = "",
  color = "var(--color-coral)",
}: {
  icon: Skill["icon"];
  play?: boolean;
  className?: string;
  color?: string;
}) {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden
      initial="hidden"
      animate={play ? "show" : "hidden"}
    >
      {ICONS[icon].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={drawPath}
          transition={{ delay: i * 0.12 }}
        />
      ))}
    </motion.svg>
  );
}
