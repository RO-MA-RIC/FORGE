import { EXERCISES } from '../data/exercises'
import { PROGRAM_TEMPLATES } from '../data/programTemplates'
import type { GeneratedProgram, Profile } from '../types'

const exercisesById = new Map(EXERCISES.map((exercise) => [exercise.id, exercise]))

export function getExerciseById(id: string) {
  return exercisesById.get(id)
}

export function generateProgram(profile: Pick<Profile, 'trainingDaysPerWeek' | 'goal'>): GeneratedProgram {
  const template = PROGRAM_TEMPLATES[profile.trainingDaysPerWeek]
  const hasCardioFinisher = profile.goal === 'perte'

  return {
    days: template.days.map((day) => ({
      id: day.id,
      label: day.label,
      hasCardioFinisher,
      exercises: day.exercises.map((programExercise) => {
        const exercise = exercisesById.get(programExercise.exerciseId)
        if (!exercise) {
          throw new Error(`Exercice inconnu dans le template: ${programExercise.exerciseId}`)
        }
        return { exercise, sets: programExercise.sets }
      }),
    })),
  }
}
