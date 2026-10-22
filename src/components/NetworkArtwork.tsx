import { motion } from 'motion/react'

interface Node {
  x: number
  y: number
  accent?: 'violet' | 'cyan'
  pulse?: boolean
}

// Hand-placed node scatter + nearest-neighbour-style links — a restrained nod to
// neural-network / circuit diagrams, sitting behind the portrait.
const nodes: Node[] = [
  { x: 40, y: 60, accent: 'cyan', pulse: true },
  { x: 90, y: 30 },
  { x: 140, y: 70, accent: 'violet', pulse: true },
  { x: 60, y: 140 },
  { x: 120, y: 150, accent: 'cyan' },
  { x: 170, y: 190, accent: 'violet', pulse: true },
  { x: 30, y: 230 },
  { x: 100, y: 260, accent: 'cyan' },
  { x: 160, y: 310 },
  { x: 50, y: 350, accent: 'violet', pulse: true },
  { x: 130, y: 400 },
  { x: 70, y: 450, accent: 'cyan' },
]

const links: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [3, 6],
  [4, 7],
  [6, 7],
  [5, 8],
  [7, 8],
  [6, 9],
  [7, 10],
  [9, 10],
  [9, 11],
  [10, 11],
]

export function NetworkArtwork({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {links.map(([a, b], i) => {
        const from = nodes[a]
        const to = nodes[b]
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.25"
          />
        )
      })}
      {nodes.map((node, i) => {
        const colorClass = node.accent === 'violet' ? 'text-violet' : node.accent === 'cyan' ? 'text-cyan' : 'text-ink-faint'
        if (!node.pulse) {
          return (
            <circle key={i} cx={node.x} cy={node.y} r="3" fill="currentColor" className={colorClass} opacity="0.7" />
          )
        }
        return (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="3.5"
            fill="currentColor"
            className={colorClass}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.4, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          />
        )
      })}
    </svg>
  )
}
