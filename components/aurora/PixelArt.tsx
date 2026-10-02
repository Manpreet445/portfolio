/* Hand-placed pixel sprites — SVG rect grids on a 1-unit cell, rendered
   crisp via .pixel-art. Animated bits use the steps() keyframes in globals. */

type SpriteProps = {
  className?: string;
  /** rendered size of one pixel cell, in CSS px */
  cell?: number;
};

/* A steaming mug of something warm. 12×12 grid + 3 steam pixels above. */
export function PixelMug({ className = "", cell = 4 }: SpriteProps) {
  return (
    <svg
      aria-hidden
      className={`pixel-art ${className}`}
      width={14 * cell}
      height={16 * cell}
      viewBox="0 0 14 16"
    >
      {/* steam */}
      <rect className="steam" x="4" y="1" width="1" height="1" fill="var(--color-fog)" style={{ ["--steam-delay" as string]: "0s" }} />
      <rect className="steam" x="6" y="0" width="1" height="1" fill="var(--color-fog)" style={{ ["--steam-delay" as string]: "0.8s" }} />
      <rect className="steam" x="8" y="1" width="1" height="1" fill="var(--color-fog)" style={{ ["--steam-delay" as string]: "1.6s" }} />
      {/* mug body */}
      <rect x="2" y="5" width="9" height="8" fill="var(--color-ember)" />
      <rect x="2" y="5" width="9" height="2" fill="var(--color-ember-bright)" />
      {/* coffee */}
      <rect x="3" y="5" width="7" height="1" fill="#6b4226" />
      {/* handle */}
      <rect x="11" y="7" width="2" height="1" fill="var(--color-ember)" />
      <rect x="12" y="8" width="1" height="2" fill="var(--color-ember)" />
      <rect x="11" y="10" width="2" height="1" fill="var(--color-ember)" />
      {/* saucer */}
      <rect x="1" y="13" width="11" height="1" fill="var(--color-ink)" opacity="0.8" />
      {/* outline hint */}
      <rect x="2" y="12" width="9" height="1" fill="#c77f2e" />
    </svg>
  );
}

/* Sprites drawn as character maps, so each one can be read and edited as a
   picture: one character per pixel, "." for empty. */
function mapPixels(rows: string[], colors: Record<string, string>) {
  return rows.flatMap((row, y) =>
    Array.from(row).flatMap((ch, x) => (colors[ch] ? [{ x, y, fill: colors[ch] }] : [])),
  );
}

/* A cat curled up asleep on the ledge: the back is the highest point, the
   head rests low on its front paws, ears relaxed, tail wrapped round the
   front. The side of its back facing the lamp is warmed by it. 26×12 grid. */
const CAT = mapPixels([
  ".....OOOOOOOO.............",
  "...OOWWHHHHHHOO...........",
  "..OWWSHHSHHHHHBO..O....O..",
  ".OWBBSBBSBBBBBBBOOPOOOOPO.",
  ".OwBBBBBBBBBBBBBBBBBBBBBBO",
  ".OwBBBBBBBBBBBBBSBBBBBBBBO",
  ".OwBBBBBBBBBBBBBSBEEBBEEBO",
  ".OSBBBBBBBBBBBBBSBKBNNBKBO",
  ".OSSBBBBBBBBBBBBSBBBBBBBO.",
  "OSSSSSSSSSSSSSSSSOHHHHHO..",
  "OBBDBBDBBDBBBBHHOOHHSHHO..",
  "OOOOOOOOOOOOOOOOOOOOOOOO..",
], {
  O: "#51467c", // outline: dark enough to hold the shape, light enough
  //              to still read against the night sky behind it
  E: "#51467c", // closed eyes
  B: "#b9acd8", // fur
  H: "#d6cdec", // fur in the light
  W: "#f0d7c4", // fur warmed by the lamp
  w: "#d4b9c9", // fur, lamp side
  S: "#9184b8", // fur in shadow, back stripes
  D: "#73679a", // tail rings
  P: "#ff9db8", // inner ears
  K: "#e7a6c8", // cheeks
  N: "#ff8fae", // nose
});

