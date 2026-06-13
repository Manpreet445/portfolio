import type { ProjectImage } from "@/data/projects";

const TONE_HEX: Record<NonNullable<ProjectImage["tone"]>, string> = {
  coral: "#ff5a4d",
  sun: "#ffc93c",
  sky: "#4d9de0",
  leaf: "#2bb673",
};

/**
 * A procedural, flat-illustrated "printed mockup" used in place of real
 * screenshots while building. Swap by adding `src` to the ProjectImage.
 */
export default function Mockup({ image }: { image: ProjectImage }) {
  const tone = TONE_HEX[image.tone ?? "coral"];
  const kind = image.mockup ?? "web";

  return (
    <svg
      viewBox="0 0 320 220"
      className="h-full w-full"
      role="img"
      aria-label={image.alt}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="320" height="220" fill="#fdfcf9" />

      {kind === "mobile" && (
        <g>
          <rect x="116" y="18" width="88" height="184" rx="16" fill="#fff" stroke="#e6e0d4" />
          <rect x="116" y="18" width="88" height="40" rx="16" fill={tone} />
          <rect x="116" y="46" width="88" height="12" fill={tone} />
          <circle cx="160" cy="34" r="9" fill="#fff" opacity="0.85" />
          <rect x="128" y="70" width="64" height="10" rx="5" fill="#ece6da" />
          <rect x="128" y="88" width="48" height="8" rx="4" fill="#f0ebe0" />
          <rect x="128" y="108" width="64" height="34" rx="8" fill={tone} opacity="0.18" />
          <rect x="128" y="150" width="64" height="34" rx="8" fill={tone} opacity="0.12" />
        </g>
      )}

      {kind === "web" && (
        <g>
          <rect x="26" y="26" width="268" height="168" rx="10" fill="#fff" stroke="#e6e0d4" />
          <rect x="26" y="26" width="268" height="26" rx="10" fill="#f3eee3" />
          <circle cx="42" cy="39" r="4" fill={tone} />
          <circle cx="56" cy="39" r="4" fill="#e6e0d4" />
          <circle cx="70" cy="39" r="4" fill="#e6e0d4" />
          <rect x="44" y="68" width="120" height="16" rx="6" fill="#e9e3d6" />
          <rect x="44" y="92" width="170" height="8" rx="4" fill="#f0ebe0" />
          <rect x="44" y="106" width="150" height="8" rx="4" fill="#f0ebe0" />
          <rect x="44" y="132" width="74" height="26" rx="13" fill={tone} />
          <rect x="206" y="68" width="64" height="92" rx="8" fill={tone} opacity="0.16" />
        </g>
      )}

      {kind === "dashboard" && (
        <g>
          <rect x="20" y="22" width="280" height="176" rx="10" fill="#fff" stroke="#e6e0d4" />
          <rect x="20" y="22" width="64" height="176" rx="10" fill="#f6f1e7" />
          <circle cx="40" cy="44" r="5" fill={tone} />
          <rect x="52" y="40" width="22" height="7" rx="3" fill="#e6e0d4" />
          <rect x="32" y="64" width="42" height="6" rx="3" fill="#ece6da" />
          <rect x="32" y="78" width="42" height="6" rx="3" fill="#ece6da" />
          <rect x="100" y="40" width="84" height="44" rx="8" fill={tone} opacity="0.15" />
          <rect x="196" y="40" width="84" height="44" rx="8" fill="#f3eee3" />
          <polyline
            points="104,150 130,128 156,140 182,108 208,120 234,92 272,104"
            fill="none"
            stroke={tone}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="100" y1="170" x2="280" y2="170" stroke="#eee7da" strokeWidth="2" />
        </g>
      )}

      {kind === "chart" && (
        <g>
          <rect x="26" y="26" width="268" height="168" rx="10" fill="#fff" stroke="#e6e0d4" />
          <rect x="46" y={130} width="26" height="48" rx="4" fill={tone} opacity="0.85" />
          <rect x="86" y={104} width="26" height="74" rx="4" fill={tone} opacity="0.6" />
          <rect x="126" y={142} width="26" height="36" rx="4" fill={tone} opacity="0.5" />
          <rect x="166" y={88} width="26" height="90" rx="4" fill={tone} opacity="0.75" />
          <rect x="206" y={116} width="26" height="62" rx="4" fill={tone} opacity="0.55" />
          <rect x="246" y={70} width="26" height="108" rx="4" fill={tone} />
          <line x1="40" y1="178" x2="284" y2="178" stroke="#eee7da" strokeWidth="2" />
          <rect x="46" y="48" width="90" height="12" rx="6" fill="#e9e3d6" />
        </g>
      )}
    </svg>
  );
}
