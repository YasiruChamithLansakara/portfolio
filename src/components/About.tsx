import { motion } from 'motion/react'
import { Briefcase, GraduationCap, type LucideIcon, MapPin, Sparkles } from 'lucide-react'
import { about, stats } from '../data/portfolio'
import { reveal } from '../lib/motion'
import { trackSpotlight } from '../lib/pointer'
import { Container } from './Container'
import { CountUp } from './CountUp'
import { ScrollRevealText } from './ScrollRevealText'
import { SectionHeading } from './SectionHeading'

const factIcon: Record<string, LucideIcon> = {
  'Based in': MapPin,
  Studying: GraduationCap,
  Recently: Briefcase,
}

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="About Me" title="Turning curiosity into working software" />

        {/* The lead line as an editorial statement, lit word by word as it's read. */}
        <ScrollRevealText
          text={about.lead}
          className="mb-14 max-w-4xl font-display text-2xl leading-[1.25] font-medium tracking-tight text-ink sm:mb-16 sm:text-3xl lg:text-[2.6rem]"
        />

        {/* Bento: the story on one side, the quick facts as tiles on the other. */}
        <div className="grid gap-4 lg:grid-cols-2">
          <motion.div
            {...reveal()}
            onPointerMove={trackSpotlight}
            className="glass spotlight flex flex-col justify-center gap-5 overflow-hidden rounded-3xl p-7 sm:p-9"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 -z-10 h-64 w-64 rounded-full bg-violet/20 blur-3xl"
            />
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-ink-muted sm:text-[1.0625rem]">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Two-up even on phones, so the facts read as a compact set rather than a long stack. */}
          <dl className="grid grid-cols-2 gap-3 sm:gap-4">
            {about.facts.map(({ label, value, detail }, index) => {
              const Icon = factIcon[label] ?? Sparkles
              return (
                <motion.div
                  key={label}
                  {...reveal(0.08 * (index + 1))}
                  onPointerMove={trackSpotlight}
                  className="glass spotlight group flex flex-col rounded-3xl p-4 xs:p-5 sm:p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet/20 bg-violet/10 text-violet transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <dt className="mt-5 font-mono text-[11px] tracking-[0.15em] text-ink-faint uppercase">{label}</dt>
                  <dd className="mt-1.5">
                    <p className="text-sm leading-snug font-semibold text-ink sm:text-base">{value}</p>
                    {detail && <p className="mt-1 text-sm leading-relaxed text-ink-muted">{detail}</p>}
                  </dd>
                </motion.div>
              )
            })}
          </dl>
        </div>

        {/* Headline numbers, counted up as they arrive. One panel split into cells reads as a single "scoreboard". */}
        <motion.dl
          {...reveal(0.1)}
          className="glass mt-4 grid grid-cols-2 overflow-hidden rounded-3xl md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative flex flex-col-reverse gap-1 p-6 sm:p-7 ${index % 2 === 1 ? 'border-l border-glass-line' : ''} ${
                index >= 2 ? 'border-t border-glass-line md:border-t-0' : ''
              } ${index === 2 ? 'md:border-l' : ''}`}
            >
              <dt className="text-sm text-ink-muted">{stat.label}</dt>
              <dd className="text-gradient font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  )
}
