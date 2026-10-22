import { motion } from 'motion/react'
import { Brain, Code2, ExternalLink, Eye, Satellite } from 'lucide-react'
import type { Project, ProjectCategory } from '../types/portfolio'
import { GithubIcon } from './icons/BrandIcons'
import { projectVisuals } from './icons/projectVisualsMap'

const categoryIcon: Record<ProjectCategory, typeof Brain> = {
  'AI & ML': Brain,
  'Computer Vision': Eye,
  'Web Development': Code2,
  'Data & Remote Sensing': Satellite,
}

const categoryGradient: Record<ProjectCategory, string> = {
  'AI & ML': 'from-violet/25 via-violet/5 to-transparent',
  'Computer Vision': 'from-cyan/25 via-cyan/5 to-transparent',
  'Web Development': 'from-violet/20 via-cyan/10 to-transparent',
  'Data & Remote Sensing': 'from-cyan/20 via-violet/10 to-transparent',
}

const statusStyle: Record<Project['status'], string> = {
  Completed: 'border-cyan/30 text-cyan',
  Ongoing: 'border-violet/30 text-violet',
  Academic: 'border-line text-ink-muted',
}

interface ProjectCardProps {
  project: Project
  wide?: boolean
}

export function ProjectCard({ project, wide = false }: ProjectCardProps) {
  const primaryCategory = project.categories[0]
  const Icon = categoryIcon[primaryCategory]
  const Visual = projectVisuals[project.id]

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors hover:border-violet/40 ${
        wide ? 'lg:col-span-2' : ''
      }`}
    >
      <div
        className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${categoryGradient[primaryCategory]}`}
      >
        <div aria-hidden="true" className="bg-grid-texture absolute inset-0 opacity-40" />
        {Visual ? (
          <Visual
            aria-hidden="true"
            className="relative h-full w-full max-w-xs px-6 text-ink-muted transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex flex-col items-center gap-2 text-ink-muted transition-transform duration-300 group-hover:scale-105">
            <Icon className="h-9 w-9" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wide">{project.visualLabel}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyle[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-md bg-canvas-raised px-2 py-1 text-xs text-ink-muted">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-line pt-4">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-violet"
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              Code
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-faint">
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              Private repo
            </span>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-violet"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
