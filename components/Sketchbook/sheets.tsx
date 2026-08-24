import type { gsap } from "gsap";
import PaperGrain from "@/components/ui/PaperGrain";

/** Blank reverse of a leaf, seen for a beat mid-flip. */
export function BackFace() {
  return (
    <div className="page-paper relative h-full w-full overflow-hidden rounded-[10px]">
      <PaperGrain opacity={0.8} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(120,108,86,0.16) 1.1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/3"
        style={{ background: "linear-gradient(90deg, rgba(43,43,43,0.14), transparent)" }}
      />
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-hand text-2xl text-ink-faint/50">
        ✦
      </span>
    </div>
  );
}

/** Soft curl shadow overlaid on a leaf while it lifts and turns. */
export function Curl() {
  return (
    <div
      className="curl pointer-events-none absolute inset-0 opacity-0"
      aria-hidden
      style={{
        background:
          "linear-gradient(100deg, transparent 38%, rgba(43,43,43,0.12) 70%, rgba(43,43,43,0.34) 92%, rgba(43,43,43,0.5))",
      }}
    />
  );
}

/**
 * Add a realistic 3D page-flip to a scrubbed timeline: the leaf hinges on the
 * spine, lifts off, turns past vertical, then fades as it tucks toward the
 * binding — while a shadow swells on the sheet revealed beneath.
 */
export function addFlip(
  tl: gsap.core.Timeline,
  sheet: HTMLElement,
  pos: number,
  belowShadow?: HTMLElement | null,
) {
  tl.to(sheet, { rotationY: -132, z: 26, duration: 0.92, ease: "power2.inOut" }, pos);
  tl.to(sheet, { opacity: 0, duration: 0.34, ease: "power1.in" }, pos + 0.52);
  const curl = sheet.querySelector<HTMLElement>(".curl");
  if (curl) tl.to(curl, { keyframes: { opacity: [0, 0.6, 0.2] }, duration: 0.86 }, pos);
  if (belowShadow)
    tl.to(belowShadow, { keyframes: { opacity: [0, 0.6, 0] }, duration: 0.92, ease: "power1.inOut" }, pos);
}
