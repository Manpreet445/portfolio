import { profile } from "@/data/projects";
import PaperGrain from "@/components/ui/PaperGrain";

/**
 * The vibrant coral sketchbook cover.
 * Flat cloth/canvas feel, off-centre white title band (~62% across) with a
 * thin accent stripe + an elastic strap. The strap and cover carry data hooks
 * so the stage timeline can slip the elastic off and lift the cover away.
 */
export default function Cover({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-l-[8px] rounded-r-[16px] bg-coral ${className}`}
      style={{ boxShadow: "var(--shadow-lift)" }}
    >
      {/* woven cloth texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px)",
        }}
      />
      {/* soft top sheen + spine shadow for cloth dimension */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,255,255,0.18), transparent 30%), linear-gradient(90deg, rgba(0,0,0,0.22) 0%, transparent 7%, transparent 93%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <PaperGrain opacity={0.4} />

      {/* off-centre white title band */}
      <div
        className="absolute inset-y-0 flex flex-col items-center justify-start bg-[#fcfbf8] px-3 pt-[16%]"
        style={{ left: "60%", width: "30%", boxShadow: "-10px 0 24px rgba(0,0,0,0.12)" }}
      >
        {/* thin accent stripe bordering the band (the "elastic" colour echo) */}
        <span className="absolute left-0 top-0 h-full w-[5px] bg-tangerine" />
        <span className="absolute left-[7px] top-0 h-full w-[2px] bg-sun/70" />

        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-display text-[clamp(1.1rem,3.4vw,2.1rem)] font-bold leading-[0.95] tracking-tight text-ink">
            {profile.name.toUpperCase()}
          </span>
          <span className="h-px w-8 bg-coral" />
          <span className="font-display text-[clamp(0.5rem,1.2vw,0.7rem)] font-medium uppercase tracking-[0.28em] text-ink-soft">
            {profile.role}
          </span>
          <span className="mt-6 font-hand text-[clamp(0.8rem,2vw,1.15rem)] text-coral-deep">
            the sketchbook
          </span>
        </div>
      </div>

      {/* elastic strap (slips off on open) */}
      <div
        data-elastic
        className="absolute inset-y-0 z-10"
        style={{
          left: "78%",
          width: "14px",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.15), var(--color-tangerine) 30%, #ffae6b 50%, var(--color-tangerine) 70%, rgba(0,0,0,0.15))",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      />

      {/* embossed maker dot */}
      <span className="absolute bottom-5 left-6 h-7 w-7 rounded-full border-2 border-white/40" />
    </div>
  );
}
