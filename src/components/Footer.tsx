import { ArrowUp, Mail } from 'lucide-react'
import { personal, socialLinks } from '../data/portfolio'
import { Container } from './Container'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'

const currentYear = new Date().getFullYear()

const socialIcon = { github: GithubIcon, linkedin: LinkedinIcon, email: Mail }

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-ink-muted">
          © {currentYear} {personal.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-violet hover:text-violet"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            )
          })}
          <a
            href="#home"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-violet hover:text-violet"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
