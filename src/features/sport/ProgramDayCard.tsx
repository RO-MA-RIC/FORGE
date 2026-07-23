import type { GeneratedProgramDay } from '../../types'

export function ProgramDayCard({ day }: { day: GeneratedProgramDay }) {
  return (
    <div className="card">
      <div className="card-title">{day.label}</div>

      {day.exercises.map((programExercise) => (
        <div className="exercise-row" key={programExercise.exercise.id}>
          <div>
            <div className="exercise-name">{programExercise.exercise.name}</div>
            <div className="exercise-muscle">{programExercise.exercise.muscleGroup}</div>
          </div>
          <div className="exercise-sets mono-num">
            {programExercise.sets} × {programExercise.exercise.defaultRepRangeMin}-
            {programExercise.exercise.defaultRepRangeMax}
          </div>
        </div>
      ))}

      {day.hasCardioFinisher && <div className="cardio-finisher-row">Finisher cardio · 15-20 min</div>}
    </div>
  )
}
