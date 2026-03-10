import { useRuntimeConfig } from "#imports"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let supabaseClient: SupabaseClient | null | undefined
let warnedNoSupabase = false
const volatileStore = new Map<string, unknown[]>()

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const isUuid = (value: unknown): value is string => typeof value === "string" && UUID_RE.test(value)

const safeString = (value: unknown) => {
  if (value == null) return null
  const text = String(value).trim()
  return text || null
}

const safeIsoDate = (value: unknown) => {
  if (!value) return null
  const d = new Date(String(value))
  if (Number.isNaN(d.getTime())) return null
  return d.toISOString()
}

const normalizeImageArray = (row: any) => {
  const fromArray = Array.isArray(row?.image_urls)
    ? row.image_urls.map((v: any) => String(v || "").trim()).filter(Boolean)
    : []
  const fallbackSingle = safeString(row?.image_url)
  if (fromArray.length) return fromArray
  return fallbackSingle ? [fallbackSingle] : []
}

const readProcessEnv = (key: string) => {
  try {
    const env = (globalThis as any)?.process?.env
    const value = env?.[key]
    return typeof value === "string" ? value : ""
  } catch {
    return ""
  }
}

const readRuntimeValue = (key: "supabaseUrl" | "supabaseServiceRoleKey") => {
  try {
    const config = useRuntimeConfig() as any
    const value = config?.[key]
    return typeof value === "string" ? value : ""
  } catch {
    return ""
  }
}

const getSupabase = () => {
  if (supabaseClient !== undefined) return supabaseClient

  const supabaseUrl =
    readRuntimeValue("supabaseUrl") ||
    readProcessEnv("NUXT_SUPABASE_URL") ||
    readProcessEnv("SUPABASE_URL")

  const supabaseServiceRoleKey =
    readRuntimeValue("supabaseServiceRoleKey") ||
    readProcessEnv("NUXT_SUPABASE_SERVICE_ROLE_KEY") ||
    readProcessEnv("SUPABASE_SERVICE_ROLE_KEY")

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    if (!warnedNoSupabase) {
      console.warn("[store] Supabase env is not configured. Using volatile in-memory fallback for non-table keys")
      warnedNoSupabase = true
    }
    supabaseClient = null
    return null
  }

  supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })

  return supabaseClient
}

const isMissingTableError = (error: any, tableName: string) => {
  const code = String(error?.code || "").toUpperCase()
  if (code === "42P01" || code === "PGRST205") return true

  const text = `${error?.message || ""} ${error?.details || ""}`.toLowerCase()
  const table = tableName.toLowerCase()

  return (
    (text.includes("relation") && text.includes(table) && text.includes("does not exist")) ||
    (text.includes("could not find the table") && text.includes(table)) ||
    (text.includes("schema cache") && text.includes(table))
  )
}

const getServicesValue = async () => {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("services")
    .select("id, sku, name, description, category, image_url, image_urls, unit, brand, enabled, display_order, created_at, updated_at")
    .order("display_order", { ascending: true })
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Read services failed: ${error.message}`,
    })
  }

  return (data || []).map((x: any) => {
    const imageUrls = Array.isArray(x?.image_urls) ? x.image_urls.map((v: any) => String(v)) : []
    const imageUrl = safeString(x?.image_url) || (imageUrls[0] ?? null)
    return {
      id: String(x.id),
      sku: safeString(x.sku),
      name: safeString(x.name),
      description: safeString(x.description),
      category: safeString(x.category),
      image_url: imageUrl,
      image_urls: imageUrls.length ? imageUrls : null,
      unit: safeString(x.unit),
      brand: safeString(x.brand),
      enabled: x?.enabled !== false,
    }
  })
}

const getArticlesValue = async () => {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("articles")
    .select("id, title, content, image_data_url, created_at, updated_at")
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Read articles failed: ${error.message}`,
    })
  }

  return (data || []).map((x: any) => ({
    id: String(x.id),
    title: safeString(x.title),
    content: safeString(x.content),
    imageDataUrl: safeString(x.image_data_url),
    createdAt: x?.created_at ? new Date(x.created_at).toISOString() : undefined,
    updatedAt: x?.updated_at ? new Date(x.updated_at).toISOString() : undefined,
  }))
}

