import type { SVGProps } from 'react'

/**
 * Bespoke per-project line-art visuals, used in place of a screenshot when none exists.
 * Each is a simple geometric composition themed to the project, drawn with currentColor
 * plus the two brand accents so it reads consistently across light/dark themes.
 */

export type Visual = (props: SVGProps<SVGSVGElement>) => React.JSX.Element

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 200 110',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
}

export const MediAssistVisual: Visual = (props) => (
  <svg {...base} {...props}>
    <rect x="34" y="20" width="92" height="58" rx="12" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
    <path d="M52 78 L44 92 L68 78" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeLinejoin="round" />
    <line x1="50" y1="38" x2="104" y2="38" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="50" x2="92" y2="50" className="text-violet" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="62" x2="80" y2="62" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
    <g className="text-cyan">
      <rect x="138" y="62" width="40" height="16" rx="8" stroke="currentColor" strokeWidth="2" transform="rotate(-20 158 70)" />
      <line x1="150" y1="63" x2="158" y2="78" stroke="currentColor" strokeWidth="2" transform="rotate(-20 158 70)" />
    </g>
    <path d="M130 24 L144 24 M137 17 L137 31" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const UrbanizationVisual: Visual = (props) => (
  <svg {...base} {...props}>
    <line x1="24" y1="86" x2="176" y2="86" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
    {[
      [38, 30],
      [62, 42],
      [86, 54],
      [110, 66],
      [134, 76],
    ].map(([x, h]) => (
      <rect key={x} x={x} y={86 - h} width="16" height={h} rx="2" className="text-violet" stroke="currentColor" strokeWidth="2" />
    ))}
    <polyline
      points="40,58 64,48 88,38 112,26 158,16"
      className="text-cyan"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M150 14 L160 15 L158 25" className="text-cyan" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const VoiceEmotionVisual: Visual = (props) => (
  <svg {...base} {...props}>
    <line x1="20" y1="55" x2="180" y2="55" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
    {[10, 16, 12, 20, 14, 26].map((h, i) => (
      <rect
        key={`calm-${i}`}
        x={30 + i * 14}
        y={55 - h / 2}
        width="7"
        height={h}
        rx="3.5"
        className="text-cyan"
        fill="currentColor"
        opacity="0.8"
      />
    ))}
    {[18, 34, 22, 40, 26, 36].map((h, i) => (
      <rect
        key={`aggr-${i}`}
        x={116 + i * 14}
        y={55 - h / 2}
        width="7"
        height={h}
        rx="3.5"
        className="text-violet"
        fill="currentColor"
      />
    ))}
  </svg>
)

export const BusSeatVisual: Visual = (props) => (
  <svg {...base} {...props}>
    {Array.from({ length: 3 }).map((_, row) =>
      Array.from({ length: 5 }).map((_, col) => {
        const isSelected = row === 1 && col === 2
        const isBooked = (row === 0 && col === 1) || (row === 2 && col === 3)
        return (
          <rect
            key={`${row}-${col}`}
            x={30 + col * 30}
            y={22 + row * 26}
            width="18"
            height="18"
            rx="5"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity={isSelected || isBooked ? '1' : '0.4'}
            className={isSelected ? 'text-cyan' : isBooked ? 'text-violet' : undefined}
            fill={isSelected || isBooked ? 'currentColor' : 'none'}
            fillOpacity={isSelected || isBooked ? '0.18' : '0'}
          />
        )
      }),
    )}
  </svg>
)

export const NeurixaVisual: Visual = (props) => (
  <svg {...base} {...props}>
    <rect x="48" y="18" width="104" height="60" rx="14" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
    <path d="M90 60 L80 70 L92 82" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeLinejoin="round" />
    <path
      d="M78 36 C78 28 92 28 92 36 C92 42 84 42 84 48 C84 54 94 54 94 46 C94 38 108 38 108 46 C108 52 100 52 100 48"
      className="text-violet"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <g className="text-cyan">
      <path d="M126 32 L126 42 M121 37 L131 37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M130 50 L130 58 M126 54 L134 54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
)

export const HeartDiseaseVisual: Visual = (props) => (
  <svg {...base} {...props}>
    <path
      d="M24 55 L62 55 L72 30 L84 78 L94 45 L102 55 L176 55"
      className="text-violet"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M146 24 C146 18 154 18 154 24 C154 18 162 18 162 24 C162 30 154 36 154 36 C154 36 146 30 146 24 Z"
      className="text-cyan"
      stroke="currentColor"
      strokeWidth="2"
    />
    {[40, 66, 96, 124].map((x, i) => (
      <circle key={x} cx={x} cy={88 - (i % 2) * 6} r="3" fill="currentColor" opacity="0.5" />
    ))}
  </svg>
)

export const SegmentationVisual: Visual = (props) => (
  <svg {...base} {...props}>
    <path d="M30 20 L90 24 L78 60 L34 66 Z" className="text-violet" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.5" />
    <path d="M90 24 L170 32 L150 70 L78 60 Z" className="text-cyan" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M34 66 L78 60 L96 92 L44 90 Z" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
    <path d="M78 60 L150 70 L140 96 L96 92 Z" className="text-violet" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.5" />
    {[
      [58, 42],
      [122, 48],
      [66, 78],
      [116, 80],
    ].map(([cx, cy]) => (
      <g key={`${cx}-${cy}`}>
        <circle cx={cx} cy={cy} r="2.5" fill="currentColor" />
        <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </g>
    ))}
  </svg>
)

export const DeforestationVisual: Visual = (props) => {
  const tree = (x: number, scale: number, opacity: number) => (
    <g key={x} opacity={opacity}>
      <line x1={x} y1={82} x2={x} y2={92} stroke="currentColor" strokeWidth="2" />
      <path d={`M${x} ${82 - 28 * scale} L${x - 12 * scale} ${82} L${x + 12 * scale} ${82} Z`} fill="currentColor" className="text-violet" />
    </g>
  )
  const stump = (x: number) => (
    <g key={`stump-${x}`} opacity="0.4">
      <line x1={x} y1={84} x2={x} y2={92} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
  return (
    <svg {...base} {...props}>
      <line x1="20" y1="92" x2="180" y2="92" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      {tree(38, 1, 1)}
      {tree(62, 0.9, 0.9)}
      {tree(86, 0.8, 0.7)}
      {stump(110)}
      {stump(134)}
      {stump(158)}
      <polyline
        points="34,20 70,34 110,52 160,70"
        className="text-cyan"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

