"use client";

/* Chapter 1 — arrival. A diagonal editorial split: identity + statement
   anchored top-left (where the eye enters), the call to action bottom-right
   (where it exits). The subject and the window/moon breathe through the open
   diagonal between them. Pinned while the content curtain slides over it. */

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { profile } from "@/data/projects";
import { riseVariants } from "@/components/aurora/Reveal";
import { Magnetic } from "@/components/aurora/Interactive";
import { ArrowDown } from "@/components/aurora/icons";
import HeroPixelScene from "@/components/aurora/HeroPixelScene";

const CORE_STACK = [
  "TypeScript",
  "Next.js",
  "React Native",
  "Supabase",
  "Firebase",
];

export default function Hero() {
  const reduce = useReducedMotion();
  /* The hero is `sticky` directly in <main>, so it stays pinned to the
     viewport while the opaque content curtain slides up and over it. These
     effects play over the first viewport of scroll — the curtain's travel. */
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(900);
  useEffect(() => {
    const measure = () => setVh(window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const videoScale = useTransform(scrollY, [0, vh], [1, 1.09], { clamp: true });
  const dim = useTransform(scrollY, [0, vh * 0.92], [0, 0.6], { clamp: true });
  const textOpacity = useTransform(scrollY, [0, vh * 0.5], [1, 0], {
    clamp: true,
  });
  /* on scroll the two clusters drift apart along the diagonal */
  const tlY = useTransform(scrollY, [0, vh * 0.6], [0, -80], { clamp: true });
  const tlX = useTransform(scrollY, [0, vh * 0.6], [0, -24], { clamp: true });
  const brY = useTransform(scrollY, [0, vh * 0.6], [0, 70], { clamp: true });
  const brX = useTransform(scrollY, [0, vh * 0.6], [0, 24], { clamp: true });

  return (
    <section
      id="top"
      aria-label="Intro"
      className={`${
        reduce ? "relative" : "sticky top-0"
      } h-dvh overflow-hidden`}
    >
      {/* the scene */}
      <motion.div
        aria-hidden
        className="fade-bottom absolute inset-0"
        style={
          reduce ? undefined : { scale: videoScale, willChange: "transform" }
        }
      >
        <HeroPixelScene />
      </motion.div>

      {/* diagonal vignette — darkens only the top-left and bottom-right
          corners where the two text clusters sit; the subject and the
          window/moon between them stay luminous. Not a box: fades to nothing */}
      <div
        aria-hidden
        className="hero-vignette pointer-events-none absolute inset-0"
      />

      {/* darkens only as you scroll away */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-abyss"
        style={reduce ? { opacity: 0 } : { opacity: dim }}
      />

      {/* content stage: split top-left / bottom-right on desktop, stacked on
          mobile */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-6 py-24 md:block md:py-0">
        {/* TOP-LEFT — a light identity mark */}
        <motion.div
          style={reduce ? undefined : { x: tlX, y: tlY, opacity: textOpacity }}
          initial="hidden"
          animate="shown"
          transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
          className="max-w-xs md:absolute md:top-28 md:left-6"
        >
          <motion.p
            variants={riseVariants}
            className="px-shadow-sm font-mono text-base uppercase tracking-[0.18em] text-ember-bright"
          >
            {profile.role}
          </motion.p>
          <motion.p
            variants={riseVariants}
            className="px-shadow-sm mt-2 font-mono text-sm uppercase tracking-[0.14em] text-mist"
          >
            {profile.location}
          </motion.p>
        </motion.div>

        {/* BOTTOM-RIGHT — statement + the ask (the heavy anchor) */}
        <motion.div
          style={reduce ? undefined : { x: brX, y: brY, opacity: textOpacity }}
          initial="hidden"
          animate="shown"
          transition={{ staggerChildren: 0.08, delayChildren: 0.35 }}
          className="flex max-w-2xl flex-col items-start gap-5 md:absolute md:right-6 md:bottom-14 md:items-end md:text-right"
        >
          <motion.h1
            variants={riseVariants}
            className="px-shadow-strong font-display text-[clamp(1.6rem,4.4vw,3.4rem)] leading-[1.06] font-semibold text-fog"
          >
            I build web and mobile apps
            <br className="hidden md:block" />
            that <span className="text-ember-bright">ship</span> — and hold up.
          </motion.h1>

          <motion.p
            variants={riseVariants}
            className="px-shadow-sm max-w-md text-[15px] leading-relaxed text-fog/90"
          >
            End to end — from the first sketch to the production deploy.
          </motion.p>

          <motion.div
            variants={riseVariants}
            className="flex flex-wrap gap-3 md:justify-end"
          >
            <Magnetic>
              <a
                href="#work"
                className="btn-pixel bg-ember px-5 py-3 text-sm font-bold text-abyss"
              >
                View selected work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="btn-pixel bg-raised px-5 py-3 text-sm font-bold text-fog"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={riseVariants}
            className="flex flex-col gap-1.5 md:items-end"
          >
            {/* location lives in the top-left mark — no need to repeat it */}
            <p className="px-shadow-sm font-mono text-sm tracking-[0.1em] text-dust">
              {CORE_STACK.join("  ·  ")}
            </p>
          </motion.div>
        </motion.div>

        {/* BOTTOM-LEFT accent — scroll cue, fills the open corner (desktop) */}
        <motion.a
          href="#work"
          aria-label="Scroll to selected work"
          style={reduce ? undefined : { opacity: textOpacity }}
          className="px-shadow-sm hidden items-center gap-2 font-mono text-sm uppercase tracking-[0.14em] text-dust transition-colors duration-200 hover:text-ember-bright md:absolute md:bottom-14 md:left-6 md:flex"
        >
          Scroll
          <ArrowDown className="h-4 w-4 motion-safe:animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
