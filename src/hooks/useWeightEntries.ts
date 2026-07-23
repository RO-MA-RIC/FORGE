import { useCallback, useEffect, useState } from 'react'
import { addWeightEntry, getWeightEntries } from '../db/database'
import type { WeightEntry } from '../types'

export function useWeightEntries() {
  const [entries, setEntries] = useState<WeightEntry[] | null>(null)

  useEffect(() => {
    let cancelled = false
    getWeightEntries().then((loaded) => {
      if (cancelled) return
      setEntries(loaded)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const addEntry = useCallback((entry: WeightEntry) => {
    setEntries((current) => [...(current ?? []), entry])
    void addWeightEntry(entry)
  }, [])

  return { entries, addEntry }
}
