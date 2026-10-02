"use client";

import { useSyncExternalStore } from "react";

export const DESKTOP_MOTION_QUERY =
  "(min-width: 1024px) and (min-height: 720px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(DESKTOP_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useDesktopMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_MOTION_QUERY).matches,
    () => false,
  );
}
