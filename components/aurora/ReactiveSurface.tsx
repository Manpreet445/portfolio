"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

/** Pointer position stays in motion values, outside React's render cycle.
    The card used to carry a soft radial light that tracked the cursor; that
    glow is gone, so nothing needs the pointer's position any more — only the
    tilt, which needs the ratio within the card, not a pixel offset. */
export default function ReactiveSurface({ children, className = "" }: {
  children: ReactNode; className?: string;
}) {
  const reduce = useReducedMotion();
  const bounds = useRef<DOMRect | null>(null);
  const rotateX = useSpring(0, { stiffness: 240, damping: 28 });
  const rotateY = useSpring(0, { stiffness: 240, damping: 28 });
  const enter = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    bounds.current = e.currentTarget.getBoundingClientRect();
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = bounds.current;
    if (reduce || e.pointerType !== "mouse" || !r) return;
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    rotateX.set((0.5 - py / r.height) * 2);
    rotateY.set((px / r.width - 0.5) * 2);
  };
  const reset = () => {
    bounds.current = null;
    rotateX.set(0);
    rotateY.set(0);
  };
  return (
    <motion.div
      onPointerEnter={enter} onPointerMove={move}
      onPointerLeave={reset} onPointerCancel={reset}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      className={`reactive-surface ${className}`}
    >
      {children}
      <span aria-hidden className="surface-corner" />
    </motion.div>
  );
}
