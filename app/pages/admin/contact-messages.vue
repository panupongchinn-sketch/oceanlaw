<template>
  <div class="report-bg mx-auto max-w-[1200px] space-y-7 px-4 py-9 sm:px-6">
    <section class="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 p-6 shadow-[0_12px_28px_-20px_rgba(15,23,42,0.45)] sm:p-8">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 class="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">รายงานผู้ติดต่อ</h1>
          <p class="mt-2 text-base text-slate-600">ข้อความที่ส่งมาจากหน้าติดต่อเรา</p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-base font-medium text-slate-700 shadow-sm">
          ทั้งหมด <span class="font-extrabold text-slate-900">{{ filteredRows.length }}</span> รายการ
        </div>
      </div>
    </section>

    <section class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_34px_-26px_rgba(15,23,42,0.6)]">
      <div class="flex flex-col gap-3 border-b border-slate-200/90 bg-slate-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <input
          v-model.trim="search"
          type="text"
          class="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-200 sm:max-w-2xl"
          placeholder="ค้นหา: ชื่อ, เบอร์, อีเมล, หัวข้อ, รายละเอียด"
        />

        <button
          type="button"
          class="h-12 rounded-xl border border-slate-300 bg-white px-5 text-base font-semibold text-slate-700 hover:bg-slate-100"
          @click="loadMessages"
        >
          Refresh
        </button>
      </div>

      <div class="p-5 sm:p-6">
        <div v-if="loading" class="text-base text-slate-500">กำลังโหลดข้อมูล...</div>

        <div v-else-if="errorMsg" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700">
          {{ errorMsg }}
        </div>

        <div v-else-if="!filteredRows.length" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-600">
          ยังไม่มีข้อความจากหน้าติดต่อเรา
        </div>

        <div v-else class="space-y-4">
          <article
            v-for="row in filteredRows"
            :key="row.id"
            class="message-card rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 sm:p-5"
          >
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 class="text-xl font-extrabold text-slate-900 sm:text-2xl">{{ row.full_name || "-" }}</h2>
                <div class="mt-1 text-sm text-slate-500">ส่งเมื่อ: {{ formatDateTime(row.created_at) }}</div>
              </div>
            </div>

            <div class="mt-4 grid gap-2.5 text-base text-slate-700 sm:grid-cols-2">
              <div><span class="font-semibold text-slate-900">โทร:</span> {{ row.phone || "-" }}</div>
              <div><span class="font-semibold text-slate-900">Email:</span> {{ row.email || "-" }}</div>
              <div><span class="font-semibold text-slate-900">บริษัท:</span> {{ row.company || "-" }}</div>
              <div><span class="font-semibold text-slate-900">หัวข้อ:</span> {{ row.subject || "-" }}</div>
            </div>

            <div class="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-8 text-slate-700">
              {{ row.detail || "-" }}
            </div>

            <div class="mt-3 flex flex-wrap items-center justify-end gap-2">
              <span
                v-if="row.contacted"
                class="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700"
              >
                ติดต่อลูกค้าแล้ว
              </span>
              <button
                type="button"
                class="h-10 rounded-xl px-4 text-sm font-semibold transition disabled:cursor-not-allowed"
                :class="
                  row.contacted
                    ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 disabled:opacity-100'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-70'
                "
                :disabled="row.contacted || isSaving(row.id)"
                @click="markAsContacted(row.id)"
              >
                {{ isSaving(row.id) ? "กำลังบันทึก..." : "ติดต่อลูกค้าแล้ว" }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

definePageMeta({ middleware: ["auth"] })
useHead({ title: "Admin | Contact Messages" })

type ContactMessageRow = {
  id: string
  full_name?: string | null
  phone?: string | null
  company?: string | null
  email?: string | null
  subject?: string | null
  detail?: string | null
  source_page?: string | null
  created_at?: string | null
  contacted?: boolean
  contacted_at?: string | null
}

const CONTACT_STORAGE_KEY = "ocean_messages"
const { getValue, setValue } = useSharedStore()

const loading = ref(false)
const errorMsg = ref("")
const search = ref("")
const rows = ref<ContactMessageRow[]>([])
const savingMap = ref<Record<string, boolean>>({})

const normalize = (item: any): ContactMessageRow => ({
  id: String(item?.id || `${Date.now()}_${Math.random()}`),
  full_name: item?.full_name == null ? "" : String(item.full_name),
  phone: item?.phone == null ? "" : String(item.phone),
  company: item?.company == null ? "" : String(item.company),
  email: item?.email == null ? "" : String(item.email),
  subject: item?.subject == null ? "" : String(item.subject),
  detail: item?.detail == null ? "" : String(item.detail),
  source_page: item?.source_page == null ? "" : String(item.source_page),
  created_at: item?.created_at == null ? "" : String(item.created_at),
  contacted: Boolean(item?.contacted),
  contacted_at: item?.contacted_at == null ? "" : String(item.contacted_at),
})

const fromContactRows = computed(() => {
  return rows.value.filter((item) => {
    const source = String(item.source_page || "").toLowerCase()
    return source.startsWith("/contact")
  })
})

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase()
  const base = [...fromContactRows.value].sort((a, b) => {
    const ta = new Date(a.created_at || 0).getTime()
    const tb = new Date(b.created_at || 0).getTime()
    return tb - ta
  })
  if (!q) return base

  return base.filter((item) => {
    const haystack = [
      item.full_name,
      item.phone,
      item.company,
      item.email,
      item.subject,
      item.detail,
      item.source_page,
    ]
      .join(" ")
      .toLowerCase()
    return haystack.includes(q)
  })
})

const formatDateTime = (iso: string | null | undefined) => {
  if (!iso) return "-"
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

const nowIso = () => new Date().toISOString()
const isSaving = (id: string) => Boolean(savingMap.value[id])

const markAsContacted = async (id: string) => {
  const current = rows.value.find((item) => item.id === id)
  if (!current || current.contacted || isSaving(id)) return

  savingMap.value = { ...savingMap.value, [id]: true }
  errorMsg.value = ""
  const prevRows = rows.value.map((item) => ({ ...item }))

  rows.value = rows.value.map((item) =>
    item.id === id
      ? {
          ...item,
          contacted: true,
          contacted_at: nowIso(),
        }
      : item,
  )

  try {
    await setValue<ContactMessageRow>(CONTACT_STORAGE_KEY, rows.value)
  } catch (e: any) {
    rows.value = prevRows
    errorMsg.value = e?.message || "บันทึกสถานะไม่สำเร็จ"
  } finally {
    const nextMap = { ...savingMap.value }
    delete nextMap[id]
    savingMap.value = nextMap
  }
}

const loadMessages = async () => {
  loading.value = true
  errorMsg.value = ""
  try {
    const data = await getValue<ContactMessageRow>(CONTACT_STORAGE_KEY)
    rows.value = Array.isArray(data) ? data.map(normalize) : []
  } catch (e: any) {
    errorMsg.value = e?.message || "โหลดข้อความไม่สำเร็จ"
    rows.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMessages()
})
</script>

<style scoped>
.report-bg {
  background:
    radial-gradient(circle at 18% 12%, rgba(16, 185, 129, 0.08), transparent 34%),
    radial-gradient(circle at 86% 6%, rgba(59, 130, 246, 0.08), transparent 28%),
    linear-gradient(180deg, #f8fafc 0%, #f8fafc 100%);
}

.message-card {
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.message-card:hover {
  transform: translateY(-1px);
  border-color: #cbd5e1;
  box-shadow: 0 14px 28px -22px rgba(15, 23, 42, 0.65);
}
</style>
