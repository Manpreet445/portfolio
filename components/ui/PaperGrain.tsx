/**
 * Procedural watercolor-paper grain.
 * A feTurbulence noise layer multiplied over the page for cold-press tooth —
 * no binary texture needed. Purely decorative, never interactive.
 */
export default function PaperGrain({
  className = "",
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  const noise = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`,
  );

  return (
    <>
      {/* cold-press tooth */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 mix-blend-multiply ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,${noise}")`,
          backgroundSize: "220px 220px",
          opacity: opacity * 0.22,
        }}
      />
      {/* soft warm vignette so the sheet reads as lit, not flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 38%, transparent 55%, rgba(150,130,98,0.12) 100%)",
        }}
      />
    </>
  );
}
