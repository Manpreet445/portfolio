"use client";

/* The hero background: a lofi pixel scene (public/hero-pixel-scene.png)
   animated live on <canvas> like a retro sprite sheet.

   - ~7 fps stepped timer: pixels SNAP between discrete states. No easing,
     no interpolation, no motion blur, camera fully locked.
   - 36-tick loop (~5.1s); tick 36 ≡ tick 0 so the loop is seamless.
   - Only five things move: typing hands, a blink-and-rest of the eyes,
     the cat's breathing, the mug steam, and a few window stars.
   - prefers-reduced-motion: the static frame is drawn once, nothing moves.
   - If the image file is missing the component renders nothing, so the
     page degrades gracefully to the plain starfield backdrop.

   All region coordinates are in source-image pixels (1408×768) and live
   in SCENE below so they can be nudged without touching the logic. */

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/hero-pixel-scene.mp4";

const FPS = 7;
const TICKS = 36; // 36 ticks @ 7fps ≈ 5.1s

const SCENE = {
  src: "/hero-pixel-scene.webp",
  w: 1408,
  h: 768,

  /* 1 — typing: two hand patches nudged down 3px on alternating ticks */
  hands: {
    left: { x: 362, y: 492, w: 78, h: 56 },
    right: { x: 444, y: 492, w: 74, h: 56 },
    activeTicks: [1, 11], // ~1.5s burst, then hands rest
    step: 3,
  },

  /* 2 — eyes: covered with sampled skin + a dark closed-lid line */
  eye: {
    box: { x: 480, y: 334, w: 28, h: 28 },
    skinSample: { x: 512, y: 348 },
    lid: { x: 482, y: 347, w: 22, h: 4 },
    lidColor: "#2a1a12",
    closedTicks: [15, 22], // ~1s of quiet thinking
  },

  /* 3 — cat: upper body shifts up 1-2px through one slow breath */
  cat: {
    body: { x: 352, y: 374, w: 142, h: 52 },
    // tick → pixel rise; anything not listed = 0
    rise: { 7: 1, 8: 1, 9: 1, 10: 1, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 1, 22: 1, 23: 1, 24: 1 } as Record<number, number>,
  },

  /* 4 — steam: inpaint the painted steam out of the background once,
     then cycle 3 hand-drawn patterns over the clean patch */
  steam: {
    box: { x: 214, y: 468, w: 52, h: 64 },
    color: "rgba(243,237,218,0.85)",
    // three frames of chunky steam pixels, coords relative to box origin
    frames: [
      [ [22, 44, 4, 8], [18, 30, 4, 8], [24, 16, 4, 8], [20, 4, 4, 6] ],
      [ [18, 44, 4, 8], [24, 30, 4, 8], [18, 16, 4, 8], [26, 4, 4, 6] ],
      [ [22, 40, 4, 8], [20, 24, 4, 8], [26, 10, 4, 8] ],
    ] as [number, number, number, number][][],
    cycle: 9, // pattern advances every 3 ticks; 9 | 36 keeps the loop seamless
  },

  /* 5 — stars: individual pixels toggling dim/bright, 2-3 lit at a time */
  stars: {
    color: "#f3edda",
    size: 3,
    cycle: 12, // 12 | 36 keeps the loop seamless
    points: [
      { x: 700, y: 104, phase: 0 },
      { x: 838, y: 88, phase: 4 },
      { x: 1000, y: 128, phase: 8 },
      { x: 1176, y: 120, phase: 2 },
      { x: 902, y: 152, phase: 6 },
      { x: 1246, y: 92, phase: 10 },
    ],
  },
};

/** Prefers the generated sprite video; falls back to the live canvas
    animation when the video is missing, and to the still frame when the
    user prefers reduced motion. */
export default function HeroPixelScene({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    /* Respect Data Saver and slow links: the loop is ~800KB of decoration,
       so on a metered or 2g/3g connection show the 49KB still instead. */
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData || /2g|3g/.test(conn?.effectiveType ?? "")) {
      setVideoFailed(true);
    }
  }, []);

  /* Some browsers ignore the autoPlay attribute until nudged; retry when
     the video reports it can play, and only if playback is still blocked
     after that, hand off to the canvas fallback. Also pause the loop while
     the hero is scrolled off-screen to save battery and bandwidth. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed || reduced) return;
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener("canplay", tryPlay);
    const timer = window.setTimeout(() => {
      // only a video that never started counts as blocked — a pause from
      // the visibility observer is not a failure
      if (video.paused && video.currentTime === 0) setVideoFailed(true);
    }, 4000);

    /* The hero is sticky-pinned, so it never leaves the viewport in the
       usual sense — but once the curtain has scrolled over it (~1 screen)
       it's fully hidden. Pause decoding there: it's invisible and frees the
       main thread for the rest of the page's scroll. */
    let covered = false;
    const onScroll = () => {
      const shouldCover = window.scrollY > window.innerHeight * 0.95;
      if (shouldCover === covered) return;
      covered = shouldCover;
      if (covered) video.pause();
      else tryPlay();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // pause when the tab is backgrounded too
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (!covered) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [videoFailed, reduced]);

  if (reduced) {
    /* eslint-disable-next-line @next/next/no-img-element -- decorative
       full-bleed pixel art; next/image would re-smooth and lazy-load it */
    return (
      <img
        src={SCENE.src}
        srcSet={`/hero-pixel-scene-sm.webp 760w, ${SCENE.src} 1280w`}
        sizes="100vw"
        alt=""
        aria-hidden
        className={`pixel-art h-full w-full object-cover ${className}`}
      />
    );
  }

  if (!videoFailed) {
    return (
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={SCENE.src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        onError={() => setVideoFailed(true)}
        className={`pixel-art h-full w-full object-cover ${className}`}
      />
    );
  }

  return <CanvasScene className={className} />;
}

