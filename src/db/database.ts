import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { ExerciseSubstitution, Profile, WorkoutSession } from '../types'

const DB_NAME = 'forge-coach'
const DB_VERSION = 3
const PROFILE_KEY = 'singleton'

interface StoredSubstitution extends ExerciseSubstitution {
  id: string
}

interface ForgeDB extends DBSchema {
  profile: {
    key: string
    value: Profile
  }
  workoutSessions: {
    key: string
    value: WorkoutSession
  }
  exerciseSubstitutions: {
    key: string
    value: StoredSubstitution
  }
}

let dbPromise: Promise<IDBPDatabase<ForgeDB>> | null = null

function getDB(): Promise<IDBPDatabase<ForgeDB>> {
  if (!dbPromise) {
    dbPromise = openDB<ForgeDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('profile')
        }
        if (oldVersion < 2) {
          db.createObjectStore('workoutSessions', { keyPath: 'id' })
        }
        if (oldVersion < 3) {
          db.createObjectStore('exerciseSubstitutions', { keyPath: 'id' })
        }
      },
    })
  }
  return dbPromise
}

export async function getProfile(): Promise<Profile | undefined> {
  const db = await getDB()
  return db.get('profile', PROFILE_KEY)
}

export async function saveProfile(profile: Profile): Promise<void> {
  const db = await getDB()
  await db.put('profile', profile, PROFILE_KEY)
}

export async function getWorkoutSessions(): Promise<WorkoutSession[]> {
  const db = await getDB()
  return db.getAll('workoutSessions')
}

export async function addWorkoutSession(session: WorkoutSession): Promise<void> {
  const db = await getDB()
  await db.add('workoutSessions', session)
}

export async function getSubstitutions(): Promise<ExerciseSubstitution[]> {
  const db = await getDB()
  return db.getAll('exerciseSubstitutions')
}

export async function saveSubstitution(substitution: ExerciseSubstitution): Promise<void> {
  const db = await getDB()
  const id = `${substitution.dayId}:${substitution.originalExerciseId}`
  await db.put('exerciseSubstitutions', { ...substitution, id })
}
