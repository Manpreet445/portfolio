"use client";

import { motion } from "motion/react";
import { riseIn } from "@/lib/motion";

const TONES = [
  "bg-coral-wash text-coral-deep",
  "bg-sun/25 text-ink",
  "bg-sky/15 text-sky",
  "bg-leaf/15 text-leaf",
];

/** An inked label / washi-tape chip for a tool or tech. */
export default function Tag({ label, index = 0 }: { label: string; index?: number }) {
  const tone = TONES[index % TONES.length];
  const tilt = (index % 2 === 0 ? 1 : -1) * (1 + (index % 3));

  return (
    <motion.span
      variants={riseIn}
      whileHover={{ y: -2, rotate: 0 }}
      style={{ rotate: tilt }}
      className={`washi inline-block rounded-[5px] px-2.5 py-1 font-display text-xs font-medium shadow-sm ${tone}`}
    >
      {label}
    </motion.span>
  );
}
