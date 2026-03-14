<template>
  <div class="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="inline-flex items-center rounded-full border border-[#0B4AA2]/20 bg-[#0B4AA2]/5 px-3 py-1 text-xs font-semibold tracking-widest text-[#0B4AA2] uppercase">
            Admin Dashboard
          </p>
          <h1 class="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">จัดการโปรโมชั่น</h1>
          <p class="mt-1 text-sm text-slate-600">เพิ่มรูปโปรโมชันสำหรับหน้า <span class="font-bold">/promotions</span></p>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
          ทั้งหมด <span class="font-extrabold text-slate-900">{{ promotions.length }}</span> รูป
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-12">
      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-5">
        <div class="border-b border-slate-200 p-5">
          <h2 class="text-base font-extrabold text-slate-900">เพิ่มรูปโปรโมชั่น</h2>
        </div>

        <form class="space-y-4 p-5" @submit.prevent="savePromotion">
          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">ชื่อหัวข้อ (ไม่บังคับ)</label>
            <input
              v-model.trim="form.title"
              type="text"
              placeholder="เช่น โปรโมชั่นพื้นสนาม PU"
              class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#ff6b2c]/30"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">รูปโปรโมชั่น *</label>
            <input
              type="file"
              accept="image/*"
              class="block w-full text-sm text-slate-600 file:mr-3 file:rounded-xl file:border file:border-slate-300 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-50"
              @change="onPickImage"
            />
            <div class="mt-2 text-xs text-slate-500">รองรับไฟล์ภาพทั่วไป และบันทึกเป็น Base64 ในระบบ local store</div>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3 shadow-sm">
            <div class="mb-3 flex items-center justify-between">
              <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</div>
              <div
                class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                :class="form.imageDataUrl ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'"
              >
                {{ form.imageDataUrl ? "พร้อมบันทึก" : "ยังไม่เลือกรูป" }}
              </div>
            </div>

            <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div class="relative aspect-[16/9] overflow-hidden">
                <div class="absolute inset-0 bg-[linear-gradient(45deg,#f8fafc_25%,#eef2f7_25%,#eef2f7_50%,#f8fafc_50%,#f8fafc_75%,#eef2f7_75%,#eef2f7_100%)] bg-[length:24px_24px]"></div>

                <img
                  v-if="form.imageDataUrl"
                  :src="form.imageDataUrl"
                  alt="preview"
                  class="relative z-10 h-full w-full object-contain bg-slate-950"
                />

                <div v-else class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-8-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="mt-3 text-sm font-semibold text-slate-700">ยังไม่ได้เลือกรูปโปรโมชั่น</div>
                  <div class="mt-1 text-xs leading-5 text-slate-500">
                    เลือกไฟล์ภาพด้านบน แล้วระบบจะแสดงตัวอย่างก่อนบันทึก
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between border-t border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                <span>ขนาดแนะนำ: แนวนอน (เช่น 1600x900)</span>
                <span>{{ form.imageDataUrl ? "Preview loaded" : "No image" }}</span>
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
              เพิ่มรูปโปรโมชั่น
            </button>
            <button
              type="button"
              class="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              @click="resetForm"
            >
              ล้างฟอร์ม
            </button>
          </div>
        </form>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-7">
        <div class="flex items-center justify-between gap-3 border-b border-slate-200 p-5">
          <div>
            <h2 class="text-base font-extrabold text-slate-900">รายการรูปโปรโมชั่น</h2>
            <p class="mt-1 text-sm text-slate-500">ข้อมูลที่จะแสดงในหน้า /promotions</p>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              @click="loadPromotions"
            >
              Refresh
            </button>
            <button
              v-if="promotions.length"
              type="button"
              class="h-10 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 hover:bg-red-100"
              @click="clearAll"
            >
              ลบทั้งหมด
            </button>
          </div>
        </div>

        <div class="p-5">
          <div v-if="loading" class="text-sm text-slate-500">กำลังโหลด...</div>

          <div v-else-if="!promotions.length" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            ยังไม่มีรูปโปรโมชั่น
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="(item, idx) in promotions"
              :key="item.id"
              class="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div class="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
                <div class="overflow-hidden rounded-lg border border-slate-200 bg-black">
                  <img :src="item.imageDataUrl" :alt="item.title || `promotion-${idx + 1}`" class="w-full object-contain" />
                </div>

                <div class="min-w-0">
                  <div class="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div class="font-semibold text-slate-900">{{ item.title || `โปรโมชั่น #${idx + 1}` }}</div>
                      <div class="mt-1 text-xs text-slate-500">ลำดับแสดงผล #{{ idx + 1 }}</div>
                      <div class="mt-1 text-xs text-slate-500">อัปเดต: {{ formatDate(item.updatedAt || item.createdAt) }}</div>
                    </div>
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        class="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        :disabled="idx === 0"
                        @click="movePromotion(idx, -1)"
                      >
                        ขึ้น
                      </button>
                      <button
                        type="button"
                        class="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        :disabled="idx === promotions.length - 1"
                        @click="movePromotion(idx, 1)"
                      >
                        ลง
                      </button>
                      <button
                        type="button"
                        class="h-9 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-700 hover:bg-red-100"
                        @click="removePromotion(item.id)"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                  <div class="mt-3">
                    <a
                      :href="item.imageDataUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex h-8 items-center rounded-lg border border-blue-200 bg-blue-50 px-3 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                    >
                      เปิดรูปเต็ม
                    </a>
                  </div>
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
useHead({ title: "Admin | Promotions" })

type PromotionRow = {
  id: string
  title?: string
  imageDataUrl: string
  createdAt: string
  updatedAt: string
}

const STORE_KEY = "promotions"
const { getValue, setValue } = useSharedStore()

const promotions = ref<PromotionRow[]>([])
const loading = ref(false)
const errorMsg = ref("")
const successMsg = ref("")

const form = reactive({
  title: "",
  imageDataUrl: "",
})

const uid = () => {
  if (typeof globalThis !== "undefined" && (globalThis as any).crypto?.randomUUID) {
    return (globalThis as any).crypto.randomUUID() as string
  }
  return `promo_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

const resetForm = () => {
  form.title = ""
  form.imageDataUrl = ""
  errorMsg.value = ""
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

  const maxMB = 4
  if (file.size > maxMB * 1024 * 1024) {
    errorMsg.value = `ไฟล์ ${file.name} ใหญ่เกิน ${maxMB}MB กรุณาย่อรูปก่อน`
    if (input) input.value = ""
    return
  }

  errorMsg.value = ""
  form.imageDataUrl = await fileToDataUrl(file)
  if (input) input.value = ""
}

const loadPromotions = async () => {
  loading.value = true
  errorMsg.value = ""
  try {
    const rows = await getValue<PromotionRow>(STORE_KEY)
    promotions.value = Array.isArray(rows) ? rows : []
  } catch (e: any) {
    promotions.value = []
    errorMsg.value = e?.message || "โหลดรูปโปรโมชั่นไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}

const persist = async (nextRows: PromotionRow[]) => {
  await setValue<PromotionRow>(STORE_KEY, nextRows)
  promotions.value = nextRows
}

const savePromotion = async () => {
  errorMsg.value = ""
  successMsg.value = ""

  if (!form.imageDataUrl) {
    errorMsg.value = "กรุณาเลือกรูปโปรโมชั่น"
    return
  }

  const now = new Date().toISOString()
  const row: PromotionRow = {
    id: uid(),
    title: form.title.trim() || undefined,
    imageDataUrl: form.imageDataUrl,
    createdAt: now,
    updatedAt: now,
  }

  try {
    const next = [row, ...promotions.value]
    await persist(next)
    resetForm()
    successMsg.value = "เพิ่มรูปโปรโมชั่นแล้ว"
  } catch (e: any) {
    errorMsg.value = e?.message || "บันทึกข้อมูลไม่สำเร็จ"
  }
}

const removePromotion = async (id: string) => {
  errorMsg.value = ""
  successMsg.value = ""
  if (!window.confirm("ลบรูปโปรโมชั่นนี้ใช่ไหม?")) return
  try {
    const next = promotions.value.filter((x) => x.id !== id)
    await persist(next)
    successMsg.value = "ลบรูปโปรโมชั่นแล้ว"
  } catch (e: any) {
    errorMsg.value = e?.message || "ลบข้อมูลไม่สำเร็จ"
  }
}

const movePromotion = async (index: number, delta: number) => {
  const target = index + delta
  if (target < 0 || target >= promotions.value.length) return

  errorMsg.value = ""
  successMsg.value = ""
  try {
    const next = [...promotions.value]
    const [item] = next.splice(index, 1)
    if (!item) return
    item.updatedAt = new Date().toISOString()
    next.splice(target, 0, item)
    await persist(next)
  } catch (e: any) {
    errorMsg.value = e?.message || "จัดลำดับไม่สำเร็จ"
  }
}

const clearAll = async () => {
  errorMsg.value = ""
  successMsg.value = ""
  if (!window.confirm("ลบรูปโปรโมชั่นทั้งหมดใช่ไหม?")) return
  try {
    await persist([])
    successMsg.value = "ลบรูปโปรโมชั่นทั้งหมดแล้ว"
  } catch (e: any) {
    errorMsg.value = e?.message || "ลบข้อมูลไม่สำเร็จ"
  }
}

const formatDate = (iso?: string) => {
  if (!iso) return "-"
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString("th-TH")
}

onMounted(loadPromotions)
</script>
