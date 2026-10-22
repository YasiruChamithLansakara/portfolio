import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
  className?: string
}

export function ThemeToggle({ theme, onToggle, className = '' }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel text-ink-muted transition-colors hover:text-ink ${className}`}
    >
      <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-transform" aria-hidden="true" />
      <Moon className="absolute h-4 w-4 scale-0 dark:scale-100 transition-transform" aria-hidden="true" />
    </button>
  )
}
