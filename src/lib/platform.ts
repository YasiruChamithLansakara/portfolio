const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)

/** How to label the command palette shortcut on this platform. */
export const paletteShortcut = isMac ? '⌘K' : 'Ctrl K'
