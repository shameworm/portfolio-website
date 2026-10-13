/** Landing-page summaries. Full case bodies live in src/content/cases/. */

export const work = [
  {
    slug: "sequenzy-ai",
    /** A classifier, not a sequence number — these three are parallel, not ordered. */
    domain: "Evaluation systems",
    title: "Keeping generative features honest",
    thesis:
      "Streaming assistants, prompt-first creation, and grounded generation, backed by a suite that catches drift before users do.",
    client: "Sequenzy",
    stack: ["TypeScript", "tRPC", "Playwright"],
    marker: "120+ evaluations",
  },
  {
    slug: "builders",
    domain: "Authoring tools",
    title: "Builders for pages, forms, and popups",
    thesis:
      "A nested block model with real-time preview, public renderers, embeds, and custom domains — preview and production rendering from one source of truth.",
    client: "Sequenzy",
    stack: ["React", "PostgreSQL", "Next.js"],
    marker: "Three builders, one renderer",
  },
  {
    slug: "publishing-automation",
    domain: "Automation",
    title: "Automating publishing end to end",
    thesis:
      "Four surfaces that make scheduled content publish itself: a timezone-aware scheduler, a queue-backed regeneration pipeline, a Chrome extension, and a writing module.",
    client: "BlogToPin",
    stack: ["BullMQ", "Redis", "Chrome MV3"],
    marker: "Scheduler, pipeline, extension, writer",
  },
] as const;

/** Evidence that earns a panel but not a full case page. */
export const fieldNotes = {
  performance: {
    headline: "~50%",
    title: "Faster dashboard first load",
    method: [
      "Lazy-loaded tRPC routers",
      "Removed blocking data fetches",
      "Fixed hydration and loading flicker",
      "Stable skeleton states",
      "Reworked mobile layouts",
    ],
  },
  integrations: {
    headline: "7",
    title: "Platform integrations in production",
    platforms: ["Webflow", "Wix", "WooCommerce", "Chargebee", "Zapier", "n8n", "Framer"],
    mechanisms: ["OAuth", "Signed webhooks", "Background workers", "Setup flows"],
  },
} as const;
