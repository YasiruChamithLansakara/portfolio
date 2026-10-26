import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { easeOutExpo } from '../lib/motion'

/**
 * Counts from zero to `value` the first time it scrolls into view. Writes text directly to the
 * node (no re-render per frame); assistive tech gets the final value from a separate span.
 */
export function CountUp({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const final = value.toFixed(decimals)

  useEffect(() => {
    const node = ref.current
    if (!inView || !node) return
    if (reduceMotion) {
      node.textContent = final
      return
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: easeOutExpo,
      onUpdate: (latest) => {
        node.textContent = latest.toFixed(decimals)
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value, decimals, final])

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {(0).toFixed(decimals)}
      </span>
      {suffix && <span aria-hidden="true">{suffix}</span>}
      <span className="sr-only">
        {final}
        {suffix}
      </span>
    </>
  )
}
