<template>
  <div class="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="inline-flex items-center rounded-full border border-[#0B4AA2]/20 bg-[#0B4AA2]/5 px-3 py-1 text-xs font-semibold tracking-widest text-[#0B4AA2] uppercase">
            Admin Dashboard
          </p>
          <h1 class="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">จัดการเฉดสี (Shades)</h1>
          <p class="mt-1 text-sm text-slate-600">
            เพิ่มรูปสี ชื่อสี รหัสเฉดสี และชื่อกลุ่ม (เช่น Procrete SL / Epoxy) สำหรับหน้า <span class="font-bold">/shades</span>
          </p>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
          ทั้งหมด <span class="font-extrabold text-slate-900">{{ shades.length }}</span> รายการ
        </div>
      </div>
    </div>

    <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex flex-wrap items-end gap-3">
        <div class="min-w-[260px] flex-1">
          <label class="mb-1 block text-sm font-semibold text-slate-700">หัวข้อเริ่มต้น (ใช้เมื่อรายการไม่ได้ระบุกลุ่ม)</label>
          <input
            v-model.trim="settingsForm.title"
            type="text"
            placeholder="เช่น Procrete SL"
            class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#ff6b2c]/30"
          />
        </div>
        <button
          type="button"
          class="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
          @click="saveSettings"
        >
          บันทึกหัวข้อเริ่มต้น
        </button>
      </div>
      <p class="mt-2 text-xs text-slate-500">ถ้ารายการสีไม่ได้กรอก “ชื่อกลุ่ม/ชุดสี” ระบบจะใช้หัวข้อนี้แทน</p>
    </section>

    <div class="grid gap-6 lg:grid-cols-12">
      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-5">
        <div class="border-b border-slate-200 p-5">
          <h2 class="text-base font-extrabold text-slate-900">{{ editingId ? "แก้ไขเฉดสี" : "เพิ่มเฉดสี" }}</h2>
        </div>

        <form class="space-y-4 p-5" @submit.prevent="saveShade">
          <div v-if="editingId" class="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            กำลังแก้ไขรายการเฉดสี
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">ชื่อกลุ่ม/ชุดสี *</label>
            <input
              v-model.trim="form.groupTitle"
              type="text"
              required
              placeholder="เช่น Procrete SL หรือ Epoxy"
              class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#ff6b2c]/30"
            />
            <div class="mt-1 text-xs text-slate-500">รายการที่ใช้ชื่อกลุ่มเดียวกันจะถูกรวมเป็นบล็อกเดียวในหน้า /shades</div>
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">เฉดสี (รหัส) *</label>
            <input
              v-model.trim="form.code"
              type="text"
              required
              placeholder="เช่น RAL 9001"
              class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#ff6b2c]/30"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">ชื่อสี *</label>
            <input
              v-model.trim="form.name"
              type="text"
              required
              placeholder="เช่น Cream"
              class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#ff6b2c]/30"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">ค่าสี Hex (สำรองกรณีไม่มีรูป)</label>
            <div class="flex gap-2">
              <input v-model="form.hex" type="color" class="h-11 w-14 rounded-lg border border-slate-300 bg-white p-1" />
              <input
                v-model.trim="form.hex"
                type="text"
                placeholder="#ddd9cb"
                class="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#ff6b2c]/30"
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">รูปสี (อัปโหลดจากเครื่อง)</label>
            <input
              type="file"
              accept="image/*"
              class="block w-full text-sm text-slate-600 file:mr-3 file:rounded-xl file:border file:border-slate-300 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-50"
              @change="onPickImage"
            />

            <div class="mt-3 flex items-start gap-3">
              <div class="flex h-20 w-28 items-center justify-center overflow-hidden rounded-lg border border-slate-300 bg-white">
                <img v-if="form.imageDataUrl" :src="form.imageDataUrl" alt="preview" class="h-full w-full object-cover" />
                <div v-else class="h-full w-full" :style="{ background: form.hex || '#e5e7eb' }"></div>
              </div>
              <div class="space-y-2">
                <div class="text-xs text-slate-500">ถ้าไม่อัปโหลดรูป ระบบจะใช้ค่าสี Hex แสดงผล</div>
                <button
                  v-if="form.imageDataUrl"
                  type="button"
                  class="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  @click="form.imageDataUrl = ''"
                >
                  ลบรูป
                </button>
              </div>
            </div>
          </div>

          <div v-if="errorMsg" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ errorMsg }}
          </div>
          <div v-if="successMsg" class="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {{ successMsg }}
          </div>

          <div class="flex items-center gap-2">
            <button
              type="submit"
              class="h-11 flex-1 rounded-xl bg-[#ff6b2c] px-5 text-sm font-semibold text-white hover:bg-[#ff7c45]"
            >
              {{ editingId ? "บันทึกการแก้ไข" : "เพิ่มเฉดสี" }}
            </button>
            <button
              type="button"
              class="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              @click="resetForm"
            >
              {{ editingId ? "ยกเลิกแก้ไข" : "ล้างฟอร์ม" }}
            </button>
          </div>
        </form>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-7">
        <div class="flex items-center justify-between gap-3 border-b border-slate-200 p-5">
          <div>
            <h2 class="text-base font-extrabold text-slate-900">รายการเฉดสี</h2>
            <p class="mt-1 text-sm text-slate-500">ข้อมูลที่จะแสดงในหน้า /shades</p>
          </div>
          <button
            type="button"
            class="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            @click="loadShades"
          >
            Refresh
          </button>
        </div>

        <div class="p-5">
          <div v-if="loading" class="text-sm text-slate-500">กำลังโหลด...</div>
          <div v-else-if="!shades.length" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            ยังไม่มีรายการเฉดสี
          </div>

          <div v-else class="space-y-3">
            <div v-for="item in shades" :key="item.id" class="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="flex items-center gap-3">
                    <div class="h-10 w-10 overflow-hidden rounded border border-slate-300 bg-white">
                      <img v-if="item.imageDataUrl" :src="item.imageDataUrl" alt="shade" class="h-full w-full object-cover" />
                      <div v-else class="h-full w-full" :style="{ background: item.hex || '#e5e7eb' }"></div>
                    </div>
                    <div class="min-w-0">
                      <div class="font-semibold text-slate-900">{{ item.code }}</div>
                      <div class="text-sm text-slate-600">{{ item.name }}</div>
                      <div class="truncate text-xs text-slate-500">{{ item.groupTitle || settingsForm.title || "Procrete SL" }}</div>
                    </div>
                  </div>
                  <div class="mt-2 text-xs text-slate-500">
                    Hex: {{ item.hex || "-" }} | รูป: {{ item.imageDataUrl ? "มี" : "ไม่มี" }}
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="h-9 rounded-lg border border-blue-200 bg-blue-50 px-3 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                    @click="startEdit(item)"
                  >
                    แก้ไข
                  </button>
                  <button
                    type="button"
                    class="h-9 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-700 hover:bg-red-100"
                    @click="removeShade(item.id)"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"

