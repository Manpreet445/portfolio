"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Cover, { CoverInside } from "./Cover";
import Page from "./Page";
import { BackFace, Curl, addFlip } from "./sheets";
import FloatingObject from "@/components/Desk/FloatingObject";
import { WcSplash, WcLeaf, WcBrush, WcDrop, WcRing, WcArc } from "@/components/Desk/WatercolorShapes";
import ScrollCue from "@/components/ui/ScrollCue";
import { usePointerOffset } from "@/lib/motion";
import AboutSpread from "@/components/spreads/AboutSpread";
import FeaturesSpread from "@/components/spreads/FeaturesSpread";
import RoadmapSpread from "@/components/spreads/RoadmapSpread";
import { profile } from "@/data/projects";

type Leaf = { key: string; render: (active: boolean) => ReactNode };

const leaves: Leaf[] = [
  { key: "about", render: (a) => <AboutSpread active={a} /> },
  { key: "skills", render: (a) => <FeaturesSpread active={a} /> },
  { key: "roadmap", render: (a) => <RoadmapSpread active={a} /> },
];

const L = leaves.length;
const PHASES = 1 + L; // rise + (cover open → reveals leaf0) + (L-1) page turns

const bookSize =
  "relative w-[min(94vw,1060px)] aspect-[4/5] max-h-[88vh] sm:aspect-[3/2] sm:max-h-[78vh]";

export default function AboutScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { mx, my } = usePointerOffset();
  const [active, setActive] = useState(0);
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
      const sheets = [cover, ...pageRefs.current.filter(Boolean)] as HTMLElement[];
      gsap.set(sheets, { transformOrigin: "left center", transformStyle: "preserve-3d" });

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
            const idx = Math.min(L - 1, Math.max(0, Math.round(phase) - 2));
            setActive((p) => (p === idx ? p : idx));
          },
        },
      });

      // PHASE 0→1 — book rises off the desk to centre; the desk drifts away
      tl.fromTo(bookRef.current!, { yPercent: 66, scale: 0.82 }, { yPercent: 0, scale: 1, duration: 1, ease: "power2.out" }, 0);
      tl.to(deskRef.current!, { opacity: 0, scale: 1.12, duration: 0.85, ease: "power1.in" }, 0.05);

      // PHASE 1→2 — elastic slips off, the cover opens on the spine
      if (elastic) tl.to(elastic, { xPercent: 180, rotation: 12, opacity: 0, duration: 0.3, ease: "power2.in" }, 1.0);
      addFlip(tl, cover, 1.02, pageRefs.current[0]?.querySelector<HTMLElement>(".lift-shadow"));

      // PHASES 2.. — each about leaf turns
      pageRefs.current.forEach((el, i) => {
        if (!el || i >= L - 1) return;
        addFlip(tl, el, i + 2, pageRefs.current[i + 1]?.querySelector<HTMLElement>(".lift-shadow"));
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
      <section className="px-4 py-16 sm:px-8">
        <Title />
        <div className="mx-auto mt-12 mb-16 h-[64vh] w-[min(92vw,760px)]">
          <Cover />
        </div>
        <div className="mx-auto flex w-[min(94vw,1060px)] flex-col gap-16">
          {leaves.map((s) => (
            <FallbackLeaf key={s.key} render={s.render} />
          ))}
        </div>
      </section>
    );
  }

  /* ----------------------------- pinned scene ---------------------------- */
  return (
    <section ref={rootRef} className="relative">
      <div ref={pinRef} className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10 sm:px-8">
        {/* desk: watercolour floaters + the big title */}
        <div ref={deskRef} className="absolute inset-0 z-0">
          <FloatingObject mx={mx} my={my} depth={46} bob={16} duration={9} sway={4} className="left-[5%] top-[12%] w-40 sm:w-56">
            <WcSplash className="h-auto w-full" />
          </FloatingObject>
          <FloatingObject mx={mx} my={my} depth={60} bob={20} duration={11} delay={0.6} sway={-3} className="right-[6%] top-[10%] w-44 sm:w-60">
            <WcBrush className="h-auto w-full" />
          </FloatingObject>
          <FloatingObject mx={mx} my={my} depth={38} bob={14} duration={10} delay={1.1} sway={5} className="left-[10%] top-[52%] hidden w-28 sm:block sm:w-40">
            <WcLeaf className="h-auto w-full" />
          </FloatingObject>
          <FloatingObject mx={mx} my={my} depth={52} bob={18} duration={12} delay={0.3} sway={-4} className="right-[10%] top-[50%] hidden w-24 sm:block sm:w-32">
            <WcDrop className="h-auto w-full" />
          </FloatingObject>
          <FloatingObject mx={mx} my={my} depth={30} bob={12} duration={13} delay={1.5} sway={3} className="left-[30%] top-[8%] hidden w-32 md:block">
            <WcRing className="h-auto w-full" />
          </FloatingObject>
          <FloatingObject mx={mx} my={my} depth={42} bob={15} duration={10.5} delay={0.9} sway={-5} className="right-[28%] top-[64%] hidden w-44 md:block">
            <WcArc className="h-auto w-full" />
          </FloatingObject>

          <div className="absolute inset-x-0 top-[15%] flex justify-center px-6">
            <Title />
          </div>

          <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2">
            <ScrollCue label="scroll to open the book" />
          </div>
        </div>

        {/* the single book, peeking then rising */}
        <div ref={bookRef} className={`z-10 ${bookSize}`} style={{ perspective: "2200px" }}>
          <div
            aria-hidden
            className="absolute -inset-x-6 bottom-[-2%] top-[6%] -z-10 rounded-[40px] blur-2xl"
            style={{ background: "radial-gradient(60% 50% at 50% 60%, rgba(43,43,43,0.24), transparent 70%)" }}
          />
          {leaves.map((s, i) => (
            <div
              key={s.key}
              ref={(el) => {
                pageRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ zIndex: L - i, transformStyle: "preserve-3d", willChange: "transform" }}
            >
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                <Page>{s.render(active === i)}</Page>
                <Curl />
              </div>
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <BackFace />
              </div>
            </div>
          ))}
          <div ref={coverRef} className="absolute inset-0" style={{ zIndex: L + 5, transformStyle: "preserve-3d", willChange: "transform" }}>
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              <Cover />
              <Curl />
            </div>
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              <CoverInside />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Big, bold, expressive header. */
function Title() {
  return (
    <div className="pointer-events-none max-w-5xl text-center">
      <span className="font-hand text-2xl text-coral-deep sm:text-3xl">the working sketchbook of</span>
      <h1 className="paint-text font-display text-[clamp(3.6rem,17vw,12rem)] font-bold uppercase leading-[0.82] tracking-[-0.03em]">
        {profile.name}
      </h1>
      <p className="mt-3 font-display text-sm font-bold uppercase tracking-[0.4em] text-ink sm:text-lg">
        {profile.role}
      </p>
      <p className="mx-auto mt-3 max-w-md font-serif text-lg italic leading-snug text-ink-soft">
        {profile.tagline}
      </p>
    </div>
  );
}

function FallbackLeaf({ render }: { render: (active: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  return (
    <div ref={ref} className="aspect-[4/5] w-full sm:aspect-[3/2]">
      <Page>{render(inView)}</Page>
    </div>
  );
}
