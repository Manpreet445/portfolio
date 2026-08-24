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

/* A sleeping cat, tail flicking. 16×10 grid. */
export function PixelCat({ className = "", cell = 4 }: SpriteProps) {
  return (
    <svg
      aria-hidden
      className={`pixel-art ${className}`}
      width={16 * cell}
      height={10 * cell}
      viewBox="0 0 16 10"
    >
      {/* tail — swishes */}
      <g className="cat-tail">
        <rect x="0" y="6" width="1" height="2" fill="#8d81ad" />
        <rect x="1" y="7" width="2" height="1" fill="#8d81ad" />
      </g>
      {/* body loaf */}
      <rect x="3" y="5" width="9" height="4" fill="#a99cc9" />
      <rect x="3" y="4" width="9" height="1" fill="#bdb3d6" />
      {/* head */}
      <rect x="10" y="3" width="4" height="4" fill="#bdb3d6" />
      {/* ears */}
      <rect x="10" y="2" width="1" height="1" fill="#bdb3d6" />
      <rect x="13" y="2" width="1" height="1" fill="#bdb3d6" />
      <rect x="10" y="2" width="1" height="1" fill="#ff9db8" opacity="0.6" />
      {/* closed eyes */}
      <rect x="11" y="4" width="1" height="1" fill="var(--color-ink)" />
      <rect x="13" y="4" width="1" height="1" fill="var(--color-ink)" />
      {/* blush */}
      <rect x="11" y="5" width="1" height="1" fill="#ff9db8" opacity="0.5" />
      {/* paws tucked */}
      <rect x="4" y="9" width="8" height="1" fill="#8d81ad" />
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
