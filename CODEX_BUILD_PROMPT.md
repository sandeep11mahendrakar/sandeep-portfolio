# CODEX AGENT PROMPT — Build "Editorial AI/ML Engineer Portfolio"

Copy everything below the line and give it to your Codex agent as a single prompt.

---

## ROLE

You are a senior frontend engineer. Build an **original, production-ready developer portfolio** from scratch in this directory.

**Design reference (visual language ONLY — do NOT clone):**
https://sanidhyakumar.vercel.app/

Do not copy its source code, branding, text, assets, images, or exact layout. Study it only for: typography hierarchy, spacing rhythm, restrained editorial aesthetic, numbered projects, and interaction quality. The final design must be original.

## OWNER PROFILE

- **Name:** Sandeep Mahendrakar
- **Location:** Bengaluru, India
- **University:** PES University, Bengaluru — B.Tech Computer Science
- **Focus:** AI/ML, software engineering, Linux/systems
- **Career direction:** AI/ML Engineer + Software Engineer
- **Featured project:** Autonomous Vision-Based UI Testing System
- **Other project:** Multi-Aspect Sentiment Analysis with Explainability
- **Hardware/system interests:** Linux, GPU/ML systems

Projects are the main proof of ability — not a giant skills wall.

## ⚠️ IMPORTANT CONTENT RULE — HIGHEST PRIORITY

Do **NOT invent** personal achievements, internships, companies, publications,
metrics, awards, job experience, or project results.

Use ONLY the owner information listed above or data already in `data/profile.yaml`.

Where exact details are unavailable, use clearly marked placeholders such as
`[ADD PROJECT METRIC]` or `[ADD DETAILS]` instead of fabricating anything.
The site must look complete visually while remaining 100% truthful.

## TECH STACK (required)

- Next.js (App Router) + TypeScript — strict mode
- Tailwind CSS
- Framer Motion (subtle animations only)
- shadcn/ui optional for primitives; prefer hand-rolled minimal components
- Deploy target: Vercel

## CONTENT ARCHITECTURE — MOST IMPORTANT REQUIREMENT

All personal content MUST live in editable data files so the owner can update the site
without touching any component code:

```
data/
  profile.yaml        # EVERYTHING: identity, hero, about, stack, experience, writing, contact
public/
  resume.pdf          # dropped in by owner; site links to it if present
```

### `data/profile.yaml` schema (ship with realistic placeholder defaults)

```yaml
identity:
  name: "Sandeep Mahendrakar"
  roles: ["AI/ML Engineer", "Software Engineer"]
  location: "Bengaluru, India"
  university: "PES University · B.Tech Computer Science"
  email: "[ADD EMAIL]"

hero:
  headline: "I build intelligent systems end to end."
  subline: "Computer Science student at PES University, Bengaluru, working across AI/ML, software engineering, and Linux systems."
  github: "[ADD GITHUB URL]"
  linkedin: "[ADD LINKEDIN URL]"
  resumePath: "/resume.pdf"   # resume CTA hidden automatically if file missing

about:
  paragraphs:
    - "Interested in AI/ML engineering and the systems underneath it — Linux, GPUs, and the infrastructure that makes models useful."
    - "I build [ADD DETAILS — e.g., autonomous testing systems, ML pipelines, developer tooling]."

stack:
  - category: "AI / ML"
    items: ["[ADD ITEMS — e.g., PyTorch, TensorFlow, OpenCV]"]
  - category: "Software"
    items: ["[ADD ITEMS — e.g., Python, C++, TypeScript]"]
  - category: "Systems / Linux"
    items: ["[ADD ITEMS — e.g., Linux, Bash, Docker, GPU/ML tooling]"]
  - category: "Tools"
    items: ["[ADD ITEMS]"]

featuredProject: "vision-ui-testing"   # slug of the project shown near the top

projects:
  - slug: "vision-ui-testing"
    number: 01                # auto-number if omitted
    title: "Autonomous Vision-Based UI Testing System"
    year: "[ADD YEAR]"
    summary: "[ADD ONE-SENTENCE TECHNICAL DESCRIPTION]"
    details: "[ADD PROJECT DETAILS — approach, architecture, challenges. Use [ADD ...] placeholders for anything unknown.]"
    stack: ["[ADD STACK ITEMS]"]
    link: "[ADD REPO/LIVE URL]"
  - slug: "sentiment-analysis"
    title: "Multi-Aspect Sentiment Analysis with Explainability"
    year: "[ADD YEAR]"
    summary: "[ADD ONE-SENTENCE TECHNICAL DESCRIPTION]"
    details: "[ADD PROJECT DETAILS]"
    stack: ["[ADD STACK ITEMS]"]
    link: ""

# Only add entries here if real experience exists. Do NOT fabricate internships/jobs.
experience: []

writing: []
```