definePageMeta({ middleware: ["auth"] })
useHead({ title: "Admin | Shades" })

type ShadeRow = {
  id: string
  groupTitle?: string
  code: string
  name: string
  imageDataUrl?: string
  hex?: string
  createdAt: string
  updatedAt: string
}

type ShadeSettings = {
  title?: string
}

const STORE_KEY = "shades"
const SETTINGS_KEY = "shade_settings"
const { getValue, setValue } = useSharedStore()

const shades = ref<ShadeRow[]>([])
const loading = ref(false)
const errorMsg = ref("")
const successMsg = ref("")
const editingId = ref<string | null>(null)

const settingsForm = reactive({
  title: "Procrete SL",
})

const form = reactive({
  groupTitle: "Procrete SL",
  code: "",
  name: "",
  hex: "#dddddd",
  imageDataUrl: "",
})

const nowIso = () => new Date().toISOString()

const uid = () => {
  if (typeof globalThis !== "undefined" && (globalThis as any).crypto?.randomUUID) {
    return (globalThis as any).crypto.randomUUID() as string
  }
  return `shade_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

const resetForm = () => {
  editingId.value = null
  form.groupTitle = settingsForm.title.trim() || "Procrete SL"
  form.code = ""
  form.name = ""
  form.hex = "#dddddd"
  form.imageDataUrl = ""
  errorMsg.value = ""
  successMsg.value = ""
}

const normalizeHex = (v: string) => {
  const value = (v || "").trim()
  if (!value) return ""
  return value.startsWith("#") ? value : `#${value}`
}

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ""))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const onPickImage = async (e: Event) => {
  const input = e.target as HTMLInputElement | null
  const file = input?.files?.[0]
  if (!file) return

  const maxMB = 2
  if (file.size > maxMB * 1024 * 1024) {
    window.alert(`ไฟล์ ${file.name} ใหญ่เกิน ${maxMB}MB กรุณาย่อรูปก่อน`)
    if (input) input.value = ""
    return
  }

  form.imageDataUrl = await fileToDataUrl(file)
  if (input) input.value = ""
}

