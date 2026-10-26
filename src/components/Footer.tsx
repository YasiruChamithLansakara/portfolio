import { ArrowUp } from 'lucide-react'
import { personal } from '../data/portfolio'
import { Container } from './Container'
import { SocialIconLinks, iconButtonClass } from './SocialIconLinks'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-ink-muted">
          © {currentYear} {personal.name}. All rights reserved.
        </p>

        {/* The divider sets back-to-top apart, so it doesn't read as a fourth social link. */}
        <div className="flex items-center gap-4">
          <SocialIconLinks />
          <span aria-hidden="true" className="h-6 w-px bg-line" />
          <a href="#home" aria-label="Back to top" className={iconButtonClass}>
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
