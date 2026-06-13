"use client";

import { MotionConfig } from "motion/react";
import { type ReactNode } from "react";

/** Global motion settings — honour the OS "reduce motion" setting everywhere. */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 140, damping: 16 }}>
      {children}
    </MotionConfig>
  );
}
