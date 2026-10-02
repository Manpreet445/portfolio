"use client";

/* Block-level entrances for section content, on the shared reveal language.

   These used to be scrubbed to scroll position, with each column on its own
   lane — different start offsets, sideways drift, and up to 13 degrees of
   swing on the photos. Mid-scroll that meant ragged rows and content still
   travelling while it sat at reading height. Now each block plays once, lands
   in under a second, and stays put; columns stagger left to right so a row
   arrives as a row.

   The one continuous effect kept is depth on photographs (desktop only):
   images, not text, drifting a few pixels against the scroll. */

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useDesktopMotion } from "@/components/aurora/DesktopMotion";
import { GLIDE, REVEAL_VIEWPORT, STAGGER } from "@/components/aurora/Reveal";

type Variant = "rise" | "photo" | "panel";

const FROM: Record<Variant, (col: number) => Record<string, number>> = {
  rise: () => ({ opacity: 0, y: 32 }),
  /* a small settle into the polaroid's own resting tilt, not a swing */
  photo: (col) => ({ opacity: 0, y: 56, rotate: (col - 1) * 3 }),
  panel: () => ({ opacity: 0, y: 48, scale: 0.985 }),
};

export default function ScrollScene({
  children,
  index = 0,
  variant = "rise",
  className = "",
}: {
  children: ReactNode;
  index?: number;
  variant?: Variant;
  className?: string;
}) {
  const rich = useDesktopMotion();
  const col = index % 3;
  return (
    <motion.div
      className={`scroll-scene ${className}`}
      initial={FROM[variant](col)}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={REVEAL_VIEWPORT}
      transition={{
        duration: variant === "panel" ? 1 : 0.9,
        ease: GLIDE,
        delay: col * STAGGER,
      }}
    >
      {variant === "photo" && rich ? (
        <PhotoDepth index={index}>{children}</PhotoDepth>
      ) : (
        children
      )}
    </motion.div>
  );
}

/* Parallax on photographs. The measured element never moves — only its child
   does — so the transform cannot feed back into its own scroll progress. */
function PhotoDepth({ index, children }: { index: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* each print at its own depth, so the three separate as you pass them */
  const depth = [16, 26, 10][index % 3];
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  return (
    <div ref={ref} className="h-full">
      <motion.div className="h-full" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
