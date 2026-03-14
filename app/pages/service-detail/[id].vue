<template>
  <div class="detail-page -mx-4 -my-8 min-h-[70vh] px-4 py-8 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
    <section class="mx-auto w-full max-w-5xl">
      <NuxtLink
        to="/service"
        class="inline-flex items-center gap-2 rounded-xl border border-[#cfe0d2] bg-white px-4 py-2 text-sm font-semibold text-[#1f4d22] hover:bg-[#f3f9f4]"
      >
        ← กลับหน้าบริการ
      </NuxtLink>

      <div class="mt-5 rounded-3xl border border-[#cfe0d2] bg-white p-5 shadow-[0_10px_28px_rgba(22,101,52,0.08)] sm:p-7">
        <div v-if="loading" class="py-10 text-center text-slate-500">กำลังโหลดรายละเอียดบริการ...</div>

        <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          <div class="font-bold">ไม่พบรายละเอียดบริการ</div>
          <p class="mt-1 text-sm">{{ error }}</p>
        </div>

        <template v-else-if="service">
          <p class="inline-flex items-center rounded-full bg-[#e8f4ec] px-3 py-1 text-xs font-bold text-[#2f7a46]">
            รายละเอียดบริการ
          </p>
          <h1 class="mt-3 text-2xl font-black tracking-tight text-[#163027] sm:text-4xl">{{ service.name }}</h1>

          <div v-if="service.imageUrl" class="mt-5 overflow-hidden rounded-2xl border border-[#dbe9df] bg-white">
            <img
              :src="service.imageUrl"
              :alt="service.name || 'service image'"
              class="h-[240px] w-full object-cover sm:h-[320px]"
            />
          </div>

          <div class="mt-5 rounded-2xl border border-[#dbe9df] bg-[#f7fbf8] p-4 sm:p-5">
            <h2 class="text-base font-extrabold text-[#1d3e31] sm:text-lg">ขอบเขตงาน</h2>
            <p class="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base">
              {{ service.description || "ยังไม่มีรายละเอียดบริการ" }}
            </p>
          </div>

          <div v-if="highlights.length" class="mt-5">
            <h3 class="text-sm font-extrabold uppercase tracking-[0.08em] text-[#2b6a49]">จุดเด่น</h3>
            <ul class="mt-2 space-y-2">
              <li
                v-for="(item, idx) in highlights"
                :key="`highlight-${idx}`"
                class="flex items-start gap-2 rounded-xl border border-[#dbe9df] bg-white px-3 py-2 text-sm text-slate-700"
              >
                <span class="mt-0.5 text-green-600">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NuxtLink
              :to="`/contact?topic=${encodeURIComponent(service.name)}`"
              class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#166534] px-4 text-sm font-bold text-white transition hover:bg-[#14532d]"
            >
              ติดต่อเพื่อขอใบเสนอราคา
            </NuxtLink>
            <a
              href="tel:0889636222"
              class="inline-flex h-11 items-center justify-center rounded-2xl border-2 border-[#166534] px-4 text-sm font-bold text-[#166534] transition hover:bg-[#f0fdf4]"
            >
              โทรติดต่อทันที
            </a>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"

type ServiceRow = {
  id: string | number
  name?: string | null
  description?: string | null
  enabled?: boolean | null
  image_url?: string | null
  image_urls?: string[] | null
}

type ServiceDetail = {
  id: string
  name: string
  description: string
  imageUrl: string
}

const route = useRoute()
const SERVICES_KEY = "products"
const { getValue } = useSharedStore()

const defaultServices: ServiceDetail[] = [
  { id: "d1", name: "ทำบัญชีรายเดือน", description: "บันทึกบัญชี ยื่นภาษี และรายงานการเงินครบ Outsource แทนจ้างพนักงาน" },
  { id: "d2", name: "ยื่นภาษีรายเดือน", description: "ภงด.1, 3, 53 และ ภ.พ.30 ยื่นตรงเวลาทุกเดือน" },
  { id: "d3", name: "ยื่นภาษีครึ่งปี (ภ.ง.ด.51)", description: "ประมาณการกำไรครึ่งปีและยื่นภาษีให้ถูกต้อง" },
  { id: "d4", name: "ปิดงบการเงินประจำปี", description: "จัดทำงบการเงินครบถ้วน ยื่น DBD + ภ.ง.ด.50" },
  { id: "d5", name: "ตรวจสอบบัญชี CPA", description: "รับรองงบโดยผู้สอบบัญชีรับอนุญาต" },
  { id: "d6", name: "จดทะเบียนบริษัท/หจก", description: "ดำเนินการจดทะเบียนครบวงจร พร้อมเอกสาร" },
].map((item) => ({ ...item, imageUrl: "" }))

const routeId = computed(() => {
  const raw = String(route.params.id || "")
  try {
    return decodeURIComponent(raw).trim()
  } catch {
    return raw.trim()
  }
})

const loading = ref(true)
const error = ref("")
const service = ref<ServiceDetail | null>(null)

const highlights = computed(() => {
  const text = String(service.value?.description || "")
  return text
    .split(/\r?\n|[•·]|,/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 5)
})

useHead(() => ({
  title: `${service.value?.name || "รายละเอียดบริการ"} | Oceanlaw`,
}))

const pickServiceImage = (item: ServiceRow) => {
  if (Array.isArray(item?.image_urls) && item.image_urls.length) {
    const first = String(item.image_urls.find(Boolean) || "").trim()
    if (first) return first
  }
  return String(item?.image_url || "").trim()
}

const normalize = (item: ServiceRow): ServiceDetail => ({
  id: String(item?.id || "").trim(),
  name: String(item?.name || "").trim(),
  description: String(item?.description || "").trim(),
  imageUrl: pickServiceImage(item),
})

const loadService = async () => {
  loading.value = true
  error.value = ""
  service.value = null

  try {
    const rows = await getValue<ServiceRow>(SERVICES_KEY)
    const mapped = Array.isArray(rows)
      ? rows
          .map(normalize)
          .filter((x) => x.id && x.name)
      : []

    const source = mapped.length ? mapped : defaultServices
    const target = source.find((x) => x.id === routeId.value)

    if (!target) {
      error.value = `ไม่พบบริการรหัส ${routeId.value || "-"}`
      return
    }

    service.value = target
  } catch (e: any) {
    error.value = e?.message || "โหลดข้อมูลบริการไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}

onMounted(loadService)
watch(routeId, () => {
  loadService()
})
</script>

<style scoped>
.detail-page {
  background: linear-gradient(180deg, #eef3f8 0%, #edf3f7 100%);
}
</style>
