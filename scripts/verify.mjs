import { chromium } from "playwright";
import { readdirSync } from "node:fs";

const BASE = "http://localhost:4123";

// Derive routes from the build so a renamed slug fails the build, not the test.
const caseSlugs = readdirSync("dist/work", { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
if (caseSlugs.length === 0) throw new Error("no case pages in dist/work — run `npm run build` first");
const fail = [];
const ok = (m) => console.log("  PASS  " + m);
const bad = (m) => { fail.push(m); console.log("  FAIL  " + m); };

const browser = await chromium.launch();

// ── Reduced motion: every entrance must be inert, not merely fast ──
{
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const states = await page.$$eval(".enter", (els) =>
    els.map((e) => {
      const s = getComputedStyle(e);
      return { opacity: s.opacity, animationName: s.animationName };
    }),
  );
  const hidden = states.filter((s) => Number(s.opacity) < 1);
  const animated = states.filter((s) => s.animationName !== "none");
  states.length ? ok(`${states.length} entrance elements found`) : bad("no .enter elements");
  hidden.length === 0 ? ok("all visible under reduced motion") : bad(`${hidden.length} still transparent`);
  animated.length === 0 ? ok("no animations run") : bad(`${animated.length} still animating`);
  await ctx.close();
}

// ── Keyboard: every interactive element reachable with a visible ring ──
{
  const page = await browser.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const interactive = await page.$$eval("a[href], button", (e) => e.length);
  let reached = 0;
  let ringed = 0;
  for (let i = 0; i < interactive + 4; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      return { tag: el.tagName, outline: s.outlineStyle, width: s.outlineWidth, color: s.outlineColor };
    });
    if (info) {
      reached++;
      if (info.outline !== "none" && parseFloat(info.width) > 0) ringed++;
    }
  }
  reached >= interactive ? ok(`${reached} focusable stops for ${interactive} interactive elements`)
                         : bad(`only ${reached} of ${interactive} reachable`);
  ringed === reached ? ok("every focused element shows an outline")
                     : bad(`${reached - ringed} focused elements had no visible outline`);

  const skip = await page.$("a.skip");
  if (skip) {
    await page.keyboard.press("Tab");
    ok("skip link present");
  } else bad("skip link missing");
}

// ── Schematics stay legible on a narrow viewport ──
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/work/${caseSlugs[0]}`, { waitUntil: "networkidle" });
  const panned = await page.$$eval(".schematic-scroll", (els) =>
    els.map((e) => ({ scroll: e.scrollWidth, client: e.clientWidth })),
  );
  const pannable = panned.filter((p) => p.scroll > p.client);
  panned.length ? ok(`${panned.length} schematics, ${pannable.length} pannable at 390px`)
                : bad("no schematics found");
}

// ── No horizontal overflow at mobile width ──
{
  for (const path of ["/", ...caseSlugs.map((s) => `/work/${s}`)]) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    over <= 0 ? ok(`${path} no horizontal overflow`) : bad(`${path} overflows by ${over}px`);
  }
}

await browser.close();
console.log(fail.length ? `\n${fail.length} CHECK(S) FAILED` : "\nAll checks passed");
process.exit(fail.length ? 1 : 0);
