import { type ReactNode } from "react";
import PaperGrain from "@/components/ui/PaperGrain";

/**
 * One watercolor page (single page — no centre crease). Cold-press cream
 * paper, fiber grain, a faint dot-grid, a coffee stain and a hand-drawn
 * rough frame, so it reads as a real sketchbook leaf.
 */
export default function Page({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`page-paper relative h-full w-full overflow-hidden rounded-[10px] ${className}`}
      style={{ boxShadow: "var(--shadow-page)" }}
    >
      {/* faint dot-grid, like a bullet-journal leaf */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(120,108,86,0.18) 1.1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
        }}
      />

      <PaperGrain opacity={0.85} />

      {/* hand-drawn rough frame */}
      <svg
        aria-hidden
        preserveAspectRatio="none"
        viewBox="0 0 1000 700"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ filter: "url(#rough-lg)" }}
      >
        <rect
          x="22" y="22" width="956" height="656" rx="8"
          fill="none"
          stroke="rgba(43,43,43,0.14)"
          strokeWidth="2"
        />
      </svg>

      {/* the lift-shadow the page-flip swells on the revealed sheet beneath */}
      <div
        className="lift-shadow pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(43,43,43,0.30), rgba(43,43,43,0.05) 35%, transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
