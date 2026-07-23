import { useCallback, useEffect, useState } from 'react'
import { addFoodLogEntry, getFoodLogEntries, removeFoodLogEntry } from '../db/database'
import type { FoodLogEntry } from '../types'

export function useFoodLog() {
  const [entries, setEntries] = useState<FoodLogEntry[] | null>(null)

  useEffect(() => {
    let cancelled = false
    getFoodLogEntries().then((loaded) => {
      if (cancelled) return
      setEntries(loaded)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const addEntry = useCallback((entry: FoodLogEntry) => {
    setEntries((current) => [...(current ?? []), entry])
    void addFoodLogEntry(entry)
  }, [])

  const removeEntry = useCallback((id: string) => {
    setEntries((current) => (current ?? []).filter((entry) => entry.id !== id))
    void removeFoodLogEntry(id)
  }, [])

  return { entries, addEntry, removeEntry }
}
