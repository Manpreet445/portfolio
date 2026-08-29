"use client";

/* Mobile's signature flourish. Desktop gets the cursor reticle, magnetic
   buttons and card tilt — none of which a finger can trigger — so touch gets
   its own: a small burst of pixels thrown from wherever you tap.

   Particles are appended straight to the DOM (no React re-render per tap) and
   animate on steps() so they read as sprite frames, matching the pixel art. */

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

const COLORS = [
  "var(--color-ember)",
  "var(--color-ember-bright)",
  "var(--color-orchid)",
  "var(--color-blush)",
];

export default function TapBurst() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    // touch devices only — a mouse already has the reticle
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    let live = 0; // never let rapid tapping pile up particles
    let start: { x: number; y: number; t: number } | null = null;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      start = { x: e.clientX, y: e.clientY, t: performance.now() };
    };

    /* Only a real tap should spark. Firing on pointerdown would spray
       particles every time a scroll begins, so wait for the release and
       check the finger neither travelled nor lingered. */
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "touch" || !start || live > 3) return;
      const moved = Math.hypot(e.clientX - start.x, e.clientY - start.y);
      const held = performance.now() - start.t;
      start = null;
      if (moved > 10 || held > 700) return; // a drag or a long-press, not a tap
      live++;

      const burst = document.createElement("div");
      burst.className = "tap-burst";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;

      const count = 8;
      for (let i = 0; i < count; i++) {
        const p = document.createElement("span");
        // even spread, jittered so it never looks mechanical
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 26 + Math.random() * 22;
        const size = 3 + Math.round(Math.random() * 2);
        p.className = "tap-spark";
        p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.background = COLORS[i % COLORS.length];
        burst.appendChild(p);
      }

      document.body.appendChild(burst);
      window.setTimeout(() => {
        burst.remove();
        live--;
      }, 460);
    };

    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointercancel", () => (start = null), {
      passive: true,
    });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
    };
  }, [reduce]);

  return null;
}
