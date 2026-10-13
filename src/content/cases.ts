import type { FlowEdge, FlowNode } from "@/components/schematics/types";

/**
 * Case bodies. Everything here describes architectural patterns and
 * publicly observable behaviour — never proprietary internals, schemas,
 * prompts, or customer data.
 */

export type Figure =
  | { kind: "flow"; nodes: FlowNode[]; edges: FlowEdge[]; caption: string }
  | { kind: "evals"; caption: string }
  | { kind: "none" };

export type CaseStudy = {
  slug: string;
  domain: string;
  title: string;
  client: string;
  role: string;
  period: string;
  thesis: string;
  stack: string[];
  problem: string[];
  build: { heading: string; body: string; figure: Figure }[];
  outcome: { value: string; label: string }[];
  retrospective: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "sequenzy-ai",
    domain: "Evaluation systems",
    title: "Keeping generative features honest",
    client: "Sequenzy",
    role: "Full-stack Developer",
    period: "May 2026 — Oct 2026",
    thesis:
      "Generative features across campaigns, sequences, segments, and landing pages — and the suite that proves they still work.",
    stack: ["TypeScript", "React", "tRPC", "PostgreSQL", "Playwright"],
    problem: [
      "Generative features fail quietly. A model drifts, a prompt regresses after an unrelated refactor, a grounded answer stops being grounded. None of it throws an exception and none of it shows up in a unit test. You find out when a customer sends you a screenshot.",
      "The product surface kept growing — assistants in campaigns, in sequences, in segment building, in the landing-page builder — and each new surface was another thing that could silently degrade. Shipping more generation without shipping more verification would have been borrowing against the product.",
    ],
    build: [
      {
        heading: "Prompt-first creation",
        body: "A user describes what they want and gets a working draft rather than an empty editor. The request is planned before it is generated, streamed back token by token so the page fills in as it is produced, and resolved into real editable blocks rather than a wall of text. Streaming is the difference between a feature that feels instant and one that feels broken.",
        figure: {
          kind: "flow",
          caption: "Prompt-first creation. The output is editable structure, not prose.",
          nodes: [
            { id: "intent", label: "INTENT", sub: "user prompt", col: 0, row: 1 },
            { id: "plan", label: "PLAN", col: 1, row: 1 },
            { id: "stream", label: "STREAM", sub: "incremental", col: 2, row: 1 },
            { id: "blocks", label: "BLOCKS", sub: "editable", col: 3, row: 1, lit: true },
          ],
          edges: [
            { from: "intent", to: "plan", label: "parse" },
            { from: "plan", to: "stream" },
            { from: "stream", to: "blocks", label: "resolve" },
          ],
        },
      },
      {
        heading: "Block-level editing",
        body: "Regenerating a whole document to fix one paragraph is both slow and destructive — it discards every edit the user already made. Editing operates on a single block, with the surrounding document passed as context so the result still fits. The unit of generation matches the unit the user is actually looking at.",
        figure: { kind: "none" },
      },
      {
        heading: "Grounded generation and safety checks",
        body: "Anything that makes a factual claim about a customer's own data has to be grounded in that data rather than produced from the model's priors, and anything about to be sent to a real audience passes a safety check first. Both are pipeline stages, not prompt instructions — a stage can be tested, and an instruction can only be hoped for.",
        figure: {
          kind: "flow",
          caption: "Grounding and safety as pipeline stages, each independently testable.",
          nodes: [
            { id: "req", label: "REQUEST", col: 0, row: 1 },
            { id: "ground", label: "GROUND", sub: "retrieve", col: 1, row: 0 },
            { id: "gen", label: "GENERATE", col: 2, row: 1 },
            { id: "safety", label: "SAFETY", sub: "gate", col: 3, row: 1, lit: true },
          ],
          edges: [
            { from: "req", to: "ground", label: "context" },
            { from: "ground", to: "gen" },
            { from: "req", to: "gen" },
            { from: "gen", to: "safety", label: "verify" },
          ],
        },
      },
      {
        heading: "The evaluation suite",
        body: "Over 120 AI and regression evaluations run across email generation, landing-page generation, block-level editing, grounded generation, safety checks, and the product workflows that depend on them. They are the reason a prompt change can ship on a Tuesday. Without them, every change to a generative feature is a guess with a customer on the other end.",
        figure: {
          kind: "evals",
          caption: "One cell per evaluation. The density is the point.",
        },
      },
    ],
    outcome: [
      { value: "120+", label: "Evaluations in the suite" },
      { value: "6", label: "Coverage areas under test" },
      { value: "4", label: "Product areas with generative features" },
    ],
    retrospective:
      "I would build the evaluation harness before the second generative surface, not after the fourth. Retrofitting coverage onto features that already shipped cost more than writing it alongside them would have.",
  },

  {
    slug: "builders",
    domain: "Authoring tools",
    title: "Builders for pages, forms, and popups",
    client: "Sequenzy",
    role: "Full-stack Developer",
    period: "May 2026 — Oct 2026",
    thesis:
      "A nested block model with real-time preview, public renderers, embeds, and custom domains — one source of truth for what the user sees and what the visitor gets.",
    stack: ["React", "TypeScript", "PostgreSQL", "Next.js"],
    problem: [
      "Every visual builder has the same failure mode: two renderers. One draws the editor preview, another draws the published page, and over time they drift. The user arranges something that looks right, publishes, and gets something subtly different — different spacing, a broken nested layout, a block that renders in the editor and vanishes in production.",
      "Three surfaces needed building — landing pages, forms, and popups — and building three independent editors would have tripled that drift instead of eliminating it.",
    ],
    build: [
      {
        heading: "One block model",
        body: "Content is a tree of typed blocks that can nest, so a layout block can hold columns which hold content blocks, to arbitrary depth. Every surface — pages, forms, popups — is the same tree with a different set of permitted block types. Adding a block type adds it everywhere it makes sense and nowhere it does not.",
        figure: { kind: "none" },
      },
      {
        heading: "Preview parity",
        body: "The editor preview and the public page are the same renderer fed the same tree. The preview is not an approximation of the output; it is the output, drawn with editing affordances on top. This is the single decision that keeps a builder trustworthy, and it is much cheaper to make at the start than to retrofit.",
        figure: {
          kind: "flow",
          caption: "One renderer, two consumers. Preview is the output, not an impression of it.",
          nodes: [
            { id: "tree", label: "BLOCK TREE", sub: "typed, nested", col: 0, row: 1 },
            { id: "render", label: "RENDERER", col: 1, row: 1, lit: true },
            { id: "editor", label: "EDITOR", sub: "+ affordances", col: 2, row: 0 },
            { id: "public", label: "PUBLIC PAGE", col: 2, row: 2 },
          ],
          edges: [
            { from: "tree", to: "render" },
            { from: "render", to: "editor", label: "preview" },
            { from: "render", to: "public", label: "publish" },
          ],
        },
      },
      {
        heading: "Publishing, embeds, and custom domains",
        body: "Publishing takes a snapshot so a page in production cannot change underneath its visitors while someone edits the draft. Forms and popups additionally ship as embeds that run inside sites the product does not control, which means the embed has to be small, isolated from the host page's styles, and tolerant of a hostile CSS environment.",
        figure: {
          kind: "flow",
          caption: "Publishing path. The snapshot is what decouples editing from serving.",
          nodes: [
            { id: "draft", label: "DRAFT", col: 0, row: 1 },
            { id: "snap", label: "SNAPSHOT", sub: "immutable", col: 1, row: 1 },
            { id: "serve", label: "RENDERER", sub: "public", col: 2, row: 1 },
            { id: "domain", label: "DOMAIN", sub: "custom", col: 3, row: 1, lit: true },
          ],
          edges: [
            { from: "draft", to: "snap", label: "publish" },
            { from: "snap", to: "serve" },
            { from: "serve", to: "domain", label: "route" },
          ],
        },
      },
    ],
    outcome: [
      { value: "3", label: "Builders on shared primitives" },
      { value: "1", label: "Renderer for preview and production" },
      { value: "4", label: "Surfaces: pages, forms, popups, embeds" },
    ],
    retrospective:
      "The embed was the part I underestimated. Running inside someone else's page is a different engineering problem from running inside your own, and I treated it as a packaging step rather than a surface with its own constraints.",
  },

  {
    slug: "publishing-automation",
    domain: "Automation",
    title: "Automating publishing end to end",
    client: "BlogToPin",
    role: "Full-stack Developer",
    period: "Jul 2025 — Oct 2026",
    thesis:
      "Four surfaces that make scheduled content publish itself: a timezone-aware scheduler, a queue-backed regeneration pipeline, a Chrome extension, and a writing module.",
    stack: ["Node.js", "BullMQ", "Redis", "PostgreSQL", "Chrome MV3"],
    problem: [
      "Scheduled publishing looks trivial until you write it. Users want a different number of posts on different days, posted at human-looking times rather than on the hour, in their own timezone, surviving daylight-saving transitions — and they want to see what next month will actually look like before they commit to it.",
      "Existing configurations also had to keep working. A scheduling engine that breaks everyone's existing setup on upgrade is not an improvement.",
    ],
    build: [
      {
        heading: "The scheduling engine",
        body: "Daily volume varies by day. Times float within a window instead of landing on the hour, so a feed does not read as machine-generated. Everything resolves in the user's timezone rather than the server's. Older configuration shapes are migrated forward on read rather than in a risky bulk write, and a monthly preview renders the resulting calendar so the user sees the schedule before it runs.",
        figure: { kind: "none" },
      },
      {
        heading: "The regeneration pipeline",
        body: "Recreating content involves generating new imagery and matching an existing visual style — both slow, both failure-prone, neither acceptable inside a request. The work runs as queued background jobs so a failure retries in isolation instead of taking down a user's session, and the fan-out stages run concurrently rather than in sequence.",
        figure: {
          kind: "flow",
          caption: "Regeneration. Slow and failure-prone work belongs in a queue, not a request.",
          nodes: [
            { id: "sched", label: "SCHEDULE", sub: "tz-aware", col: 0, row: 1 },
            { id: "queue", label: "QUEUE", sub: "BullMQ", col: 1, row: 1 },
            { id: "img", label: "IMAGE GEN", col: 2, row: 0 },
            { id: "style", label: "STYLE PASS", col: 2, row: 2 },
            { id: "persist", label: "PERSIST", sub: "+ preview", col: 3, row: 1, lit: true },
          ],
          edges: [
            { from: "sched", to: "queue", label: "enqueue" },
            { from: "queue", to: "img", label: "fan out" },
            { from: "queue", to: "style" },
            { from: "img", to: "persist" },
            { from: "style", to: "persist", label: "merge" },
          ],
        },
      },
      {
        heading: "The Chrome extension",
        body: "Some of the work only exists inside the publishing platform's own interface, where there is no API to call. A Manifest V3 extension put generation directly there: assisted pin creation in the page the user is already looking at, its own authentication against the product backend rather than a borrowed session cookie, and browser automation for the steps the platform exposes no other way.",
        figure: {
          kind: "flow",
          caption: "MV3 extension. The service worker is disposable, so nothing may live in memory.",
          nodes: [
            { id: "ui", label: "PAGE UI", sub: "injected", col: 0, row: 1 },
            { id: "sw", label: "SERVICE WKR", sub: "ephemeral", col: 1, row: 1 },
            { id: "store", label: "STORAGE", sub: "all state", col: 2, row: 0 },
            { id: "api", label: "BACKEND", sub: "own auth", col: 2, row: 2, lit: true },
          ],
          edges: [
            { from: "ui", to: "sw", label: "message" },
            { from: "sw", to: "store", label: "persist" },
            { from: "sw", to: "api", label: "authenticate" },
          ],
        },
      },
      {
        heading: "Why Manifest V3 changes the design",
        body: "Under MV3 the background script is a service worker the browser is free to kill between events. Nothing can be held in memory across an interaction — no in-flight request map, no cached session, no partially built job. Every piece of state has to round-trip through storage, and every handler has to be written as though it is the first thing that ever ran. It is a constraint that rewrites how the whole extension is structured.",
        figure: { kind: "none" },
      },
      {
        heading: "The writing module",
        body: "A full-stack writing surface built from scratch: assisted drafting, a rich-text editor, synchronisation out to WordPress, and Markdown export so the content was never trapped in the product. Export is a feature, not a concession.",
        figure: { kind: "none" },
      },
    ],
    outcome: [
      { value: "4", label: "Surfaces: scheduler, pipeline, extension, writer" },
      { value: "2", label: "Config generations supported in parallel" },
      { value: "0", label: "Generation work inside a request cycle" },
    ],
    retrospective:
      "Floating offsets and timezone handling deserved property-based tests from the start. I verified them against examples, and examples are exactly the wrong tool for a problem whose failures live at daylight-saving boundaries.",
  },
];

export function caseBySlug(slug: string) {
  return cases.find((c) => c.slug === slug);
}
