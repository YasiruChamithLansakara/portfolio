import { motion } from 'motion/react'
import { GraduationCap } from 'lucide-react'
import { education } from '../data/portfolio'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Education" title="Academic background" />

        <div className="grid gap-5 sm:grid-cols-2">
          {education.map((entry, index) => (
            <motion.div
              key={entry.qualification}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: (index % 2) * 0.08 }}
              className="rounded-2xl border border-line bg-panel p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <GraduationCap className="h-6 w-6 text-cyan" aria-hidden="true" />
                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                    entry.status === 'Completed' ? 'border-cyan/30 text-cyan' : 'border-violet/30 text-violet'
                  }`}
                >
                  {entry.status}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug text-ink">{entry.qualification}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{entry.institution}</p>
              <div className="mt-3 flex items-center justify-between font-mono text-xs text-ink-faint">
                <span>{entry.period}</span>
                {entry.detail && <span className="text-ink-muted">{entry.detail}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
