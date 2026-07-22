import { useMemo } from 'react'
import { generateProgram } from '../../lib/program'
import type { Profile } from '../../types'
import { ProgramDayCard } from './ProgramDayCard'

export function SportScreen({ profile }: { profile: Profile }) {
  const program = useMemo(() => generateProgram(profile), [profile])
  const todayDay = program.days[0]

  return (
    <div className="app-content">
      <span className="section-label">Séance du jour</span>
      <ProgramDayCard day={todayDay} />

      <span className="section-label">Programme complet</span>
      {program.days.map((day) => (
        <ProgramDayCard key={day.id} day={day} />
      ))}
    </div>
  )
}
