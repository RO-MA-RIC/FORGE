export type Sex = 'homme' | 'femme'

export type ActivityLevel = 'sedentaire' | 'leger' | 'modere' | 'actif' | 'tres_actif'

export type Goal = 'perte' | 'prise_masse' | 'maintien'

export type WeightLossRate = 0.25 | 0.5 | 0.75

export type TrainingDaysPerWeek = 3 | 4 | 5

export interface Profile {
  sex: Sex
  age: number
  heightCm: number
  currentWeightKg: number
  targetWeightKg: number
  activityLevel: ActivityLevel
  goal: Goal
  /** Uniquement pertinent si goal === 'perte' */
  weightLossRateKgPerWeek: WeightLossRate | null
  trainingDaysPerWeek: TrainingDaysPerWeek
}

export interface Macros {
  proteinG: number
  fatG: number
  carbsG: number
  proteinKcal: number
  fatKcal: number
  carbsKcal: number
}

export interface MetabolicCalculation {
  bmr: number
  tdee: number
  calorieTargetBeforeFloor: number
  calorieTarget: number
  flooredBySafetyLimit: boolean
  macros: Macros
}

export type MuscleGroup = 'pectoraux' | 'dos' | 'epaules' | 'biceps' | 'triceps' | 'jambes' | 'abdominaux'

export interface Exercise {
  id: string
  name: string
  muscleGroup: MuscleGroup
  defaultRepRangeMin: number
  defaultRepRangeMax: number
}

export interface ProgramExercise {
  exerciseId: string
  sets: number
}

export interface ProgramDay {
  id: string
  label: string
  exercises: ProgramExercise[]
}

export interface ProgramTemplate {
  trainingDaysPerWeek: TrainingDaysPerWeek
  days: ProgramDay[]
}

export interface GeneratedProgramExercise {
  exercise: Exercise
  sets: number
}

export interface GeneratedProgramDay {
  id: string
  label: string
  exercises: GeneratedProgramExercise[]
  hasCardioFinisher: boolean
}

export interface GeneratedProgram {
  days: GeneratedProgramDay[]
}

export interface SetLog {
  weightKg: number
  reps: number
}

export interface WorkoutSessionExercise {
  exerciseId: string
  sets: SetLog[]
}

export interface WorkoutSession {
  id: string
  /** ISO 8601 */
  date: string
  dayId: string
  dayLabel: string
  exercises: WorkoutSessionExercise[]
}
