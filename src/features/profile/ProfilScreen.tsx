import { useState } from 'react'
import { Field } from '../../components/ui/Field'
import type { ActivityLevel, Goal, Profile, Sex, TrainingDaysPerWeek, WeightLossRate } from '../../types'
import { MetabolicSummary } from './MetabolicSummary'

interface NumericFieldConfig {
  key: 'age' | 'heightCm' | 'currentWeightKg' | 'targetWeightKg'
  label: string
  min: number
  max: number
  errorMsg: string
  step?: string
}

const NUMERIC_FIELDS: NumericFieldConfig[] = [
  { key: 'age', label: 'Âge', min: 14, max: 90, errorMsg: 'Entre 14 et 90 ans' },
  { key: 'heightCm', label: 'Taille (cm)', min: 120, max: 230, errorMsg: 'Entre 120 et 230 cm' },
  {
    key: 'currentWeightKg',
    label: 'Poids actuel (kg)',
    min: 30,
    max: 300,
    errorMsg: 'Entre 30 et 300 kg',
    step: '0.1',
  },
  {
    key: 'targetWeightKg',
    label: 'Poids visé (kg)',
    min: 30,
    max: 300,
    errorMsg: 'Entre 30 et 300 kg',
    step: '0.1',
  },
]

type NumericInputs = Record<NumericFieldConfig['key'], string>

interface ProfilScreenProps {
  profile: Profile
  onUpdate: (updater: (profile: Profile) => Profile) => void
}

export function ProfilScreen({ profile, onUpdate }: ProfilScreenProps) {
  const [inputs, setInputs] = useState<NumericInputs>({
    age: String(profile.age),
    heightCm: String(profile.heightCm),
    currentWeightKg: String(profile.currentWeightKg),
    targetWeightKg: String(profile.targetWeightKg),
  })
  const [errors, setErrors] = useState<Partial<Record<NumericFieldConfig['key'], string>>>({})

  function handleNumericChange(config: NumericFieldConfig, raw: string) {
    setInputs((current) => ({ ...current, [config.key]: raw }))

    const value = Number(raw)
    if (raw.trim() === '' || Number.isNaN(value) || value < config.min || value > config.max) {
      setErrors((current) => ({ ...current, [config.key]: config.errorMsg }))
      return
    }

    setErrors((current) => {
      const next = { ...current }
      delete next[config.key]
      return next
    })
    onUpdate((current) => ({ ...current, [config.key]: value }))
  }

  return (
    <div className="app-content">
      <span className="section-label">Ton calcul métabolique</span>
      <MetabolicSummary profile={profile} />

      <span className="section-label">Ton profil</span>

      <Field label="Sexe" htmlFor="edit-sex">
        <select
          id="edit-sex"
          value={profile.sex}
          onChange={(e) => onUpdate((current) => ({ ...current, sex: e.target.value as Sex }))}
        >
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>
      </Field>

      <div className="field-row">
        {NUMERIC_FIELDS.slice(0, 2).map((config) => (
          <Field key={config.key} label={config.label} htmlFor={`edit-${config.key}`} error={errors[config.key]}>
            <input
              id={`edit-${config.key}`}
              type="number"
              inputMode={config.step ? 'decimal' : 'numeric'}
              step={config.step}
              value={inputs[config.key]}
              onChange={(e) => handleNumericChange(config, e.target.value)}
            />
          </Field>
        ))}
      </div>

      <div className="field-row">
        {NUMERIC_FIELDS.slice(2, 4).map((config) => (
          <Field key={config.key} label={config.label} htmlFor={`edit-${config.key}`} error={errors[config.key]}>
            <input
              id={`edit-${config.key}`}
              type="number"
              inputMode={config.step ? 'decimal' : 'numeric'}
              step={config.step}
              value={inputs[config.key]}
              onChange={(e) => handleNumericChange(config, e.target.value)}
            />
          </Field>
        ))}
      </div>

      <Field label="Niveau d'activité" htmlFor="edit-activityLevel">
        <select
          id="edit-activityLevel"
          value={profile.activityLevel}
          onChange={(e) => onUpdate((current) => ({ ...current, activityLevel: e.target.value as ActivityLevel }))}
        >
          <option value="sedentaire">Sédentaire (peu ou pas d'exercice)</option>
          <option value="leger">Léger (1-3 j/semaine)</option>
          <option value="modere">Modéré (3-5 j/semaine)</option>
          <option value="actif">Actif (6-7 j/semaine)</option>
          <option value="tres_actif">Très actif (physique + sport quotidien)</option>
        </select>
      </Field>

      <Field label="Objectif" htmlFor="edit-goal">
        <select
          id="edit-goal"
          value={profile.goal}
          onChange={(e) => {
            const goal = e.target.value as Goal
            onUpdate((current) => ({
              ...current,
              goal,
              weightLossRateKgPerWeek: goal === 'perte' ? (current.weightLossRateKgPerWeek ?? 0.5) : null,
            }))
          }}
        >
          <option value="perte">Perte de poids</option>
          <option value="prise_masse">Prise de masse</option>
          <option value="maintien">Maintien</option>
        </select>
      </Field>

      {profile.goal === 'perte' && (
        <Field label="Rythme de perte visé" htmlFor="edit-rate">
          <select
            id="edit-rate"
            value={profile.weightLossRateKgPerWeek ?? 0.5}
            onChange={(e) =>
              onUpdate((current) => ({
                ...current,
                weightLossRateKgPerWeek: Number(e.target.value) as WeightLossRate,
              }))
            }
          >
            <option value={0.25}>0,25 kg / semaine</option>
            <option value={0.5}>0,5 kg / semaine</option>
            <option value={0.75}>0,75 kg / semaine</option>
          </select>
        </Field>
      )}

      <Field label="Jours d'entraînement par semaine" htmlFor="edit-trainingDays">
        <select
          id="edit-trainingDays"
          value={profile.trainingDaysPerWeek}
          onChange={(e) =>
            onUpdate((current) => ({
              ...current,
              trainingDaysPerWeek: Number(e.target.value) as TrainingDaysPerWeek,
            }))
          }
        >
          <option value={3}>3 jours</option>
          <option value={4}>4 jours</option>
          <option value={5}>5 jours</option>
        </select>
      </Field>
    </div>
  )
}
