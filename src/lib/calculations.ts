import type { ActivityLevel, Goal, Macros, MetabolicCalculation, Profile } from '../types'

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentaire: 1.2,
  leger: 1.375,
  modere: 1.55,
  actif: 1.725,
  tres_actif: 1.9,
}

const CALORIE_FLOOR: Record<Profile['sex'], number> = {
  homme: 1500,
  femme: 1200,
}

const KCAL_PER_KG_FAT = 7700
const MASS_GAIN_SURPLUS_KCAL = 300

const PROTEIN_G_PER_KG: Record<Goal, number> = {
  perte: 2.2,
  maintien: 2.0,
  prise_masse: 1.8,
}

const FAT_SHARE_OF_CALORIES = 0.27

export function calculateBMR(profile: Pick<Profile, 'sex' | 'currentWeightKg' | 'heightCm' | 'age'>): number {
  const base = 10 * profile.currentWeightKg + 6.25 * profile.heightCm - 5 * profile.age
  return profile.sex === 'homme' ? base + 5 : base - 161
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_FACTORS[activityLevel]
}

export function calculateCalorieTarget(
  tdee: number,
  goal: Goal,
  weightLossRateKgPerWeek: number | null,
  sex: Profile['sex'],
): { beforeFloor: number; target: number; flooredBySafetyLimit: boolean } {
  let beforeFloor: number

  if (goal === 'perte') {
    const rate = weightLossRateKgPerWeek ?? 0.5
    const dailyDeficit = (rate * KCAL_PER_KG_FAT) / 7
    beforeFloor = tdee - dailyDeficit
  } else if (goal === 'prise_masse') {
    beforeFloor = tdee + MASS_GAIN_SURPLUS_KCAL
  } else {
    beforeFloor = tdee
  }

  const floor = CALORIE_FLOOR[sex]
  const target = Math.max(beforeFloor, floor)

  return { beforeFloor, target, flooredBySafetyLimit: target > beforeFloor }
}

export function calculateMacros(calorieTarget: number, currentWeightKg: number, goal: Goal): Macros {
  const proteinG = PROTEIN_G_PER_KG[goal] * currentWeightKg
  const proteinKcal = proteinG * 4

  const fatKcal = calorieTarget * FAT_SHARE_OF_CALORIES
  const fatG = fatKcal / 9

  const carbsKcal = Math.max(calorieTarget - proteinKcal - fatKcal, 0)
  const carbsG = carbsKcal / 4

  return { proteinG, fatG, carbsG, proteinKcal, fatKcal, carbsKcal }
}

export function computeMetabolics(profile: Profile): MetabolicCalculation {
  const bmr = calculateBMR(profile)
  const tdee = calculateTDEE(bmr, profile.activityLevel)
  const { beforeFloor, target, flooredBySafetyLimit } = calculateCalorieTarget(
    tdee,
    profile.goal,
    profile.weightLossRateKgPerWeek,
    profile.sex,
  )
  const macros = calculateMacros(target, profile.currentWeightKg, profile.goal)

  return {
    bmr,
    tdee,
    calorieTargetBeforeFloor: beforeFloor,
    calorieTarget: target,
    flooredBySafetyLimit,
    macros,
  }
}
