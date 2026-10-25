/* Recepie case study — DRAFT, not on the site.

   Nothing imports this file, so none of it ships. To publish, write the
   prose below, then in data/projects.ts import it and add one line to the
   Recepie entry:

     import { recepieCaseStudy } from "@/data/case-studies/recepie";
     ...
     caseStudy: recepieCaseStudy,

   That alone creates /work/recepie, adds "Read case study" to the card and
   lists the page in the sitemap. */

import type { CaseStudy } from "@/data/projects";

export const recepieCaseStudy: CaseStudy = {
  // TODO(manpreet): replace every bracketed string below. Nothing here is real.
  heading: "[PLACEHOLDER — case study h1]",
  standfirst:
    "[PLACEHOLDER — one sentence under the title. Also used as the meta description, so keep it under ~155 characters.]",
  sections: [
    {
      eyebrow: "01 · Why I built it",
      title: "[PLACEHOLDER — section title]",
      paragraphs: [
        "[PLACEHOLDER — why I built it, paragraph 1. Prose, not bullets.]",
        "[PLACEHOLDER — paragraph 2. Add or remove array entries freely.]",
      ],
    },
    {
      eyebrow: "02 · The interesting problem",
      title: "[PLACEHOLDER — section title]",
      paragraphs: [
        "[PLACEHOLDER — the problem that turned out to be interesting, paragraph 1.]",
        "[PLACEHOLDER — paragraph 2.]",
      ],
    },
    {
      eyebrow: "03 · What I decided, and why",
      title: "[PLACEHOLDER — section title]",
      paragraphs: [
        "[PLACEHOLDER — the decisions and the reasoning, paragraph 1.]",
        "[PLACEHOLDER — paragraph 2.]",
      ],
    },
    {
      eyebrow: "04 · What I'd do differently",
      title: "[PLACEHOLDER — section title]",
      paragraphs: [
        "[PLACEHOLDER — what I'd do differently now, paragraph 1.]",
        "[PLACEHOLDER — paragraph 2.]",
      ],
    },
  ],
};
