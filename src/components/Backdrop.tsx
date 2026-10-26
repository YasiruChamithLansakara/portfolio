import { motion, useScroll, useSpring } from 'motion/react'

/** Fixed, page-wide backdrop: drifting aurora fields plus film grain. Purely decorative. */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora aurora-violet" />
      <div className="aurora aurora-cyan" />
      <div className="aurora aurora-soft" />
      <div className="bg-noise absolute inset-0" />
    </div>
  )
}

/** Thin reading-progress bar along the top edge of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyan via-violet to-violet-soft"
    />
  )
}
