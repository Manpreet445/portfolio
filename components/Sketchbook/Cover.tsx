import { profile } from "@/data/projects";
import PaperGrain from "@/components/ui/PaperGrain";

/**
 * The vibrant coral sketchbook cover — front face.
 * Woven cloth, hand-drawn line-art doodles embossed across the field, a
 * stitched off-centre title band, a realistic elastic strap and a ribbon
 * bookmark. The strap carries a data hook so the stage can slip it off.
 */
export default function Cover({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-full w-full select-none overflow-hidden rounded-l-[8px] rounded-r-[18px] bg-coral ${className}`}
      style={{ boxShadow: "var(--shadow-lift)" }}
    >
      {/* base lighting so the cloth is never flat */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 38% 30%, #ff7468 0%, var(--color-coral) 45%, var(--color-coral-deep) 100%)",
        }}
      />
      {/* woven cloth texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.32) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.22) 0 1px, transparent 1px 3px)",
        }}
      />
      <PaperGrain opacity={0.7} />

      {/* hand-drawn line-art filling the field */}
      <svg
        aria-hidden
        viewBox="0 0 900 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{ filter: "url(#rough)" }}
      >
        <g
          stroke="#ffd9d3"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        >
          {/* paintbrush */}
          <path d="M120 110 L210 210" />
          <path d="M205 200 q24 18 40 6 q12 -10 -2 -28 q-14 -16 -28 -6 q-14 10 -10 28 Z" fill="#ffd9d3" fillOpacity="0.18" />
          {/* potted sprig */}
          <path d="M150 470 q20 -60 0 -110 M150 470 q-26 -34 -54 -40 M150 470 q34 -26 64 -22" />
          <path d="M120 470 h60 l-8 46 h-44 Z" />
          {/* sun */}
          <circle cx="360" cy="130" r="34" />
          <path d="M360 80 v-22 M360 202 v-22 M410 130 h22 M310 130 h-22 M395 95 l16 -16 M325 165 l-16 16 M395 165 l16 16 M325 95 l-16 -16" />
          {/* spiral */}
          <path d="M250 350 q-30 -2 -30 28 q0 36 40 36 q48 0 48 -52 q0 -58 -64 -58" />
          {/* stars */}
          <path d="M430 330 l8 20 l21 1 l-16 13 l6 21 l-19 -12 l-19 12 l6 -21 l-16 -13 l21 -1 Z" />
          <path d="M120 300 l6 14 l15 1 l-12 9 l5 15 l-14 -9 l-13 9 l4 -15 l-11 -9 l15 -1 Z" />
          {/* scattered marks */}
          <path d="M420 470 q18 -16 36 0 t36 0" />
          <path d="M70 180 q14 -12 28 0" />
          <circle cx="470" cy="220" r="4" fill="#ffd9d3" />
          <circle cx="300" cy="470" r="4" fill="#ffd9d3" />
          <path d="M460 90 l24 0 M472 78 l0 24" />
        </g>
      </svg>

      {/* left binding + stitching */}
      <div aria-hidden className="absolute inset-y-0 left-0 w-3 bg-coral-deep/70" />
      <div
        aria-hidden
        className="absolute inset-y-3 left-[14px] w-px"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 6px, transparent 6px 12px)",
        }}
      />

      {/* off-centre stitched title band */}
      <div
        className="absolute inset-y-0 flex flex-col items-center justify-start bg-[#fcfbf8] px-3 pt-[14%]"
        style={{ left: "58%", width: "32%", boxShadow: "-14px 0 30px rgba(0,0,0,0.18)" }}
      >
        <span className="absolute left-0 top-0 h-full w-[6px] bg-tangerine" />
        {/* dashed stitch border */}
        <span
          aria-hidden
          className="absolute inset-2.5 rounded-[3px]"
          style={{
            border: "1.5px dashed rgba(43,43,43,0.28)",
            filter: "url(#rough)",
          }}
        />

        <div className="relative flex flex-col items-center gap-2 text-center">
          <span className="font-hand text-lg text-coral-deep">Nº 1</span>
          <span className="font-display text-[clamp(1.2rem,3.6vw,2.3rem)] font-bold leading-[0.92] tracking-tight text-ink">
            {profile.name.toUpperCase()}
          </span>
          <span className="h-px w-10 bg-coral" />
          <span className="font-display text-[clamp(0.48rem,1.1vw,0.66rem)] font-semibold uppercase tracking-[0.3em] text-ink-soft">
            {profile.role}
          </span>
          <span className="mt-5 font-hand text-[clamp(0.95rem,2.2vw,1.4rem)] leading-none text-coral-deep">
            the sketchbook
          </span>
          <span className="mt-1 font-display text-[0.55rem] uppercase tracking-[0.35em] text-ink-faint">
            est. 2026
          </span>
        </div>
      </div>

      {/* realistic elastic strap */}
      <div
        data-elastic
        className="absolute inset-y-0 z-10"
        style={{
          left: "80%",
          width: "16px",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.28) 0%, #d2742f 18%, var(--color-tangerine) 40%, #ffc089 50%, var(--color-tangerine) 62%, #c96a28 84%, rgba(0,0,0,0.28) 100%)",
          boxShadow: "0 0 14px rgba(0,0,0,0.28), inset 0 0 4px rgba(255,255,255,0.3)",
        }}
      />

      {/* ribbon bookmark peeking from the bottom */}
      <div
        aria-hidden
        className="absolute bottom-[-22px] z-0 h-12 w-3.5"
        style={{
          left: "30%",
          background: "linear-gradient(90deg, #d99a2b, var(--color-sun) 50%, #d99a2b)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)",
          boxShadow: "0 6px 8px rgba(0,0,0,0.18)",
        }}
      />

      {/* sheen + corner wear */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.16), transparent 26%)" }}
      />
      <span className="absolute bottom-5 left-7 h-7 w-7 rounded-full border-2 border-white/30" />
    </div>
  );
}

/** Inside front cover — revealed for a beat as the cover flips open. */
export function CoverInside() {
  return (
    <div className="page-paper relative h-full w-full overflow-hidden rounded-l-[8px] rounded-r-[18px]">
      <PaperGrain opacity={0.6} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-10 text-center">
        <span className="font-hand text-2xl text-ink-faint">this sketchbook belongs to</span>
        <span className="font-display text-3xl font-bold text-ink">{profile.name}</span>
        <span
          className="mt-2 rounded-[4px] px-4 py-2 font-hand text-lg text-ink-soft"
          style={{ border: "1.5px solid rgba(43,43,43,0.18)", filter: "url(#rough)" }}
        >
          {profile.email}
        </span>
      </div>
      {/* inner-cover shadow near the binding */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-16"
        style={{ background: "linear-gradient(270deg, rgba(43,43,43,0.12), transparent)" }}
      />
    </div>
  );
}
