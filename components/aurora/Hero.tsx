"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { profile } from "@/data/projects";
import { riseVariants } from "@/components/aurora/Reveal";
import { Magnetic } from "@/components/aurora/Interactive";
import { ArrowDown, ArrowUpRight } from "@/components/aurora/icons";
import HeroPixelScene from "@/components/aurora/HeroPixelScene";
import ResumeLink from "@/components/aurora/ResumeLink";

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(900);
  useEffect(() => {
    const measure = () => setVh(window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const videoScale = useTransform(scrollY, [0, vh], [1, 1.06]);
  const dim = useTransform(scrollY, [0, vh * 0.92], [0, 0.6]);

  return (
    <section id="top" aria-label="Introduction" className="hero-shell overflow-clip">
      <motion.div aria-hidden className="fade-bottom absolute inset-0" style={reduce ? undefined : { scale: videoScale }}>
        <HeroPixelScene />
      </motion.div>
      <div aria-hidden className="hero-vignette pointer-events-none absolute inset-0" />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-abyss" style={reduce ? { opacity: 0 } : { opacity: dim }} />

      <div className="hero-stage relative z-10 mx-auto max-w-6xl px-6">
        <div className="hero-identity">
          <p className="px-shadow-sm font-display text-2xl font-semibold text-fog">{profile.fullName}</p>
          <p className="px-shadow-sm mt-2 text-sm font-semibold leading-relaxed text-ember-bright">
            {profile.role} · {profile.location}
          </p>
        </div>
        <motion.div initial={reduce ? false : "hidden"} animate="shown" transition={{ staggerChildren: 0.07 }} className="hero-copy">
          <motion.h1 variants={riseVariants} aria-label={profile.tagline} className="hero-heading px-shadow-strong font-display font-semibold text-fog">
            <span aria-hidden className="hero-overline">I build</span>
            <span aria-hidden className="block">web and mobile</span>
            <span aria-hidden className="hero-highlight block text-ember-bright">applications<span className="hero-period">.</span></span>
            <span aria-hidden className="hero-stack">with TypeScript, React, and Next.js.</span>
          </motion.h1>
          <motion.p variants={riseVariants} className="hero-summary px-shadow-sm">
            Recent SAIT Software Development graduate with experience in team-based development, cloud integrations, and automated testing.
          </motion.p>
          <motion.p variants={riseVariants} className="hero-availability px-shadow-sm">
            Available for full-time roles in Calgary and across Alberta.
          </motion.p>
        </motion.div>
        <div className="hero-actions">
          <Magnetic strength={0.15}>
            <a href="#work" className="btn-pixel action-link inline-flex min-h-12 items-center justify-center gap-2 bg-ember px-4 py-3 text-sm font-bold text-abyss">
              View projects <ArrowDown className="h-4 w-4" />
            </a>
          </Magnetic>
          <ResumeLink className="action-link" />
          <Magnetic strength={0.15}>
            <a href="#contact" className="btn-pixel action-link inline-flex min-h-12 items-center justify-center gap-2 bg-raised px-4 py-3 text-sm font-bold text-fog">
              Contact me <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
        </div>
        <a href="#work" className="hero-scroll action-link" aria-label="Explore selected work">
          <span className="scroll-track" aria-hidden><span /></span>
          <span>Scroll to explore</span>
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
