import type { ExerciseSubstitution, GeneratedProgramDay } from '../../types'
import { SubstituteControl } from './SubstituteControl'

interface ProgramDayCardProps {
  day: GeneratedProgramDay
  onSubstitute?: (substitution: ExerciseSubstitution) => void
}

export function ProgramDayCard({ day, onSubstitute }: ProgramDayCardProps) {
  return (
    <div className="card">
      <div className="card-title">{day.label}</div>

      {day.exercises.map((programExercise) => (
        <div className="exercise-row" key={programExercise.originalExerciseId}>
          <div className="exercise-row-top">
            <div>
              <div className="exercise-name">{programExercise.exercise.name}</div>
              <div className="exercise-muscle">{programExercise.exercise.muscleGroup}</div>
            </div>
            <div className="exercise-sets mono-num">
              {programExercise.sets} × {programExercise.exercise.defaultRepRangeMin}-
              {programExercise.exercise.defaultRepRangeMax}
            </div>
          </div>

          {onSubstitute && (
            <SubstituteControl
              current={programExercise.exercise}
              onSubstitute={(replacementExerciseId) =>
                onSubstitute({
                  dayId: day.id,
                  originalExerciseId: programExercise.originalExerciseId,
                  replacementExerciseId,
                })
              }
            />
          )}
        </div>
      ))}

      {day.hasCardioFinisher && <div className="cardio-finisher-row">Finisher cardio · 15-20 min</div>}
    </div>
  )
}
