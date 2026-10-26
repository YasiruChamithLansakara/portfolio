import { useCallback, useState } from 'react'
import { motion } from 'motion/react'
import { Award, Eye } from 'lucide-react'
import { certifications } from '../data/portfolio'
import type { CertificationEntry } from '../types/portfolio'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import { CertificateModal } from './CertificateModal'

export function Certifications() {
  const [activeCert, setActiveCert] = useState<CertificationEntry | null>(null)
  const closeModal = useCallback(() => setActiveCert(null), [])

  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Certifications" title="Courses & certificates" />

        {/* Flex-wrap rather than a grid so a short last row sits centred instead of leaving empty slots. */}
        <div className="flex flex-wrap justify-center gap-5">
          {certifications.map((cert, index) => (
            <motion.article
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: (index % 4) * 0.06 }}
              className={`group relative flex w-full flex-col rounded-2xl border border-line bg-panel p-6 transition-colors sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)] ${
                cert.imagePath ? 'hover:border-violet/40 focus-within:border-violet/40' : ''
              }`}
            >
              <Award className="h-6 w-6 text-violet" aria-hidden="true" />
              <h3 className="mt-4 text-sm font-semibold leading-snug text-ink">{cert.name}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{cert.issuer}</p>
              {cert.date && <p className="mt-2 font-mono text-xs text-ink-faint">{cert.date}</p>}

              {/* Verification lives in the modal, so every certificate offers the same single action here. */}
              {cert.imagePath && (
                // mt-auto pins the button to the card bottom so it lines up across a row.
                <button
                  type="button"
                  onClick={() => setActiveCert(cert)}
                  aria-haspopup="dialog"
                  aria-label={`View certificate: ${cert.name}`}
                  // The ::after overlay stretches this button over the whole card, so the card itself is clickable.
                  className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 pb-1 text-sm font-medium text-ink-muted transition-colors group-hover:text-violet after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  View certificate
                </button>
              )}
            </motion.article>
          ))}
        </div>
      </Container>

      <CertificateModal certificate={activeCert} onClose={closeModal} />
    </section>
  )
}
