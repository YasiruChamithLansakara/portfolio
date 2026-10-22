import { motion } from 'motion/react'
import { GraduationCap, Sparkles } from 'lucide-react'
import { aboutParagraphs } from '../data/portfolio'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

const highlights = [
  {
    icon: GraduationCap,
    title: 'CS & AI Undergraduate',
    detail: 'Final year, BSc (Hons) Computer Science with AI — Coventry University, UK',
  },
  {
    icon: Sparkles,
    title: 'Applied Focus',
    items: [
      'Machine Learning & Predictive Analytics',
      'Computer Vision & Geospatial Analysis',
      'Speech AI & Natural Language Processing',
      'AI-Driven Software Development',
    ],
  },
]

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="About Me" title="Turning curiosity into working software" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-5"
          >
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {highlights.map(({ icon: Icon, title, detail, items }) => (
              <div key={title} className="rounded-2xl border border-line bg-panel p-6">
                <Icon className="h-6 w-6 text-violet" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
                {detail && <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{detail}</p>}
                {items && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