function CanvasScene({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.src = SCENE.src;
    let timer = 0;

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = false;

      // Sample fill colors once from the pristine frame
      ctx.drawImage(img, 0, 0);
      const px = (p: { x: number; y: number }) => {
        const d = ctx.getImageData(p.x, p.y, 1, 1).data;
        return `rgb(${d[0]},${d[1]},${d[2]})`;
      };
      const skin = px(SCENE.eye.skinSample);

      /* Build a steam-free background patch once: the painted steam rises
         in front of the laptop and desk clutter, so a flat-color erase
         would smear. Instead, replace each bright steam pixel with its
         nearest non-bright left neighbor (falling back to the pixel
         above), which makes the curl vanish into whatever is behind it. */
      const sbox = SCENE.steam.box;
      const steamPatch = ctx.getImageData(sbox.x, sbox.y, sbox.w, sbox.h);
      {
        const d = steamPatch.data;
        const bright = (i: number) =>
          d[i] > 170 && d[i + 1] > 160 && d[i + 2] > 140;
        for (let y = 0; y < sbox.h; y++) {
          for (let x = 0; x < sbox.w; x++) {
            const i = (y * sbox.w + x) * 4;
            if (!bright(i)) continue;
            let k = x - 1;
            while (k >= 0 && bright((y * sbox.w + k) * 4)) k--;
            const j =
              k >= 0
                ? (y * sbox.w + k) * 4
                : y > 0
                  ? ((y - 1) * sbox.w + x) * 4
                  : i;
            d[i] = d[j];
            d[i + 1] = d[j + 1];
            d[i + 2] = d[j + 2];
          }
        }
      }
      setReady(true);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return; // static frame stays

      const draw = (tick: number) => {
        // full restore, then patch the five regions — camera stays locked
        ctx.drawImage(img, 0, 0);

        // 4 — steam (always cycling): clean patch, then this tick's frame
        ctx.putImageData(steamPatch, sbox.x, sbox.y);
        const pattern =
          SCENE.steam.frames[
            Math.floor((tick % SCENE.steam.cycle) / 3) % SCENE.steam.frames.length
          ];
        ctx.fillStyle = SCENE.steam.color;
        for (const [rx, ry, rw, rh] of pattern) {
          ctx.fillRect(sbox.x + rx, sbox.y + ry, rw, rh);
        }

        // 5 — stars
        ctx.fillStyle = SCENE.stars.color;
        for (const star of SCENE.stars.points) {
          const on = (tick + star.phase) % SCENE.stars.cycle < SCENE.stars.cycle / 2;
          if (on) ctx.fillRect(star.x, star.y, SCENE.stars.size, SCENE.stars.size);
        }

        // 3 — cat breath: redraw upper body shifted up in whole pixels
        const rise = SCENE.cat.rise[tick] ?? 0;
        if (rise > 0) {
          const c = SCENE.cat.body;
          ctx.drawImage(img, c.x, c.y, c.w, c.h, c.x, c.y - rise, c.w, c.h);
        }

        // 1 — typing: alternate hands snap down `step` px, then rest
        const [t0, t1] = SCENE.hands.activeTicks;
        if (tick >= t0 && tick <= t1) {
          const hand = tick % 2 === 0 ? SCENE.hands.left : SCENE.hands.right;
          ctx.drawImage(
            img, hand.x, hand.y, hand.w, hand.h,
            hand.x, hand.y + SCENE.hands.step, hand.w, hand.h,
          );
        }

        // 2 — closed eyes while resting
        const [e0, e1] = SCENE.eye.closedTicks;
        if (tick >= e0 && tick <= e1) {
          const b = SCENE.eye.box;
          ctx.fillStyle = skin;
          ctx.fillRect(b.x, b.y, b.w, b.h);
          const lid = SCENE.eye.lid;
          ctx.fillStyle = SCENE.eye.lidColor;
          ctx.fillRect(lid.x, lid.y, lid.w, lid.h);
        }
      };

      /* 7fps stepped clock. A plain interval (not rAF) so the sprite keeps
         time even when the compositor throttles animation frames; ticks are
         derived from elapsed time, so timing never drifts. */
      let last = -1;
      const start = performance.now();
      const step = () => {
        const tick =
          Math.floor(((performance.now() - start) / 1000) * FPS) % TICKS;
        if (tick !== last) {
          last = tick;
          draw(tick);
        }
      };
      step();
      timer = window.setInterval(step, 1000 / FPS / 2);
    };

    return () => window.clearInterval(timer);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pixel-art h-full w-full object-cover transition-opacity duration-500 ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
