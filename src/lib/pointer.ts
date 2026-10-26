import type { PointerEvent } from 'react'

/**
 * Feeds the pointer position into a `.spotlight` element's --mx/--my custom properties.
 * Writes the style directly rather than through state, so hovering never re-renders.
 */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
