import { useCallback, useEffect, useState } from 'react'
import { addWorkoutSession, getWorkoutSessions } from '../db/database'
import type { WorkoutSession } from '../types'

export function useWorkoutSessions() {
  const [sessions, setSessions] = useState<WorkoutSession[] | null>(null)

  useEffect(() => {
    let cancelled = false
    getWorkoutSessions().then((loaded) => {
      if (cancelled) return
      setSessions(loaded)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const recordSession = useCallback((session: WorkoutSession) => {
    setSessions((current) => [...(current ?? []), session])
    void addWorkoutSession(session)
  }, [])

  return { sessions, recordSession }
}
