import type { Variants } from 'motion/react'

export const easeOutExpo = [0.16, 1, 0.3, 1] as const

/** Props for a one-shot fade-and-rise as an element scrolls into view; spread onto any motion element. */
export function reveal(delay = 0, distance = 24) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, ease: easeOutExpo, delay },
  }
}

/** Parent/child variants for staggering a group in on mount (used by the hero). */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
}
