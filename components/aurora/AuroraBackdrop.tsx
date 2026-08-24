/* The pixel night sky — dusk gradient bands, twinkling stars, drifting
   blocky clouds and a patient moon. Server component, pure CSS steps()
   animation, frozen under prefers-reduced-motion. */

import { PixelCloud, PixelMoon } from "@/components/aurora/PixelArt";

/* Deterministic LCG so the starfield is identical on server and client. */
function makeStars(count: number) {
  let seed = 20260716;
  const next = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    left: `${(next() * 100).toFixed(2)}%`,
    top: `${(next() * 88).toFixed(2)}%`,
    size: next() > 0.75 ? 3 : 2,
    dur: `${(2 + next() * 4).toFixed(2)}s`,
    delay: `${(next() * 5).toFixed(2)}s`,
    dim: next() > 0.6,
  }));
}

const STARS = makeStars(30);

export default function AuroraBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Dusk sky: hard-stop bands instead of a smooth ramp */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-abyss) 0%, var(--color-abyss) 30%, #191330 30%, #191330 60%, var(--color-night) 60%, var(--color-night) 85%, #221a3c 85%)",
        }}
      />

      {/* Starfield */}
      {STARS.map((star, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.dim ? 0.5 : 0.9,
            ["--tw-dur" as string]: star.dur,
            ["--tw-delay" as string]: star.delay,
          }}
        />
      ))}

      {/* Moon, up and to the right */}
      <PixelMoon className="absolute top-[9%] right-[12%] opacity-90" />

      {/* Drifting clouds at different depths */}
      <div
        className="cloud top-[14%]"
        style={{ ["--cloud-dur" as string]: "150s" }}
      >
        <PixelCloud cell={10} />
      </div>
      <div
        className="cloud top-[34%]"
        style={{
          ["--cloud-dur" as string]: "110s",
          ["--cloud-delay" as string]: "-40s",
        }}
      >
        <PixelCloud cell={7} />
      </div>
      <div
        className="cloud top-[58%]"
        style={{
          ["--cloud-dur" as string]: "180s",
          ["--cloud-delay" as string]: "-90s",
        }}
      >
        <PixelCloud cell={12} className="opacity-60" />
      </div>
    </div>
  );
}
