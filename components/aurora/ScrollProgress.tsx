"use client";

/* A thin ember bar along the very top edge tracking page scroll — the
   pixel-game "progress" read. Hidden under reduced motion (it is purely
   decorative feedback). */

import { motion, useReducedMotion, useScroll } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-ember shadow-[0_1px_0_var(--color-ink)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
