"use client";

import { motion } from "motion/react";
import { drawPath } from "@/lib/motion";

type DoodleKind =
  | "underline"
  | "circle"
  | "arrow"
  | "star"
  | "squiggle"
  | "bracket"
  | "spark";

const PATHS: Record<
  DoodleKind,
  { d: string; viewBox: string; fill?: boolean }
> = {
  underline: {
    viewBox: "0 0 120 16",
    d: "M3 9 C 28 14, 52 4, 78 9 S 112 12, 117 7",
  },
  circle: {
    viewBox: "0 0 160 70",
    d: "M82 6 C 30 2, 6 20, 10 38 C 14 58, 70 66, 110 60 C 150 54, 158 28, 138 14 C 120 2, 70 4, 40 12",
  },
  arrow: {
    viewBox: "0 0 120 60",
    d: "M6 14 C 40 8, 80 16, 104 44 M104 44 L 86 40 M104 44 L 100 24",
  },
  star: {
    viewBox: "0 0 48 48",
    d: "M24 4 L29 18 L44 18 L32 27 L37 42 L24 33 L11 42 L16 27 L4 18 L19 18 Z",
  },
  squiggle: {
    viewBox: "0 0 120 18",
    d: "M3 9 C 12 1, 20 1, 28 9 S 44 17, 52 9 S 68 1, 76 9 S 92 17, 100 9 S 113 4, 117 9",
  },
  bracket: {
    viewBox: "0 0 24 120",
    d: "M18 4 C 8 6, 8 18, 9 30 C 10 44, 4 56, 4 60 C 4 64, 10 76, 9 90 C 8 102, 8 114, 18 116",
  },
  spark: {
    viewBox: "0 0 40 40",
    d: "M20 3 L20 16 M20 24 L20 37 M3 20 L16 20 M24 20 L37 20 M9 9 L15 15 M25 25 L31 31 M31 9 L25 15 M15 25 L9 31",
  },
};

/**
 * A hand-drawn doodle that inks itself in via stroke-dashoffset (pathLength).
 * Set `play` true (e.g. when a spread becomes active or on hover) to draw it.
 */
export default function Doodle({
  kind,
  play = false,
  className = "",
  color = "var(--color-coral)",
  strokeWidth = 3,
  delay = 0,
  fill = false,
}: {
  kind: DoodleKind;
  play?: boolean;
  className?: string;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  fill?: boolean;
}) {
  const { d, viewBox } = PATHS[kind];

  return (
    <motion.svg
      viewBox={viewBox}
      fill="none"
      className={className}
      aria-hidden
      initial="hidden"
      animate={play ? "show" : "hidden"}
    >
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill ? color : "none"}
        variants={drawPath}
        transition={{ delay }}
        style={{ filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.04))" }}
      />
    </motion.svg>
  );
}

export type { DoodleKind };
