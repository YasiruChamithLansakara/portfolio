import { motion } from 'motion/react'
import { skillCategories } from '../data/portfolio'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Skills & Technologies"
          title="Tools I reach for"
          description="Technologies I've genuinely used across coursework, academic research, and personal projects."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: (index % 3) * 0.08 }}
              className="rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-violet/40"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{category.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-line bg-canvas-raised px-3 py-1.5 text-sm text-ink"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
