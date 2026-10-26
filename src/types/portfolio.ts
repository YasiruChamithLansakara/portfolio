export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'email'
}

export interface AboutFact {
  label: string
  value: string
  /** Optional secondary line shown under the value */
  detail?: string
}

export interface SkillCategory {
  title: string
  /** Tools, libraries and languages — shown as chips */
  skills: string[]
  /** Techniques applied with those tools — shown as a quieter line under the chips */
  methods?: string[]
}

export type ProjectCategory = 'AI & ML' | 'Computer Vision' | 'Web Development' | 'Data & Remote Sensing'

export type ProjectStatus = 'Completed' | 'Ongoing' | 'Academic'

export interface Project {
  id: string
  title: string
  description: string
  categories: ProjectCategory[]
  tech: string[]
  status: ProjectStatus
  featured?: boolean
  githubUrl?: string
  liveUrl?: string
  /** Short label used on the fallback visual when no screenshot is available */
  visualLabel: string
}

export interface ExperienceEntry {
  role: string
  organization: string
  location?: string
  period: string
  /** Organization logo, relative to public/ (e.g. images/experience/slt-logo.svg) */
  logo?: { src: string; alt: string }
  bullets: string[]
}

export interface EducationEntry {
  qualification: string
  institution: string
  period: string
  status: 'Completed' | 'In Progress'
  /** Highlighted result, e.g. a GPA — shown as a tag beside the qualification */
  detail?: string
  /** School-level qualification (O/L, A/L) — shown more compactly so the degrees lead */
  school?: boolean
  /** Modules (or school subjects), most relevant first — shown in a dropdown under the row */
  modules?: string[]
}

export interface CertificationEntry {
  name: string
  issuer: string
  date?: string
  credentialUrl?: string
  /** Verification code/serial to show when there's no direct verification link (e.g. a code to enter on a portal). */
  credentialId?: string
  /** Path to a preview image of the certificate itself, shown in the "View Certificate" modal. */
  imagePath?: string
  /** Pixel size of imagePath, so the modal can reserve its space before the image loads. */
  imageSize?: { width: number; height: number }
}
