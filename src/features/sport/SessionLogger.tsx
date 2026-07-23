import { useEffect, useState } from 'react'
import type { GeneratedProgramDay, SetLog, WorkoutSession } from '../../types'

interface DraftSet {
  weight: string
  reps: string
}

type DraftExercises = Record<string, DraftSet[]>

function buildInitialDraft(day: GeneratedProgramDay): DraftExercises {
  const draft: DraftExercises = {}
  for (const programExercise of day.exercises) {
    draft[programExercise.exercise.id] = Array.from({ length: programExercise.sets }, () => ({
      weight: '',
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

interface SessionLoggerProps {
  day: GeneratedProgramDay
  onValidate: (session: WorkoutSession) => void
}

export function SessionLogger({ day, onValidate }: SessionLoggerProps) {
  const [draft, setDraft] = useState<DraftExercises>(() => buildInitialDraft(day))
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    setDraft(buildInitialDraft(day))
    setJustSaved(false)
  }, [day])

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
    setDraft(buildInitialDraft(day))
    setJustSaved(true)
  }

  return (
    <div className="card">
      <div className="card-title">{day.label}</div>

      {day.exercises.map((programExercise) => (
        <div className="session-exercise" key={programExercise.exercise.id}>
          <div className="exercise-name">{programExercise.exercise.name}</div>
          <div className="exercise-muscle">
            {programExercise.exercise.muscleGroup} · {programExercise.exercise.defaultRepRangeMin}-
            {programExercise.exercise.defaultRepRangeMax} reps
          </div>

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
                  placeholder="reps"
                  value={set.reps}
                  onChange={(e) => setValue(programExercise.exercise.id, index, 'reps', e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

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
