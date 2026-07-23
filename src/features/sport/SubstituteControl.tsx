import { useMemo } from 'react'
import { findAlternatives } from '../../lib/program'
import type { Exercise } from '../../types'

interface SubstituteControlProps {
  current: Exercise
  onSubstitute: (replacementExerciseId: string) => void
}

export function SubstituteControl({ current, onSubstitute }: SubstituteControlProps) {
  const alternatives = useMemo(() => findAlternatives(current), [current])

  if (alternatives.length === 0) return null

  return (
    <select
      className="substitute-select"
      value=""
      aria-label={`Remplacer ${current.name}`}
      onChange={(e) => {
        if (e.target.value) onSubstitute(e.target.value)
      }}
    >
      <option value="">Remplacer l'exercice…</option>
      {alternatives.map((alternative) => (
        <option key={alternative.id} value={alternative.id}>
          {alternative.name}
        </option>
      ))}
    </select>
  )
}
