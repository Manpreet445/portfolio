import { profile } from "@/data/projects";

/** The back cover — a closing note + contact, echoing the coral cover. */
export default function Footer() {
  return (
    <footer className="desk-surface px-6 py-20 sm:py-28">
      <div className="mx-auto flex w-[min(94vw,1040px)] flex-col items-center gap-8 rounded-[18px] bg-coral px-8 py-14 text-center shadow-[var(--shadow-lift)]">
        <p className="font-hand text-3xl text-white/90">the end — for now.</p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Let&apos;s make something.
        </h2>
        <p className="max-w-md font-serif text-lg italic text-white/85">{profile.tagline}</p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="rounded-[6px] bg-white/95 px-4 py-2 font-display text-sm font-semibold text-coral-deep shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="mt-6 font-display text-xs uppercase tracking-[0.25em] text-white/70">
          {profile.name} · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
