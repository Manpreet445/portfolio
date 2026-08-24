"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";

type Blob = {
  color: string;
  top: string;
  left: string;
  size: number;
  dur: number;
  delay: number;
  dx: number;
  dy: number;
};

/** big soft pigment pools, in watercolour hues */
const BLOBS: Blob[] = [
  { color: "rgba(255,90,77,0.55)", top: "-8%", left: "-6%", size: 46, dur: 18, delay: 0, dx: 60, dy: 40 },
  { color: "rgba(255,201,60,0.5)", top: "8%", left: "62%", size: 42, dur: 22, delay: 1.5, dx: -70, dy: 50 },
  { color: "rgba(77,157,224,0.45)", top: "52%", left: "10%", size: 50, dur: 26, delay: 0.8, dx: 80, dy: -50 },
  { color: "rgba(43,182,115,0.4)", top: "60%", left: "66%", size: 44, dur: 24, delay: 2.2, dx: -60, dy: -40 },
  { color: "rgba(185,150,224,0.42)", top: "26%", left: "34%", size: 40, dur: 20, delay: 1.1, dx: 50, dy: 60 },
  { color: "rgba(255,138,61,0.4)", top: "78%", left: "38%", size: 38, dur: 28, delay: 0.4, dx: -40, dy: -60 },
];

const noiseUri = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
);

/**
 * A living watercolour wash behind everything. Pigment pools drift constantly,
 * brush strokes sweep, paper grain sits on top — and the whole field shifts hue
 * as the pointer moves, like the light changing over wet paint.
 */
export default function WatercolorBackground() {
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });

  const hue = useTransform(smx, [0, 1], [-30, 45]);
  const sat = useTransform(smy, [0, 1], [1.18, 0.95]);
  const washFilter = useMotionTemplate`hue-rotate(${hue}deg) saturate(${sat})`;
  const cursorX = useTransform(smx, [0, 1], ["0%", "100%"]);
  const cursorY = useTransform(smy, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-paper">
      <motion.div className="absolute inset-0" style={{ filter: reduce ? undefined : washFilter }}>
        {/* drifting pigment pools */}
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: b.top,
              left: b.left,
              width: `${b.size}vw`,
              height: `${b.size}vw`,
              background: `radial-gradient(circle at 40% 38%, ${b.color}, transparent 68%)`,
              filter: "blur(36px)",
              mixBlendMode: "multiply",
            }}
            animate={
              reduce
                ? undefined
                : { x: [0, b.dx, 0], y: [0, b.dy, 0], scale: [1, 1.12, 1] }
            }
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* brush strokes sweeping across */}
        {!reduce && (
          <>
            <motion.div
              className="absolute left-[-15%] top-[30%] h-[10vw] w-[60vw] rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,90,77,0.32), transparent)",
                filter: "url(#watercolor) blur(8px)",
                mixBlendMode: "multiply",
              }}
              animate={{ x: ["0%", "30%", "0%"], rotate: [-4, 2, -4] }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[-15%] top-[58%] h-[8vw] w-[55vw] rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(77,157,224,0.28), transparent)",
                filter: "url(#watercolor) blur(8px)",
                mixBlendMode: "multiply",
              }}
              animate={{ x: ["0%", "-26%", "0%"], rotate: [3, -3, 3] }}
              transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* a pool of colour that follows the cursor */}
        {!reduce && (
          <motion.div
            className="absolute h-[34vw] w-[34vw] rounded-full"
            style={{
              left: cursorX,
              top: cursorY,
              x: "-50%",
              y: "-50%",
              background: "radial-gradient(circle, rgba(255,201,60,0.4), transparent 62%)",
              filter: "blur(40px)",
              mixBlendMode: "multiply",
            }}
          />
        )}
      </motion.div>

      {/* watercolour-paper grain on top */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,${noiseUri}")`, backgroundSize: "220px 220px" }}
      />
      {/* lit centre so content reads */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, rgba(255,255,255,0.55), transparent 70%)" }}
      />
    </div>
  );
}
