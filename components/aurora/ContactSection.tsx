"use client";

/* Chapter 5 — the ask. The panel lands with one stepped overshoot, then
   the cat settles in on top of it. */

import { motion } from "motion/react";
import { profile } from "@/data/projects";
import { GLIDE, PopItem, RevealGroup } from "@/components/aurora/Reveal";
import { Magnetic } from "@/components/aurora/Interactive";
import { ArrowUpRight, GitHub, LinkedIn, Mail } from "@/components/aurora/icons";
import ResumeLink from "@/components/aurora/ResumeLink";
import { PixelCat } from "@/components/aurora/PixelArt";

const SOCIAL_ICON: Record<string, typeof GitHub> = {
  GitHub: GitHub,
  LinkedIn: LinkedIn,
  Email: Mail,
};

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-10 md:pt-32">
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* the cat arrives after the panel has landed */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              shown: {
                opacity: 1,
                transition: { duration: 0.45, ease: GLIDE, delay: 0.5 },
              },
            }}
            className="absolute -top-[38px] right-10 z-10 md:right-16"
          >
            <PixelCat />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              shown: {
                opacity: 1,
                y: [40, -6, 0],
                transition: { duration: 0.75, ease: GLIDE, times: [0, 0.7, 1] },
              },
            }}
            className="panel relative overflow-hidden p-5 text-center sm:p-8 md:p-16"
          >
            {/* Was a blurred radial lamp glow. Replaced with a flat ember
                band pinned to the top edge — the light still reads as coming
                from above, but with a hard edge and no blur. */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] bg-ember opacity-40"
            />

            <p className="relative font-mono text-base uppercase tracking-[0.18em] text-ember-bright">
              06 · Contact
            </p>
            <h2
              id="contact-title"
              className="relative mx-auto mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] font-semibold text-fog"
            >
              Let&apos;s build something{" "}
              <span className="text-sunset">solid</span> together.
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-mist">
              Open to full-time junior software developer roles in Calgary and across Alberta.{" "}
              {profile.locationProse}.
            </p>

            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.4}>
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-pixel inline-flex min-h-11 max-w-full items-center justify-center gap-2 bg-ember px-3 py-3 text-sm font-bold text-abyss sm:px-6 sm:text-base"
                >
                  <span className="break-all">{profile.email}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <ResumeLink />
            </div>

            <RevealGroup className="relative mt-10 flex items-center justify-center gap-4">
              {profile.socials.map((social) => {
                const Icon = SOCIAL_ICON[social.label] ?? ArrowUpRight;
                return (
                  <PopItem key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="btn-pixel flex h-12 w-12 items-center justify-center bg-raised text-mist hover:text-fog active:text-ember-bright"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </PopItem>
                );
              })}
            </RevealGroup>
          </motion.div>
        </motion.div>

        <footer className="flex flex-col items-center justify-between gap-2 py-10 text-sm text-dust sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.fullName}. All rights
            reserved.
          </p>
          <p className="font-mono text-base">Next.js · Tailwind · Motion</p>
        </footer>
      </div>
    </section>
  );
}
