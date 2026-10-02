"use client";

/* Momentum smooth-scroll (Lenis). Gives the whole page buttery inertia and
   feeds the hero pin, parallax and marquee a silky scroll signal. Anchor
   links glide instead of jumping. Fully disabled under reduced-motion. */

import { useEffect } from "react";
import Lenis from "lenis";
import { cancelFrame, frame, useReducedMotion, type FrameData } from "motion/react";

export default function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    /* lerp rather than a fixed duration: every wheel tick eases toward its
       target at the same rate, so a long flick and a nudge feel like the same
       surface. 0.1 is the weighted, settled glide; the old 0.9s duration was
       shortened to save work per gesture, which no longer applies now that
       far less is recomputed on scroll. */
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    /* Drive Lenis from Motion's own frame loop instead of a separate
       requestAnimationFrame. Two independent loops means the scroll position
       and the scroll-linked transforms can update on different frames, which
       shows up as the pinned deck and the hero shivering a pixel behind the
       page. One loop keeps them in lockstep. */
    const update = (data: FrameData) => lenis.raf(data.timestamp);
    frame.update(update, true);

    // glide to in-page anchors instead of the native instant jump
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.getElementById(id.slice(1));
      if (!el) return;
      e.preventDefault();
      // Keep keyboard navigation at the destination, just like a native link.
      if (!el.hasAttribute("tabindex")) {
        el.setAttribute("tabindex", "-1");
        el.addEventListener("blur", () => el.removeAttribute("tabindex"), { once: true });
      }
      el.focus({ preventScroll: true });
      const offset = -(parseFloat(getComputedStyle(el).scrollMarginTop) || 8);
      lenis.scrollTo(id === "#top" ? 0 : el, { offset: id === "#top" ? 0 : offset });
      if (window.location.hash !== id) history.pushState(null, "", id);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelFrame(update);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}
