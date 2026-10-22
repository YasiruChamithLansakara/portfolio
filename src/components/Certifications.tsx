import { useState } from 'react'
import { motion } from 'motion/react'
import { Award, Eye } from 'lucide-react'
import { certifications } from '../data/portfolio'
import type { CertificationEntry } from '../types/portfolio'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import { CertificateModal } from './CertificateModal'

export function Certifications() {
  const [activeCert, setActiveCert] = useState<CertificationEntry | null>(null)

  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Certifications" title="Courses & certificates" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: (index % 4) * 0.06 }}
              className="flex flex-col rounded-2xl border border-line bg-panel p-6"
            >
              <Award className="h-6 w-6 text-violet" aria-hidden="true" />
              <h3 className="mt-4 text-sm font-semibold leading-snug text-ink">{cert.name}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{cert.issuer}</p>
              {cert.date && <p className="mt-2 font-mono text-xs text-ink-faint">{cert.date}</p>}
              {cert.imagePath && (
                <button
                  type="button"
                  onClick={() => setActiveCert(cert)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-violet"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  View Certificate
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </Container>

      <CertificateModal certificate={activeCert} onClose={() => setActiveCert(null)} />
    </section>
  )
}
