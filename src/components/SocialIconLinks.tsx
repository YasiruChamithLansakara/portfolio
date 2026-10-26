import { Mail } from 'lucide-react'
import { socialLinks } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'

const socialIcon = { github: GithubIcon, linkedin: LinkedinIcon, email: Mail }

// Shared with other round icon buttons (e.g. the footer's back-to-top) so they match.
export const iconButtonClass =
  'flex h-10 w-10 items-center justify-center rounded-full border border-glass-line bg-ink/[0.04] text-ink-muted backdrop-blur-md transition-[color,border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-violet/50 hover:text-violet hover:shadow-[0_10px_24px_-10px] hover:shadow-violet/60'

export function SocialIconLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = socialIcon[link.icon]
        const isExternal = link.icon !== 'email'
        return (
          <a
            key={link.label}
            href={link.url}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
            aria-label={isExternal ? `${link.label} (opens in new tab)` : link.label}
            className={iconButtonClass}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        )
      })}
    </div>
  )
}
