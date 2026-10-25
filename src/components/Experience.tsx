import { motion } from 'motion/react'
import { experience } from '../data/portfolio'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        {/* Same row-in-a-panel layout as Skills: period on the left, the role on the right. */}
        <ol className="divide-y divide-line rounded-2xl border border-line bg-panel px-6 sm:px-8">
          {experience.map((entry, index) => {
            // Wrap only between the start and end dates, never inside one.
            const [start, end] = entry.period.split(' – ')
            return (
              <motion.li
                key={`${entry.organization}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid gap-3 py-6 sm:py-8 md:grid-cols-[12rem_1fr] md:gap-6"
              >
                {/* Logo beside the dates on phones, stacked above them from md up. */}
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-4">
                  {entry.logo && (
                    // Always-white tile: brand logos are drawn for light backgrounds, so this keeps
                    // their colors legible in dark mode too.
                    <div className="shrink-0 rounded-xl border border-line bg-white px-3 py-2.5">
                      <img
                        src={`${import.meta.env.BASE_URL}${entry.logo.src}`}
                        alt={entry.logo.alt}
                        className="h-7 w-auto md:h-9"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <p className="font-mono text-xs leading-5 text-ink-faint md:pt-1">
                    {end ? (
                      <>
                        <span className="whitespace-nowrap">{start} –</span>{' '}
                        <span className="whitespace-nowrap">{end}</span>
                      </>
                    ) : (
                      entry.period
                    )}
                  </p>
                </div>

                <div className="max-w-2xl">
                  <h3 className="text-lg font-semibold text-ink">{entry.role}</h3>
                  <p className="mt-0.5 text-sm font-medium text-violet">{entry.organization}</p>
                  <ul className="mt-4 space-y-2.5">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                        <span className="mt-[0.6rem] h-px w-2.5 shrink-0 bg-ink-faint" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
