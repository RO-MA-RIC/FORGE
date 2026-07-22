import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { Profile } from '../types'

const DB_NAME = 'forge-coach'
const DB_VERSION = 1
const PROFILE_KEY = 'singleton'

interface ForgeDB extends DBSchema {
  profile: {
    key: string
    value: Profile
  }
}

let dbPromise: Promise<IDBPDatabase<ForgeDB>> | null = null

function getDB(): Promise<IDBPDatabase<ForgeDB>> {
  if (!dbPromise) {
    dbPromise = openDB<ForgeDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile')
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
