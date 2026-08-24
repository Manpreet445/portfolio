"use client";

/* Pointer-reactive micro-interactions — the tactile layer. All spring-driven
   and reduced-motion aware, so they add fluidity without ever blocking input. */

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const SPRING = { stiffness: 220, damping: 18, mass: 0.5 };

/** Wrap a CTA so it eases toward the cursor while hovered, then springs back. */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { x, y }}
      className={`inline-flex ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/** Wrap a card so it tilts subtly toward the cursor (gentle, pixel-friendly). */
export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), SPRING);
  const ry = useSpring(useMotionValue(0), SPRING);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * max * 2);
    ry.set(px * max * 2);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={
        reduce
          ? undefined
          : { rotateX: rx, rotateY: ry, transformPerspective: 900 }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
