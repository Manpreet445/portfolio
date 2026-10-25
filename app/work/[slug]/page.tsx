/* The long-form write-up behind a project card — the site's only reading page.

   A dynamic segment rather than a hardcoded /work/recepie, because `slug`
   already exists on every project: a case study is a data edit, not a new
   file. Only projects that actually carry one get a route, so there are no
   empty pages, and `dynamicParams = false` makes any other slug a 404 rather
   than a server render — the site stays fully static.

   The chrome is deliberately quieter than the homepage: the pixel cursor and
   the tap burst are flourishes that fight a long read, so they stay behind. */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Providers from "@/components/Providers";
import AuroraBackdrop from "@/components/aurora/AuroraBackdrop";
import Nav from "@/components/aurora/Nav";
import SmoothScroll from "@/components/aurora/SmoothScroll";
import ScrollProgress from "@/components/aurora/ScrollProgress";
import { Reveal, RevealGroup, PopItem, SectionHeading } from "@/components/aurora/Reveal";
import { ArrowDown, ArrowUpRight, GitHub } from "@/components/aurora/icons";

export const dynamicParams = false;

/** The root's share card, served by its own generated route. */
const OG_IMAGE = "/opengraph-image.jpg";

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

function findStudy(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  return project?.caseStudy ? { project, study: project.caseStudy } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findStudy(slug);
  if (!found) return {};

  /* Relative paths resolve against metadataBase (the production origin), so
     a preview deployment still advertises the real address. */
  const title = `${found.project.title} — case study`;
  const description = found.study.standfirst;
  const path = `/work/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    /* The share card has to be named here. A file-convention
       opengraph-image belongs to its own route segment and is not inherited
       by nested ones, so the root's image covers "/" alone — without this,
       a shared case study link would preview with no image at all. The
       generated route serves it at a stable path, so it is reused rather
       than duplicated into this segment.

       twitter likewise has to be restated: overriding openGraph does not
       touch the root's twitter tags, which would keep the homepage's title. */
    openGraph: { type: "article", title, description, url: path, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findStudy(slug);
  if (!found) notFound();
  const { project, study } = found;

  return (
    <Providers>
      <SmoothScroll />
      <ScrollProgress />
      <Nav linkBase="/" />
      <main id="main" className="relative overflow-clip bg-night">
        <AuroraBackdrop />
        <article className="relative mx-auto max-w-6xl px-5 pt-32 pb-24 md:px-6 md:pt-40 md:pb-32">
          <Reveal>
            <Link
              href="/#work"
              /* -my-2 keeps the 44px hit area from adding visible space */
              className="action-link -my-2 inline-flex min-h-11 items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.18em] text-ember-bright"
            >
              <ArrowDown className="h-4 w-4 rotate-90" aria-hidden />
              Back to selected work
            </Link>

            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] font-semibold text-fog">
              {study.heading}
            </h1>
            <p className="case-standfirst mt-5">{study.standfirst}</p>

            <p className="mt-6 font-mono text-xs text-dust">
              {project.role} · {project.year}
            </p>
          </Reveal>

          <RevealGroup
            as="ul"
            aria-label={`${project.title} technologies`}
            className="mt-6 flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <PopItem key={tag} as="li" className="tech-chip">
                {tag}
              </PopItem>
            ))}
          </RevealGroup>

          {(project.live || project.repo) && (
            <Reveal className="project-links mt-8">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="action-link text-ember-bright"
                >
                  Visit live app <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only"> — {project.title} (opens in a new tab)</span>
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="action-link text-mist"
                >
                  <GitHub className="h-4 w-4" /> View source
                  <span className="sr-only"> — {project.title} (opens in a new tab)</span>
                </a>
              )}
            </Reveal>
          )}

          {study.sections.map((section, i) => {
            const id = `case-section-${i + 1}`;
            return (
              <section key={section.eyebrow} aria-labelledby={id} className="mt-20 md:mt-28">
                <SectionHeading id={id} eyebrow={section.eyebrow} title={section.title} />
                <Reveal className="case-prose mt-8">
                  {section.paragraphs.map((paragraph, p) => (
                    <p key={p}>{paragraph}</p>
                  ))}
                </Reveal>
              </section>
            );
          })}
        </article>
      </main>
    </Providers>
  );
}
