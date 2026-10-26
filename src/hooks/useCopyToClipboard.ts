import { useCallback, useEffect, useState } from 'react'

/** Copies text and flags `copied` for a moment, so the trigger can briefly show a check. */
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), resetMs)
    return () => window.clearTimeout(id)
  }, [copied, resetMs])

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Clipboard access can be refused; the text is still on screen to select by hand.
    }
  }, [])

  return { copied, copy }
}
