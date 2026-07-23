import { getExerciseById } from './program'
import type { ExerciseSubstitution, GeneratedProgram } from '../types'

export function applySubstitutions(program: GeneratedProgram, substitutions: ExerciseSubstitution[]): GeneratedProgram {
  if (substitutions.length === 0) return program

  const byDayAndSlot = new Map(substitutions.map((s) => [`${s.dayId}:${s.originalExerciseId}`, s]))

  return {
    days: program.days.map((day) => ({
      ...day,
      exercises: day.exercises.map((programExercise) => {
        const substitution = byDayAndSlot.get(`${day.id}:${programExercise.originalExerciseId}`)
        if (!substitution) return programExercise

        const replacement = getExerciseById(substitution.replacementExerciseId)
        if (!replacement) return programExercise

        return { ...programExercise, exercise: replacement }
      }),
    })),
  }
}
