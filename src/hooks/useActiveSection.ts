import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const orderedIds = elements.map((el) => el.id)
    const intersectingIds = new Set<string>()

    // Among all sections currently touching the detection line, prefer the lowest one
    // (furthest scrolled into) — deterministic regardless of event batching or scroll direction.
    const recomputeActive = () => {
      for (let i = orderedIds.length - 1; i >= 0; i--) {
        if (intersectingIds.has(orderedIds[i])) {
          setActiveId(orderedIds[i])
          return
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersectingIds.add(entry.target.id)
          } else {
            intersectingIds.delete(entry.target.id)
          }
        }
        recomputeActive()
      },
      {
        // A thin detection line near the top of the viewport — reliable regardless of how
        // tall an individual section is (e.g. Projects, once its grid grows).
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
