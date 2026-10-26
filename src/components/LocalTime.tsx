import { useEffect, useState } from 'react'

/** The current time in a given IANA time zone, refreshed every 15 seconds. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])

  const time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone }).format(now)

  return <time dateTime={now.toISOString()}>{time}</time>
}
