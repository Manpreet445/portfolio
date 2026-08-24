/* A thin pixel skyline silhouette — the crown of the curtain. Transparent
   background, so whatever sits behind (the hero video) shows between the
   buildings. Pure decoration. */

const WINDOWS: [number, number][] = [
  [20, 12],
  [52, 10],
  [95, 8],
  [122, 16],
  [158, 10],
  [188, 12],
  [219, 8],
];

export default function SkylineDivider() {
  return (
    <div aria-hidden className="relative">
      <svg
        className="pixel-art block h-7 w-full"
        viewBox="0 0 240 28"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
      >
        <g fill="var(--color-abyss)">
          <rect x="0" y="12" width="16" height="16" />
          <rect x="16" y="6" width="13" height="22" />
          <rect x="29" y="14" width="19" height="14" />
          <rect x="48" y="4" width="14" height="24" />
          <rect x="62" y="16" width="10" height="12" />
          <rect x="72" y="10" width="18" height="18" />
          <rect x="90" y="2" width="16" height="26" />
          <rect x="106" y="12" width="12" height="16" />
          <rect x="118" y="8" width="22" height="20" />
          <rect x="140" y="15" width="14" height="13" />
          <rect x="154" y="5" width="12" height="23" />
          <rect x="166" y="11" width="18" height="17" />
          <rect x="184" y="7" width="14" height="21" />
          <rect x="198" y="13" width="16" height="15" />
          <rect x="214" y="3" width="14" height="25" />
          <rect x="228" y="12" width="12" height="16" />
        </g>
        <g fill="var(--color-ember)" opacity="0.75">
          {WINDOWS.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="2" height="2" />
          ))}
        </g>
      </svg>
    </div>
  );
}
