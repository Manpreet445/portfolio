"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePointerOffset } from "@/lib/motion";
import FloatingObject from "./FloatingObject";
import {
  Plant,
  Brush,
  BrushBlue,
  PaintTube,
  Pencil,
  Eraser,
  Paperclip,
  CoffeeRing,
  Roller,
} from "./art";
import Cover from "@/components/Sketchbook/Cover";
import ScrollCue from "@/components/ui/ScrollCue";
import { profile } from "@/data/projects";

/**
 * "The Desk" — a top-down flat-lay. Objects bob on their own loops and drift
 * opposite the cursor (2D parallax). On scroll they drift outward & fade while
 * the closed sketchbook rises from the bottom toward centre, handing off to
 * the pinned stage below.
 */
export default function HeroDesk() {
  const ref = useRef<HTMLElement>(null);
  const { mx, my } = usePointerOffset();
  const { scrollYProgress: leave } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bookY = useTransform(leave, [0, 1], ["0%", "-48%"]);
  const bookScale = useTransform(leave, [0, 1], [1, 1.05]);
  const textOpacity = useTransform(leave, [0, 0.45], [1, 0]);
  const textY = useTransform(leave, [0, 0.45], [0, -50]);
  const cueOpacity = useTransform(leave, [0, 0.25], [1, 0]);

  return (
    <section ref={ref} className="desk-surface relative h-dvh overflow-hidden">
      {/* ---------------- floating desk objects ---------------- */}
      <FloatingObject
        mx={mx} my={my} leave={leave}
        depth={42} bob={12} duration={7} sway={3}
        driftX={-200} driftY={-70}
        className="left-[6%] top-[12%] w-24 sm:w-28"
      >
        <Plant className="h-auto w-full" />
      </FloatingObject>

      <FloatingObject
        mx={mx} my={my} leave={leave}
        depth={58} bob={16} duration={8} delay={0.6} sway={4}
        driftX={220} driftY={-130}
        className="right-[9%] top-[8%] w-8 rotate-[18deg] sm:w-10"
      >
        <Brush className="h-auto w-full" />
      </FloatingObject>

      <FloatingObject
        mx={mx} my={my} leave={leave}
        depth={48} bob={13} duration={7.4} delay={1.1} sway={-3}
        driftX={250} driftY={60}
        className="right-[16%] top-[40%] hidden w-7 rotate-[-26deg] sm:block sm:w-9"
      >
        <BrushBlue className="h-auto w-full" />
      </FloatingObject>

      <FloatingObject
        mx={mx} my={my} leave={leave}
        depth={34} bob={11} duration={6.4} delay={0.3} sway={5}
        driftX={-240} driftY={40}
        className="left-[10%] top-[46%] w-14 -rotate-12 sm:w-16"
      >
        <PaintTube tone="var(--color-sun)" className="h-auto w-full" />
      </FloatingObject>

      <FloatingObject
        mx={mx} my={my} leave={leave}
        depth={38} bob={10} duration={6.8} delay={1.4} sway={-4}
        driftX={210} driftY={120}
        className="right-[7%] top-[58%] hidden w-14 rotate-[14deg] sm:block sm:w-16"
      >
        <PaintTube tone="var(--color-coral)" className="h-auto w-full" />
      </FloatingObject>

      <FloatingObject
        mx={mx} my={my} leave={leave}
        depth={26} bob={9} duration={6} delay={0.9} sway={6}
        driftX={120} driftY={-160}
        className="left-[42%] top-[7%] hidden w-40 rotate-[8deg] md:block"
      >
        <Pencil className="h-auto w-full" />
      </FloatingObject>

      <FloatingObject
        mx={mx} my={my} leave={leave}
        depth={30} bob={8} duration={5.6} delay={0.2} sway={-5}
        driftX={-180} driftY={150}
        className="left-[16%] top-[68%] hidden w-16 -rotate-6 sm:block"
      >
        <Eraser className="h-auto w-full" />
      </FloatingObject>

      <FloatingObject
        mx={mx} my={my} leave={leave}
        depth={20} bob={7} duration={5.2} delay={1.7} sway={8}
        driftX={90} driftY={140}
        className="left-[52%] top-[64%] hidden w-7 rotate-[24deg] md:block"
      >
        <Paperclip className="h-auto w-full" />
      </FloatingObject>

      <FloatingObject
        mx={mx} my={my} leave={leave}
        depth={44} bob={12} duration={7.8} delay={0.5} sway={-3}
        driftX={-150} driftY={-150}
        className="left-[30%] top-[20%] hidden w-24 -rotate-[18deg] lg:block"
      >
        <Roller className="h-auto w-full" />
      </FloatingObject>

      {/* faint coffee ring — barely drifts, sits on the desk */}
      <FloatingObject
        mx={mx} my={my} leave={leave}
        depth={10} bob={0} duration={9} sway={0}
        driftX={-60} driftY={-40}
        className="right-[26%] top-[24%] hidden w-24 md:block"
      >
        <CoffeeRing className="h-auto w-full" />
      </FloatingObject>

      {/* ---------------- hero title (a printed desk caption / sticky note) ---------------- */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="pointer-events-none absolute inset-x-0 top-[16%] z-20 flex flex-col items-center px-6 text-center sm:top-[20%]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.2 }}
          className="relative max-w-md rounded-[4px] bg-white px-8 py-6"
          style={{ boxShadow: "var(--shadow-float)" }}
        >
          <span className="washi absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 rounded-[2px] bg-sun/80 shadow-sm" />
          <p className="font-hand text-xl text-coral-deep">a portfolio, sketched —</p>
          <h1 className="mt-1 font-display text-5xl font-bold leading-[0.95] text-ink sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-2 font-display text-sm font-semibold uppercase tracking-[0.3em] text-ink-soft">
            {profile.role}
          </p>
          <p className="mx-auto mt-3 max-w-xs font-serif text-base italic leading-snug text-ink-soft">
            {profile.tagline}
          </p>
        </motion.div>
      </motion.div>

      {/* ---------------- peeking sketchbook (rises into the stage) ---------------- */}
      <motion.div
        style={{ y: bookY, scale: bookScale }}
        className="absolute left-1/2 top-[60%] z-10 w-[min(88vw,1040px)] -translate-x-1/2"
      >
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute -top-16 left-1/2 -translate-x-1/2"
        >
          <ScrollCue />
        </motion.div>
        <div className="aspect-[3/2] w-full">
          <Cover />
        </div>
      </motion.div>
    </section>
  );
}
