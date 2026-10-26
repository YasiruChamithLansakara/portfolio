import { type PointerEvent, type ReactNode, useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'

const spring = { stiffness: 260, damping: 18, mass: 0.5 }

/** Lets its child drift a few pixels toward the cursor, then spring back. Mouse only. */
export function Magnetic({
  children,
  strength = 0.2,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  )
}
