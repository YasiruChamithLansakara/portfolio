import { Moon, Sun } from 'lucide-react'
import type { Theme, ThemeTransitionOrigin } from '../hooks/useTheme'

interface ThemeToggleProps {
  theme: Theme
  onToggle: (origin?: ThemeTransitionOrigin) => void
  className?: string
}

export function ThemeToggle({ theme, onToggle, className = '' }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        onToggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-glass-line bg-ink/5 text-ink-muted transition-colors hover:bg-ink/10 hover:text-ink ${className}`}
    >
      {/* The icons swap with a quarter turn, like a dial. */}
      <Sun
        className="h-4 w-4 rotate-0 scale-100 transition-transform duration-500 ease-[var(--ease-out-expo)] dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-500 ease-[var(--ease-out-expo)] dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
    </button>
  )
}