const setServicesValue = async (value: unknown) => {
  const supabase = getSupabase()
  if (!supabase) return false

  const rows = Array.isArray(value) ? value : []

  const { error: deleteError } = await supabase.from("services").delete().not("id", "is", null)
  if (deleteError && !isMissingTableError(deleteError, "services")) {
    throw createError({
      statusCode: 500,
      statusMessage: `Delete services failed: ${deleteError.message}`,
    })
  }

  const payload = rows
    .map((row: any, index: number) => {
      const name = safeString(row?.name)
      if (!name) return null
      const imageUrls = normalizeImageArray(row)
      const imageUrl = safeString(row?.image_url) || (imageUrls[0] ?? null)
      const createdAt = safeIsoDate(row?.createdAt || row?.created_at)
      const updatedAt = safeIsoDate(row?.updatedAt || row?.updated_at) || createdAt

      const next: Record<string, unknown> = {
        name,
        description: safeString(row?.description),
        brand: safeString(row?.brand),
        sku: safeString(row?.sku),
        category: safeString(row?.category),
        unit: safeString(row?.unit),
        image_url: imageUrl,
        image_urls: imageUrls,
        enabled: row?.enabled !== false,
        display_order: index,
      }

      if (isUuid(row?.id)) next.id = row.id
      if (createdAt) next.created_at = createdAt
      if (updatedAt) next.updated_at = updatedAt
      return next
    })
    .filter(Boolean)

  if (!payload.length) return true

  const { error: insertError } = await supabase.from("services").insert(payload as any[])
  if (insertError) {
    throw createError({
      statusCode: 500,
      statusMessage: `Insert services failed: ${insertError.message}`,
    })
  }

  return true
}

const setArticlesValue = async (value: unknown) => {
  const supabase = getSupabase()
  if (!supabase) return false

  const rows = Array.isArray(value) ? value : []

  const { error: deleteError } = await supabase.from("articles").delete().not("id", "is", null)
  if (deleteError && !isMissingTableError(deleteError, "articles")) {
    throw createError({
      statusCode: 500,
      statusMessage: `Delete articles failed: ${deleteError.message}`,
    })
  }

  const payload = rows
    .map((raw: any) => {
      const title = safeString(raw?.title)
      const content = safeString(raw?.content)
      if (!title || !content) return null

      const createdAt = safeIsoDate(raw?.createdAt || raw?.created_at)
      const updatedAt = safeIsoDate(raw?.updatedAt || raw?.updated_at) || createdAt

      const row: Record<string, unknown> = {
        title,
        content,
        image_data_url: safeString(raw?.imageDataUrl || raw?.image_data_url),
        published: true,
      }
      if (isUuid(raw?.id)) row.id = raw.id
      if (createdAt) row.created_at = createdAt
      if (updatedAt) row.updated_at = updatedAt
      return row
    })
    .filter(Boolean)

  if (!payload.length) return true

  const { error: insertError } = await supabase.from("articles").insert(payload as any[])
  if (insertError) {
    throw createError({
      statusCode: 500,
      statusMessage: `Insert articles failed: ${insertError.message}`,
    })
  }

  return true
}

const getAppStoreValue = async (key: string) => {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase.from("app_store").select("value").eq("key", key).maybeSingle()
  if (error) {
    if (isMissingTableError(error, "app_store")) return null
    throw createError({
      statusCode: 500,
      statusMessage: `Read app_store failed: ${error.message}`,
    })
  }

  const value = (data as any)?.value
  return Array.isArray(value) ? value : []
}

const setAppStoreValue = async (key: string, value: unknown) => {
  const supabase = getSupabase()
  if (!supabase) return false

  const rowValue = Array.isArray(value) ? value : []
  const { error } = await supabase
    .from("app_store")
    .upsert({ key, value: rowValue, updated_at: new Date().toISOString() }, { onConflict: "key" })

  if (error) {
    if (isMissingTableError(error, "app_store")) return false
    throw createError({
      statusCode: 500,
      statusMessage: `Write app_store failed: ${error.message}`,
    })
  }

  return true
}

export const ensureStoreTable = async () => {
  // Supabase REST cannot run DDL directly in this flow.
  // Keep this function for compatibility with existing callers.
}

export const getStoreValue = async (key: string) => {
  if (key === "products") {
    const tableRows = await getServicesValue()
    if (tableRows) return tableRows
  }

  if (key === "articles") {
    const tableRows = await getArticlesValue()
    if (tableRows) return tableRows
  }

  await ensureStoreTable()
  const appStoreRows = await getAppStoreValue(key)
  if (appStoreRows !== null) return appStoreRows

  return volatileStore.get(key) ?? []
}

export const setStoreValue = async (key: string, value: unknown) => {
  if (key === "products") {
    const saved = await setServicesValue(value)
    if (saved) return
  }

  if (key === "articles") {
    const saved = await setArticlesValue(value)
    if (saved) return
  }

  await ensureStoreTable()
  const savedToAppStore = await setAppStoreValue(key, value)
  if (savedToAppStore) return

  volatileStore.set(key, Array.isArray(value) ? value : [])
}
