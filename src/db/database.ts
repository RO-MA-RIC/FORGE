import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { Profile, WorkoutSession } from '../types'

const DB_NAME = 'forge-coach'
const DB_VERSION = 2
const PROFILE_KEY = 'singleton'

interface ForgeDB extends DBSchema {
  profile: {
    key: string
    value: Profile
  }
  workoutSessions: {
    key: string
    value: WorkoutSession
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
