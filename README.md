# Yasiru Lansakara — Portfolio (V2)

A React + TypeScript + Vite rebuild of the personal portfolio, replacing the original static HTML/CSS/JS site. Content lives entirely in [`src/data/portfolio.ts`](src/data/portfolio.ts) so it can be updated without touching layout components.

> **This is V2.** It replaces the original site ([repo](https://github.com/YasiruChamithLansakara/Portfolio)), which is no longer published. See [`TODO.md`](TODO.md) for content that still needs your input.

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
- **`vite.config.ts` → `base`**: `/portfolio_v2/`, matching the repository name and `https://yasiruchamithlansakara.github.io/portfolio_v2/`. If the repository is renamed, update it together with the canonical/OG URLs in `index.html`, `public/sitemap.xml` and `public/robots.txt`.

## Deploying to GitHub Pages

Live at **https://yasiruchamithlansakara.github.io/portfolio_v2/**. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes the site on every push to `main` (and can be re-run by hand from the Actions tab).

One-time setup in the repository's settings:

1. **Pages** → Build and deployment → Source → **GitHub Actions**.
2. **Secrets and variables → Actions** → New repository secret named `VITE_FORMSPREE_ENDPOINT`, with the same value as in `.env.local`. Without it the live contact form falls back to `mailto:`.

After that, `git push` deploys.

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
