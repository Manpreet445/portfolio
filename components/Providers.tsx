"use client";

import { MotionConfig } from "motion/react";
import { type ReactNode } from "react";

/** Global motion settings — honour the OS "reduce motion" setting everywhere. */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
