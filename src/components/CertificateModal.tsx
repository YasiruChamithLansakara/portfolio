import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ExternalLink, X } from 'lucide-react'
import type { CertificationEntry } from '../types/portfolio'

interface CertificateModalProps {
  certificate: CertificationEntry | null
  onClose: () => void
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!certificate) return

    closeButtonRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [certificate, onClose])

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line p-5">
              <div>
                <h3 id="certificate-modal-title" className="text-base font-semibold text-ink">
                  {certificate.name}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {certificate.issuer}
                  {certificate.date ? ` — ${certificate.date}` : ''}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close certificate preview"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-violet hover:text-violet"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto bg-canvas-raised p-4">
              {certificate.imagePath && (
                <img
                  src={`${import.meta.env.BASE_URL}${certificate.imagePath}`}
                  alt={`${certificate.name} certificate`}
                  className="w-full rounded-lg border border-line"
                  loading="eager"
                />
              )}
            </div>

            {certificate.credentialUrl && (
              <div className="border-t border-line p-4">
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-violet"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Verify online
                  {certificate.credentialId ? ` (code: ${certificate.credentialId})` : ''}
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
