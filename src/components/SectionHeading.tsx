import { motion } from 'motion/react'

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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mb-12 max-w-2xl ${isCenter ? 'mx-auto text-center' : ''}`}
    >
      <span className="font-mono text-sm font-medium tracking-wide text-violet">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-ink-muted">{description}</p>}
    </motion.div>
  )
}
