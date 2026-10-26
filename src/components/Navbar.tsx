import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Search, X } from 'lucide-react'
import { navLinks } from '../data/portfolio'
import { useSectionNavigation } from '../hooks/useSectionNavigation'
import type { Theme, ThemeTransitionOrigin } from '../hooks/useTheme'
import { easeOutExpo } from '../lib/motion'
import { paletteShortcut } from '../lib/platform'
import { ThemeToggle } from './ThemeToggle'

// Module-level so the array is stable across renders (the hook re-subscribes when it changes).
const sectionIds = navLinks.map((link) => link.href.replace('#', ''))

interface NavbarProps {
  theme: Theme
  onToggleTheme: (origin?: ThemeTransitionOrigin) => void
  onOpenPalette: () => void
}

export function Navbar({ theme, onToggleTheme, onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useSectionNavigation(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // A floating dock: transparent over the hero, then frosted and slightly narrower once the page scrolls.
  const docked = scrolled || menuOpen

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 items-center justify-between rounded-full pr-2.5 pl-5 transition-[max-width,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] ${
          docked ? 'glass max-w-5xl' : 'max-w-6xl border border-transparent'
        }`}
      >
        <a
          href="#home"
          aria-label="Yasiru Lansakara, back to top"
          className="font-mono text-xl font-bold tracking-tight text-ink transition-colors hover:text-violet"
        >
          {/* Negative margin closes the full-width monospace cell gap before the period. */}
          YL<span className="-ml-[0.2em] text-violet">.</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.replace('#', '')
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full border border-glass-line bg-ink/[0.07]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label={`Open command palette (${paletteShortcut})`}
            aria-haspopup="dialog"
            className="hidden h-9 items-center gap-2 rounded-full border border-glass-line bg-ink/5 pr-2 pl-3 text-ink-muted transition-colors hover:bg-ink/10 hover:text-ink sm:flex"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <kbd className="rounded-md border border-glass-line bg-ink/5 px-1.5 py-0.5 font-mono text-[10px] leading-none">
              {paletteShortcut}
            </kbd>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} className="hidden sm:flex" />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-line bg-ink/5 text-ink lg:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            // More opaque than other glass: the page behind would otherwise compete with the links.
            className="glass mx-auto mt-2 max-w-5xl origin-top overflow-hidden rounded-3xl bg-canvas/85 lg:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link, index) => {
                const isActive = activeId === link.href.replace('#', '')
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: easeOutExpo, delay: 0.03 * index }}
                    className={`rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-ink/[0.06] hover:text-ink ${
                      isActive ? 'bg-ink/[0.07] text-ink' : 'text-ink-muted'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                )
              })}
              <div className="mt-2 flex items-center justify-between border-t border-glass-line px-4 pt-3 pb-1">
                <span className="text-sm text-ink-muted">Theme</span>
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
