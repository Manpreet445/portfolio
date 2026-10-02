/* A pixel skyline silhouette — the crown of the curtain. Transparent
   background, so whatever sits behind it shows between the buildings.

   The front row is abyss and so is the surface immediately below each
   divider, which is what stops it floating: the buildings stand on ground of
   their own colour rather than hovering over a lighter panel with a hard seam
   under them. The back row is lighter, the way distant buildings pick up more
   skyglow.

   The old version stretched a 240-unit viewBox across the full width with
   preserveAspectRatio="none". At 1440px that rendered every art pixel 6px
   wide and 1px tall, so the windows came out as smeared dashes and the whole
   thing read as blurred stripes rather than pixel art. This one tiles a
   fixed-size pattern instead: user units are CSS pixels, nothing is scaled,
   and a pixel stays square at any viewport width.

   Drawn in art pixels and multiplied by PX on the way out, so the grid is
   impossible to fall off. */

const PX = 3; // one art pixel = 3 CSS px
const TILE = 160; // tile width in art pixels (480 CSS px before it repeats)
const H = 12; // height in art pixels

type Building = { x: number; w: number; h: number };

/* Back row. Lighter than the front, the way distant buildings pick up more
   skyglow, and never reaches the top. */
const FAR: Building[] = [
  { x: 4, w: 8, h: 9 },
  { x: 22, w: 7, h: 10 },
  { x: 38, w: 9, h: 8 },
  { x: 52, w: 6, h: 10 },
  { x: 68, w: 8, h: 9 },
  { x: 84, w: 7, h: 8 },
  { x: 98, w: 9, h: 10 },
  { x: 116, w: 6, h: 9 },
  { x: 130, w: 8, h: 8 },
  { x: 146, w: 7, h: 10 },
];

/* Front row. Starts flush at 0 and ends flush at TILE so the tile seam falls
   between two buildings and cannot be picked out. */
const NEAR: Building[] = [
  { x: 0, w: 7, h: 5 },
  { x: 7, w: 5, h: 8 },
  { x: 12, w: 6, h: 4 },
  { x: 18, w: 8, h: 10 },
  { x: 26, w: 5, h: 6 },
  { x: 31, w: 7, h: 9 },
  { x: 38, w: 4, h: 3 },
  { x: 42, w: 9, h: 7 },
  { x: 51, w: 6, h: 10 },
  { x: 57, w: 5, h: 5 },
  { x: 62, w: 8, h: 8 },
  { x: 70, w: 4, h: 4 },
  { x: 74, w: 7, h: 10 },
  { x: 81, w: 6, h: 6 },
  { x: 87, w: 5, h: 9 },
  { x: 92, w: 8, h: 5 },
  { x: 100, w: 6, h: 7 },
  { x: 106, w: 4, h: 3 },
  { x: 110, w: 9, h: 10 },
  { x: 119, w: 5, h: 6 },
  { x: 124, w: 7, h: 4 },
  { x: 131, w: 6, h: 8 },
  { x: 137, w: 8, h: 6 },
  { x: 145, w: 5, h: 9 },
  { x: 150, w: 10, h: 7 },
];

/* Windows on a real grid rather than scattered: a column every 2 art pixels,
   a row every 2, inset one pixel from the walls. Which ones are lit comes
   from the coordinates, so it is varied but identical on server and client —
   Math.random here would hydrate mismatched. */
function windows() {
  const out: { x: number; y: number }[] = [];
  for (const b of NEAR) {
    const top = H - b.h;
    for (let cx = b.x + 1; cx < b.x + b.w - 1; cx += 2) {
      for (let cy = top + 1; cy < H - 1; cy += 2) {
        if ((cx * 7 + cy * 13 + b.w * 5) % 3 === 0) out.push({ x: cx, y: cy });
      }
    }
  }
  return out;
}

const LIT = windows();

export default function SkylineDivider({ id = "skyline" }: { id?: string }) {
  const w = TILE * PX;
  const h = H * PX;
  return (
    <div aria-hidden className="relative">
      {/* No viewBox on purpose: user units are CSS pixels, so the pattern
          tiles at its natural size instead of being scaled to fit. */}
      <svg className="block w-full" height={h} role="presentation">
        <defs>
          <pattern
            id={id}
            patternUnits="userSpaceOnUse"
            width={w}
            height={h}
          >
            <g fill="var(--color-raised)">
              {FAR.map((b) => (
                <rect
                  key={`f${b.x}`}
                  x={b.x * PX}
                  y={(H - b.h) * PX}
                  width={b.w * PX}
                  height={b.h * PX}
                />
              ))}
            </g>
            <g fill="var(--color-abyss)">
              {NEAR.map((b) => (
                <rect
                  key={`n${b.x}`}
                  x={b.x * PX}
                  y={(H - b.h) * PX}
                  width={b.w * PX}
                  height={b.h * PX}
                />
              ))}
              {/* a mast on one tower, a setback on another, and a rooftop
                  water tank on a low roof where it reads against the sky */}
              <rect x={21 * PX} y={0} width={PX} height={2 * PX} />
              <rect x={77 * PX} y={PX} width={PX} height={PX} />
              <rect x={112 * PX} y={0} width={5 * PX} height={2 * PX} />
              <rect x={45 * PX} y={2 * PX} width={3 * PX} height={2 * PX} />
              <rect x={45 * PX} y={4 * PX} width={PX} height={PX} />
              <rect x={47 * PX} y={4 * PX} width={PX} height={PX} />
            </g>
            {/* a solid baseline: without it any rounding between the
                pattern and the panel below can open a hairline of hero */}
            <rect
              x={0}
              y={(H - 1) * PX}
              width={TILE * PX}
              height={PX}
              fill="var(--color-abyss)"
            />
            <g fill="var(--color-ember)">
              {LIT.map((p) => (
                <rect
                  key={`${p.x}-${p.y}`}
                  x={p.x * PX}
                  y={p.y * PX}
                  width={PX}
                  height={PX}
                  opacity={(p.x + p.y) % 4 === 0 ? 0.45 : 0.8}
                />
              ))}
              {/* the aircraft light, sitting on the mast at x=21 rather than
                  floating unattached where the mast used to be */}
              <rect x={21 * PX} y={0} width={PX} height={PX} fill="#ff6b6b" opacity="0.8" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height={h} fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
