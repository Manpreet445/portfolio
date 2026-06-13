/**
 * Procedural watercolor-paper grain.
 * A feTurbulence noise layer multiplied over the page for cold-press tooth —
 * no binary texture needed. Purely decorative, never interactive.
 */
export default function PaperGrain({
  className = "",
  opacity = 0.5,
}: {
  className?: string;
  opacity?: number;
}) {
  const noise = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`,
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 mix-blend-multiply ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,${noise}")`,
        backgroundSize: "180px 180px",
        opacity: opacity * 0.14,
      }}
    />
  );
}
