# Portfolio — Dmytro Omelchenko

Static personal site. Astro, Tailwind v4, zero client-side JavaScript.

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built output |
| `npm run check` | Astro type check |
| `npm run verify` | Reduced motion, keyboard, overflow and schematic checks against a running `preview` |

## Design system

"Triptych" — Renaissance chiaroscuro with machined geometry. Tokens live in
`src/styles/globals.css`:

- **One light source** for the whole document, off-screen top-left (`.page-light`).
  Per-section gradients were six stacked sources and banded visibly.
- **One chamfer** — 45°, 14px, cut top-left and bottom-right only. Four-corner
  chamfers are what make sci-fi UI kits look generic.
- **Gold budget** — roughly one gold element per viewport of scroll. Brass is
  spent on structure (panel edges, hairlines, key numbers), not scattered accents.
- **No scanlines.** They hurt legibility and read as fan art.

Type: Archivo (display, width axis), Source Serif 4 (case prose), IBM Plex Mono
(all metadata). Self-hosted via `@fontsource`; the latin cuts are preloaded in
`src/layouts/Base.astro` because the swap was measurably shifting layout.

## Content

All copy is typed data in `src/content/`. Case bodies are in `cases.ts`.

**Content-safety rule:** case prose and schematic labels describe architectural
patterns and publicly observable behaviour only — never proprietary internals,
schemas, prompts, or customer data.

## Before launch

- [ ] Review all three case pages: the build sections are reconstructed from CV
      bullets and the retrospectives need rewriting in Dmytro's own words.
- [ ] Add an OG image at `public/og.png` and reference it in `Base.astro`.
- [ ] Set the production domain.
