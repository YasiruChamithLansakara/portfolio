import { Mail } from 'lucide-react'
import { socialLinks } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'

const socialIcon = { github: GithubIcon, linkedin: LinkedinIcon, email: Mail }

// Shared with other round icon buttons (e.g. the footer's back-to-top) so they match.
export const iconButtonClass =
  'flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-violet hover:text-violet'

export function SocialIconLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
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
