import type { PointerEvent } from 'react'
import { motion, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowRight, Download } from 'lucide-react'
import { experience, personal } from '../data/portfolio'
import { useRoleRotator } from '../hooks/useRoleRotator'
import { easeOutExpo, staggerChild, staggerParent } from '../lib/motion'
import { trackSpotlight } from '../lib/pointer'
import { Container } from './Container'
import { Magnetic } from './Magnetic'
import { NetworkArtwork } from './NetworkArtwork'
import { SocialIconLinks } from './SocialIconLinks'

const nameWords = personal.name.split(' ')
const latestRole = experience[0]

// Each word rises out of its own clipping box. Padding on the box keeps descenders from being cut.
const wordVariants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease: easeOutExpo } },
}

export function Hero() {
  const role = useRoleRotator(personal.roles)
  const reduceMotion = useReducedMotion()

  // Pointer parallax: -0.5…0.5 across the section; layers move by different amounts for depth.
  const pointerX = useSpring(0, { stiffness: 80, damping: 20 })
  const pointerY = useSpring(0, { stiffness: 80, damping: 20 })
  const portraitX = useTransform(pointerX, (v) => v * 14)
  const portraitY = useTransform(pointerY, (v) => v * 10)
  const networkX = useTransform(pointerX, (v) => v * -22)
  const networkY = useTransform(pointerY, (v) => v * -16)

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    trackSpotlight(e)
    if (reduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="home"
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-20"
    >
      <div
        aria-hidden="true"
        className="bg-grid-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      <div aria-hidden="true" className="bg-grid-texture grid-reveal pointer-events-none absolute inset-0" />

      <Container className="relative grid items-center gap-16 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <motion.div variants={staggerParent} initial="hidden" animate="show">
          <motion.p
            variants={staggerChild}
            className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-3 text-xs font-medium text-ink-muted sm:text-sm"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            {personal.title}
          </motion.p>

          <h1 className="mt-7 text-5xl leading-[0.95] font-bold tracking-[-0.035em] text-ink xs:text-6xl lg:text-7xl xl:text-[5.25rem]">
            {nameWords.map((word, i) => (
              <span key={word} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <motion.span variants={wordVariants} className={`inline-block ${i > 0 ? 'text-gradient' : ''}`}>
                  {word}
                  {i === nameWords.length - 1 && <span className="text-violet">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            variants={staggerChild}
            className="mt-7 flex h-8 items-center font-mono text-base text-cyan sm:text-lg"
          >
            <span className="mr-2 text-violet" aria-hidden="true">
              &gt;
            </span>
            <span>{role}</span>
            <span className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse bg-cyan" aria-hidden="true" />
          </motion.div>

          <motion.p variants={staggerChild} className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {personal.tagline}
          </motion.p>

          <motion.div variants={staggerChild} className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="btn-shine group inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px] shadow-violet/60 transition-colors hover:bg-violet-soft"
              >
                View Projects
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
            {personal.cvPath ? (
              <Magnetic>
                <a
                  href={personal.cvPath}
                  download
                  className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-violet/50 hover:text-violet"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CV
                </a>
              </Magnetic>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-line px-6 py-3.5 text-sm font-semibold text-ink-muted transition-colors hover:border-violet hover:text-violet"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                CV available on request
              </a>
            )}
          </motion.div>

          <motion.div variants={staggerChild}>
            <SocialIconLinks className="mt-9" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easeOutExpo, delay: 0.2 }}
          className="relative isolate mx-auto w-full max-w-[19rem] sm:max-w-sm"
        >
          <div className="absolute -inset-6 z-0 rounded-full bg-gradient-to-br from-violet/35 via-cyan/10 to-transparent blur-3xl" />
          <motion.div style={{ x: networkX, y: networkY }} className="absolute -inset-6 z-0">
            <NetworkArtwork className="h-full w-full text-ink-faint" />
          </motion.div>
          <motion.picture style={{ x: portraitX, y: portraitY }} className="relative z-10 block">
            <source srcSet={`${import.meta.env.BASE_URL}images/profile.webp`} type="image/webp" />
            <img
              src={`${import.meta.env.BASE_URL}images/profile.jpg`}
              alt={`Portrait of ${personal.name}`}
              width={760}
              height={950}
              // The cutout ends in a hard horizontal crop; fade it into the background instead.
              className="aspect-[4/5] w-full object-contain drop-shadow-2xl [mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
              fetchPriority="high"
            />
          </motion.picture>

          {latestRole && (
            // Lower-left on phones, where the narrower portrait would put it over the face.
            <div className="glass animate-float-delayed absolute bottom-24 -left-3 z-20 rounded-2xl px-4 py-3 sm:top-6 sm:bottom-auto sm:-left-10">
              <p className="font-mono text-[11px] text-ink-muted">Recently</p>
              <p className="text-sm font-semibold text-ink">
                {latestRole.role} · {latestRole.organization.split(' — ')[0]}
              </p>
            </div>
          )}
          <div className="glass animate-float absolute -right-4 -bottom-4 z-20 rounded-2xl px-4 py-3">
            <p className="font-mono text-[11px] text-ink-muted">Based in</p>
            <p className="text-sm font-semibold text-ink">{personal.location}</p>
          </div>
        </motion.div>
      </Container>

      {/* A mouse outline with a falling dot; a quiet cue that there's more below. */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-ink-muted sm:flex"
      >
        <span className="flex h-9 w-5.5 justify-center rounded-full border border-current pt-1.5">
          <span className="animate-scroll-dot h-1.5 w-1 rounded-full bg-current" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      </a>
    </section>
  )
}
