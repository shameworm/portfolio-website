import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves a project repo under /<repo>/. If this ever moves to a
// user-site repo (shameworm.github.io) or a custom domain, set BASE to "/".
const SITE = "https://shameworm.github.io";
const BASE = "/portfolio-website";

export default defineConfig({
  site: SITE,
  base: BASE,
  // Fully static. The site ships no client framework at all.
  output: "static",
  trailingSlash: "ignore",
  vite: { plugins: [tailwindcss()] },
});
