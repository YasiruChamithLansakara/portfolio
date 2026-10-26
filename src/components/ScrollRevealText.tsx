import { useRef } from 'react'
import { type MotionValue, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  )
}

/**
 * A statement whose words light up one after another as it scrolls through the viewport,
 * as if being read aloud. Under reduced motion it renders as plain, fully visible text.
 */
export function ScrollRevealText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] })
  const words = text.split(' ')

  // The ref stays attached either way, so useScroll always has a target.
  if (reduceMotion)
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        // Spaces live between the inline-block spans so lines can still wrap normally.
        <span key={`${word}-${i}`}>
          <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>{' '}
        </span>
      ))}
    </p>
  )
}
