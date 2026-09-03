/* The canonical origin, in one place — three files needed it and had drifted
   into three copies of the same mistake.

   VERCEL_URL is the wrong variable to build a canonical URL from: Vercel
   sets it to the hostname of the individual deployment, which is unique to
   every push. So og:url, the canonical link and every sitemap entry were
   advertising an address that changed each time anything shipped, and that
   a share preview would pin to a one-off deployment rather than the site.

   VERCEL_PROJECT_PRODUCTION_URL is the project's stable production domain,
   which is what canonical means. It is set on preview deployments too, so
   previews point at production rather than at themselves — correct, since
   a preview is not the address anyone should be linking to.

   NEXT_PUBLIC_SITE_URL overrides both, and is the one to set the moment a
   custom domain exists. VERCEL_URL stays only as a last resort, for a
   deployment where the production domain is somehow unavailable. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
