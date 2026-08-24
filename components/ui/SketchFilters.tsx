/**
 * Global hand-drawn SVG filters, mounted once.
 * Reference from anywhere with `filter: url(#rough)` etc. (works cross-SVG and
 * on HTML elements). These give every stroke / border a wobbly, pencil-on-paper
 * edge so nothing looks machine-perfect.
 */
export default function SketchFilters() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute" }}
      focusable="false"
    >
      <defs>
        {/* subtle hand-drawn wobble for small line work (doodles, icons) */}
        <filter id="rough" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.013 0.016" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* stronger wobble for big frames / underlines */}
        <filter id="rough-lg" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.009 0.011" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* pencil grain — a dark fractal noise tinted ink, used as a texture fill */}
        <filter id="pencil-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="matrix"
            values="0 0 0 0 0.17  0 0 0 0 0.17  0 0 0 0 0.17  0 0 0 -1.3 1.05" />
        </filter>

        {/* watercolour bleed — ragged, organic edges for washes & blobs */}
        <filter id="watercolor" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.013" numOctaves="3" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="36" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* softer watercolour wash with a touch of bloom */}
        <filter id="watercolor-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="1.4" />
        </filter>

        {/* granulation — speckled pigment settling, multiplied over washes */}
        <filter id="wc-granulate">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="matrix"
            values="0 0 0 0 0.25  0 0 0 0 0.18  0 0 0 0 0.12  0 0 0 -1.1 0.85" />
        </filter>
      </defs>
    </svg>
  );
}
