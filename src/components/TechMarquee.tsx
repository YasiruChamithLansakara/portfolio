import { skillCategories } from '../data/portfolio'

// Every tool from the Skills section, once each, in the order they appear there.
const tools = [...new Set(skillCategories.flatMap((category) => category.skills))]

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {tools.map((tool) => (
        <li key={tool} className="flex items-center">
          <span className="px-6 font-display text-lg font-medium whitespace-nowrap text-ink-muted transition-colors hover:text-ink sm:text-xl">
            {tool}
          </span>
          <span className="text-xs text-violet/70" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  )
}

/** A slow, endless ticker of the tool stack, bridging the hero and the sections below. Pauses on hover. */
export function TechMarquee() {
  return (
    <div
      role="region"
      aria-label="Technologies I work with"
      className="relative overflow-hidden border-y border-glass-line bg-ink/[0.015] py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      {/* Two copies back to back; the second is hidden from assistive tech so the list is read once. */}
      <div className="animate-marquee flex w-max">
        <Track />
        <Track hidden />
      </div>
    </div>
  )
}
