import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { education } from '../data/portfolio'
import { easeOutExpo } from '../lib/motion'
import { trackSpotlight } from '../lib/pointer'
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
        className="group inline-flex items-center gap-1.5 rounded-full border border-glass-line bg-ink/[0.04] px-3 py-1 font-mono text-[11px] tracking-wide text-ink-muted uppercase transition-colors hover:border-violet/40 hover:text-ink aria-expanded:border-violet/40 aria-expanded:bg-violet/10 aria-expanded:text-ink"
      >
        {label}
        <span className="text-ink-faint" aria-hidden="true">
          · {modules.length}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
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
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: easeOutExpo }}
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

        {/* A timeline, newest first, so the progression reads top to bottom. The rail runs down
            the left edge; each entry hangs a node on it. */}
        <ol onPointerMove={trackSpotlight} className="glass spotlight rounded-3xl px-5 py-3 sm:px-8 sm:py-4">
          {education.map((entry, index) => {
            const inProgress = entry.status === 'In Progress'
            const isLast = index === education.length - 1
            return (
              <motion.li
                key={entry.qualification}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: Math.min(index, 4) * 0.05 }}
                className={`relative grid gap-1.5 pl-8 md:grid-cols-[11rem_1fr] md:gap-6 ${entry.school ? 'py-4' : 'py-5 sm:py-6'}`}
              >
                <span
                  aria-hidden="true"
                  // A flat tint (not a gradient), so the per-row segments join into one seamless rail.
                  className={`absolute left-[5px] w-px bg-violet/30 ${
                    index === 0 ? 'top-7' : 'top-0'
                  } ${isLast ? 'h-7' : 'bottom-0'}`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute left-0 flex h-[11px] w-[11px] items-center justify-center ${entry.school ? 'top-[1.3rem]' : 'top-[1.65rem] sm:top-[1.9rem]'}`}
                >
                  {inProgress && <span className="absolute h-full w-full animate-ping rounded-full bg-violet/60" />}
                  <span
                    className={`relative h-[11px] w-[11px] rounded-full border-2 ${
                      inProgress ? 'border-violet bg-violet' : 'border-violet/70 bg-canvas'
                    }`}
                  />
                </span>

                <p className="font-mono text-xs leading-5 text-ink-faint md:pt-0.5">{entry.period}</p>

                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3
                      className={
                        entry.school ? 'text-sm font-medium text-ink' : 'text-base leading-snug font-semibold text-ink sm:text-lg'
                      }
                    >
                      {entry.qualification}
                    </h3>
                    {/* "Completed" is the default, so only call out what's still in progress. */}
                    {inProgress && (
                      <span className="rounded-full border border-violet/30 bg-violet/10 px-2.5 py-0.5 text-[11px] font-medium text-violet">
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
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
