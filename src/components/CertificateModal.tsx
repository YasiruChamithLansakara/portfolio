import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, ExternalLink, X } from 'lucide-react'
import type { CertificationEntry } from '../types/portfolio'

interface CertificateModalProps {
  certificate: CertificationEntry | null
  onClose: () => void
}

// Keyed by certificate so the "copied" state never carries over to the next one opened.
function CredentialFooter({ certificate }: { certificate: CertificationEntry }) {
  const { credentialId, credentialUrl } = certificate
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyId = async () => {
    if (!credentialId) return
    try {
      await navigator.clipboard.writeText(credentialId)
      setCopied(true)
    } catch {
      // Clipboard access can be refused; the ID is still selectable text.
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line p-4">
      {credentialId && (
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-xs text-ink-faint">Credential ID</span>
          <code className="font-mono text-xs break-all text-ink select-all">{credentialId}</code>
          <button
            type="button"
            onClick={copyId}
            aria-label="Copy credential ID"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:text-violet"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-cyan" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
          </button>
          <span role="status" className="sr-only">
            {copied ? 'Credential ID copied' : ''}
          </span>
        </div>
      )}
      {credentialUrl && (
        <a
          href={credentialUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 py-1 text-sm font-medium text-ink-muted transition-colors hover:text-violet"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          {/* With an ID, the link is a portal the ID gets entered into rather than the credential itself. */}
          {credentialId ? 'Open verification portal' : 'Verify online'}
        </a>
      )}
    </div>
  )
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!certificate) return

    // Remember what opened the dialog so focus can go back there on close.
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButtonRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Keep Tab cycling inside the dialog rather than reaching the page behind it.
      const panel = panelRef.current
      if (e.key !== 'Tab' || !panel) return
      const focusable = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first) return

      if (!panel.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      opener?.focus()
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
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
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
                  // Intrinsic size lets the browser reserve the image's space before it loads, so the dialog doesn't jump.
                  width={certificate.imageSize?.width}
                  height={certificate.imageSize?.height}
                  className="w-full rounded-lg border border-line"
                  loading="eager"
                />
              )}
            </div>

            {(certificate.credentialId || certificate.credentialUrl) && (
              <CredentialFooter key={certificate.name} certificate={certificate} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
