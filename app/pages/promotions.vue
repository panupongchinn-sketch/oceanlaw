<template>
  <div class="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-xs font-semibold tracking-[0.22em] text-[#ef3b2d] uppercase">Promotion</p>
          <h1 class="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">โปรโมชั่น</h1>
          <p class="mt-2 text-sm text-slate-600">
            หน้าแสดงภาพโปรโมชันที่เพิ่มจากหน้าแอดมิน (ถ้าไม่มี จะใช้ไฟล์ `public/promotion-main.jpg`)
          </p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
          ทั้งหมด <span class="font-extrabold text-slate-900">{{ displayPromotions.length }}</span> รูป
        </div>
      </div>

      <div v-if="loading" class="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-slate-500">
        กำลังโหลดรูปโปรโมชั่น...
      </div>

      <div v-else class="mt-5 space-y-5">
        <div
          v-for="(item, idx) in displayPromotions"
          :key="item.id"
          class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-2 shadow-sm sm:p-3"
        >
          <div class="relative overflow-hidden rounded-xl bg-black">
            <img
              :src="item.imageDataUrl"
              :alt="item.title || `promotion-${idx + 1}`"
              class="w-full object-contain"
              loading="lazy"
              @error="onPromotionListImgError(item.id, $event)"
            />
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 px-1 pt-3">
            <div class="text-sm font-semibold text-slate-100">
              {{ item.title || `โปรโมชั่น #${idx + 1}` }}
            </div>
            <a
              :href="item.imageDataUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-9 items-center rounded-lg border border-slate-700 bg-slate-900 px-3 text-xs font-semibold text-slate-100 hover:bg-slate-800"
            >
              เปิดรูปเต็ม
            </a>
          </div>
        </div>

        <div
          v-if="!displayPromotions.length"
          class="flex min-h-[320px] flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-900 px-6 py-12 text-center"
        >
          <div class="text-lg font-bold text-white">ยังไม่มีรูปโปรโมชั่น</div>
          <div class="text-sm text-slate-300">
            เพิ่มรูปจากหน้า <span class="font-semibold text-white">/admin/promotions</span> หรือวางไฟล์
            <span class="font-semibold text-white">public/promotion-main.jpg</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

useHead({ title: "โปรโมชั่น | Oceanlaw" })

type PromotionRow = {
  id: string
  title?: string
  imageDataUrl: string
  createdAt?: string
  updatedAt?: string
}

const STORE_KEY = "promotions"
const FALLBACK_ID = "fallback-file"
const promotionImageSrc = "/promotion-main.jpg"
const { getValue } = useSharedStore()

const promotions = ref<PromotionRow[]>([])
const loading = ref(true)
const fallbackAvailable = ref(true)

const displayPromotions = computed<PromotionRow[]>(() => {
  if (promotions.value.length) return promotions.value
  if (!fallbackAvailable.value) return []
  return [{ id: FALLBACK_ID, title: "โปรโมชั่นหลัก", imageDataUrl: promotionImageSrc }]
})

const loadPromotions = async () => {
  loading.value = true
  try {
    const rows = await getValue<PromotionRow>(STORE_KEY)
    promotions.value = Array.isArray(rows)
      ? rows.filter((x) => x && typeof x === "object" && typeof x.imageDataUrl === "string" && x.imageDataUrl)
      : []
  } catch {
    promotions.value = []
  } finally {
    loading.value = false
  }
}

const onPromotionListImgError = (id: string, e: Event) => {
  if (id === FALLBACK_ID) {
    fallbackAvailable.value = false
    return
  }
  const el = e.target as HTMLImageElement | null
  if (el) el.style.display = "none"
}

onMounted(loadPromotions)
</script>
