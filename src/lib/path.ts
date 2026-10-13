/**
 * Prefix a root-relative path with Astro's configured base.
 *
 * GitHub Pages serves a project repo under /<repo>/, so every absolute
 * path has to account for it. Returns "/foo" when base is "/", and
 * "/portfolio-website/foo" when it is not.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
