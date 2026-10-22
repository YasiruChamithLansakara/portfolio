# V2 — Open items before launch

Everything in the site is sourced from your live V1 portfolio, your GitHub repos/READMEs, your GitHub profile README, and `Yasiru_Lansakara_CV.pdf` (pulled from the V1 repo's `assets/` folder). Nothing below was fabricated — these are the gaps I deliberately left open rather than guessing.

## Content to confirm

- **BSc GPA** — the BSc (Hons) entry in Education has no `detail` field yet since it's still in progress. Once you finish and have a final GPA, add `detail: 'GPA X.XX/4.0'` to that entry in `src/data/portfolio.ts` and set `status` to `'Completed'`.
- **CV download removed (temporary)** — the old `Yasiru_Lansakara_CV.pdf` was outdated (predates the internship, the BSc, and the completed status of MediAssist Bot/Neurixa), so I deleted it. The hero's "Download CV" button now shows a disabled-style "CV available on request" state that links to Contact instead. Send me an updated CV PDF, and I'll drop it at `public/cv/Yasiru_Lansakara_CV.pdf` and set `personal.cvPath` in `src/data/portfolio.ts` — the real Download button will come back automatically.

## Decisions I made that you may want to revisit

- **Phone number and home address** from the CV are **not** published on the site (privacy) — only email, LinkedIn, GitHub, and the contact form are shown. Say the word if you want the phone number added to the Contact section.
- **Skill proficiency labels** (V1 used "Advanced/Intermediate" tags) were dropped entirely per your instructions against unverified proficiency claims — V2 just lists technologies grouped by category.
- **Figma, React Native** appear on your GitHub profile README's skill badges but weren't demonstrated in any project or certification I could verify, so they're still left out of the Skills section to avoid padding (Arduino, PHP, and AWS were added back — AWS is now backed by 3 real certifications). Easy to add the rest back if you've genuinely used them.
- **Twitter/X** (`x.com/Yasiru_Chamith`) appears on V1 and your GitHub bio but wasn't in the requested contact set (email/LinkedIn/GitHub/form), so it's omitted. Say so if you want it added to the footer/contact.

## Before you deploy

- **Repo name collision**: GitHub repo names are case-insensitive per owner, and `Portfolio` (V1) already exists on your account — a second repo literally named `portfolio` will likely be rejected. Pick a real name (e.g. `portfolio-v2`) before creating the repo, and update `base` in `vite.config.ts` plus the canonical/OG URLs in `index.html`, `public/robots.txt`, and `public/sitemap.xml` to match.
- **GitHub Pages deploy workflow** (`.github/workflows/deploy.yml`) is wired up but set to manual trigger only — nothing will auto-publish. Follow the deploy steps in `README.md` when you're ready to go live.
