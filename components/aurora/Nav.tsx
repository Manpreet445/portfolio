"use client";

/* Primary nav. On desktop the section links sit inline; on phones they move
   into a pixel drawer behind a menu button, so the section list is reachable
   on small screens instead of desktop-only. */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/projects";
import { GLIDE } from "@/components/aurora/Reveal";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // hide while scrolling down past the fold, return on any scroll up
      // (never hide the bar while the drawer is open)
      setHidden(!open && y > 240 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  /* Escape closes the drawer; a tap on a link closes it too (below). */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`safe-top fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-[130%]" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto mt-4 max-w-6xl px-5 py-3 transition-[background,border,box-shadow] duration-300 md:px-6 ${
          scrolled || open ? `glass mx-4 md:mx-auto ${open ? "glass-opaque" : ""}` : "border-2 border-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <a
            href="#top"
            className="-my-2 flex min-h-11 items-center py-2 font-display text-xl font-semibold text-fog"
          >
            {profile.name}
            <span className="text-ember-bright">.</span>
          </a>

          {/* desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-mist transition-colors duration-200 hover:text-fog active:text-ember-bright"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="btn-pixel bg-ember px-3 py-2.5 text-sm font-bold text-abyss sm:px-4"
            >
              Get in touch
            </a>

            {/* menu button — phones only */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="btn-pixel flex h-11 w-11 shrink-0 items-center justify-center bg-raised md:hidden"
            >
              <span aria-hidden className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[2px] w-4 bg-fog transition-all duration-200 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute top-1.5 left-0 h-[2px] w-4 bg-fog transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] w-4 bg-fog transition-all duration-200 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* mobile drawer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-nav"
              key="drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: GLIDE }}
              className="overflow-hidden md:hidden"
            >
              <ul className="mt-3 flex flex-col border-t-2 border-line-soft pt-2">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-mono text-base uppercase tracking-[0.14em] text-mist transition-colors duration-200 hover:text-ember-bright active:text-fog"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
