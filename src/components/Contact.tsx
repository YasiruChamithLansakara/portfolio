import { type FormEvent, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, CheckCircle2, Copy, MapPin, Send } from 'lucide-react'
import { personal, socialLinks } from '../data/portfolio'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!emailPattern.test(values.email)) errors.email = 'Please enter a valid email address.'
  if (!values.subject.trim()) errors.subject = 'Please enter a subject.'
  if (!values.message.trim()) errors.message = 'Please enter a message.'
  return errors
}

// The profile handle (last URL segment) says more than a generic "Connect with me".
const profileHandle = (url: string) => url.replace(/\/+$/, '').split('/').pop() ?? url

function EmailBlock() {
  const { copied, copy } = useCopyToClipboard()
  const [user, domain] = personal.email.split('@')

  return (
    <div>
      <p className="font-mono text-[11px] tracking-wide text-ink-faint uppercase">Email</p>
      <div className="mt-2 flex items-center gap-2">
        <a
          href={`mailto:${personal.email}`}
          className="min-w-0 text-base font-medium text-ink transition-colors [overflow-wrap:anywhere] hover:text-violet sm:text-lg"
        >
          {/* On narrow screens, wrap after the @ rather than mid-word. */}
          {user}@<wbr />
          {domain}
        </a>
        <button
          type="button"
          onClick={() => copy(personal.email)}
          aria-label="Copy email address"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:border-violet/40 hover:text-violet"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-cyan" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
        <span role="status" className="sr-only">
          {copied ? 'Email address copied' : ''}
        </span>
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink-muted">
        <MapPin className="h-4 w-4 text-ink-faint" aria-hidden="true" />
        {personal.location}
      </p>
    </div>
  )
}

export function Contact() {
  const [values, setValues] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    // Drop a field's error once it's being fixed; the rest are re-checked on the next submit.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    if (!FORMSPREE_ENDPOINT) {
      // No form backend configured — fall back to opening the user's email client.
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(values.subject)}&body=${body}`
      setStatus('success')
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-canvas-raised px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-faint focus:outline-none focus:ring-4 ${
      hasError
        ? 'border-danger focus:ring-danger/15'
        : 'border-line hover:border-ink-faint/60 focus:border-violet focus:ring-violet/15'
    }`

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a role, a project, or just a question about my work? I'd love to hear from you."
        />

        {/* One panel, two panes: direct details on a quieter side, the form on the other, so they read as one piece. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="grid overflow-hidden rounded-2xl border border-line bg-panel lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          <aside className="relative flex flex-col gap-8 border-b border-line bg-panel-hover/60 p-6 sm:p-8 lg:border-r lg:border-b-0 lg:p-10 dark:bg-canvas-raised">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet/10 via-transparent to-transparent"
            />

            <div className="relative">
              <h3 className="text-lg font-semibold text-ink">Reach me directly</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pretty text-ink-muted">
                Prefer your own inbox? Email works just as well as the form.
              </p>
            </div>

            <div className="relative">
              <EmailBlock />
            </div>

            <div className="relative border-t border-line pt-6 lg:mt-auto">
              <p className="font-mono text-[11px] tracking-wide text-ink-faint uppercase">Elsewhere</p>
              <ul className="mt-3 space-y-1">
                {socialLinks
                  .filter((link) => link.icon !== 'email')
                  .map((link) => {
                    const Icon = link.icon === 'github' ? GithubIcon : LinkedinIcon
                    return (
                      <li key={link.label}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group -mx-3 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-panel"
                        >
                          <Icon className="h-4.5 w-4.5 shrink-0 text-ink-muted transition-colors group-hover:text-violet" aria-hidden="true" />
                          <span className="text-sm font-medium text-ink">{link.label}</span>
                          <span className="min-w-0 truncate text-sm text-ink-faint">{profileHandle(link.url)}</span>
                          <ArrowUpRight
                            className="ml-auto h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </div>

            {/* A setup hint for local development only — visitors never see it. */}
            {import.meta.env.DEV && !FORMSPREE_ENDPOINT && (
              <p className="relative rounded-xl border border-dashed border-line p-4 text-xs leading-relaxed text-ink-faint">
                Dev note: no form backend is configured, so the form opens the visitor's email client. Set{' '}
                <code className="text-ink-muted">VITE_FORMSPREE_ENDPOINT</code> to enable in-page submission.
              </p>
            )}
          </aside>

          <form onSubmit={handleSubmit} noValidate className="space-y-5 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={fieldClass(Boolean(errors.name))}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-danger">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={fieldClass(Boolean(errors.email))}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-danger">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={values.subject}
                onChange={handleChange('subject')}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className={fieldClass(Boolean(errors.subject))}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1.5 text-xs text-danger">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={values.message}
                onChange={handleChange('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${fieldClass(Boolean(errors.message))} min-h-32 resize-y`}
                placeholder="Tell me a bit about what you have in mind..."
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-danger">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Status on the left, action on the right; stacks with the button first on small screens. */}
            <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <div role="status" aria-live="polite" className="min-h-5">
                {status === 'success' && (
                  <p className="flex items-center gap-2 text-sm text-cyan">
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {FORMSPREE_ENDPOINT
                      ? 'Message sent — thank you! I will get back to you soon.'
                      : 'Your email client should now be open with the message ready to send.'}
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-danger">
                    Something went wrong sending your message. Please email me directly at {personal.email}.
                  </p>
                )}
                {status === 'idle' && !FORMSPREE_ENDPOINT && (
                  <p className="text-xs text-ink-faint">Sending opens your email app with the message filled in.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-violet-soft disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        </motion.div>
      </Container>
    </section>
  )
}
