import { getExerciseById } from '../../lib/program'
import type { WorkoutSession } from '../../types'

function formatSessionDate(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
}

export function SessionHistory({ sessions }: { sessions: WorkoutSession[] }) {
  if (sessions.length === 0) {
    return (
      <div className="stub-screen">
        <h2>Aucune séance enregistrée</h2>
        <p>Valide ta première séance depuis l'onglet « Séance du jour » pour la voir apparaître ici.</p>
      </div>
    )
  }

  const sorted = [...sessions].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      {sorted.map((session) => (
        <div className="card" key={session.id}>
          <div className="card-title">
            {formatSessionDate(session.date)} · {session.dayLabel}
          </div>

          {session.exercises.map((sessionExercise) => {
            const exercise = getExerciseById(sessionExercise.exerciseId)
            return (
              <div className="exercise-row" key={sessionExercise.exerciseId}>
                <div className="exercise-name">{exercise?.name ?? sessionExercise.exerciseId}</div>
                <div className="exercise-sets mono-num">
                  {sessionExercise.sets.map((set) => `${set.weightKg}kg×${set.reps}`).join(' · ')}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}
