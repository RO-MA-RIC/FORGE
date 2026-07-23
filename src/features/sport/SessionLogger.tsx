import { useEffect, useMemo, useState } from 'react'
import { computeProgressionSuggestion } from '../../lib/progression'
import type { GeneratedProgramDay, ProgressionSuggestion, SetLog, WorkoutSession } from '../../types'

interface DraftSet {
  weight: string
  reps: string
}

type DraftExercises = Record<string, DraftSet[]>
type Suggestions = Record<string, ProgressionSuggestion | null>

function buildInitialDraft(day: GeneratedProgramDay, suggestions: Suggestions): DraftExercises {
  const draft: DraftExercises = {}
  for (const programExercise of day.exercises) {
    const suggestion = suggestions[programExercise.exercise.id]
    const suggestedWeight = suggestion ? String(suggestion.suggestedWeightKg) : ''
    draft[programExercise.exercise.id] = Array.from({ length: programExercise.sets }, () => ({
      weight: suggestedWeight,
      reps: '',
    }))
  }
  return draft
}

function isSetValid(set: DraftSet): boolean {
  const weight = Number(set.weight)
  const reps = Number(set.reps)
  return set.weight.trim() !== '' && set.reps.trim() !== '' && weight > 0 && Number.isInteger(reps) && reps > 0
}

function formatSuggestion(suggestion: ProgressionSuggestion): string {
  return suggestion.type === 'poids'
    ? `Progression proposée : ${suggestion.suggestedWeightKg} kg (vise ${suggestion.suggestedRepTarget} reps)`
    : `Progression proposée : vise ${suggestion.suggestedRepTarget} reps à ${suggestion.suggestedWeightKg} kg`
}

interface SessionLoggerProps {
  day: GeneratedProgramDay
  sessions: WorkoutSession[]
  onValidate: (session: WorkoutSession) => void
}

export function SessionLogger({ day, sessions, onValidate }: SessionLoggerProps) {
  const suggestions = useMemo<Suggestions>(() => {
    const result: Suggestions = {}
    for (const programExercise of day.exercises) {
      result[programExercise.exercise.id] = computeProgressionSuggestion(programExercise.exercise, sessions)
    }
    return result
  }, [day, sessions])

  const [draft, setDraft] = useState<DraftExercises>(() => buildInitialDraft(day, suggestions))
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    setDraft(buildInitialDraft(day, suggestions))
  }, [day, suggestions])

  function setValue(exerciseId: string, setIndex: number, field: keyof DraftSet, value: string) {
    setDraft((current) => {
      const sets = [...current[exerciseId]]
      sets[setIndex] = { ...sets[setIndex], [field]: value }
      return { ...current, [exerciseId]: sets }
    })
    setJustSaved(false)
  }

  const isComplete = day.exercises.every((programExercise) =>
    draft[programExercise.exercise.id]?.every(isSetValid),
  )

  function handleValidate() {
    if (!isComplete) return

    const session: WorkoutSession = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      dayId: day.id,
      dayLabel: day.label,
      exercises: day.exercises.map((programExercise) => ({
        exerciseId: programExercise.exercise.id,
        sets: draft[programExercise.exercise.id].map(
          (set): SetLog => ({ weightKg: Number(set.weight), reps: Number(set.reps) }),
        ),
      })),
    }

    onValidate(session)
    setJustSaved(true)
  }

  return (
    <div className="card">
      <div className="card-title">{day.label}</div>

      {day.exercises.map((programExercise) => {
        const suggestion = suggestions[programExercise.exercise.id]
        return (
          <div className="session-exercise" key={programExercise.exercise.id}>
            <div className="exercise-name">{programExercise.exercise.name}</div>
            <div className="exercise-muscle">
              {programExercise.exercise.muscleGroup} · {programExercise.exercise.defaultRepRangeMin}-
              {programExercise.exercise.defaultRepRangeMax} reps
            </div>

            {suggestion && <div className="progression-hint">{formatSuggestion(suggestion)}</div>}

            <div className="set-rows">
              {draft[programExercise.exercise.id].map((set, index) => (
                <div className="set-row" key={index}>
                  <span className="set-index mono-num">Série {index + 1}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    placeholder="kg"
                    value={set.weight}
                    onChange={(e) => setValue(programExercise.exercise.id, index, 'weight', e.target.value)}
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder={suggestion ? `${suggestion.suggestedRepTarget} reps` : 'reps'}
                    value={set.reps}
                    onChange={(e) => setValue(programExercise.exercise.id, index, 'reps', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {day.hasCardioFinisher && <div className="cardio-finisher-row">Finisher cardio · 15-20 min</div>}

      <button
        type="button"
        className="btn btn-primary btn-block"
        disabled={!isComplete}
        onClick={handleValidate}
        style={{ marginTop: 16 }}
      >
        Valider la séance
      </button>

      {justSaved && (
        <div className="alert alert-info" style={{ marginTop: 12 }}>
          Séance enregistrée dans ton historique.
        </div>
      )}
    </div>
  )
}
