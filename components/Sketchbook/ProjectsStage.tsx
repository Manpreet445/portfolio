"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Page from "./Page";
import ProjectCover from "./ProjectCover";
import { BackFace, Curl, addFlip } from "./sheets";
import ProjectSpread from "@/components/spreads/ProjectSpread";
import { projects, accentHex } from "@/data/projects";

type Sheet =
  | { key: string; kind: "cover"; projIndex: number }
  | { key: string; kind: "page"; projIndex: number };

const sheets: Sheet[] = projects.flatMap((p, i) => [
  { key: `cover-${p.slug}`, kind: "cover" as const, projIndex: i },
  { key: `page-${p.slug}`, kind: "page" as const, projIndex: i },
]);

const S = sheets.length;
const PHASES = S; // settle + (S-1) flips

const bookSize =
  "relative w-[min(94vw,1060px)] aspect-[4/5] max-h-[88vh] sm:aspect-[3/2] sm:max-h-[78vh]";

/** The closed books stacked behind the current one, so it reads as a pile. */
function BookStack() {
  return (
    <>
      {projects.map((p, i) => (
        <div
          key={p.slug}
          aria-hidden
          className="absolute inset-0 rounded-l-[8px] rounded-r-[18px]"
          style={{
            background: accentHex[p.accent].deep,
            transform: `translate(${(i + 1) * 10}px, ${(i + 1) * 12}px) rotate(${(i % 2 ? 1 : -1) * (i + 1)}deg)`,
            zIndex: -10 - i,
            boxShadow: "0 18px 40px rgba(43,43,43,0.18)",
            opacity: 0.9,
          }}
        />
      ))}
    </>
  );
}

export default function ProjectsStage() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const sheetRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [front, setFront] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const els = sheetRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(els, { transformOrigin: "left center", transformStyle: "preserve-3d" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pinRef.current!,
          start: "top top",
          end: () => "+=" + window.innerHeight * PHASES * 0.95,
          pin: true,
          scrub: 1,
          snap: { snapTo: 1 / PHASES, duration: { min: 0.15, max: 0.5 }, delay: 0.05, ease: "power1.inOut" },
          onUpdate: (self) => {
            const phase = self.progress * PHASES;
            const idx = Math.min(S - 1, Math.max(0, Math.round(phase) - 1));
            setFront((p) => (p === idx ? p : idx));
          },
        },
      });

      // settle: the stack arrives
      tl.from(bookRef.current!, { scale: 0.9, yPercent: 6, duration: 0.2, ease: "power2.out" }, 0);
      tl.to(headingRef.current!, { opacity: 0, y: -20, duration: 0.4, ease: "power1.in" }, 0.5);

      // flip each leaf, revealing the next
      sheetRefs.current.forEach((el, i) => {
        if (!el || i >= S - 1) return;
        const below = sheetRefs.current[i + 1]?.querySelector<HTMLElement>(".lift-shadow");
        addFlip(tl, el, i + 1, below);
      });

      ScrollTrigger.refresh();
      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const renderFace = (s: Sheet, isFront: boolean) =>
    s.kind === "cover" ? (
      <ProjectCover project={projects[s.projIndex]} index={s.projIndex} />
    ) : (
      <Page>
        <ProjectSpread project={projects[s.projIndex]} active={isFront} pageNumber={s.projIndex + 1} />
      </Page>
    );

  /* ----------------------- reduced-motion fallback ----------------------- */
  if (reduced) {
    return (
      <section className="px-4 py-16 sm:px-8">
        <h2 className="mb-12 text-center font-display text-4xl font-bold text-ink">Projects</h2>
        <div className="mx-auto flex w-[min(94vw,1060px)] flex-col gap-16">
          {projects.map((p, i) => (
            <FallbackProject key={p.slug} index={i} />
          ))}
        </div>
      </section>
    );
  }

  /* ----------------------------- pinned stage ---------------------------- */
  return (
    <section ref={rootRef} className="relative">
      <div ref={pinRef} className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10 sm:px-8">
        <div ref={headingRef} className="pointer-events-none absolute top-[6%] left-1/2 z-20 -translate-x-1/2 text-center">
          <span className="font-hand text-2xl text-coral-deep sm:text-3xl">a stack of sketchbooks —</span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-ink sm:text-5xl">Projects</h2>
        </div>

        <div ref={bookRef} className={`z-10 ${bookSize}`} style={{ perspective: "2200px" }}>
          <div
            aria-hidden
            className="absolute -inset-x-6 bottom-[-2%] top-[6%] -z-20 rounded-[40px] blur-2xl"
            style={{ background: "radial-gradient(60% 50% at 50% 60%, rgba(43,43,43,0.26), transparent 70%)" }}
          />
          <BookStack />

          {sheets.map((s, i) => (
            <div
              key={s.key}
              ref={(el) => {
                sheetRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ zIndex: S - i, transformStyle: "preserve-3d", willChange: "transform" }}
            >
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                {renderFace(s, front === i)}
                <Curl />
              </div>
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <BackFace />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FallbackProject({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  return (
    <div ref={ref} className="flex flex-col gap-6">
      <div className="aspect-[3/2] w-full">
        <ProjectCover project={projects[index]} index={index} />
      </div>
      <div className="aspect-[4/5] w-full sm:aspect-[3/2]">
        <Page>
          <ProjectSpread project={projects[index]} active={inView} pageNumber={index + 1} />
        </Page>
      </div>
    </div>
  );
}
