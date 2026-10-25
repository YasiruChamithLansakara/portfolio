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
}

export function ProjectCard({ project }: ProjectCardProps) {
  const primaryCategory = project.categories[0]
  const Icon = categoryIcon[primaryCategory]
  const Visual = projectVisuals[project.id]

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors ${
        project.githubUrl ? 'hover:border-violet/40 focus-within:border-violet/40' : ''
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
          {/* A no-break space keeps " — " on the first line, so a wrapped subtitle never starts with a dash. */}
          <h3 className="text-lg font-semibold text-balance text-ink">{project.title.replace(' — ', ' — ')}</h3>
          {/* "Completed" is the default, so only call out projects that aren't. */}
          {project.status !== 'Completed' && (
            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyle[project.status]}`}
            >
              {project.status}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{project.description}</p>

        {/* mt-auto pins tags and links to the card bottom so they line up across a grid row. */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-panel-hover px-2 py-1 text-xs text-ink-muted dark:bg-canvas-raised"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-4 pb-0.5">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Code: ${project.title} on GitHub`}
                // The ::after overlay stretches this link over the whole card, so the card itself is clickable.
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors group-hover:text-violet after:absolute after:inset-0 after:content-['']"
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
                // Sits above the card-wide Code overlay so it stays separately clickable.
                className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-violet"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
