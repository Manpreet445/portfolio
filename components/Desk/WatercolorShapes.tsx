/* ------------------------------------------------------------------ *
   Abstract watercolour floaters for the hero.
   Soft pigment shapes with ragged bleed edges (url(#watercolor)) and a
   granulated pigment overlay — loose, painterly, a little abstract, with
   just a hint of ink line on top.
 * ------------------------------------------------------------------ */

type ShapeProps = { className?: string };

const wcStyle = { filter: "url(#watercolor-soft)" } as const;

function Granulate({ d, id }: { d: string; id: string }) {
  return (
    <g style={{ filter: "url(#wc-granulate)", mixBlendMode: "multiply" }}>
      <path d={d} fill={`url(#${id})`} opacity="0.5" />
    </g>
  );
}

export function WcSplash({ className = "" }: ShapeProps) {
  const d =
    "M70 20 C 120 8 168 34 170 78 C 172 120 150 150 108 162 C 64 174 22 150 14 108 C 6 66 26 34 70 20 Z";
  return (
    <svg viewBox="0 0 184 184" className={className} aria-hidden>
      <defs>
        <radialGradient id="wcA" cx="42%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#ff8b80" />
          <stop offset="60%" stopColor="#ff5a4d" />
          <stop offset="100%" stopColor="#e2473b" />
        </radialGradient>
      </defs>
      <g style={wcStyle}>
        <path d={d} fill="url(#wcA)" opacity="0.85" />
      </g>
      <Granulate d={d} id="wcA" />
      <path d="M58 70 q26 -16 54 4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function WcLeaf({ className = "" }: ShapeProps) {
  const d =
    "M100 14 C 150 40 168 110 120 168 C 96 150 60 150 36 168 C -12 110 50 40 100 14 Z";
  return (
    <svg viewBox="0 0 200 184" className={className} aria-hidden>
      <defs>
        <linearGradient id="wcL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5ed39a" />
          <stop offset="100%" stopColor="#1f9e63" />
        </linearGradient>
      </defs>
      <g style={wcStyle}>
        <path d={d} fill="url(#wcL)" opacity="0.82" />
      </g>
      <Granulate d={d} id="wcL" />
      <path d="M100 26 C 96 80 96 130 90 162" fill="none" stroke="#0f6b41" strokeWidth="2.5" opacity="0.4" />
    </svg>
  );
}

export function WcBrush({ className = "" }: ShapeProps) {
  const d =
    "M20 60 C 80 20 150 30 230 44 C 300 56 360 50 392 70 C 360 96 300 88 230 100 C 150 114 80 122 20 84 C 8 76 8 68 20 60 Z";
  return (
    <svg viewBox="0 0 400 140" className={className} aria-hidden>
      <defs>
        <linearGradient id="wcB" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffd56b" />
          <stop offset="55%" stopColor="#ffc93c" />
          <stop offset="100%" stopColor="#ff8a3d" />
        </linearGradient>
      </defs>
      <g style={{ filter: "url(#watercolor)" }}>
        <path d={d} fill="url(#wcB)" opacity="0.8" />
      </g>
      <Granulate d={d} id="wcB" />
    </svg>
  );
}

export function WcDrop({ className = "" }: ShapeProps) {
  const d = "M70 12 C 110 60 122 96 110 124 C 96 156 44 156 30 124 C 18 96 30 60 70 12 Z";
  return (
    <svg viewBox="0 0 140 168" className={className} aria-hidden>
      <defs>
        <radialGradient id="wcD" cx="44%" cy="40%" r="66%">
          <stop offset="0%" stopColor="#8fc3ef" />
          <stop offset="100%" stopColor="#4d9de0" />
        </radialGradient>
      </defs>
      <g style={wcStyle}>
        <path d={d} fill="url(#wcD)" opacity="0.8" />
      </g>
      <Granulate d={d} id="wcD" />
      <circle cx="56" cy="70" r="9" fill="#fff" opacity="0.45" />
    </svg>
  );
}

export function WcRing({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 180 180" className={className} aria-hidden style={{ filter: "url(#watercolor)" }}>
      <circle cx="90" cy="90" r="64" fill="none" stroke="#c98bd6" strokeWidth="20" opacity="0.5" />
      <circle cx="90" cy="90" r="64" fill="none" stroke="#a85fbd" strokeWidth="5" opacity="0.3" />
    </svg>
  );
}

export function WcArc({ className = "" }: ShapeProps) {
  const d = "M16 120 C 40 30 150 30 188 120 C 150 96 54 96 16 120 Z";
  return (
    <svg viewBox="0 0 204 140" className={className} aria-hidden>
      <defs>
        <linearGradient id="wcAr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff8b80" />
          <stop offset="100%" stopColor="#ffb56b" />
        </linearGradient>
      </defs>
      <g style={wcStyle}>
        <path d={d} fill="url(#wcAr)" opacity="0.78" />
      </g>
      <Granulate d={d} id="wcAr" />
    </svg>
  );
}
