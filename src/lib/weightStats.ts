import type { WeightEntry, WeightStats } from '../types'

const MS_PER_DAY = 86_400_000

export function computeWeightStats(entries: WeightEntry[], targetWeightKg: number): WeightStats | null {
  if (entries.length === 0) return null

  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date))
  const first = sorted[0]
  const latest = sorted[sorted.length - 1]

  const gapToTargetKg = latest.weightKg - targetWeightKg

  let observedRateKgPerWeek: number | null = null
  if (sorted.length >= 2) {
    const daysElapsed = (new Date(latest.date).getTime() - new Date(first.date).getTime()) / MS_PER_DAY
    if (daysElapsed > 0) {
      observedRateKgPerWeek = ((latest.weightKg - first.weightKg) / daysElapsed) * 7
    }
  }

  return { currentWeightKg: latest.weightKg, gapToTargetKg, observedRateKgPerWeek }
}
