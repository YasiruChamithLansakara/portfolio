import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import type { Theme } from '../hooks/useTheme'
import { ThemeToggle } from './ThemeToggle'
import { Container } from './Container'

interface NavbarProps {
  theme: Theme
  onToggleTheme: () => void
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useActiveSection(navLinks.map((link) => link.href.replace('#', '')))

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-canvas/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Primary">
          <a
            href="#home"
            className="font-mono text-base font-semibold tracking-tight text-ink hover:text-violet transition-colors"
          >
            Yasiru<span className="text-violet">.</span>Lansakara
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.replace('#', '')
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-panel"
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
            <ThemeToggle theme={theme} onToggle={onToggleTheme} className="hidden sm:flex" />
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink lg:hidden"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-line bg-canvas lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-ink-muted hover:bg-panel hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-line px-3 pt-4">
                <span className="text-sm text-ink-muted">Theme</span>
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