const loadShades = async () => {
  loading.value = true
  errorMsg.value = ""
  try {
    const rows = await getValue<ShadeRow>(STORE_KEY)
    shades.value = Array.isArray(rows) ? rows : []
  } catch (e: any) {
    shades.value = []
    errorMsg.value = e?.message || "โหลดเฉดสีไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}

const loadSettings = async () => {
  try {
    const rows = await getValue<ShadeSettings>(SETTINGS_KEY)
    const first = Array.isArray(rows) ? rows[0] : null
    settingsForm.title = first?.title?.trim() || "Procrete SL"
    if (!editingId.value) form.groupTitle = settingsForm.title
  } catch {
    settingsForm.title = "Procrete SL"
    if (!editingId.value) form.groupTitle = "Procrete SL"
  }
}

const startEdit = (item: ShadeRow) => {
  editingId.value = item.id
  form.groupTitle = item.groupTitle || settingsForm.title || "Procrete SL"
  form.code = item.code || ""
  form.name = item.name || ""
  form.hex = item.hex || "#dddddd"
  form.imageDataUrl = item.imageDataUrl || ""
  errorMsg.value = ""
  successMsg.value = ""
}

const saveShade = async () => {
  errorMsg.value = ""
  successMsg.value = ""

  const groupTitle = form.groupTitle.trim() || settingsForm.title.trim() || "Procrete SL"
  const code = form.code.trim()
  const name = form.name.trim()
  const hex = normalizeHex(form.hex)

  if (!groupTitle) {
    errorMsg.value = "กรุณากรอกชื่อกลุ่ม/ชุดสี"
    return
  }
  if (!code) {
    errorMsg.value = "กรุณากรอกรหัสเฉดสี"
    return
  }
  if (!name) {
    errorMsg.value = "กรุณากรอกชื่อสี"
    return
  }

  try {
    const current = await getValue<ShadeRow>(STORE_KEY)

    if (editingId.value) {
      const id = editingId.value
      const next = current.map((x) =>
        x.id === id
          ? {
              ...x,
              groupTitle,
              code,
              name,
              hex: hex || undefined,
              imageDataUrl: form.imageDataUrl || undefined,
              updatedAt: nowIso(),
            }
          : x
      )
      await setValue<ShadeRow>(STORE_KEY, next)
      successMsg.value = "บันทึกการแก้ไขแล้ว"
    } else {
      const row: ShadeRow = {
        id: uid(),
        groupTitle,
        code,
        name,
        hex: hex || undefined,
        imageDataUrl: form.imageDataUrl || undefined,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      }
      await setValue<ShadeRow>(STORE_KEY, [row, ...current])
      successMsg.value = "เพิ่มเฉดสีแล้ว"
    }

    resetForm()
    await loadShades()
  } catch (e: any) {
    errorMsg.value = e?.message || "บันทึกข้อมูลไม่สำเร็จ"
  }
}

const removeShade = async (id: string) => {
  if (!window.confirm("ลบเฉดสีนี้ใช่ไหม?")) return
  errorMsg.value = ""
  successMsg.value = ""

  try {
    const current = await getValue<ShadeRow>(STORE_KEY)
    const next = current.filter((x) => x.id !== id)
    await setValue<ShadeRow>(STORE_KEY, next)
    if (editingId.value === id) resetForm()
    successMsg.value = "ลบเฉดสีแล้ว"
    await loadShades()
  } catch (e: any) {
    errorMsg.value = e?.message || "ลบเฉดสีไม่สำเร็จ"
  }
}

const saveSettings = async () => {
  errorMsg.value = ""
  successMsg.value = ""
  const title = settingsForm.title.trim() || "Procrete SL"

  try {
    await setValue<ShadeSettings>(SETTINGS_KEY, [{ title }])
    settingsForm.title = title
    if (!editingId.value) form.groupTitle = title
    successMsg.value = "บันทึกหัวข้อเริ่มต้นแล้ว"
  } catch (e: any) {
    errorMsg.value = e?.message || "บันทึกหัวข้อไม่สำเร็จ"
  }
}

onMounted(async () => {
  await Promise.all([loadShades(), loadSettings()])
  resetForm()
})
</script>
