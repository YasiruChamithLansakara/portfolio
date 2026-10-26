import { type ComponentType, type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, CornerDownLeft, Hash, Mail, Moon, Search, Sun } from 'lucide-react'
import { navLinks, personal, socialLinks } from '../data/portfolio'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import type { Theme } from '../hooks/useTheme'
import { easeOutExpo } from '../lib/motion'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'

type Group = 'Navigate' | 'Actions' | 'Elsewhere'

interface Command {
  id: string
  label: string
  group: Group
  icon: ComponentType<{ className?: string }>
  /** Extra words to match against, beyond the label */
  keywords?: string
  /** Close the palette before running (navigation); otherwise it stays open (e.g. copy) */
  closes: boolean
  run: () => void
  external?: boolean
}

// Routes a section jump through a real anchor click, so useSectionNavigation handles it exactly
// like a nav link: URL hash, scroll position, and focus all stay consistent.
function goToSection(href: string) {
  const anchor = document.createElement('a')
  anchor.href = href
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

const socialIcon = { github: GithubIcon, linkedin: LinkedinIcon, email: Mail }

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  theme: Theme
  onToggleTheme: () => void
}

export function CommandPalette({ open, onOpenChange, theme, onToggleTheme }: CommandPaletteProps) {
  // Cmd/Ctrl+K toggles from anywhere on the page.
  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // Closing is handled inside the dialog (where focus lives), so it can restore focus.
        if (!open) onOpenChange(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  return (
    <AnimatePresence>
      {/* Mounted per opening, so the query and highlight always start fresh. */}
      {open && <PaletteDialog onClose={() => onOpenChange(false)} theme={theme} onToggleTheme={onToggleTheme} />}
    </AnimatePresence>
  )
}

interface PaletteDialogProps {
  onClose: () => void
  theme: Theme
  onToggleTheme: () => void
}

function PaletteDialog({ onClose, theme, onToggleTheme }: PaletteDialogProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const { copied, copy } = useCopyToClipboard()
  const inputRef = useRef<HTMLInputElement>(null)
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const listId = `${uid}-list`

  const openerRef = useRef<HTMLElement | null>(null)

  // Focus the input and lock page scroll while open.
  useEffect(() => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Unlock and hand focus back at the moment of closing, not after the exit animation unmounts
  // the dialog — a late focus() would yank the page away from a section the user just jumped to.
  const close = () => {
    document.body.style.overflow = ''
    openerRef.current?.focus({ preventScroll: true })
    onClose()
  }

  const commands = useMemo<Command[]>(
    () => [
      ...navLinks.map((link) => ({
        id: `nav-${link.href.slice(1)}`,
        label: link.label,
        group: 'Navigate' as const,
        icon: Hash,
        keywords: 'go section jump',
        closes: true,
        run: () => goToSection(link.href),
      })),
      {
        id: 'copy-email',
        label: copied ? 'Email copied!' : 'Copy email address',
        group: 'Actions',
        icon: copied ? Check : Copy,
        keywords: `${personal.email} clipboard contact`,
        closes: false,
        run: () => copy(personal.email),
      },
      {
        id: 'toggle-theme',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        group: 'Actions',
        icon: theme === 'dark' ? Sun : Moon,
        keywords: 'theme mode dark light appearance',
        closes: true,
        run: onToggleTheme,
      },
      ...socialLinks.map((link) => ({
        id: `social-${link.icon}`,
        label: link.icon === 'email' ? 'Send an email' : `Open ${link.label}`,
        group: 'Elsewhere' as const,
        icon: socialIcon[link.icon],
        keywords: `${link.label} profile contact`,
        closes: true,
        external: link.icon !== 'email',
        run: () => {
          if (link.icon === 'email') window.location.href = link.url
          else window.open(link.url, '_blank', 'noopener,noreferrer')
        },
      })),
    ],
    [copied, copy, theme, onToggleTheme],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((command) => `${command.label} ${command.keywords ?? ''}`.toLowerCase().includes(q))
  }, [commands, query])

  const active = results[Math.min(activeIndex, results.length - 1)]

  // Keep the highlighted row visible while arrowing through a long list.
  useEffect(() => {
    if (!active) return
    document.getElementById(`${uid}-${active.id}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, uid])

  const execute = (command: Command) => {
    if (!command.closes) {
      command.run()
      return
    }
    close()
    // Next frame: the close has committed before a section jump starts scrolling.
    requestAnimationFrame(command.run)
  }

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!results.length) return
      const step = e.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((i) => (Math.min(i, results.length - 1) + step + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (active) execute(active)
    } else if (e.key === 'Escape' || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) {
      e.preventDefault()
      close()
    } else if (e.key === 'Tab') {
      // The input is the dialog's only stop; keep focus from wandering to the page behind.
      e.preventDefault()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={close}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -6, transition: { duration: 0.15 } }}
        transition={{ duration: 0.35, ease: easeOutExpo }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-3xl border border-glass-line bg-panel/90 shadow-2xl shadow-black/40 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 border-b border-glass-line px-5">
          <Search className="h-4.5 w-4.5 shrink-0 text-ink-faint" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={active ? `${uid}-${active.id}` : undefined}
            aria-autocomplete="list"
            aria-label="Search sections and actions"
            placeholder="Jump to a section, or run an action…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={onInputKeyDown}
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={close}
            className="rounded-md border border-glass-line px-1.5 py-0.5 font-mono text-[10px] text-ink-faint transition-colors hover:text-ink"
          >
            Esc
          </button>
        </div>

        <ul id={listId} role="listbox" aria-label="Results" className="max-h-[min(24rem,55vh)] overflow-y-auto p-2">
          {results.map((command, index) => {
            const isActive = command === active
            const Icon = command.icon
            const startsGroup = index === 0 || results[index - 1].group !== command.group
            return (
              <li key={command.id} role="presentation">
                {startsGroup && (
                  <p
                    role="presentation"
                    className="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase"
                  >
                    {command.group}
                  </p>
                )}
                <div
                  id={`${uid}-${command.id}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseMove={() => !isActive && setActiveIndex(index)}
                  onClick={() => execute(command)}
                  className={`relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isActive ? 'bg-ink/[0.07] text-ink' : 'text-ink-muted'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="palette-active-bar"
                      className="absolute top-2 bottom-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-cyan to-violet"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    />
                  )}
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      isActive ? 'border-violet/30 bg-violet/10 text-violet' : 'border-glass-line bg-ink/[0.03]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="flex-1 truncate">{command.label}</span>
                  {isActive &&
                    (command.external ? (
                      <ArrowUpRight className="h-4 w-4 text-ink-faint" aria-hidden="true" />
                    ) : (
                      <CornerDownLeft className="h-3.5 w-3.5 text-ink-faint" aria-hidden="true" />
                    ))}
                </div>
              </li>
            )
          })}
          {results.length === 0 && (
            <li role="presentation" className="px-3 py-10 text-center text-sm text-ink-muted">
              Nothing matches “{query}”.
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4 border-t border-glass-line px-5 py-2.5 font-mono text-[10px] text-ink-faint">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
          <span role="status" className="sr-only">
            {copied ? 'Email address copied' : ''}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
