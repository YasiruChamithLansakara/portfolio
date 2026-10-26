import { motion } from 'motion/react'
import { ArrowUpRight, Brain, Code2, ExternalLink, Eye, Satellite } from 'lucide-react'
import type { Project, ProjectCategory } from '../types/portfolio'
import { useTilt } from '../hooks/useTilt'
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
  /** Featured layout: spans two grid columns, with the visual beside the content from lg up. */
  wide?: boolean
}

export function ProjectCard({ project, wide = false }: ProjectCardProps) {
  const primaryCategory = project.categories[0]
  const Icon = categoryIcon[primaryCategory]
  const Visual = projectVisuals[project.id]
  const tilt = useTilt()

  return (
    <motion.article
      {...tilt}
      className={`glass spotlight group flex h-full flex-col rounded-3xl p-2 transition-[border-color] duration-300 ${
        wide ? 'lg:flex-row' : ''
      } ${project.githubUrl ? 'focus-within:border-violet/50' : ''}`}
    >
      <div
        className={`relative flex h-44 items-center justify-center overflow-hidden rounded-[1.25rem] bg-gradient-to-br ${categoryGradient[primaryCategory]} ${
          wide ? 'lg:h-auto lg:w-[46%] lg:shrink-0' : ''
        }`}
      >
        <div
          aria-hidden="true"
          className="bg-grid-texture absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        {/* A glow behind the artwork: always on for the featured card, blooming on hover for the rest. */}
        <div
          aria-hidden="true"
          className={`absolute rounded-full bg-violet/30 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
            wide ? 'h-32 w-32 opacity-0 lg:h-56 lg:w-56 lg:opacity-70' : 'h-32 w-32 opacity-0'
          }`}
        />
        {Visual ? (
          <Visual
            aria-hidden="true"
            // The featured card's panel is much taller, so its artwork scales up to fill it.
            className={`relative h-full w-full max-w-xs px-6 text-ink-muted transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:scale-[1.07] ${
              wide ? 'lg:h-auto lg:max-w-md lg:px-8' : ''
            }`}
          />
        ) : (
          <div className="relative flex flex-col items-center gap-2 text-ink-muted transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105">
            <Icon className="h-9 w-9" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wide">{project.visualLabel}</span>
          </div>
        )}

        <span className="glass absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-ink-muted">
          <Icon className="h-3.5 w-3.5 text-violet" aria-hidden="true" />
          {primaryCategory}
        </span>
        {project.githubUrl && (
          <span
            aria-hidden="true"
            className="glass absolute top-3 right-3 flex h-8 w-8 translate-x-1 -translate-y-1 items-center justify-center rounded-full text-ink opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col px-4 pt-5 pb-4 ${wide ? 'lg:px-8 lg:pt-8 lg:pb-6' : ''}`}>
        {wide && (
          <span className="mb-3 hidden items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-violet uppercase lg:inline-flex">
            <span className="h-px w-6 bg-gradient-to-r from-violet to-cyan" aria-hidden="true" />
            Featured
          </span>
        )}
        <div className="flex items-start justify-between gap-3">
          {/* A no-break space keeps " — " on the first line, so a wrapped subtitle never starts with a dash. */}
          <h3
            className={`leading-snug font-semibold text-balance text-ink transition-colors group-hover:text-violet-soft ${
              wide ? 'text-lg lg:text-2xl' : 'text-lg'
            }`}
          >
            {project.title.replace(' — ', ' — ')}
          </h3>
          {/* "Completed" is the default, so only call out projects that aren't. */}
          {project.status !== 'Completed' && (
            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyle[project.status]}`}
            >
              {project.status}
            </span>
          )}
        </div>

        <p className={`mt-3 text-sm leading-relaxed text-ink-muted ${wide ? 'lg:text-[0.9375rem]' : ''}`}>
          {project.description}
        </p>

        {/* mt-auto pins tags and links to the card bottom so they line up across a grid row. */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-glass-line bg-ink/[0.04] px-2 py-1 font-mono text-[11px] text-ink-muted"
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
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors group-hover:text-violet after:absolute after:inset-0 after:rounded-3xl after:content-['']"
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
