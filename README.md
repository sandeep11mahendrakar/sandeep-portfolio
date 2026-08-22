# Portfolio — Sandeep Mahendrakar

Minimal editorial developer portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion**.

All personal content lives in a single file: [`data/profile.yaml`](data/profile.yaml). You never need to touch component code to update the site.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Update your content

1. Edit `data/profile.yaml`:
   - `identity` — name, roles, location, university, email
   - `hero` — headline, subline, GitHub/LinkedIn URLs
   - `about` — paragraphs
   - `stack` — categorized tool lists
   - `projects` — add/remove entries; the project whose `slug` matches `featuredProject` is shown near the top with special treatment
     - `image: "/images/my-screenshot.png"` (optional) — drop the file into `public/images/`; the featured project shows it large, list projects show a small thumbnail. Omit or delete the file and images hide automatically.
   - `experience`, `writing` — leave as `[]` to hide those sections entirely
2. Drop your resume as `public/resume.pdf` — the "Résumé" CTA appears automatically. Delete the file and it hides again.
3. Any value starting with `[ADD ...]` renders in muted italics as an obvious placeholder. Replace it with real text. Do not invent achievements.

Sections auto-hide when their data is empty or missing — no broken layouts.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repo at https://vercel.com/new.
3. Optionally set the environment variable `NEXT_PUBLIC_SITE_URL` to your final domain (e.g. `https://sandeepmahendrakar.vercel.app`) so sitemap/robots/OpenGraph URLs are correct.
4. Deploy.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run typecheck` | TypeScript check |

## Structure

```
data/profile.yaml      <- ALL editable content
public/resume.pdf      <- drop your resume here (optional)
src/app/               -> layout, page, SEO (sitemap, robots)
src/components/        -> Nav, Hero, FeaturedProject, About, Stack,
                          Projects, Experience, Writing, Contact, Footer
src/lib/profile.ts     -> typed YAML loader + graceful degradation
```
