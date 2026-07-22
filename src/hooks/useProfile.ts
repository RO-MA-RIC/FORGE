import { useCallback, useEffect, useRef, useState } from 'react'
import { getProfile, saveProfile } from '../db/database'
import type { Profile } from '../types'

type ProfileState = { status: 'loading' } | { status: 'empty' } | { status: 'ready'; profile: Profile }

const AUTOSAVE_DELAY_MS = 300

export function useProfile() {
  const [state, setState] = useState<ProfileState>({ status: 'loading' })
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let cancelled = false
    getProfile().then((profile) => {
      if (cancelled) return
      setState(profile ? { status: 'ready', profile } : { status: 'empty' })
    })
    return () => {
      cancelled = true
    }
  }, [])

  const persist = useCallback((profile: Profile) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(() => {
      void saveProfile(profile)
    }, AUTOSAVE_DELAY_MS)
  }, [])

  const createProfile = useCallback(async (profile: Profile) => {
    await saveProfile(profile)
    setState({ status: 'ready', profile })
  }, [])

  const updateProfile = useCallback(
    (updater: (profile: Profile) => Profile) => {
      setState((current) => {
        if (current.status !== 'ready') return current
        const next = updater(current.profile)
        persist(next)
        return { status: 'ready', profile: next }
      })
    },
    [persist],
  )

  return { state, createProfile, updateProfile }
}
