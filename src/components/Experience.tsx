import { motion } from 'motion/react'
import { experience } from '../data/portfolio'
import { easeOutExpo, reveal } from '../lib/motion'
import { trackSpotlight } from '../lib/pointer'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        {/* One glass card per role: period and logo on the left, the role on the right. */}
        <ol className="space-y-4">
          {experience.map((entry, index) => {
            // Wrap only between the start and end dates, never inside one.
            const [start, end] = entry.period.split(' – ')
            return (
              <motion.li
                key={`${entry.organization}-${index}`}
                {...reveal()}
                onPointerMove={trackSpotlight}
                className="glass spotlight grid gap-3 overflow-hidden rounded-3xl p-6 sm:p-8 md:grid-cols-[12rem_1fr] md:gap-6"
              >
                {/* An accent bar down the leading edge marks the entry. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-8 left-0 w-0.5 rounded-full bg-gradient-to-b from-cyan via-violet to-transparent"
                />

                {/* Logo beside the dates on phones, stacked above them from md up. */}
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-4">
                  {entry.logo && (
                    // Always-white tile: brand logos are drawn for light backgrounds, so this keeps
                    // their colors legible in dark mode too.
                    <div className="shrink-0 rounded-xl border border-line bg-white px-3 py-2.5 shadow-lg shadow-black/10">
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
                  <h3 className="text-xl font-semibold text-ink">{entry.role}</h3>
                  <p className="mt-1 text-sm font-medium text-violet">{entry.organization}</p>
                  <ul className="mt-5 space-y-3">
                    {entry.bullets.map((bullet, i) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.15 + i * 0.07 }}
                        className="flex gap-3 text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]"
                      >
                        <span
                          className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-cyan to-violet"
                          aria-hidden="true"
                        />
                        {bullet}
                      </motion.li>
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
