import { useMemo, useState } from 'react'
import { generateProgram } from '../../lib/program'
import { useWorkoutSessions } from '../../hooks/useWorkoutSessions'
import type { Profile } from '../../types'
import { ProgramDayCard } from './ProgramDayCard'
import { SessionHistory } from './SessionHistory'
import { SessionLogger } from './SessionLogger'

type SportView = 'jour' | 'programme' | 'historique'

const VIEWS: { id: SportView; label: string }[] = [
  { id: 'jour', label: 'Séance du jour' },
  { id: 'programme', label: 'Programme' },
  { id: 'historique', label: 'Historique' },
]

export function SportScreen({ profile }: { profile: Profile }) {
  const program = useMemo(() => generateProgram(profile), [profile])
  const todayDay = program.days[0]
  const { sessions, recordSession } = useWorkoutSessions()
  const [view, setView] = useState<SportView>('jour')

  return (
    <div className="app-content">
      <div className="segmented">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            className={v.id === view ? 'segmented-item active' : 'segmented-item'}
            onClick={() => setView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view === 'jour' && sessions !== null && (
        <SessionLogger day={todayDay} sessions={sessions} onValidate={recordSession} />
      )}

      {view === 'programme' &&
        program.days.map((day) => <ProgramDayCard key={day.id} day={day} />)}

      {view === 'historique' && sessions !== null && <SessionHistory sessions={sessions} />}
    </div>
  )
}
