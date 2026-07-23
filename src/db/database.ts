import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { ExerciseSubstitution, FoodLogEntry, Profile, WeightEntry, WorkoutSession } from '../types'

const DB_NAME = 'forge-coach'
const DB_VERSION = 5
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
  foodLog: {
    key: string
    value: FoodLogEntry
  }
  weightEntries: {
    key: string
    value: WeightEntry
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
        if (oldVersion < 4) {
          db.createObjectStore('foodLog', { keyPath: 'id' })
        }
        if (oldVersion < 5) {
          db.createObjectStore('weightEntries', { keyPath: 'id' })
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

export async function getFoodLogEntries(): Promise<FoodLogEntry[]> {
  const db = await getDB()
  return db.getAll('foodLog')
}

export async function addFoodLogEntry(entry: FoodLogEntry): Promise<void> {
  const db = await getDB()
  await db.add('foodLog', entry)
}

export async function removeFoodLogEntry(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('foodLog', id)
}

export async function getWeightEntries(): Promise<WeightEntry[]> {
  const db = await getDB()
  return db.getAll('weightEntries')
}

export async function addWeightEntry(entry: WeightEntry): Promise<void> {
  const db = await getDB()
  await db.add('weightEntries', entry)
}
