import type { PointerEvent } from 'react'
import { useReducedMotion, useSpring } from 'motion/react'
import { trackSpotlight } from '../lib/pointer'

const spring = { stiffness: 220, damping: 22, mass: 0.6 }

/**
 * A subtle 3D tilt toward the cursor (mouse only — touch and reduced motion stay flat),
 * plus the spotlight position. Spread the result onto a motion element.
 */
export function useTilt(maxDegrees = 4) {
  const reduceMotion = useReducedMotion()
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    trackSpotlight(e)
    if (reduceMotion || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * maxDegrees * 2)
    rotateX.set(-py * maxDegrees * 2)
  }

  const onPointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return { style: { rotateX, rotateY, transformPerspective: 1000 }, onPointerMove, onPointerLeave }
}
