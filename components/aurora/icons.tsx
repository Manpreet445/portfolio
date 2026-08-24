/* One icon family: 24px grid, stroke 1.75, round caps — no emoji, ever. */

import type { SVGProps } from "react";

function base(props: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v16m0 0 6-6m-6 6-6-6" />
    </svg>
  );
}

export function MapPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function Mail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 7.4 5.4a2 2 0 0 0 2.2 0L20.5 7" />
    </svg>
  );
}

export function GitHub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function LinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M7 10.5v6M7 7.6v.1M11 16.5v-3.7a2.5 2.5 0 0 1 5 0v3.7M11 10.5v1.3" />
    </svg>
  );
}

/* Skill icons — mapped from data/projects.ts `icon` keys */

export function Layout(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M9.5 9.5V20" />
    </svg>
  );
}

export function Stack(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
      <path d="m4.5 11.3-1.5.7 9 4.5 9-4.5-1.5-.7M4.5 15.8 3 16.5l9 4.5 9-4.5-1.5-.7" />
    </svg>
  );
}

export function Pen(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="m14.5 5.5 4 4L8 20l-5 1 1-5L14.5 5.5ZM12.5 7.5l4 4M17 3l4 4" />
    </svg>
  );
}

export function Bolt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H13L13 2Z" />
    </svg>
  );
}

export function Spark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}

export function Code(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="m8 8-5 4 5 4M16 8l5 4-5 4M13.5 5l-3 14" />
    </svg>
  );
}
