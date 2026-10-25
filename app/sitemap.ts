import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({
        url: `${SITE_URL}/work/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.8,
      })),
  ];
}
