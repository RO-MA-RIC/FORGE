import { useState, type FormEvent } from 'react'
import { Field } from '../../components/ui/Field'
import type { ActivityLevel, Goal, Profile, Sex, TrainingDaysPerWeek, WeightLossRate } from '../../types'

interface Draft {
  sex: Sex
  age: string
  heightCm: string
  currentWeightKg: string
  targetWeightKg: string
  activityLevel: ActivityLevel
  goal: Goal
  weightLossRateKgPerWeek: WeightLossRate
  trainingDaysPerWeek: TrainingDaysPerWeek
}

const initialDraft: Draft = {
  sex: 'homme',
  age: '',
  heightCm: '',
  currentWeightKg: '',
  targetWeightKg: '',
  activityLevel: 'modere',
  goal: 'perte',
  weightLossRateKgPerWeek: 0.5,
  trainingDaysPerWeek: 4,
}

type Errors = Partial<Record<keyof Draft, string>>

function validate(draft: Draft): Errors {
  const errors: Errors = {}

  const age = Number(draft.age)
  if (!draft.age || Number.isNaN(age) || age < 14 || age > 90) {
    errors.age = 'Indique un âge entre 14 et 90 ans'
  }

  const height = Number(draft.heightCm)
  if (!draft.heightCm || Number.isNaN(height) || height < 120 || height > 230) {
    errors.heightCm = 'Indique une taille entre 120 et 230 cm'
  }

  const currentWeight = Number(draft.currentWeightKg)
  if (!draft.currentWeightKg || Number.isNaN(currentWeight) || currentWeight < 30 || currentWeight > 300) {
    errors.currentWeightKg = 'Indique un poids entre 30 et 300 kg'
  }

  const targetWeight = Number(draft.targetWeightKg)
  if (!draft.targetWeightKg || Number.isNaN(targetWeight) || targetWeight < 30 || targetWeight > 300) {
    errors.targetWeightKg = 'Indique un poids visé entre 30 et 300 kg'
  }

  return errors
}

export function OnboardingScreen({ onComplete }: { onComplete: (profile: Profile) => void }) {
  const [draft, setDraft] = useState<Draft>(initialDraft)
  const [errors, setErrors] = useState<Errors>({})

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const validationErrors = validate(draft)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    const profile: Profile = {
      sex: draft.sex,
      age: Number(draft.age),
      heightCm: Number(draft.heightCm),
      currentWeightKg: Number(draft.currentWeightKg),
      targetWeightKg: Number(draft.targetWeightKg),
      activityLevel: draft.activityLevel,
      goal: draft.goal,
      weightLossRateKgPerWeek: draft.goal === 'perte' ? draft.weightLossRateKgPerWeek : null,
      trainingDaysPerWeek: draft.trainingDaysPerWeek,
    }

    onComplete(profile)
  }

  return (
    <div className="app-content">
      <div className="app-header" style={{ padding: '32px 0 8px' }}>
        <h1>FORGE</h1>
        <p>Renseigne ton profil pour démarrer ton suivi.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Field label="Sexe" htmlFor="sex">
          <select id="sex" value={draft.sex} onChange={(e) => set('sex', e.target.value as Sex)}>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
        </Field>

        <div className="field-row">
          <Field label="Âge" htmlFor="age" error={errors.age}>
            <input
              id="age"
              type="number"
              inputMode="numeric"
              value={draft.age}
              onChange={(e) => set('age', e.target.value)}
            />
          </Field>
          <Field label="Taille (cm)" htmlFor="heightCm" error={errors.heightCm}>
            <input
              id="heightCm"
              type="number"
              inputMode="numeric"
              value={draft.heightCm}
              onChange={(e) => set('heightCm', e.target.value)}
            />
          </Field>
        </div>

        <div className="field-row">
          <Field label="Poids actuel (kg)" htmlFor="currentWeightKg" error={errors.currentWeightKg}>
            <input
              id="currentWeightKg"
              type="number"
              inputMode="decimal"
              step="0.1"
              value={draft.currentWeightKg}
              onChange={(e) => set('currentWeightKg', e.target.value)}
            />
          </Field>
          <Field label="Poids visé (kg)" htmlFor="targetWeightKg" error={errors.targetWeightKg}>
            <input
              id="targetWeightKg"
              type="number"
              inputMode="decimal"
              step="0.1"
              value={draft.targetWeightKg}
              onChange={(e) => set('targetWeightKg', e.target.value)}
            />
          </Field>
        </div>

        <Field label="Niveau d'activité" htmlFor="activityLevel">
          <select
            id="activityLevel"
            value={draft.activityLevel}
            onChange={(e) => set('activityLevel', e.target.value as ActivityLevel)}
          >
            <option value="sedentaire">Sédentaire (peu ou pas d'exercice)</option>
            <option value="leger">Léger (1-3 j/semaine)</option>
            <option value="modere">Modéré (3-5 j/semaine)</option>
            <option value="actif">Actif (6-7 j/semaine)</option>
            <option value="tres_actif">Très actif (physique + sport quotidien)</option>
          </select>
        </Field>

        <Field label="Objectif" htmlFor="goal">
          <select id="goal" value={draft.goal} onChange={(e) => set('goal', e.target.value as Goal)}>
            <option value="perte">Perte de poids</option>
            <option value="prise_masse">Prise de masse</option>
            <option value="maintien">Maintien</option>
          </select>
        </Field>

        {draft.goal === 'perte' && (
          <Field label="Rythme de perte visé" htmlFor="weightLossRateKgPerWeek">
            <select
              id="weightLossRateKgPerWeek"
              value={draft.weightLossRateKgPerWeek}
              onChange={(e) => set('weightLossRateKgPerWeek', Number(e.target.value) as WeightLossRate)}
            >
              <option value={0.25}>0,25 kg / semaine</option>
              <option value={0.5}>0,5 kg / semaine</option>
              <option value={0.75}>0,75 kg / semaine</option>
            </select>
          </Field>
        )}

        <Field label="Jours d'entraînement par semaine" htmlFor="trainingDaysPerWeek">
          <select
            id="trainingDaysPerWeek"
            value={draft.trainingDaysPerWeek}
            onChange={(e) => set('trainingDaysPerWeek', Number(e.target.value) as TrainingDaysPerWeek)}
          >
            <option value={3}>3 jours</option>
            <option value={4}>4 jours</option>
            <option value={5}>5 jours</option>
          </select>
        </Field>

        <button type="submit" className="btn btn-primary btn-block">
          Valider mon profil
        </button>
      </form>
    </div>
  )
}
