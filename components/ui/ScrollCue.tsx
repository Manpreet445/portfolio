"use client";

import { motion } from "motion/react";

/** Small animated "scroll to open" cue that sits near the peeking book. */
export default function ScrollCue({ label = "scroll to open" }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="pointer-events-none flex flex-col items-center gap-1.5"
    >
      <span className="font-hand text-lg text-ink-soft">{label}</span>
      <motion.svg
        width="22"
        height="34"
        viewBox="0 0 22 34"
        fill="none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <rect x="1.5" y="1.5" width="19" height="31" rx="9.5" stroke="var(--color-ink-faint)" strokeWidth="2" />
        <motion.circle
          cx="11"
          cy="9"
          r="3"
          fill="var(--color-coral)"
          animate={{ cy: [9, 18, 9], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}
