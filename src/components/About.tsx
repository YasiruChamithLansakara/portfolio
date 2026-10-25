import { motion } from 'motion/react'
import { about } from '../data/portfolio'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="About Me" title="Turning curiosity into working software" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-5"
          >
            <p className="text-xl leading-relaxed font-medium text-ink sm:text-2xl">{about.lead}</p>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="divide-y divide-line self-start rounded-2xl border border-line bg-panel px-6"
          >
            {about.facts.map(({ label, value, detail }) => (
              <div key={label} className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                <dt className="pt-0.5 font-mono text-xs tracking-wide text-ink-faint uppercase">{label}</dt>
                <dd>
                  <p className="text-sm font-medium leading-relaxed text-ink">{value}</p>
                  {detail && <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{detail}</p>}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </Container>
    </section>
  )
}
