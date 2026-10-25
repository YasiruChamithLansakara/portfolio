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
          description="Tools I've genuinely used across coursework, research, my internship and personal projects — and the methods I've applied them to."
        />

        {/* One full-width row per category, so uneven category sizes never leave empty space. */}
        <div className="divide-y divide-line rounded-2xl border border-line bg-panel px-6 sm:px-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: Math.min(index, 4) * 0.04 }}
              className="grid gap-3 py-5 sm:py-6 md:grid-cols-[14rem_1fr] md:gap-6"
            >
              <h3 className="text-sm font-semibold text-ink md:pt-1.5">{category.title}</h3>
              <div>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line bg-canvas-raised px-3 py-1 text-sm leading-6 text-ink"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                {category.methods && (
                  <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:gap-3">
                    <span className="shrink-0 pt-px font-mono text-[11px] leading-5 tracking-wide text-ink-faint uppercase">
                      Methods
                    </span>
                    {/* Separators trail each item, so a wrapped line never starts with one. From sm up,
                        each method stays on one line and only the gaps between them wrap. */}
                    <ul className="flex flex-wrap gap-x-2 gap-y-0.5 text-sm leading-5 text-ink-muted">
                      {category.methods.map((method, i) => (
                        <li key={method} className="sm:whitespace-nowrap">
                          {method}
                          {i < category.methods!.length - 1 && (
                            <span className="ml-2 text-ink-faint" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
