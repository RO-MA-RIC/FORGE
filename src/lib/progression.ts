import type { Exercise, ProgressionSuggestion, WorkoutSession, WorkoutSessionExercise } from '../types'

const WEIGHT_INCREMENT_KG = 2.5

function findMostRecentSessionExercise(
  sessions: WorkoutSession[],
  exerciseId: string,
): WorkoutSessionExercise | undefined {
  const relevantSessions = sessions
    .filter((session) => session.exercises.some((sessionExercise) => sessionExercise.exerciseId === exerciseId))
    .sort((a, b) => b.date.localeCompare(a.date))

  return relevantSessions[0]?.exercises.find((sessionExercise) => sessionExercise.exerciseId === exerciseId)
}

export function computeProgressionSuggestion(
  exercise: Exercise,
  sessions: WorkoutSession[],
): ProgressionSuggestion | null {
  const lastPerformance = findMostRecentSessionExercise(sessions, exercise.id)
  if (!lastPerformance || lastPerformance.sets.length === 0) return null

  const { sets } = lastPerformance
  const lastWeightKg = sets[sets.length - 1].weightKg
  const minRepsAcrossSets = Math.min(...sets.map((set) => set.reps))

  if (minRepsAcrossSets >= exercise.defaultRepRangeMax) {
    return {
      type: 'poids',
      suggestedWeightKg: lastWeightKg + WEIGHT_INCREMENT_KG,
      suggestedRepTarget: exercise.defaultRepRangeMin,
    }
  }

  if (minRepsAcrossSets >= exercise.defaultRepRangeMin) {
    return {
      type: 'reps',
      suggestedWeightKg: lastWeightKg,
      suggestedRepTarget: Math.min(minRepsAcrossSets + 1, exercise.defaultRepRangeMax),
    }
  }

  return null
}
