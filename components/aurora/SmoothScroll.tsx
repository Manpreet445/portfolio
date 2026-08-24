"use client";

/* Momentum smooth-scroll (Lenis). Gives the whole page buttery inertia and
   feeds the hero pin, parallax and marquee a silky scroll signal. Anchor
   links glide instead of jumping. Fully disabled under reduced-motion. */

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

export default function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      // a touch snappier than the default long glide — less time spent
      // recomputing scroll-linked transforms per gesture, so it feels lighter
      duration: 0.9,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // glide to in-page anchors instead of the native instant jump
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -8 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}
