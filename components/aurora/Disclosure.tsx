"use client";

/* Click-to-reveal panel. Headings stay scannable; the detail unfolds on
   demand. Built on a real <button> so keyboard and screen readers get the
   expanded/collapsed state for free. */

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GLIDE } from "@/components/aurora/Reveal";

/** Pixel plus that loses its stem when open — a square-edged +/−. */
function Toggle({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative ml-3 block h-3 w-3 shrink-0">
      <span className="absolute top-1/2 left-0 h-[2px] w-3 -translate-y-1/2 bg-ember-bright" />
      <span
        className={`absolute top-0 left-1/2 h-3 w-[2px] -translate-x-1/2 bg-ember-bright transition-transform duration-200 ${
          open ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}

export default function Disclosure({
  label,
  lead,
  children,
  headingClass = "font-display text-lg font-semibold text-fog",
  className = "",
  defaultOpen = false,
}: {
  /** the always-visible title */
  label: string;
  /** optional mark shown above the title — a number or an icon */
  lead?: ReactNode;
  children: ReactNode;
  headingClass?: string;
  className?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={className}>
      <h4 className="m-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start justify-between gap-2 text-left transition-transform duration-150 active:scale-[0.99]"
        >
          <span className="min-w-0">
            {lead}
            <span
              className={`${headingClass} block transition-colors duration-200 group-hover:text-ember-bright group-active:text-ember-bright`}
            >
              {label}
            </span>
          </span>
          <Toggle open={open} />
        </button>
      </h4>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: GLIDE }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
