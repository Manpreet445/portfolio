"use client";

import { motion } from "motion/react";
import { stampIn } from "@/lib/motion";
import { statusMeta, type ProjectStatus } from "@/data/projects";

/**
 * Inked rubber-stamp / washi-label status badge.
 *  - concept        → dotted, faded ink outline
 *  - in-production  → bright in-progress stamp
 *  - completed      → bold stamp with a checkmark
 */
export default function StatusBadge({
  status,
  play = true,
  rotate = -4,
  className = "",
}: {
  status: ProjectStatus;
  play?: boolean;
  rotate?: number;
  className?: string;
}) {
  const meta = statusMeta[status];
  const dotted = status === "concept";

  return (
    <motion.span
      variants={stampIn(rotate)}
      initial="hidden"
      animate={play ? "show" : "hidden"}
      whileHover={{ rotate: rotate + 3, scale: 1.05 }}
      className={`stamp inline-flex select-none items-center gap-1.5 rounded-md border-2 px-2.5 py-1 text-[11px] leading-none ${meta.tone} ${meta.ring} ${meta.fill} ${
        dotted ? "border-dashed opacity-70" : "border-solid"
      } ${className}`}
      style={{ rotate }}
    >
      {status === "completed" && (
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M2 7.5 L5.5 11 L12 3"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {status === "in-production" && (
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
      )}
      {meta.label}
    </motion.span>
  );
}
