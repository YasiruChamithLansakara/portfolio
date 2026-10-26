import { motion } from 'motion/react'
import {
  AudioLines,
  Braces,
  Brain,
  ChartLine,
  Database,
  Globe,
  type LucideIcon,
  ScanEye,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { skillCategories } from '../data/portfolio'
import { easeOutExpo } from '../lib/motion'
import { trackSpotlight } from '../lib/pointer'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

const categoryIcon: Record<string, LucideIcon> = {
  Languages: Braces,
  'Machine Learning': Brain,
  'Computer Vision & Geospatial': ScanEye,
  'Speech & Language AI': AudioLines,
  'Data & Forecasting': ChartLine,
  'Web Development': Globe,
  'Databases & Cloud': Database,
  'Tools & Practices': Wrench,
}

// Lights up with the row it belongs to.
function CategoryIcon({ title }: { title: string }) {
  const Icon = categoryIcon[title] ?? Sparkles
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-glass-line bg-ink/[0.04] text-ink-muted transition-[color,background-color,border-color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover/row:-rotate-6 group-hover/row:border-violet/30 group-hover/row:bg-violet/10 group-hover/row:text-violet">
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
  )
}

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
        <div
          onPointerMove={trackSpotlight}
          className="glass spotlight divide-y divide-glass-line overflow-hidden rounded-3xl px-6 sm:px-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: Math.min(index, 4) * 0.04 }}
              // Negative margins let the hover tint run edge to edge of the panel.
              className="group/row -mx-6 grid gap-3 px-6 py-5 transition-colors duration-300 hover:bg-ink/[0.025] sm:-mx-8 sm:px-8 sm:py-6 md:grid-cols-[14rem_1fr] md:gap-6"
            >
              <h3 className="flex items-center gap-3 text-sm font-semibold text-ink md:items-start">
                <CategoryIcon title={category.title} />
                <span className="md:pt-1.5">{category.title}</span>
              </h3>
              <div>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="cursor-default rounded-full border border-glass-line bg-ink/[0.04] px-3 py-1 text-sm leading-6 text-ink transition-[color,border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:bg-violet/10 hover:text-violet-soft"
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
