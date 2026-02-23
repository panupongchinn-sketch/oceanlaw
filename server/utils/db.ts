import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { Pool } from "pg"

let pool: Pool | null = null
let fileStoreCache: Record<string, unknown> | null = null
let warnedNoDb = false
let warnedFileStore = false

const getFileStorePath = () =>
  resolve(process.env.STORE_FILE_PATH || resolve(process.cwd(), ".data", "app-store.json"))

const loadFileStore = async () => {
  if (fileStoreCache) return fileStoreCache

  try {
    const raw = await readFile(getFileStorePath(), "utf8")
    const parsed = JSON.parse(raw)
    fileStoreCache =
      parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {}
  } catch (error: any) {
    if (error?.code !== "ENOENT") throw error
    fileStoreCache = {}
  }

  return fileStoreCache
}

const saveFileStore = async () => {
  const filePath = getFileStorePath()
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, JSON.stringify(fileStoreCache ?? {}, null, 2), "utf8")
}

const getPool = () => {
  if (pool) return pool

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    return null
  }

  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })
  return pool
}

let initialized = false

export const ensureStoreTable = async () => {
  const p = getPool()
  if (!p) {
    if (!warnedNoDb) {
      console.warn("[store] DATABASE_URL is not configured, using file store")
      warnedNoDb = true
    }
    if (!warnedFileStore) {
      console.warn(`[store] file store path: ${getFileStorePath()}`)
      warnedFileStore = true
    }
    await loadFileStore()
    return
  }
  if (initialized) return
  const client = await p.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS app_store (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL DEFAULT '[]'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)
    initialized = true
  } finally {
    client.release()
  }
}

export const getStoreValue = async (key: string) => {
  await ensureStoreTable()
  const p = getPool()
  if (!p) {
    const store = await loadFileStore()
    return store[key] ?? []
  }
  const { rows } = await p.query("SELECT value FROM app_store WHERE key = $1 LIMIT 1", [key])
  return rows[0]?.value ?? []
}

export const setStoreValue = async (key: string, value: unknown) => {
  await ensureStoreTable()
  const p = getPool()
  if (!p) {
    const store = await loadFileStore()
    store[key] = value ?? []
    fileStoreCache = store
    await saveFileStore()
    return
  }
  await p.query(
    `
      INSERT INTO app_store (key, value, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
    `,
    [key, JSON.stringify(value ?? [])]
  )
}
