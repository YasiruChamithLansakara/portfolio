import { useCallback, useState } from 'react'
import { motion } from 'motion/react'
import { Award, Eye } from 'lucide-react'
import { certifications } from '../data/portfolio'
import type { CertificationEntry } from '../types/portfolio'
import { easeOutExpo } from '../lib/motion'
import { trackSpotlight } from '../lib/pointer'
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: (index % 4) * 0.07 }}
              onPointerMove={trackSpotlight}
              className={`glass spotlight group flex w-full flex-col rounded-3xl p-2 transition-[border-color] duration-300 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)] ${
                cert.imagePath ? 'focus-within:border-violet/50' : ''
              }`}
            >
              {/* A preview of the certificate itself; dimmed until hovered so the white pages don't glare in dark mode.
                  The zoom, the fade and the pill share one duration and curve, so they move as a single gesture. */}
              {cert.imagePath && (
                <div className="relative aspect-[10/7] overflow-hidden rounded-[1.25rem] bg-white">
                  <img
                    src={`${import.meta.env.BASE_URL}${cert.imagePath}`}
                    alt=""
                    width={cert.imageSize?.width}
                    height={cert.imageSize?.height}
                    loading="lazy"
                    decoding="async"
                    // will-change keeps the image on its own GPU layer for good. Without it, Chrome promotes
                    // the layer as each hover starts and drops it as it ends: a re-raster hitch going in and a
                    // visible sharpness "snap" coming out.
                    className="h-full w-full object-cover object-top opacity-85 backface-hidden will-change-transform transition-[transform,opacity] duration-500 ease-smooth group-hover:scale-[1.04] group-hover:opacity-100 dark:opacity-70 dark:group-hover:opacity-100"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent transition-opacity duration-500 ease-smooth group-hover:opacity-0"
                  />
                  {/* Solid, not frosted: a backdrop blur over the zooming image would be recomputed every frame.
                      It follows the zoom in (short delay) but leaves immediately. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-3 mx-auto flex w-fit translate-y-1.5 items-center gap-1.5 rounded-full border border-glass-line bg-canvas/85 px-3 py-1.5 text-xs font-medium text-ink opacity-0 shadow-lg shadow-black/20 transition-[opacity,transform] duration-300 ease-smooth group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-100"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col px-3 pt-4 pb-2">
                <p className="flex items-center gap-1.5 text-xs font-medium text-violet">
                  <Award className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {cert.issuer}
                </p>
                <h3 className="mt-2 text-sm leading-snug font-semibold text-ink">{cert.name}</h3>
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
                    className="mt-auto inline-flex items-center gap-1.5 self-start pt-4 pb-1 text-sm font-medium text-ink-muted transition-colors group-hover:text-violet after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    View certificate
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>

      <CertificateModal certificate={activeCert} onClose={closeModal} />
    </section>
  )
}
