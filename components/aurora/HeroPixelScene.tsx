"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const VIDEO_SRC = "/hero-pixel-scene.mp4";
const VIDEO_SRC_PORTRAIT = "/hero-pixel-scene-portrait.mp4";
const POSTER = "/hero-pixel-scene.webp";
const POSTER_PORTRAIT = "/hero-pixel-scene-portrait.webp";
const PORTRAIT_QUERY = "(max-aspect-ratio: 3/4)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };
type Mode = "video-portrait" | "video-landscape" | "still-portrait" | "still-landscape";

function connection() {
  return (navigator as Navigator & { connection?: Connection }).connection;
}

function displayMode(): Mode {
  const portrait = window.matchMedia(PORTRAIT_QUERY).matches;
  const conn = connection();
  const still = window.matchMedia(REDUCED_QUERY).matches || conn?.saveData ||
    conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g";
  return `${still ? "still" : "video"}-${portrait ? "portrait" : "landscape"}`;
}

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(PORTRAIT_QUERY), window.matchMedia(REDUCED_QUERY)];
  const conn = connection();
  queries.forEach((query) => query.addEventListener("change", onChange));
  conn?.addEventListener("change", onChange);
  window.addEventListener("resize", onChange, { passive: true });
  window.addEventListener("orientationchange", onChange, { passive: true });
  window.addEventListener("pageshow", onChange);
  return () => {
    queries.forEach((query) => query.removeEventListener("change", onChange));
    conn?.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
    window.removeEventListener("orientationchange", onChange);
    window.removeEventListener("pageshow", onChange);
  };
}

// Send a responsive still first; never autoplay before preferences are known.
const serverMode = (): Mode => "still-landscape";

export default function HeroPixelScene({ className = "" }: { className?: string }) {
  const mode = useSyncExternalStore(subscribe, displayMode, serverMode);
  const portrait = mode.endsWith("portrait");
  const src = portrait ? VIDEO_SRC_PORTRAIT : VIDEO_SRC;
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const showStill = mode.startsWith("still") || failedSource === src;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || showStill) return;

    const syncPlayback = () => {
      const hero = video.closest("section");
      const cutoff = Math.min(hero?.offsetHeight ?? window.innerHeight, window.innerHeight) * 0.95;
      if (document.hidden || window.scrollY > cutoff) video.pause();
      else void video.play().catch(() => {
        // Autoplay may require a user gesture. The matching poster stays visible.
      });
    };
    syncPlayback();
    video.addEventListener("loadeddata", syncPlayback);
    video.addEventListener("canplay", syncPlayback);
    window.addEventListener("pointerdown", syncPlayback, { passive: true });
    window.addEventListener("touchstart", syncPlayback, { passive: true });
    window.addEventListener("scroll", syncPlayback, { passive: true });
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      video.pause();
      video.removeEventListener("loadeddata", syncPlayback);
      video.removeEventListener("canplay", syncPlayback);
      window.removeEventListener("pointerdown", syncPlayback);
      window.removeEventListener("touchstart", syncPlayback);
      window.removeEventListener("scroll", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [src, showStill]);

  if (showStill) {
    return (
      <picture>
        <source srcSet={POSTER_PORTRAIT} media={PORTRAIT_QUERY} />
        <img src={POSTER} alt="" className={`pixel-art h-full w-full object-cover ${className}`} />
      </picture>
    );
  }

  return (
    <video
      key={src}
      ref={videoRef}
      src={src}
      poster={portrait ? POSTER_PORTRAIT : POSTER}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      onError={() => setFailedSource(src)}
      className={`pixel-art h-full w-full object-cover ${className}`}
    />
  );
}