Rules:
- Every component reads from this YAML via one typed loader (`lib/profile.ts`) that parses + validates it (zod or manual guards). Type-safe accessors only.
- Empty/missing fields must degrade gracefully (section hides itself; no broken layout).
- Add `README.md` explaining: "To update your portfolio, edit `data/profile.yaml`, drop `resume.pdf` into `public/`, commit/push."

## PAGE STRUCTURE (single page + smooth-scroll nav)

1. **Navigation** — fixed top, minimal: name mark left; About / Stack / Projects / Writing / Contact right; thin bottom border; backdrop blur on scroll.
2. **Hero** — location + university + roles as small uppercase metadata line → very large name/headline → 1–2 sentence positioning statement → GitHub / LinkedIn / Resume CTAs as understated text links with arrows.
3. **Featured Project** — immediately after hero; the project whose slug matches `featuredProject`; larger treatment than the list below.
4. **About** — engineering interests, what you build, education. Prose, not cards.
5. **Stack** — categorized rows (category label left, comma/space-separated items right); thin dividers between categories; NO skill bars, NO progress meters.
6. **Projects** — large numbered showcase (01, 02, 03…). Each row: number + title (big serif) + year + concise technical description + stack tags + external link. Thin horizontal rules between entries. Hover: subtle indent/arrow shift, never flashy.
7. **Experience / Education** — compact timeline-style list; hides if `experience:` is empty (do not fabricate entries).
8. **Writing** — simple linked list (hide section entirely if empty).
9. **Contact** — one line: "Let's talk —" + email link + GitHub/LinkedIn. No form needed.
10. **Footer** — © year, name, "Built with Next.js".

## DESIGN SYSTEM (strict)

- Background: off-white/near-white `#FAFAF8` range; text: near-black `#111`.
- Dark mode optional; implement via CSS variables if included, default light.
- Fonts: editorial **serif for display/headings** (e.g., Newsreader, Source Serif, or Fraunces via `next/font`) + clean **sans for body/UI** (e.g., Inter).
- Scale: hero name ~ clamp(3rem, 9vw, 7rem); section titles large; generous line-height.
- Metadata style: 11–12px uppercase tracking-widest muted labels ("01 — PROJECTS", location lines).
- Borders: 1px hairlines (`neutral-200`) as primary separators. Almost no cards, shadows, gradients, or colored blocks. Monochrome accent (one subtle accent color allowed for links/hover).
- Spacing: huge vertical whitespace between sections (~py-24 to py-32 desktop).
- Max content width ~64–72rem, comfortable side padding.

## MOTION RULES

- Framer Motion: fade/rise on scroll into view (`whileInView`, once), staggered hero entrance, underline-draw or arrow-shift link hovers, smooth scroll for nav anchors.
- Subtle = everything under ~400ms, small distances, gentle easing. NO parallax spam, NO 3D, NO cursor effects, NO heavy libraries.
- Respect `prefers-reduced-motion`.

## QUALITY BAR

- Fully responsive: flawless at 360px, tablet, desktop. Mobile nav = simple hamburger → full-screen overlay menu.
- Semantic HTML + accessibility: landmarks, alt text, focus-visible styles, contrast AA, keyboard-navigable menu.
- SEO: metadata API (title, description, OG image), `sitemap.ts`, `robots.ts`, favicon.
- Performance: static generation where possible, no client JS beyond motion/nav needs, Lighthouse ≥ 95.
- Zero console errors/warnings; strict TS passes; `npm run build` must succeed cleanly.

## DELIVERABLES

1. Complete runnable Next.js app in this directory (git-initialized, first commit).
2. `data/profile.yaml` filled exactly as specified in the schema above — real known info plus `[ADD ...]` placeholders. Do not fabricate anything (see CONTENT RULE).
3. `README.md`: setup, how to edit content (YAML + resume.pdf workflow), deploy-to-Vercel steps.
4. Verify before finishing: `npm run build` passes; all sections render from YAML; deleting a YAML field hides that section without errors.

## ACCEPTANCE TEST

After building, confirm: change `identity.name` in `profile.yaml` → name updates everywhere. Remove `writing:` → Writing section disappears. Remove `public/resume.pdf` → Resume CTA hides. If any of these fail, fix before finishing.
