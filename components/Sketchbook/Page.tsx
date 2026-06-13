import { type ReactNode } from "react";
import PaperGrain from "@/components/ui/PaperGrain";

/**
 * One open watercolor spread: cold-press cream paper, fiber grain, a soft
 * painted inner-spine shadow down the gutter, faint deckled edges.
 */
export default function Page({
  children,
  className = "",
  gutter = true,
}: {
  children: ReactNode;
  className?: string;
  gutter?: boolean;
}) {
  return (
    <div
      className={`page-paper page-deckle relative h-full w-full overflow-hidden rounded-[10px] ${className}`}
      style={{ boxShadow: "var(--shadow-page)" }}
    >
      <PaperGrain opacity={0.6} />

      {gutter && (
        <div className="page-gutter pointer-events-none absolute inset-y-0 left-1/2 hidden w-20 -translate-x-1/2 md:block" />
      )}

      {/* the lift-shadow the GSAP page-turn swells beneath the sheet */}
      <div
        className="lift-shadow pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(43,43,43,0.28), rgba(43,43,43,0.04) 40%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
