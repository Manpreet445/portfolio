"use client";

/* Shared scroll-reveal primitives. One rhythm everywhere: a long expo-out
   glide. The stepped, sprite-frame feel belongs to the pixel art itself
   (starfield, steam, the hero video) — not to interface motion. */

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/* Motion split: PIXEL ART animates in steps (the sprite weather, the video),
   but UI animates smoothly. Stepping a 40px card travel just reads as jank,
   so interface motion uses a long expo-out glide instead. */
export const GLIDE = [0.16, 1, 0.3, 1] as const;

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: GLIDE, delay },
  }),
};

const DIRECTION_OFFSET = {
  up: { x: 0, y: 24 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
} as const;

const directionVariants: Variants = {
  hidden: (dir: keyof typeof DIRECTION_OFFSET = "up") => ({
    opacity: 0,
    ...DIRECTION_OFFSET[dir],
  }),
  shown: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: GLIDE },
  },
};

const popVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: GLIDE },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.45em" },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: GLIDE },
  },
};

/** Fade + rise once, when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={riseVariants}
      initial="hidden"
      whileInView="shown"
      custom={delay}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its Reveal/Pop children by 70ms. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.07 }}
    >
      {children}
    </motion.div>
  );
}

/** Child of RevealGroup: glides in from a direction. */
export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: keyof typeof DIRECTION_OFFSET;
}) {
  return (
    <motion.div className={className} custom={direction} variants={directionVariants}>
      {children}
    </motion.div>
  );
}

/** Child of RevealGroup: soft scale pop, for tiles/chips/dots. */
export function PopItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={popVariants}>
      {children}
    </motion.div>
  );
}

/** Scroll-linked vertical drift for imagery inside overflow-hidden cards.
    Slightly scaled up so the travel never exposes gaps. */
export function ParallaxDrift({
  children,
  className,
  amount = 12,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        reduce ? undefined : { y, scale: 1.08, willChange: "transform" }
      }
    >
      {children}
    </motion.div>
  );
}

/** A vertical line that draws itself as the section scrolls into view. */
export function GrowLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={className}
      style={reduce ? undefined : { scaleY: scrollYProgress, transformOrigin: "top" }}
    />
  );
}

/** Display title whose words rise one by one.
    `text` format: "\n" breaks lines; words wrapped in *asterisks* get the
    sunset gradient — e.g. "Calm process,\n*sharp* output." */
export function WordRise({
  text,
  className,
  id,
}: {
  text: string;
  className?: string;
  id?: string;
}) {
  /* words are separate spans with margin gaps and no whitespace between
     them, so expose the real sentence to assistive tech and hide the spans */
  const plain = text.replace(/\*/g, "").replace(/\n/g, " ");

  return (
    <motion.h2
      id={id}
      aria-label={plain}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.07 }}
    >
      {text.split("\n").map((line, li) => (
        <span key={li} aria-hidden className="block">
          {line.split(" ").map((word, wi) => {
            const sunset = word.startsWith("*") && word.endsWith("*");
            const clean = sunset ? word.slice(1, -1) : word;
            return (
              <motion.span
                key={wi}
                variants={wordVariants}
                className={`mr-[0.26em] inline-block ${sunset ? "text-sunset" : ""}`}
              >
                {clean}
              </motion.span>
            );
          })}
        </span>
      ))}
    </motion.h2>
  );
}

/** Section heading block: mono eyebrow + word-by-word display title. */
export function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id?: string;
}) {
  return (
    <div>
      <Reveal>
        <p className="font-mono text-base uppercase tracking-[0.18em] text-ember-bright">
          {eyebrow}
        </p>
      </Reveal>
      <WordRise
        id={id}
        text={title}
        className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.12] font-semibold text-fog"
      />
    </div>
  );
}
