import { chromium } from "playwright";
import fs from "fs";

const BASE = "http://localhost:3001";
const OUT = ".next-qa/audit-shots";
fs.mkdirSync(OUT, { recursive: true });

const report = {};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on("console", m => { if (m.type() === "error") (report.consoleErrors ||= []).push(m.text()); });

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

async function settleScrollTo(sel) {
  await page.evaluate(s => {
    document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" });
    window.scrollBy(0, -80);
  }, sel);
  await page.waitForTimeout(1200);
}

// ---- per-section desktop screenshots ----
for (const [name, sel] of [["home", "#top"], ["about", "#about"], ["skills", "#skills"], ["work", "#work"], ["contact", "#contact"]]) {
  await settleScrollTo(sel);
  await page.screenshot({ path: `${OUT}/desktop-${name}.png` });
}

// ---- work section geometry ----
await settleScrollTo("#work");
report.workRows = await page.$$eval("#work ol li", rows => rows.map(r => {
  const cells = [...r.children].filter(c => c.tagName === "DIV").map(c => {
    const b = c.getBoundingClientRect();
    return { text: c.innerText.slice(0, 30), left: +b.left.toFixed(1), right: +b.right.toFixed(1), top: +b.top.toFixed(1) };
  });
  const anchors = [...r.querySelectorAll(":scope > a")].length;
  const circles = r.innerHTML.match(/OPEN/gi)?.length ?? 0;
  return { cells, overlayAnchors: anchors, openTextCount: circles };
}));

// hover a work row
const firstRow = page.locator("#work ol li").first();
await firstRow.hover();
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/desktop-work-hover.png` });
report.workHover = await firstRow.evaluate(el => {
  const b = el.getBoundingClientRect();
  const els = document.elementsFromPoint(b.left + b.width / 2, b.top + 20).slice(0, 5)
    .map(e => e.tagName + "." + String(e.className).slice(0, 40));
  const title = el.querySelector("h3");
  const tb = title.getBoundingClientRect();
  const numCell = el.querySelector("div");
  const nb = numCell.getBoundingClientRect();
  return { stackedAtPoint: els, numLeft: nb.left.toFixed(1), titleLeft: tb.left.toFixed(1) };
});

// ---- skills filters ----
await settleScrollTo("#skills");
const tabs = await page.$$eval("#skills [role=tab]", ts => ts.map(t => t.innerText.replace(/\s+/g, " ").trim()));
report.skillTabs = tabs;
for (let i = 0; i < tabs.length; i++) {
  await page.locator("#skills [role=tab]").nth(i).click();
  await page.waitForTimeout(900);
  if (i === 0 || i === tabs.length - 1) {
    await page.screenshot({ path: `${OUT}/desktop-skills-tab${i}.png` });
  }
}
report.tabCounts = await page.$$eval("#skills [role=tab]", ts => ts.map(t => ({
  label: t.innerText.split("\n")[0],
  count: t.innerText.match(/\d+/)?.[0],
  selected: t.getAttribute("aria-selected"),
})));
// grid item count after last tab
report.visibleGridItems = await page.$$eval("#skills .grid.grid-cols-1 > *", els => els.length);
// reset to All
await page.locator("#skills [role=tab]").first().click();

// nav link behavior
await page.evaluate(() => window.scrollTo(0, 0));
await page.click("nav[aria-label=Primary] >> text=Work");
await page.waitForTimeout(1500);
report.navWorkScroll = await page.evaluate(() => Math.round(window.scrollY));

// focus-visible check
await page.keyboard.press("Tab");
await page.keyboard.press("Tab");
report.focusOutline = await page.evaluate(() => {
  const el = document.activeElement;
  const s = getComputedStyle(el);
  return { tag: el.tagName, text: (el.innerText || el.getAttribute("aria-label") || "").slice(0, 20), outline: s.outlineStyle, outlineColor: s.outlineColor };
});

await ctx.close();

// ---- MOBILE 390 ----
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const mp = await mctx.newPage();
await mp.goto(BASE, { waitUntil: "networkidle" });
await mp.waitForTimeout(2500);

for (const [name, sel] of [["home", "#top"], ["about", "#about"], ["skills", "#skills"], ["work", "#work"], ["contact", "#contact"]]) {
  await mp.evaluate(s => {
    document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" });
    window.scrollBy(0, -70);
  }, sel);
  await mp.waitForTimeout(1200);
  await mp.screenshot({ path: `${OUT}/mobile-${name}.png` });
}

// mobile full-page heights & overflow
report.mobileOverflow = await mp.evaluate(() => ({
  docWidth: document.documentElement.scrollWidth,
  viewport: window.innerWidth,
  horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
}));

// tap targets on mobile
report.mobileTapTargets = await mp.evaluate(() => {
  const out = [];
  document.querySelectorAll("a, button").forEach(el => {
    const b = el.getBoundingClientRect();
    if (b.width > 0 && b.height > 0 && b.top >= 0 && b.top < 844) {
      out.push({ text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 24), w: Math.round(b.width), h: Math.round(b.height) });
    }
  });
  return out;
});

// mobile menu open
await mp.evaluate(() => window.scrollTo(0, 0));
await mp.waitForTimeout(500);
await mp.tap("button[aria-label='Open menu']");
await mp.waitForTimeout(800);
await mp.screenshot({ path: `${OUT}/mobile-menu.png` });
report.mobileMenuLinks = await mp.$$eval("header ul a", as => as.map(a => ({ text: a.innerText.trim(), h: Math.round(a.getBoundingClientRect().height) })));
await mp.tap("button[aria-label='Close menu']");

// skills tabs on mobile
await mp.evaluate(() => document.querySelector("#skills")?.scrollIntoView({ behavior: "instant" }));
await mp.waitForTimeout(1000);
await mp.screenshot({ path: `${OUT}/mobile-skills-tabs.png` });

await mctx.close();
await browser.close();

fs.writeFileSync(".next-qa/audit-report.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

