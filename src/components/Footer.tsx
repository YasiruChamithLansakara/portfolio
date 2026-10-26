import { ArrowUp } from 'lucide-react'
import { navLinks, personal } from '../data/portfolio'
import { paletteShortcut } from '../lib/platform'
import { Container } from './Container'
import { LocalTime } from './LocalTime'
import { SocialIconLinks, iconButtonClass } from './SocialIconLinks'

const currentYear = new Date().getFullYear()

export function Footer({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <footer className="relative pt-16 pb-10">
      {/* A hairline that fades out at both ends, instead of a hard full-width border. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent"
      />
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_auto] md:gap-12">
          <div>
            <a
              href="#home"
              aria-label="Yasiru Lansakara, back to top"
              className="font-mono text-2xl font-bold tracking-tight text-ink transition-colors hover:text-violet"
            >
              YL<span className="-ml-[0.2em] text-violet">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">{personal.title}</p>
            {/* A live clock is a small human touch — and tells visitors whether a reply is likely soon. */}
            <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-glass-line bg-ink/[0.03] py-1.5 pr-3.5 pl-3 text-xs text-ink-muted">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              <span>
                <span className="font-mono text-ink">
                  <LocalTime timeZone={personal.timeZone} />
                </span>{' '}
                in {personal.location}
              </span>
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {/* Takes no space until hovered, so labels stay aligned with the heading. */}
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-violet transition-[width,margin] duration-300 group-hover:mr-2 group-hover:w-3"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">Connect</p>
            <SocialIconLinks className="mt-4" />
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center gap-4 border-t border-glass-line pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-ink-faint">
            © {currentYear} {personal.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenPalette}
              aria-haspopup="dialog"
              className="hidden items-center gap-2 text-xs text-ink-faint transition-colors hover:text-ink sm:inline-flex"
            >
              Press
              <kbd className="rounded-md border border-glass-line bg-ink/5 px-1.5 py-0.5 font-mono text-[10px]">
                {paletteShortcut}
              </kbd>
              to navigate
            </button>
            <a href="#home" aria-label="Back to top" className={`group ${iconButtonClass}`}>
              <ArrowUp
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
