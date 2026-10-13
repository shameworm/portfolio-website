export const capabilities = [
  {
    group: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Zustand", "React Hook Form", "Zod"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "tRPC", "REST", "PostgreSQL", "Redis", "BullMQ"],
  },
  {
    group: "AI and automation",
    items: [
      "LLM workflows",
      "AI evaluations",
      "Agentic development",
      "MCP",
      "Claude Code",
      "Codex",
      "Cursor",
      "Conductor",
    ],
  },
  {
    group: "Integration",
    items: ["OAuth", "Signed webhooks", "Chargebee", "Webflow", "Wix", "Zapier", "n8n", "Make"],
  },
  {
    group: "Testing and quality",
    items: ["Playwright", "Jest", "End-to-end", "Regression suites"],
  },
] as const;
