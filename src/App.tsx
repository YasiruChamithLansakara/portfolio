import { useCallback, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { Backdrop, ScrollProgress } from './components/Backdrop'
import { CommandPalette } from './components/CommandPalette'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TechMarquee } from './components/TechMarquee'
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
  const [paletteOpen, setPaletteOpen] = useState(false)
  const openPalette = useCallback(() => setPaletteOpen(true), [])
  // From the palette there's no button to grow the theme reveal from, so it expands from the centre.
  const toggleThemeFromPalette = useCallback(() => toggleTheme(), [toggleTheme])

  return (
    <MotionConfig reducedMotion="user">
      {/* isolate: the fixed backdrop sits at -z-10 inside this stacking context, above the body fill. */}
      <div className="relative isolate min-h-screen text-ink">
        <Backdrop />
        <ScrollProgress />

        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-violet px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>

        <Navbar theme={theme} onToggleTheme={toggleTheme} onOpenPalette={openPalette} />

        <main id="main-content">
          <Hero />
          <TechMarquee />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>

        <Footer onOpenPalette={openPalette} />

        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          theme={theme}
          onToggleTheme={toggleThemeFromPalette}
        />
      </div>
    </MotionConfig>
  )
}

export default App
