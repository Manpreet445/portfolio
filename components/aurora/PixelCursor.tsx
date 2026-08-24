"use client";

/* A retro targeting reticle in place of the pointer. Idle it's a small ember
   square; hover anything interactive and it snaps into a bracketed frame
   around that element — SNES menu-selection energy.

   Only mounts for real pointers (never touch) and bows out entirely under
   prefers-reduced-motion, leaving the native cursor alone. */

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const SNAP = { stiffness: 420, damping: 32, mass: 0.45 };
const PAD = 8; // breathing room around a snapped target
const DOT = 12; // idle size

const TARGETS = 'a[href], button, [role="button"], [data-cursor="snap"]';

export default function PixelCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [snapped, setSnapped] = useState(false);
  const [visible, setVisible] = useState(false);

  const targetRef = useRef<Element | null>(null);
  const rafRef = useRef(0);

  const x = useSpring(useMotionValue(-100), SNAP);
  const y = useSpring(useMotionValue(-100), SNAP);
  const w = useSpring(useMotionValue(DOT), SNAP);
  const h = useSpring(useMotionValue(DOT), SNAP);

  /* only for mice/trackpads — a touch device has no hover to speak of */
  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-pixel-cursor");

    const measure = (el: Element) => {
      const r = el.getBoundingClientRect();
      x.set(r.left - PAD);
      y.set(r.top - PAD);
      w.set(r.width + PAD * 2);
      h.set(r.height + PAD * 2);
    };

    /* While locked on, re-read the target every frame: it may be drifting
       (magnetic buttons), tilting, or scrolling under Lenis. One rect read
       per frame is cheap and keeps the frame glued on. */
    const track = () => {
      const el = targetRef.current;
      if (!el || !el.isConnected) {
        release();
        return;
      }
      measure(el);
      rafRef.current = requestAnimationFrame(track);
    };

    const release = () => {
      cancelAnimationFrame(rafRef.current);
      targetRef.current = null;
      setSnapped(false);
      w.set(DOT);
      h.set(DOT);
    };

    const onMove = (e: PointerEvent) => {
      setVisible(true);
      if (targetRef.current) return; // locked on — the rAF loop owns position
      x.set(e.clientX - DOT / 2);
      y.set(e.clientY - DOT / 2);
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(TARGETS);
      if (!el || el === targetRef.current) return;
      cancelAnimationFrame(rafRef.current);
      targetRef.current = el;
      setSnapped(true);
      measure(el);
      rafRef.current = requestAnimationFrame(track);
    };

    const onOut = (e: PointerEvent) => {
      if (!targetRef.current) return;
      const to = e.relatedTarget as HTMLElement | null;
      if (to && targetRef.current.contains(to)) return; // moved within target
      release();
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-pixel-cursor");
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y, w, h]);

  if (!enabled) return null;

  const corner =
    "absolute h-2 w-2 border-ember transition-opacity duration-150";

  return (
    <motion.div
      aria-hidden
      style={{ x, y, width: w, height: h, opacity: visible ? 1 : 0 }}
      className="pointer-events-none fixed top-0 left-0 z-[100] transition-opacity duration-200"
    >
      {/* the frame: solid pip when idle, hollow bracket when locked on */}
      <div
        className={`h-full w-full transition-colors duration-150 ${
          snapped
            ? "border-2 border-ember/70 bg-ember/5"
            : "border-2 border-ink bg-ember"
        }`}
      />
      {/* reticle corners, only while locked on */}
      <span
        className={`${corner} -top-px -left-px border-t-2 border-l-2 ${snapped ? "opacity-100" : "opacity-0"}`}
      />
      <span
        className={`${corner} -top-px -right-px border-t-2 border-r-2 ${snapped ? "opacity-100" : "opacity-0"}`}
      />
      <span
        className={`${corner} -bottom-px -left-px border-b-2 border-l-2 ${snapped ? "opacity-100" : "opacity-0"}`}
      />
      <span
        className={`${corner} -right-px -bottom-px border-r-2 border-b-2 ${snapped ? "opacity-100" : "opacity-0"}`}
      />
    </motion.div>
  );
}
