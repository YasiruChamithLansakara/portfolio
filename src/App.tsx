import { MotionConfig } from 'motion/react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-canvas text-ink">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-violet px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>

        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}

export default App
