import { motion } from 'motion/react'
import { easeOutExpo } from '../lib/motion'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <motion.div
      // Comes into focus (blur → sharp) as it rises, rather than just fading.
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: easeOutExpo }}
      className={`mb-12 max-w-2xl sm:mb-14 ${isCenter ? 'mx-auto text-center' : ''}`}
    >
      <span className="inline-flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-violet uppercase">
        <span className="h-px w-8 bg-gradient-to-r from-violet to-cyan" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-pretty text-ink-muted sm:text-lg">{description}</p>}
    </motion.div>
  )
}
