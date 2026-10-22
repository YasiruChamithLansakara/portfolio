import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { personal, socialLinks } from '../data/portfolio'
import { useRoleRotator } from '../hooks/useRoleRotator'
import { Container } from './Container'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'
import { NetworkArtwork } from './NetworkArtwork'

const socialIcon = { github: GithubIcon, linkedin: LinkedinIcon, email: Mail }

export function Hero() {
  const role = useRoleRotator(personal.roles)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div aria-hidden="true" className="bg-grid-texture pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-violet/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-[120px]"
      />

      <Container className="relative grid items-center gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-sm font-medium text-violet">Hello, I&apos;m</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {personal.name}
          </h1>
          <p className="mt-3 text-xl font-semibold text-ink-muted sm:text-2xl">{personal.title}</p>

          <div className="mt-5 flex h-8 items-center font-mono text-lg text-cyan sm:text-xl">
            <span>{role}</span>
            <span className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse bg-cyan" aria-hidden="true" />
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">{personal.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/20 transition-transform hover:-translate-y-0.5 hover:bg-violet-soft"
            >
              View Projects
            </a>
            {personal.cvPath ? (
              <a
                href={personal.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-violet hover:text-violet"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-line px-6 py-3 text-sm font-semibold text-ink-muted transition-colors hover:border-violet hover:text-violet"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                CV available on request
              </a>
            )}
          </div>

          <div className="mt-9 flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = socialIcon[link.icon]
              const isExternal = link.icon !== 'email'
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-violet hover:text-violet"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative isolate mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 z-0 rounded-[2rem] bg-gradient-to-br from-violet/30 via-cyan/10 to-transparent blur-2xl" />
          <NetworkArtwork className="absolute -inset-6 z-0 h-[calc(100%+3rem)] w-[calc(100%+3rem)] text-ink-faint" />
          <div className="absolute inset-x-8 bottom-6 z-0 h-10 rounded-full bg-black/30 blur-xl" aria-hidden="true" />
          <picture>
            <source srcSet={`${import.meta.env.BASE_URL}images/profile.webp`} type="image/webp" />
            <img
              src={`${import.meta.env.BASE_URL}images/profile.jpg`}
              alt={`Portrait of ${personal.name}`}
              width={760}
              height={950}
              className="relative z-10 aspect-[4/5] w-full object-contain drop-shadow-2xl"
              fetchPriority="high"
            />
          </picture>
          <div className="absolute z-20 -bottom-4 -right-4 rounded-2xl border border-line bg-canvas-raised px-4 py-3 shadow-xl">
            <p className="font-mono text-xs text-ink-muted">Based in</p>
            <p className="text-sm font-semibold text-ink">{personal.location}</p>
          </div>
        </motion.div>
      </Container>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint sm:flex"
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono text-xs">Scroll</span>
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
