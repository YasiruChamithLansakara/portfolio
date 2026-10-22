# Yasiru Lansakara — Portfolio (V2)

A React + TypeScript + Vite rebuild of the personal portfolio, replacing the original static HTML/CSS/JS site. Content lives entirely in [`src/data/portfolio.ts`](src/data/portfolio.ts) so it can be updated without touching layout components.

> **This is V2.** The original site ([live](https://yasiruchamithlansakara.github.io/Portfolio/), [repo](https://github.com/YasiruChamithLansakara/Portfolio)) is untouched and still live. See [`TODO.md`](TODO.md) for everything that still needs your input before launch.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion for React (Framer Motion's successor) · Lucide React

## Getting started

```bash
npm install
npm run dev        # starts the dev server (prints a localhost URL)
```

## Building for production

```bash
npm run build       # type-checks, then builds to dist/
npm run preview     # serves the dist/ build locally to sanity-check it
```

## Quality checks

```bash
npx tsc -b          # TypeScript type-checking
npm run lint         # oxlint
npm run build        # full production build
```

## Configuration

- **`VITE_FORMSPREE_ENDPOINT`** (in a `.env.local` file — see [`.env.example`](.env.example)): a [Formspree](https://formspree.io) or similar endpoint for the contact form. Without it, the form falls back to opening the visitor's email client via a `mailto:` link. `.env.local` is gitignored, so it won't be pushed — for the deployed build to have it too, add it as a repository secret (Settings → Secrets and variables → Actions → New repository secret) named `VITE_FORMSPREE_ENDPOINT`; the deploy workflow already reads it from there.
- **`vite.config.ts` → `base`**: currently `/portfolio/`, matching `https://yasiruchamithlansakara.github.io/portfolio/`. Update this if the GitHub repository ends up with a different name (see the note in `TODO.md` about the `Portfolio`/`portfolio` name collision).

## Deploying to GitHub Pages (do this only when you're ready to go live)

1. **Create the new repository.** On GitHub, create a new repo for V2 (e.g. `portfolio-v2`, since `Portfolio` is already taken by V1 — GitHub repo names are case-insensitive, so a literal second `portfolio` repo isn't allowed). Do **not** touch or delete the existing `Portfolio` repo.
2. **Update the base path if needed.** If the final repo name isn't `portfolio`, update `base: '/portfolio/'` in `vite.config.ts` to match (e.g. `/portfolio-v2/`), and update the canonical/OG URLs in `index.html` and `public/sitemap.xml` and `public/robots.txt` to match.
3. **Push this project** to the new repository:
   ```bash
   git init
   git add .
   git commit -m "Initial V2 portfolio"
   git remote add origin https://github.com/YasiruChamithLansakara/<new-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. **Enable GitHub Pages** in the new repo's Settings → Pages → Source → "GitHub Actions".
5. **Run the deploy workflow.** `.github/workflows/deploy.yml` is already set up but only runs manually (`workflow_dispatch`) so nothing auto-publishes. Trigger it from the Actions tab when you're ready, or add a `push` trigger to automate future deploys.
6. **Verify the live URL**, then — only when you're happy with it — update any external links (LinkedIn, CV, resume, etc.) to point at the new V2 URL. V1 keeps working at its existing URL until you choose to change or remove it.

## Project structure

```
src/
  components/   Reusable UI components (Navbar, Hero, ProjectCard, ...)
    icons/      Brand icons (GitHub/LinkedIn) and the per-project SVG artwork
  data/         portfolio.ts — all site content (single source of truth)
  hooks/        useTheme, useActiveSection, useRoleRotator
  types/        Shared TypeScript interfaces for the data layer
public/
  favicon.svg   Source favicon (edit this, then regenerate the PNG fallbacks)
  images/       Profile photo and certification previews (WebP/JPEG)
  cv/           Downloadable CV PDF (not currently present — see TODO.md)
scripts/        One-off Node maintenance scripts (not part of the build):
                  process-cutout.mjs    — frame a background-removed photo into the hero
                  convert-certs.mjs     — render certificate PDFs (in certificates/) to
                                          WebP previews in public/images/certifications/
                  generate-favicons.mjs — rasterize public/favicon.svg to the PNG sizes
                                          index.html references
```
