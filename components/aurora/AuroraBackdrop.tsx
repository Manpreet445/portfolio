"use client";

/* The pixel night sky behind every section — and the page's clock.

   It is one viewport tall and pinned, so the content scrolls over a sky that
   stays put. Scroll position is mapped onto the passage of a night: the moon
   travels across the sky in a shallow arc from one end of the page to the
   other, the sky deepens through the middle of the page and lifts a little
   again at the end, and the starfield drifts at its own slower depth. None of
   it asks for attention; it is what makes the page feel like one place you
   are moving through rather than a stack of sections.

   Every scrolling effect here is a single transform or opacity on one
   element, so it costs next to nothing, and all of it holds still under
   reduced motion. */

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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

const STARS = makeStars(44);

/* Dusk bands, softened at the seams. They were hard stops, which was right
   while the sky scrolled with the page; pinned to the viewport the stops sit
   at fixed screen heights and read as rendering lines drawn across the
   content. A short blend at each seam keeps the bands without the lines. */
const SKY =
  "linear-gradient(180deg, var(--color-abyss) 0%, var(--color-abyss) 27%, #191330 33%, #191330 57%, var(--color-night) 63%, var(--color-night) 82%, #221a3c 88%)";

export default function AuroraBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  /* the moon's arc: rises a little toward the middle of the page, then sets */
  const moonX = useTransform(scrollYProgress, [0, 1], ["0vw", "-62vw"]);
  const moonY = useTransform(scrollYProgress, [0, 0.5, 1], ["0vh", "-4vh", "5vh"]);
  /* dusk to the deep middle of the night, easing off again toward the end */
  const night = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.3, 0.12]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <div
      aria-hidden
      /* overflow-clip, not overflow-hidden: `hidden` would make this element
         the sticky child's scroll container, and since it never scrolls the
         sticking silently does nothing. `clip` still clips without creating
         a scroll container. */
      className="pointer-events-none absolute inset-0 overflow-clip"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0" style={{ background: SKY }} />

        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { y: starsY }}
        >
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
        </motion.div>

        <motion.div
          className="absolute top-[9%] right-[12%]"
          style={reduce ? undefined : { x: moonX, y: moonY }}
        >
          <PixelMoon className="opacity-90" />
        </motion.div>

        <div className="cloud top-[14%]" style={{ ["--cloud-dur" as string]: "150s" }}>
          <PixelCloud cell={10} />
        </div>
        <div
          className="cloud cloud-extra top-[34%]"
          style={{ ["--cloud-dur" as string]: "110s", ["--cloud-delay" as string]: "-40s" }}
        >
          <PixelCloud cell={7} />
        </div>
        <div
          className="cloud cloud-extra top-[58%]"
          style={{ ["--cloud-dur" as string]: "180s", ["--cloud-delay" as string]: "-90s" }}
        >
          <PixelCloud cell={12} className="opacity-60" />
        </div>

        {/* the hour: deepens the whole sky without touching its colours */}
        <motion.div
          className="absolute inset-0 bg-abyss"
          style={{ opacity: reduce ? 0 : night }}
        />
      </div>
    </div>
  );
}
