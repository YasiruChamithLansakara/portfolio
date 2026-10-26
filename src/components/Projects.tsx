import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { projects } from '../data/portfolio'
import type { ProjectCategory } from '../types/portfolio'
import { easeOutExpo } from '../lib/motion'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import { ProjectCard } from './ProjectCard'

const categories: Array<ProjectCategory | 'All'> = [
  'All',
  'AI & ML',
  'Computer Vision',
  'Web Development',
  'Data & Remote Sensing',
]

const countFor = (category: ProjectCategory | 'All') =>
  category === 'All' ? projects.length : projects.filter((p) => p.categories.includes(category)).length

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'All'>('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.categories.includes(activeFilter))
  }, [activeFilter])

  // With a remainder of two in the 3-column grid, widening the first card to span two columns
  // fills the last row exactly — and gives the lead project a featured, horizontal layout.
  const featureFirst = filtered.length % 3 === 2

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Things I've built"
          description="A selection of academic and independent projects spanning machine learning, computer vision, and full-stack development."
        />

        {/* On phones the filter bar stays on one row that scrolls sideways (bleeding to the screen edge).
            py-1 leaves room for the focus outline inside the scroll area. */}
        <div className="-mx-5 mb-10 overflow-x-auto px-5 py-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div
            className="glass inline-flex gap-1 rounded-full p-1"
            role="group"
            aria-label="Filter projects by category"
          >
            {categories.map((category) => {
              const isActive = activeFilter === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  aria-pressed={isActive}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'text-white' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 rounded-full bg-violet shadow-[0_6px_20px_-6px] shadow-violet/70"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {category}
                    <span className={`ml-1.5 font-mono text-[11px] ${isActive ? 'text-white/70' : 'text-ink-faint'}`}>
                      {countFor(category)}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Cards glide to their new slots when the filter changes; popLayout lets leaving cards
            fade out without holding their place in the grid. */}
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project, index) => {
              const wide = featureFirst && index === 0
              return (
                <motion.div
                  key={project.id}
                  layout
                  className={wide ? 'lg:col-span-2' : undefined}
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: easeOutExpo, delay: (index % 3) * 0.06 }}
                >
                  <ProjectCard project={project} wide={wide} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-ink-muted">No projects in this category yet.</p>
        )}
      </Container>
    </section>
  )
}
