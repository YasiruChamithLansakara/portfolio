import { useMemo, useState } from 'react'
import { projects } from '../data/portfolio'
import type { ProjectCategory } from '../types/portfolio'
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

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'All'>('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.categories.includes(activeFilter))
  }, [activeFilter])

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Things I've built"
          description="A selection of academic and independent projects spanning machine learning, computer vision, and full-stack development."
        />

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              aria-pressed={activeFilter === category}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === category
                  ? 'border-violet bg-violet text-white'
                  : 'border-line text-ink-muted hover:border-violet/40 hover:text-ink'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-ink-muted">No projects in this category yet.</p>
        )}
      </Container>
    </section>
  )
}
