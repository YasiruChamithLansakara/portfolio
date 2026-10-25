import { useLayoutEffect, useState } from 'react'

// Natural scrolling activates a section once its top passes this fraction of the viewport
// (or the sticky-header offset, whichever is lower on screen).
const DETECTION_RATIO = 0.3

function getScrollPaddingTop() {
  return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
}

function getHashId() {
  try {
    return decodeURIComponent(window.location.hash.slice(1))
  } catch {
    return ''
  }
}

/**
 * Keeps the URL hash, scroll position, and active nav item in sync for a single-page layout.
 * `sectionIds` must be referentially stable and listed in document order; the first one is
 * treated as the top of the page and is represented by a hash-less URL.
 */
export function useSectionNavigation(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  // Layout effect so a deep link (e.g. #about) is applied before the first paint, not after
  // a flash of the hero. The browser's native jump can't do this: it runs before React renders.
  useLayoutEffect(() => {
    if (sectionIds.length === 0) return

    const homeId = sectionIds[0]
    const lastId = sectionIds[sectionIds.length - 1]
    const sectionSet = new Set(sectionIds)
    let currentId = ''
    let disposed = false
    let frame = 0
    let settleTimer = 0
    // Programmatic scrolls (link clicks, deep links, back/forward) pin the active item to their
    // target until the user scrolls themselves — so the nav doesn't flicker through every
    // section on the way, and a target that can't reach the top of the viewport stays active.
    let lockedId: string | null = null

    const hashFor = (id: string) => (id === homeId ? '' : `#${id}`)
    const urlFor = (id: string) =>
      id === homeId ? window.location.pathname + window.location.search : `#${id}`

    const setActive = (id: string) => {
      if (id === currentId) return
      currentId = id
      setActiveId(id)
    }

    const detectActive = () => {
      const line = Math.max(getScrollPaddingTop() + 1, window.innerHeight * DETECTION_RATIO)
      let id = homeId
      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId)
        if (el && el.getBoundingClientRect().top <= line) id = sectionId
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      return atBottom ? lastId : id
    }

    const syncFromScroll = () => {
      frame = 0
      if (lockedId) return
      const id = detectActive()
      if (id === currentId) return
      setActive(id)
      if (window.location.hash !== hashFor(id)) {
        history.replaceState(history.state, '', urlFor(id))
      }
    }

    const scrollToTarget = (id: string, behavior: ScrollBehavior) => {
      const el = document.getElementById(id)
      if (!el) return null
      lockedId = sectionSet.has(id) ? id : null
      if (lockedId) setActive(lockedId)
      el.scrollIntoView({ behavior, block: 'start' })
      return el
    }

    // Web fonts, images, or other late layout shifts can move the target during or after a
    // programmatic scroll; snap back to it unless the user has since taken over scrolling.
    const realignLocked = () => {
      if (disposed || !lockedId) return
      const el = document.getElementById(lockedId)
      if (!el) return
      const expectedTop = getScrollPaddingTop() + (parseFloat(getComputedStyle(el).scrollMarginTop) || 0)
      if (Math.abs(el.getBoundingClientRect().top - expectedTop) > 2) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(syncFromScroll)
      if (lockedId) {
        window.clearTimeout(settleTimer)
        settleTimer = window.setTimeout(realignLocked, 150)
      }
    }

    const releaseLock = () => {
      lockedId = null
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const link = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null
      if (!(link instanceof HTMLAnchorElement) || link.target) return
      const id = decodeURIComponent(link.hash.slice(1))
      if (!sectionSet.has(id)) return

      e.preventDefault()
      if (window.location.hash !== hashFor(id)) history.pushState(null, '', urlFor(id))
      // Wait a frame so state changes from the same click (e.g. the mobile menu closing and
      // releasing its body scroll lock) are committed first — they'd cancel a smooth scroll.
      requestAnimationFrame(() => {
        if (disposed) return
        const el = scrollToTarget(id, 'auto')
        // Mirror native anchor behavior: move the keyboard focus start point to the section.
        if (el) {
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
        }
      })
    }

    // Back/forward and manual hash edits. 'auto' defers to the CSS scroll-behavior,
    // which already honors prefers-reduced-motion.
    const onPopState = () => {
      scrollToTarget(getHashId() || homeId, 'auto')
    }

    // The URL is kept in sync with the visible section, so restoring a stale pixel offset
    // on refresh or back/forward would fight the hash — handle positioning ourselves.
    const previousRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'

    const initialId = getHashId()
    if (initialId && scrollToTarget(initialId, 'instant')) {
      document.fonts?.ready.then(realignLocked)
      if (document.readyState !== 'complete') {
        window.addEventListener('load', realignLocked, { once: true })
      }
    } else {
      syncFromScroll()
    }

    const intentOptions: AddEventListenerOptions = { passive: true, capture: true }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick)
    for (const type of ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const) {
      window.addEventListener(type, releaseLock, intentOptions)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.clearTimeout(settleTimer)
      history.scrollRestoration = previousRestoration
      window.removeEventListener('load', realignLocked)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', onClick)
      for (const type of ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const) {
        window.removeEventListener(type, releaseLock, intentOptions)
      }
    }
  }, [sectionIds])

  return activeId
}
