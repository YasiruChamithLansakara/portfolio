import { motion } from 'motion/react'
import { Briefcase } from 'lucide-react'
import { experience } from '../data/portfolio'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        <ol className="relative space-y-10 border-l border-line pl-8">
          {experience.map((entry, index) => (
            <motion.li
              key={`${entry.organization}-${index}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative"
            >
              <span className="absolute -left-[2.58rem] flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel">
                <Briefcase className="h-3.5 w-3.5 text-violet" aria-hidden="true" />
              </span>

              <div className="rounded-2xl border border-line bg-panel p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-ink">{entry.role}</h3>
                  <span className="font-mono text-xs text-ink-faint">{entry.period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-violet">{entry.organization}</p>
                <ul className="mt-4 space-y-2">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
