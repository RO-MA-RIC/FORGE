import type { WeightEntry } from '../../types'

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 40

export function WeightChart({ entries, targetWeightKg }: { entries: WeightEntry[]; targetWeightKg: number }) {
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date))
  const values = [...sorted.map((entry) => entry.weightKg), targetWeightKg]
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min
  const padding = range > 0 ? range * 0.15 : 1
  const yMin = min - padding
  const yMax = max + padding

  function x(index: number) {
    return sorted.length <= 1 ? VIEWBOX_WIDTH / 2 : (index / (sorted.length - 1)) * VIEWBOX_WIDTH
  }

  function y(value: number) {
    return VIEWBOX_HEIGHT - ((value - yMin) / (yMax - yMin)) * VIEWBOX_HEIGHT
  }

  const linePoints = sorted.map((entry, index) => `${x(index)},${y(entry.weightKg)}`).join(' ')
  const targetY = y(targetWeightKg)

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      className="weight-chart"
      role="img"
      aria-label="Courbe de poids"
    >
      <line x1={0} y1={targetY} x2={VIEWBOX_WIDTH} y2={targetY} className="weight-chart-target" />
      <polyline points={linePoints} className="weight-chart-line" />
      {sorted.map((entry, index) => (
        <circle key={entry.id} cx={x(index)} cy={y(entry.weightKg)} r={1.4} className="weight-chart-dot" />
      ))}
    </svg>
  )
}
