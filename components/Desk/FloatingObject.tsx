"use client";

import { type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

type FloatingObjectProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** parallax strength in px (drifts opposite the cursor) */
  depth?: number;
  /** vertical bob amplitude in px */
  bob?: number;
  /** bob loop length in seconds */
  duration?: number;
  delay?: number;
  /** gentle rotation sway in degrees */
  sway?: number;
  /** outward drift target when the hero scrolls away (px) */
  driftX?: number;
  driftY?: number;
  /** shared pointer offset + hero leave progress from the parent */
  mx?: MotionValue<number>;
  my?: MotionValue<number>;
  leave?: MotionValue<number>;
};

/**
 * A single floating desk object: ambient bob + mouse parallax, drifting
 * outward and fading as the hero eases toward the book.
 */
export default function FloatingObject({
  children,
  className = "",
  style,
  depth = 30,
  bob = 10,
  duration = 6,
  delay = 0,
  sway = 2,
  driftX = 0,
  driftY = 0,
  mx,
  my,
  leave,
}: FloatingObjectProps) {
  const reduce = useReducedMotion();

  // zero fallbacks keep hook order stable when props are absent
  const zero = useTransform(() => 0);
  const px = useTransform(mx ?? zero, (v) => v * -depth);
  const py = useTransform(my ?? zero, (v) => v * -depth);
  const lx = useTransform(leave ?? zero, [0, 1], [0, driftX]);
  const ly = useTransform(leave ?? zero, [0, 1], [0, driftY]);
  const x = useTransform([px, lx], ([a, b]: number[]) => a + b);
  const y = useTransform([py, ly], ([a, b]: number[]) => a + b);
  const opacity = useTransform(leave ?? zero, [0, 0.75], [1, 0]);

  if (reduce) {
    return (
      <div className={`absolute ${className}`} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div className={`absolute ${className}`} style={{ ...style, x, y, opacity }}>
      <motion.div
        animate={{ y: [0, -bob, 0], rotate: [-sway, sway, -sway] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
