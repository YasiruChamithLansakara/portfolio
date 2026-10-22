import { useCallback, useLayoutEffect, useState } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'dark' | 'light'

export interface ThemeTransitionOrigin {
  x: number
  y: number
}

const STORAGE_KEY = 'portfolio-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored

  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
  return prefersLight ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.toggle('light', theme === 'light')
    root.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(
    (origin?: ThemeTransitionOrigin) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      const root = document.documentElement

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const startViewTransition = document.startViewTransition?.bind(document)

      if (!startViewTransition || prefersReducedMotion) {
        setTheme(next)
        return
      }

      const { x, y } = origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      root.style.setProperty('--theme-transition-x', `${x}px`)
      root.style.setProperty('--theme-transition-y', `${y}px`)

      startViewTransition(() => {
        flushSync(() => setTheme(next))
      })
    },
    [theme],
  )

  return { theme, toggleTheme }
}
