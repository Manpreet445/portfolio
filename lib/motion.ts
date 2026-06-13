"use client";

import { useEffect } from "react";
import {
  useMotionValue,
  useSpring,
  type Variants,
  type MotionValue,
} from "motion/react";

/* Soft, organic springs with a little overshoot — physical, never robotic. */
export const springSoft = {
  type: "spring",
  stiffness: 140,
  damping: 13,
  mass: 0.7,
} as const;

export const springGentle = {
  type: "spring",
  stiffness: 90,
  damping: 18,
  mass: 0.9,
} as const;

export const springSnappy = {
  type: "spring",
  stiffness: 320,
  damping: 22,
  mass: 0.6,
} as const;

/* Staggered content reveal — used when a spread becomes active. */
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0.05,
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/* A single item that rises + fades in. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
};

/* A taped photo that lifts in with a touch of rotation. */
export const tapeIn = (rotate = 0): Variants => ({
  hidden: { opacity: 0, y: 28, rotate: rotate * 1.6, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    rotate,
    scale: 1,
    transition: springSoft,
  },
});

/* Stamp / badge pop-in with overshoot. */
export const stampIn = (rotate = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.4, rotate: rotate - 12 },
  show: {
    opacity: 1,
    scale: 1,
    rotate,
    transition: { ...springSoft, stiffness: 220, damping: 11 },
  },
});

/* SVG line-draw (Framer Motion drives pathLength). */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.9, ease: "easeInOut" }, opacity: { duration: 0.15 } },
  },
};

/**
 * Pointer offset from the viewport centre, springed, in roughly [-0.5, 0.5].
 * Mount this once high in the tree and feed the values to FloatingObject so
 * only a single listener runs. Returns zero motion values on touch devices.
 */
export function usePointerOffset(): {
  mx: MotionValue<number>;
  my: MotionValue<number>;
} {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY]);

  return { mx, my };
}
