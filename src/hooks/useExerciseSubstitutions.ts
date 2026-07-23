import { useCallback, useEffect, useState } from 'react'
import { getSubstitutions, saveSubstitution } from '../db/database'
import type { ExerciseSubstitution } from '../types'

export function useExerciseSubstitutions() {
  const [substitutions, setSubstitutions] = useState<ExerciseSubstitution[] | null>(null)

  useEffect(() => {
    let cancelled = false
    getSubstitutions().then((loaded) => {
      if (cancelled) return
      setSubstitutions(loaded)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const substitute = useCallback((next: ExerciseSubstitution) => {
    setSubstitutions((current) => [
      ...(current ?? []).filter(
        (s) => !(s.dayId === next.dayId && s.originalExerciseId === next.originalExerciseId),
      ),
      next,
    ])
    void saveSubstitution(next)
  }, [])

  return { substitutions, substitute }
}
