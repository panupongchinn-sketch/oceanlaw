<template>
  <div class="service-page -mx-4 -my-8 sm:-mx-6 lg:-mx-10">
    <section id="services" class="px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
      <div class="mx-auto max-w-7xl rounded-[28px] border border-[#cfe2d3] bg-white p-6 sm:p-8 lg:p-10">
        <div class="mx-auto mb-8 max-w-3xl text-center">
          <p class="inline-flex items-center rounded-full bg-[#e1f0e5] px-3 py-1 text-xs font-semibold text-[#2c7a2f]">บริการของเรา</p>
          <h2 class="mt-3 text-2xl font-black tracking-tight text-[#1f4d22] sm:text-4xl">บริการครบวงจรสำหรับทุกธุรกิจ</h2>
          <p class="mt-3 text-xs leading-relaxed text-[#4f6853] sm:text-sm">ชุดบริการที่ออกแบบให้รองรับทั้งผู้ประกอบการรายใหม่และองค์กรที่ต้องการระบบที่แม่นยำ</p>
        </div>

        <div v-if="loadingServices" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div v-for="n in 8" :key="`service-skeleton-${n}`" class="rounded-2xl border border-[#d6e5da] bg-white p-5">
            <div class="h-10 w-10 animate-pulse rounded-xl bg-[#e3eee8]"></div>
            <div class="mt-4 h-6 w-3/4 animate-pulse rounded bg-[#e3eee8]"></div>
            <div class="mt-3 h-4 w-full animate-pulse rounded bg-[#edf4f0]"></div>
            <div class="mt-2 h-4 w-5/6 animate-pulse rounded bg-[#edf4f0]"></div>
          </div>
        </div>

        <div v-else-if="!displayServices.length" class="rounded-2xl border border-dashed border-[#c9dacc] bg-white p-10 text-center text-[#537565]">
          ยังไม่มีบริการที่เปิดใช้งาน
        </div>

        <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="(service, idx) in displayServices"
            :key="service.id || `default-${idx}`"
            class="group service-card relative rounded-2xl border border-[#cfe0d2] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#5bae36] hover:bg-[#4a9a27]"
          >
            <NuxtLink :to="serviceDetailPath(service.id)" class="absolute inset-0 z-10 rounded-2xl" :aria-label="`ดูรายละเอียด ${service.name}`">
              <span class="sr-only">ดูรายละเอียด</span>
            </NuxtLink>

            <div v-if="service.imageUrl" class="relative overflow-hidden rounded-xl border border-[#d6e5da] bg-[#edf4f0]">
              <img
                :src="service.imageUrl"
                :alt="service.name || 'service image'"
                class="h-36 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div
              v-else
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f1eb] text-[#2f8b33] transition-all duration-300 group-hover:bg-white/20 group-hover:text-white"
            >
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path v-if="iconType(idx) === 'doc'" d="M7 3h7l5 5v13H7z" />
                <path v-if="iconType(idx) === 'doc'" d="M14 3v6h6" />

                <path v-else-if="iconType(idx) === 'calendar'" d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                <path v-else-if="iconType(idx) === 'calendar'" d="M8 2v4M16 2v4M5 10h14" />

                <path v-else-if="iconType(idx) === 'shield'" d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z" />

                <path v-else-if="iconType(idx) === 'chart'" d="M4 19h16" />
                <path v-else-if="iconType(idx) === 'chart'" d="M7 15l3-3 3 2 4-5" />

                <path v-else d="M12 2v20M2 12h20" />
              </svg>
            </div>

            <h3 class="mt-4 line-clamp-2 text-xl font-black leading-tight text-[#153d18] group-hover:text-white">{{ service.name }}</h3>
            <p class="mt-3 line-clamp-3 text-sm leading-7 text-[#456149] group-hover:text-white/95">{{ service.description }}</p>

            <div class="relative z-20 mt-6">
              <NuxtLink
                :to="serviceDetailPath(service.id)"
                class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#3f9922] bg-[#3f9922] text-xl font-bold text-white transition group-hover:border-white/80 group-hover:bg-white group-hover:text-[#3f9922]"
                aria-label="open service"
              >
                →
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

useHead({ title: "บริการ | Oceanlaw" })

type ServiceRow = {
  id: string
  name: string | null
  description?: string | null
  enabled?: boolean | null
  image_url?: string | null
  image_urls?: string[] | null
}

type DisplayService = {
  id: string
  name: string
  description: string
  enabled: boolean
  imageUrl: string
}

const SERVICES_KEY = "products"
const { getValue } = useSharedStore()

const services = ref<ServiceRow[]>([])
const loadingServices = ref(true)

const defaultServices: DisplayService[] = [
  { id: "d1", name: "ทำบัญชีรายเดือน", description: "บันทึกบัญชี ยื่นภาษี และรายงานการเงินครบ Outsource แทนจ้างพนักงาน", enabled: true },
  { id: "d2", name: "ยื่นภาษีรายเดือน", description: "ภงด.1, 3, 53 และ ภ.พ.30 ยื่นตรงเวลาทุกเดือน", enabled: true },
  { id: "d3", name: "ยื่นภาษีครึ่งปี (ภ.ง.ด.51)", description: "ประมาณการกำไรครึ่งปีและยื่นภาษีให้ถูกต้อง", enabled: true },
  { id: "d4", name: "ปิดงบการเงินประจำปี", description: "จัดทำงบการเงินครบถ้วน ยื่น DBD + ภ.ง.ด.50", enabled: true },
  { id: "d5", name: "ตรวจสอบบัญชี CPA", description: "รับรองงบโดยผู้สอบบัญชีรับอนุญาต", enabled: true },
  { id: "d6", name: "จดทะเบียนบริษัท/หจก", description: "ดำเนินการจดทะเบียนครบวงจร พร้อมเอกสาร", enabled: true },
  { id: "d7", name: "จด VAT", description: "จดทะเบียนภาษีมูลค่าเพิ่มสำหรับธุรกิจ", enabled: true },
  { id: "d8", name: "ขึ้นทะเบียนประกันสังคม", description: "ดูแลเรื่องประกันสังคมนายจ้างและลูกจ้าง ม.33", enabled: true },
  { id: "d9", name: "ทำบัญชีย้อนหลัง", description: "เคลียร์ภาษีย้อนหลัง แก้ปัญหาบัญชีค้าง", enabled: true },
  { id: "d10", name: "เลิกบริษัท", description: "ดำเนินการเลิกกิจการถูกต้องตามกฎหมาย", enabled: true },
  { id: "d11", name: "วางแผนภาษี", description: "ช่วยประหยัดภาษีอย่างถูกกฎหมาย วางแผนก่อนเสีย", enabled: true },
  { id: "d12", name: "วางแผนภาษีก่อนเปิดบริษัท", description: "เริ่มถูกแต่แรก ไม่ต้องเสียภาษีย้อนหลัง", enabled: true },
  { id: "d13", name: "วางระบบบัญชี", description: "ออกแบบระบบบัญชีให้เหมาะกับธุรกิจ", enabled: true },
  { id: "d14", name: "วิทยากรอบรมภาษี", description: "อบรมความรู้ด้านภาษีสำหรับองค์กร", enabled: true },
  { id: "d15", name: "เตรียมตัวสรรพากรตรวจ", description: "เตรียมเอกสาร ชี้แจงแบบมืออาชีพ", enabled: true },
  { id: "d16", name: "อบรม FlowAccount / PEAK", description: "สอนใช้งานโปรแกรมบัญชีออนไลน์", enabled: true },
].map((item) => ({ ...item, imageUrl: "" }))

const pickServiceImage = (item: ServiceRow) => {
  if (Array.isArray(item?.image_urls) && item.image_urls.length) {
    const first = String(item.image_urls.find(Boolean) || "").trim()
    if (first) return first
  }
  return String(item?.image_url || "").trim()
}

const displayServices = computed(() => {
  const mapped: DisplayService[] = services.value
    .map((item) => ({
      id: String(item.id || ""),
      name: String(item.name || ""),
      description: String(item.description || ""),
      enabled: item.enabled !== false,
      imageUrl: pickServiceImage(item),
    }))
    .filter((item) => item.name)

  if (!mapped.length) return defaultServices.filter((item) => item.enabled !== false)
  return mapped.filter((item) => item.enabled !== false)
})

const iconType = (idx: number) => {
  const set = ["calendar", "doc", "doc", "chart", "shield", "doc"]
  return set[idx % set.length]
}

const serviceDetailPath = (serviceId: string) => {
  const id = String(serviceId || "").trim()
  if (!id) return "/service"
  return `/service-detail/${encodeURIComponent(id)}`
}

const loadServices = async () => {
  loadingServices.value = true
  try {
    const rows = await getValue<ServiceRow>(SERVICES_KEY)
    services.value = Array.isArray(rows) ? rows : []
  } catch (err) {
    console.error("loadServices error:", err)
    services.value = []
  } finally {
    loadingServices.value = false
  }
}

onMounted(() => {
  loadServices()
})
</script>

<style scoped>
.service-page {
  background: #ffffff;
}

.service-card {
  box-shadow: 0 8px 18px rgba(51, 95, 58, 0.08);
}

.service-card:hover {
  box-shadow: 0 16px 28px rgba(49, 121, 24, 0.34);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
