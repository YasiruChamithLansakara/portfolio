import { type FormEvent, useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle2, Mail, Send } from 'lucide-react'
import { personal, socialLinks } from '../data/portfolio'
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

export function Contact() {
  const [values, setValues] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
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
    `w-full rounded-xl border bg-canvas-raised px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-violet-soft ${
      hasError ? 'border-danger' : 'border-line'
    }`

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a role, a project, or just a question about my work? I'd love to hear from you."
        />

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="space-y-4"
          >
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-violet/40"
            >
              <Mail className="h-5 w-5 text-violet" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <p className="text-sm text-ink-muted">{personal.email}</p>
              </div>
            </a>
            {socialLinks
              .filter((link) => link.icon !== 'email')
              .map((link) => {
                const Icon = link.icon === 'github' ? GithubIcon : LinkedinIcon
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-violet/40"
                  >
                    <Icon className="h-5 w-5 text-violet" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{link.label}</p>
                      <p className="text-sm text-ink-muted">Connect with me</p>
                    </div>
                  </a>
                )
              })}
            {!FORMSPREE_ENDPOINT && (
              <p className="rounded-2xl border border-dashed border-line p-4 text-xs leading-relaxed text-ink-faint">
                The contact form currently opens your email client to send a message, since no form backend is
                configured yet. Set <code className="text-ink-muted">VITE_FORMSPREE_ENDPOINT</code> to a Formspree
                (or similar) endpoint to enable direct in-page submission.
              </p>
            )}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 rounded-2xl border border-line bg-panel p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
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
                  type="email"
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
                rows={5}
                value={values.message}
                onChange={handleChange('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={fieldClass(Boolean(errors.message))}
                placeholder="Tell me a bit about what you have in mind..."
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-danger">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-violet-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>

            <div role="status" aria-live="polite">
              {status === 'success' && (
                <p className="flex items-center gap-2 text-sm text-cyan">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
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
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  )
}