/* the two z's drift up off the cat's head, one after the other */
const DOZE = [
  { delay: "0s", rects: [[21, -5, 5, 1], [24, -4, 1, 1], [23, -3, 1, 1], [22, -2, 1, 1], [21, -1, 5, 1]] },
  { delay: "1.6s", rects: [[27, -14, 6, 1], [31, -13, 1, 1], [30, -12, 1, 1], [29, -11, 1, 1], [28, -10, 1, 1], [27, -9, 6, 1]] },
];

export function PixelCat({ className = "", cell = 3 }: SpriteProps) {
  return (
    <svg
      aria-hidden
      className={`pixel-art ${className}`}
      width={26 * cell}
      height={12 * cell}
      viewBox="0 0 26 12"
      overflow="visible"
    >
      {CAT.map(({ x, y, fill }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />
      ))}
      {DOZE.map(({ delay, rects }) => (
        <g key={delay} className="cat-z" fill="var(--color-mist)" style={{ animationDelay: delay }}>
          {rects.map(([x, y, w, h]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* A table lamp beside the cat: warm shade, slim stem, weighted base. Its
   light shows on what it falls on (the cat's back) rather than as a beam:
   a translucent warm cone over a navy sky mixes to brown and reads as a
   shadow. 14×18 grid. */
const LAMP = mapPixels([
  "....OOOOOO....",
  "...OaAAAAAO...",
  "..OaAAAAAAAO..",
  "..OaAAAAAAAO..",
  ".OaAAAAAAAAAO.",
  ".OaAAAAAAAAAO.",
  "OaAAAAAAAAAAAO",
  "OOOOOOOOOOOOOO",
  "......LL......",
  "......MM......",
  "......MM......",
  "......MM......",
  "......MM......",
  "......MM......",
  "......MM......",
  "....OOOOOO....",
  "...ObbbbbbO...",
  "..OOOOOOOOOO..",
], {
  O: "#51467c", // outline
  A: "#ffb454", // shade, lit from inside
  a: "#d9862f", // shade, turned away
  L: "#fff1c9", // bulb
  M: "#9a8ebb", // stem
  b: "#6f6399", // base
});
export function PixelLamp({ className = "", cell = 3 }: SpriteProps) {
  return (
    <svg
      aria-hidden
      className={`pixel-art ${className}`}
      width={14 * cell}
      height={18 * cell}
      viewBox="0 0 14 18"
    >
      {LAMP.map(({ x, y, fill }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />
      ))}
    </svg>
  );
}

/* A blocky drifting cloud, drawn with the current text color. 14×5 grid. */
export function PixelCloud({ className = "", cell = 8 }: SpriteProps) {
  return (
    <svg
      aria-hidden
      className={`pixel-art ${className}`}
      width={14 * cell}
      height={5 * cell}
      viewBox="0 0 14 5"
      fill="currentColor"
    >
      <rect x="1" y="2" width="12" height="2" />
      <rect x="3" y="1" width="4" height="1" />
      <rect x="8" y="0" width="3" height="2" />
      <rect x="2" y="4" width="10" height="1" />
    </svg>
  );
}

/* A patient pixel moon with craters. 10×10 grid. */
export function PixelMoon({ className = "", cell = 6 }: SpriteProps) {
  return (
    <svg
      aria-hidden
      className={`pixel-art ${className}`}
      width={10 * cell}
      height={10 * cell}
      viewBox="0 0 10 10"
    >
      <rect x="3" y="0" width="4" height="1" fill="#f3edda" />
      <rect x="2" y="1" width="6" height="1" fill="#f3edda" />
      <rect x="1" y="2" width="8" height="6" fill="#f3edda" />
      <rect x="2" y="8" width="6" height="1" fill="#f3edda" />
      <rect x="3" y="9" width="4" height="1" fill="#f3edda" />
      {/* craters */}
      <rect x="3" y="3" width="2" height="2" fill="#d9d0b8" />
      <rect x="6" y="5" width="1" height="1" fill="#d9d0b8" />
      <rect x="4" y="7" width="1" height="1" fill="#d9d0b8" />
      <rect x="7" y="2" width="1" height="1" fill="#d9d0b8" />
    </svg>
  );
}
