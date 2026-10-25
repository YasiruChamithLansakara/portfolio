import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { education } from '../data/portfolio'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

// Modules stay folded away until asked for, so each row reads as just the qualification.
function ModuleDropdown({ label, modules }: { label: string; modules: string[] }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const listId = useId()

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={listId}
        className="group inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wide text-ink-muted uppercase transition-colors hover:border-violet/40 hover:text-ink aria-expanded:border-violet/40 aria-expanded:text-ink"
      >
        {label}
        <span className="text-ink-faint" aria-hidden="true">
          · {modules.length}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="modules"
            id={listId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            {/* Columns (not a grid) so the list reads top to bottom, keeping the most relevant first. */}
            <ul className="gap-x-8 pt-3 sm:columns-2">
              {modules.map((module) => (
                <li key={module} className="flex break-inside-avoid gap-3 pb-1.5 text-sm leading-relaxed text-ink-muted">
                  <span className="mt-[0.6rem] h-px w-2.5 shrink-0 bg-ink-faint" aria-hidden="true" />
                  {module}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Education" title="Academic background" />

        {/* Same row-in-a-panel layout as Experience, newest first, so the progression reads top to bottom. */}
        <ol className="divide-y divide-line rounded-2xl border border-line bg-panel px-6 sm:px-8">
          {education.map((entry, index) => (
            <motion.li
              key={entry.qualification}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: Math.min(index, 4) * 0.04 }}
              className={`grid gap-1.5 md:grid-cols-[12rem_1fr] md:gap-6 ${entry.school ? 'py-4 sm:py-5' : 'py-5 sm:py-6'}`}
            >
              <p className="font-mono text-xs leading-5 text-ink-faint md:pt-0.5">{entry.period}</p>

              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h3
                    className={
                      entry.school ? 'text-sm font-medium text-ink' : 'text-base font-semibold leading-snug text-ink'
                    }
                  >
                    {entry.qualification}
                  </h3>
                  {/* "Completed" is the default, so only call out what's still in progress. */}
                  {entry.status === 'In Progress' && (
                    <span className="rounded-full border border-violet/30 px-2.5 py-0.5 text-[11px] font-medium text-violet">
                      In Progress
                    </span>
                  )}
                  {entry.detail && (
                    <span className="rounded-full bg-cyan/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-cyan">
                      {entry.detail}
                    </span>
                  )}
                </div>
                <p className={`text-sm text-ink-muted ${entry.school ? 'mt-0.5' : 'mt-1'}`}>{entry.institution}</p>
                {entry.modules && (
                  <ModuleDropdown label={entry.school ? 'Subjects' : 'Modules'} modules={entry.modules} />
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
