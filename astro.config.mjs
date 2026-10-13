import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Fully static. The site ships no client framework at all.
  output: "static",
  vite: { plugins: [tailwindcss()] },
});
