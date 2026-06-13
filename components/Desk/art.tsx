/* ------------------------------------------------------------------ *
   Flat-illustrated desk objects (inline SVG).
   Depth = soft diffuse drop-shadows + layering, never perspective.
 * ------------------------------------------------------------------ */

const softShadow = { filter: "drop-shadow(0 10px 14px rgba(43,43,43,0.16))" };

type ArtProps = { className?: string };

export function Plant({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 120 140" className={className} style={softShadow} aria-hidden>
      {/* leaves */}
      <g fill="var(--color-leaf)">
        <path d="M60 70 C 40 52, 36 22, 52 8 C 64 28, 66 50, 60 70 Z" />
        <path d="M60 72 C 80 50, 96 40, 110 46 C 96 66, 78 76, 60 72 Z" fill="#229e63" />
        <path d="M60 72 C 40 56, 18 50, 8 58 C 26 76, 46 80, 60 72 Z" fill="#34c47e" />
        <path d="M60 74 C 58 50, 70 24, 88 18 C 86 44, 76 66, 60 74 Z" fill="#2bb673" />
      </g>
      {/* pot */}
      <path d="M34 74 H86 L78 128 C 77 134, 72 138, 66 138 H54 C 48 138, 43 134, 42 128 Z" fill="#e08a5b" />
      <rect x="30" y="68" width="60" height="12" rx="4" fill="#d97a48" />
      <path d="M34 74 H86 L84 88 H36 Z" fill="#ffffff" opacity="0.12" />
    </svg>
  );
}

export function Brush({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 40 200" className={className} style={softShadow} aria-hidden>
      <rect x="15" y="20" width="10" height="120" rx="5" fill="#b9772e" />
      <rect x="15" y="20" width="4" height="120" fill="#d9933f" />
      <rect x="13" y="130" width="14" height="26" rx="3" fill="#c9ccd1" />
      <rect x="13" y="136" width="14" height="3" fill="#9aa0a6" />
      <rect x="13" y="146" width="14" height="3" fill="#9aa0a6" />
      <path d="M14 154 H26 L24 192 C 23 196, 17 196, 16 192 Z" fill="var(--color-coral)" />
    </svg>
  );
}

export function BrushBlue({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 40 200" className={className} style={softShadow} aria-hidden>
      <rect x="15" y="20" width="10" height="120" rx="5" fill="#2b2b2b" />
      <rect x="15" y="20" width="4" height="120" fill="#444" />
      <rect x="13" y="130" width="14" height="26" rx="3" fill="#c9ccd1" />
      <rect x="13" y="136" width="14" height="3" fill="#9aa0a6" />
      <path d="M14 154 H26 L24 192 C 23 196, 17 196, 16 192 Z" fill="var(--color-sky)" />
    </svg>
  );
}

export function PaintTube({ className = "", tone = "var(--color-sun)" }: ArtProps & { tone?: string }) {
  return (
    <svg viewBox="0 0 70 150" className={className} style={softShadow} aria-hidden>
      <path d="M14 36 H56 V128 C 56 138, 48 144, 35 144 C 22 144, 14 138, 14 128 Z" fill="#f4f1ea" stroke="#e3ddcf" strokeWidth="2" />
      <rect x="14" y="44" width="42" height="46" fill={tone} />
      <path d="M22 36 L26 20 H44 L48 36 Z" fill="#c9ccd1" />
      <rect x="29" y="6" width="12" height="16" rx="3" fill="#9aa0a6" />
      <circle cx="35" cy="67" r="11" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}

export function Pencil({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 200 30" className={className} style={softShadow} aria-hidden>
      <rect x="28" y="9" width="150" height="12" rx="2" fill="var(--color-sun)" />
      <rect x="28" y="9" width="150" height="4" fill="#ffd766" />
      <path d="M28 9 L10 15 L28 21 Z" fill="#f0d9b5" />
      <path d="M16 13 L10 15 L16 17 Z" fill="#2b2b2b" />
      <rect x="178" y="9" width="12" height="12" fill="#e6e0d4" />
      <rect x="190" y="9" width="10" height="12" rx="3" fill="#ff9aa8" />
    </svg>
  );
}

export function Eraser({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 80 50" className={className} style={softShadow} aria-hidden>
      <rect x="4" y="10" width="72" height="32" rx="6" fill="#ff9aa8" />
      <rect x="4" y="10" width="72" height="12" rx="6" fill="#ffb3bd" />
      <rect x="30" y="10" width="20" height="32" fill="#ffffff" opacity="0.35" />
    </svg>
  );
}

export function Paperclip({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 40 90" className={className} style={softShadow} aria-hidden>
      <path
        d="M14 14 V64 C 14 76, 32 76, 32 64 V20 C 32 10, 18 10, 18 20 V60"
        fill="none"
        stroke="#b8bcc2"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoffeeRing({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="44" fill="none" stroke="#b07a4e" strokeWidth="6" opacity="0.18" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#8a5a32" strokeWidth="2" opacity="0.12" />
    </svg>
  );
}

export function Roller({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 120 70" className={className} style={softShadow} aria-hidden>
      <rect x="10" y="12" width="80" height="22" rx="11" fill="var(--color-coral-soft)" />
      <rect x="10" y="12" width="80" height="22" rx="11" fill="var(--color-coral)" opacity="0.4" />
      <rect x="86" y="20" width="22" height="6" rx="3" fill="#9aa0a6" />
      <path d="M104 18 H112 V34 C 112 40, 104 40, 104 34 Z" fill="#b9772e" />
    </svg>
  );
}
