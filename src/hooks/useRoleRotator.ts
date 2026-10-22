import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const TYPING_SPEED_MS = 65
const DELETING_SPEED_MS = 35
const HOLD_MS = 1700
const PAUSE_BEFORE_NEXT_MS = 400

/** Typing/deleting role-rotation effect; collapses to a plain cross-fade cycle under reduced motion. */
export function useRoleRotator(roles: string[], intervalMs = 2400) {
  const prefersReducedMotion = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)
  const [typedText, setTypedText] = useState('')

  // Reduced motion: just advance to the next full role on a timer, no per-character typing.
  useEffect(() => {
    if (!prefersReducedMotion) return
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [prefersReducedMotion, intervalMs, roles.length])

  // Full motion: type out, hold, delete, then move to the next role.
  useEffect(() => {
    if (prefersReducedMotion) return

    const fullText = roles[roleIndex]
    let charIndex = 0
    let phase: 'typing' | 'holding' | 'deleting' = 'typing'
    let timeoutId: number

    const tick = () => {
      if (phase === 'typing') {
        charIndex += 1
        setTypedText(fullText.slice(0, charIndex))
        if (charIndex >= fullText.length) {
          phase = 'holding'
          timeoutId = window.setTimeout(tick, HOLD_MS)
        } else {
          timeoutId = window.setTimeout(tick, TYPING_SPEED_MS)
        }
        return
      }

      if (phase === 'holding') {
        phase = 'deleting'
        timeoutId = window.setTimeout(tick, DELETING_SPEED_MS)
        return
      }

      charIndex -= 1
      setTypedText(fullText.slice(0, charIndex))
      if (charIndex <= 0) {
        timeoutId = window.setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length)
        }, PAUSE_BEFORE_NEXT_MS)
      } else {
        timeoutId = window.setTimeout(tick, DELETING_SPEED_MS)
      }
    }

    timeoutId = window.setTimeout(tick, TYPING_SPEED_MS)
    return () => window.clearTimeout(timeoutId)
  }, [roleIndex, prefersReducedMotion, roles])

  return prefersReducedMotion ? roles[roleIndex] : typedText
}
