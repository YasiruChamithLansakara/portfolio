import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface Node {
  x: number
  y: number
}

// A real (if small) fully connected neural network, flowing left to right:
// input → hidden → hidden → output. The two hidden layers flank the portrait, so the
// connections between them pass behind it — the network runs "through" the subject.
// Each layer is laid out on an outward-bowed arc so the whole diagram reads as a lens
// around the portrait rather than a box. Coordinates are in the 200×244 viewBox, which
// matches the artwork's box (portrait 4:5 plus its inset).
function layer(baseX: number, count: number, top: number, bottom: number, bow: number): Node[] {
  const mid = (top + bottom) / 2
  const half = (bottom - top) / 2
  return Array.from({ length: count }, (_, i) => {
    const y = top + ((bottom - top) * i) / (count - 1)
    const t = (y - mid) / half
    return { x: baseX + bow * (1 - t * t), y }
  })
}

const layers: Node[][] = [
  layer(20, 5, 54, 190, -10), // input
  layer(44, 6, 26, 218, -8), // hidden
  layer(156, 6, 26, 218, 8), // hidden
  layer(180, 3, 92, 152, 6), // output
]

const layerRole = ['input', 'hidden', 'hidden', 'output'] as const

// The hidden→hidden span is long and mostly behind the portrait; keep it fainter.
const edgeOpacity = [0.3, 0.16, 0.3]

const edges = layers.slice(0, -1).flatMap((from, l) =>
  from.flatMap((a, i) => layers[l + 1].map((b, j) => ({ a, b, l, key: `${l}-${i}-${j}` }))),
)

// Forward passes: each signal visits one node per layer, [input, hidden, hidden, output].
const signals: Array<{ path: [number, number, number, number]; delay: number }> = [
  { path: [1, 1, 2, 0], delay: 2.6 },
  { path: [3, 4, 3, 2], delay: 5.4 },
  { path: [0, 2, 4, 1], delay: 8.2 },
]

const SIGNAL_DURATION = 3.2
const SIGNAL_REPEAT_DELAY = 6.2

// Nodes that emit a slow ripple: one input, one output.
const pulsing = new Set(['0-2', '3-1'])

export function NetworkArtwork({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  // useId output can contain characters (":", "«") that are unsafe inside url(#…).
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const strokeId = `${uid}-net-stroke`
  const glowId = `${uid}-net-glow`

  return (
    <svg viewBox="0 0 200 244" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden="true">
      <defs>
        {/* Cyan at the input side shading to violet at the output, following the data flow. */}
        <linearGradient id={strokeId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="0">
          <stop offset="0" style={{ stopColor: 'var(--color-cyan)' }} />
          <stop offset="1" style={{ stopColor: 'var(--color-violet)' }} />
        </linearGradient>
        <radialGradient id={glowId}>
          <stop offset="0" style={{ stopColor: 'var(--color-cyan)', stopOpacity: 1 }} />
          <stop offset="0.35" style={{ stopColor: 'var(--color-cyan)', stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: 'var(--color-cyan)', stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {edges.map(({ a, b, l, key }, i) => (
        <motion.line
          key={key}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke={`url(#${strokeId})`}
          strokeOpacity={edgeOpacity[l]}
          strokeWidth="0.6"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          // Draw layer by layer, like activations propagating forward.
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 + l * 0.55 + (i % 12) * 0.02 }}
        />
      ))}

      {!reduceMotion &&
        signals.map(({ path, delay }) => {
          const points = path.map((nodeIndex, l) => layers[l][nodeIndex])
          return (
            <motion.circle
              key={path.join('-')}
              r="5"
              fill={`url(#${glowId})`}
              initial={{ cx: points[0].x, cy: points[0].y, opacity: 0 }}
              animate={{
                cx: points.map((p) => p.x),
                cy: points.map((p) => p.y),
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: SIGNAL_DURATION,
                ease: 'linear',
                delay,
                repeat: Infinity,
                repeatDelay: SIGNAL_REPEAT_DELAY,
              }}
            />
          )
        })}

      {layers.map((nodes, l) =>
        nodes.map((node, i) => {
          const role = layerRole[l]
          const colorClass = role === 'input' ? 'text-cyan' : role === 'output' ? 'text-violet' : 'text-ink-faint'
          const key = `${l}-${i}`
          return (
            <motion.g
              key={key}
              className={colorClass}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + l * 0.55 + i * 0.04 }}
            >
              {pulsing.has(key) && !reduceMotion && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  initial={{ r: 3.5, opacity: 0 }}
                  animate={{ r: [3.5, 11], opacity: [0.6, 0] }}
                  transition={{ duration: 2.8, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.6, delay: 1.5 + l * 0.7 }}
                />
              )}
              {role !== 'hidden' && <circle cx={node.x} cy={node.y} r="6" fill="currentColor" opacity="0.12" />}
              {/* Diagram-style ring nodes: canvas fill so edges stop cleanly at the ring. */}
              <circle
                cx={node.x}
                cy={node.y}
                r={role === 'hidden' ? 2.8 : 3.2}
                style={{ fill: 'var(--color-canvas)' }}
                stroke="currentColor"
                strokeWidth={role === 'hidden' ? 1 : 1.25}
              />
              {role !== 'hidden' && <circle cx={node.x} cy={node.y} r="1.3" fill="currentColor" />}
            </motion.g>
          )
        }),
      )}
    </svg>
  )
}
