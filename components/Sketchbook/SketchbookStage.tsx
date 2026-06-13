"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Cover from "./Cover";
import Page from "./Page";
import IntroSpread from "@/components/spreads/IntroSpread";
import ProjectSpread from "@/components/spreads/ProjectSpread";
import FeaturesSpread from "@/components/spreads/FeaturesSpread";
import RoadmapSpread from "@/components/spreads/RoadmapSpread";
import { projects } from "@/data/projects";

type Spread = { key: string; render: (active: boolean) => ReactNode };

const spreads: Spread[] = [
  { key: "intro", render: (a) => <IntroSpread active={a} /> },
  ...projects.map((p, i) => ({
    key: p.slug,
    render: (a: boolean) => <ProjectSpread project={p} active={a} pageNumber={i + 1} />,
  })),
  { key: "features", render: (a) => <FeaturesSpread active={a} /> },
  { key: "roadmap", render: (a) => <RoadmapSpread active={a} /> },
];

const N = spreads.length;

const bookSize =
  "relative w-[min(94vw,1060px)] aspect-[4/5] max-h-[90vh] sm:aspect-[3/2] sm:max-h-[80vh]";

export default function SketchbookStage() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cover = coverRef.current!;
      const elastic = cover.querySelector<HTMLElement>("[data-elastic]");

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pinRef.current!,
          start: "top top",
          end: () => "+=" + window.innerHeight * N * 0.92,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / N,
            duration: { min: 0.15, max: 0.5 },
            delay: 0.05,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const phase = self.progress * N;
            const idx = Math.min(N - 1, Math.max(0, Math.round(phase) - 1));
            setActiveIndex((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      // STEP 0 — cover lifts away in 2D (elastic slips off first), shadow trailing
      if (elastic) {
        tl.to(elastic, { xPercent: 160, rotate: 10, opacity: 0, duration: 0.32, ease: "power2.in" }, 0);
      }
      tl.to(
        cover,
        {
          keyframes: {
            "0%": { yPercent: 0, scale: 1 },
            "20%": { yPercent: -4, scale: 1.04 },
            "100%": { yPercent: -124, scale: 1.06 },
          },
          duration: 0.9,
          ease: "power2.in",
        },
        0.06,
      );
      tl.to(cover, { opacity: 0, duration: 0.22 }, 0.8);

      // STEPS 1..N-1 — each top sheet turns out (lift + slide + fade), revealing the next
      pageRefs.current.forEach((el, i) => {
        if (!el || i >= N - 1) return;
        const pos = i + 1;
        tl.to(
          el,
          {
            keyframes: {
              "0%": { yPercent: 0, xPercent: 0, rotate: 0, scale: 1, opacity: 1 },
              "22%": { yPercent: -3, scale: 1.03 },
              "100%": { yPercent: -2, xPercent: -114, rotate: -5, scale: 1, opacity: 0 },
            },
            duration: 0.9,
          },
          pos,
        );

        // swelling shadow cast onto the sheet beneath as this one lifts
        const below = pageRefs.current[i + 1];
        const shadow = below?.querySelector<HTMLElement>(".lift-shadow");
        if (shadow) {
          tl.to(shadow, { keyframes: { opacity: [0, 0.65, 0] }, duration: 0.9, ease: "power1.inOut" }, pos);
        }
      });

      ScrollTrigger.refresh();
      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* ----------------------- reduced-motion fallback ----------------------- */
  if (reduced) {
    return (
      <section className="desk-surface px-4 py-16 sm:px-8">
        <div className="mx-auto mb-16 h-[60vh] w-[min(92vw,720px)]">
          <Cover />
        </div>
        <div className="mx-auto flex w-[min(94vw,1060px)] flex-col gap-16">
          {spreads.map((s) => (
            <FallbackSpread key={s.key} render={s.render} />
          ))}
        </div>
      </section>
    );
  }

  /* ----------------------------- pinned stage ---------------------------- */
  return (
    <section ref={rootRef} className="relative">
      <div
        ref={pinRef}
        className="desk-surface relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10 sm:px-8"
      >
        <div ref={bookRef} className={bookSize}>
          {/* soft contact shadow under the book */}
          <div
            aria-hidden
            className="absolute -inset-x-6 bottom-[-2%] top-[6%] -z-10 rounded-[40px] blur-2xl"
            style={{ background: "radial-gradient(60% 50% at 50% 60%, rgba(43,43,43,0.22), transparent 70%)" }}
          />

          {spreads.map((s, i) => (
            <div
              key={s.key}
              ref={(el) => {
                pageRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ zIndex: N - i }}
            >
              <Page>{s.render(activeIndex === i)}</Page>
            </div>
          ))}

          <div ref={coverRef} className="absolute inset-0" style={{ zIndex: N + 5 }}>
            <Cover />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Normal-flow spread used only under prefers-reduced-motion. */
function FallbackSpread({ render }: { render: (active: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  return (
    <div ref={ref} className="aspect-[5/6] w-full sm:aspect-[3/2]">
      <Page>{render(inView)}</Page>
    </div>
  );
}
