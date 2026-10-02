"use client";

/* One scroll-reveal language for the whole site.

   Content arrives once, fast, and is finished before it reaches reading
   height: a reveal fires as the element's top crosses 88% of the viewport and
   lands in under a second, so nothing is still moving while it is being read.
   Every reveal shares the same distance, duration, easing and stagger — that
   consistency is most of what makes motion read as designed rather than
   accumulated.

   Only three things are tied continuously to scroll position, because they
   tell the story: the hero pulling back as the page rises over it, the work
   deck, and the journey line drawing itself. Those live in their own
   components. Everything here plays once. */

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/* Long expo-out. The pixel art moves in steps; the interface glides. */
export const GLIDE = [0.16, 1, 0.3, 1] as const;

/** Fire when the element's top is 12% up from the bottom edge of the screen. */
export const REVEAL_VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export const STAGGER = 0.08;
const DISTANCE = 32;
const DURATION = 0.9;

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: GLIDE, delay },
  }),
};

const DIRECTION_OFFSET = {
  up: { x: 0, y: DISTANCE },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
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
    transition: { duration: DURATION, ease: GLIDE },
  },
};

const popVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION * 0.85, ease: GLIDE },
  },
};

/** Fade and rise once, as it scrolls into view. */
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
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its RevealItem / PopItem children. */
export function RevealGroup({
  children,
  className,
  as = "div",
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  /** render as a semantic list when the children really are a list */
  as?: "div" | "ul";
  /** forwarded so a list can name itself for screen readers */
  "aria-label"?: string;
}) {
  const Tag = as === "ul" ? motion.ul : motion.div;
  return (
    <Tag
      aria-label={ariaLabel}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={REVEAL_VIEWPORT}
      transition={{ staggerChildren: STAGGER }}
    >
      {children}
    </Tag>
  );
}

/** Child of RevealGroup: glides in from a direction. */
export function RevealItem({
  children,
  className,
  direction = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: keyof typeof DIRECTION_OFFSET;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} custom={direction} variants={directionVariants}>
      {children}
    </Tag>
  );
}

/** Child of RevealGroup: a small lift and settle, for tiles, chips and dots. */
export function PopItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} variants={popVariants}>
      {children}
    </Tag>
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
      style={reduce ? undefined : { y, scale: 1.08, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

/** A vertical line that draws itself as the section scrolls past. */
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

/* Heading choreography: the eyebrow rules in, then each line of the title
   slides up out of its own clip, one after another. Lines, not words — words
   fading in individually read as a text effect; lines rising out of a mask
   read as typesetting. */
const headingVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.7, ease: GLIDE } },
};

const lineVariants: Variants = {
  hidden: { y: "108%" },
  shown: { y: "0%", transition: { duration: 1, ease: GLIDE } },
};

/** Render "*word*" as the ember accent. */
function Accented({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="text-sunset">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** Section heading block: mono eyebrow, then a masked line-by-line title.
    `title` uses "\n" for line breaks and *asterisks* for the accent word. */
export function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id?: string;
}) {
  const plain = title.replace(/\*/g, "").replace(/\n/g, " ");
  const lines = title.split("\n");
  return (
    <motion.div
      variants={headingVariants}
      initial="hidden"
      whileInView="shown"
      viewport={REVEAL_VIEWPORT}
    >
      <motion.p
        variants={eyebrowVariants}
        className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-ember-bright"
      >
        {eyebrow}
      </motion.p>
      <h2
        id={id}
        aria-label={plain}
        className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.12] font-semibold text-fog"
      >
        {lines.map((line, i) => (
          /* the clip: padded so descenders and the accent's hard shadow are
             not shaved off, with the padding taken back out of the layout */
          <span key={i} aria-hidden className="heading-line">
            <motion.span className="block" variants={lineVariants}>
              <Accented text={line} />
            </motion.span>
          </span>
        ))}
      </h2>
    </motion.div>
  );
}
