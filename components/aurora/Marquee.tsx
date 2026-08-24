"use client";

/* Mono ticker at the top of the curtain. Drifts left on its own; scrolling
   fast makes it hustle. Its per-frame loop only runs while on screen. */

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  useVelocity,
} from "motion/react";

const ITEMS = [
  "Ships to production",
  "End to end",
  "TypeScript",
  "React",
  "Next.js",
  "Node",
  "PostgreSQL",
  "Motion design",
];

function Row() {
  return (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-8">
          {item}
          <span aria-hidden className="text-ember-bright">
            ·
          </span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useRef(true);
  const x = useMotionValue(0); // percentage of half the track
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const xPercent = useTransform(x, (v) => `${v}%`);

  /* Only run the ticker's per-frame work while it's actually on screen. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!inView.current || reduce) return;
    const boost = Math.min(Math.abs(velocity.get()) * 0.004, 10);
    let next = x.get() - ((2.4 + boost) * delta) / 1000;
    if (next <= -50) next += 50;
    x.set(next);
  });

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="overflow-hidden border-y-2 border-ink bg-abyss/60 py-3"
    >
      {reduce ? (
        <div className="flex w-max gap-8 font-mono text-sm tracking-[0.18em] whitespace-nowrap text-dust uppercase">
          <Row />
        </div>
      ) : (
        <motion.div
          className="flex w-max gap-8 font-mono text-sm tracking-[0.18em] whitespace-nowrap text-dust uppercase"
          style={{ x: xPercent }}
        >
          <Row />
          <Row />
        </motion.div>
      )}
    </div>
  );
}
