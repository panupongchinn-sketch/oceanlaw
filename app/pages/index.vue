<template>
  <div class="min-h-screen bg-slate-50">
    <section class="relative w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950">
      <div class="absolute inset-0">
        <video
          class="h-full w-full object-cover"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          poster="/f248d603c9559d3dff1bb684011d9ae2.jpg"
        >
          <source :src="heroVideoSrc" type="video/webm" />
        </video>
        <div class="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/45"></div>
      </div>

      <div class="relative z-20 grid min-h-[560px] gap-8 px-6 py-8 sm:px-10 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-12">
          <div class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white">
            SPORTS CONSTRUCTION AND EQUIPMENT
          </div>

          <h1 class="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            PROBUILD SPORTS
          </h1>

          <p class="mt-5 max-w-2xl text-sm leading-7 text-slate-100 sm:text-base">
            รับออกแบบและก่อสร้างสนามกีฬา ติดตั้งพื้นสนาม และจำหน่ายอุปกรณ์กีฬาครบวงจร
            สำหรับโรงเรียน สโมสร หน่วยงานราชการ และภาคเอกชน พร้อมทีมติดตั้งมืออาชีพและบริการหลังการขาย
          </p>

          <div class="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              class="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-extrabold text-slate-900 transition hover:bg-slate-100"
            >
              โปรเจคของเรา
            </a>
            <a
              href="#catalog"
              class="inline-flex h-11 items-center rounded-full border border-white/40 bg-white/15 px-6 text-sm font-extrabold text-white transition hover:bg-white/25"
            >
              สินค้าของเรา
            </a>
            <NuxtLink
              to="/contact"
              class="inline-flex h-11 items-center rounded-full border border-white/40 bg-transparent px-6 text-sm font-extrabold text-white transition hover:bg-white/15"
            >
              ติดต่อเรา
            </NuxtLink>
          </div>

          <div class="mt-6 text-sm text-slate-200">
            สินค้าในระบบ
            <span class="font-bold text-white">{{ products.length }}</span>
            รายการ
          </div>
        </div>

      </div>

    </section>

    <section id="projects" class="mx-auto mt-8 max-w-none bg-white px-4 py-14 sm:px-6 lg:px-10">
      <div class="text-center">
        <h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">โปรเจคของเรา</h2>
      </div>

      <div v-if="!projectsLoaded" class="mt-8 text-center text-slate-500">กำลังโหลด...</div>

      <div
        v-else-if="!projects.length"
        class="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"
      >
        <div class="text-lg font-extrabold text-slate-900">ยังไม่มีโปรเจค</div>
        <div class="mt-1 text-sm text-slate-600">เพิ่มข้อมูลจากเมนูจัดการโปรเจคก่อน</div>
      </div>

      <div v-else class="mt-12 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="p in projects"
          :key="p.id"
          :to="`/project/${p.id}`"
          class="group block w-full cursor-pointer"
        >
          <div class="relative aspect-[16/11] overflow-hidden rounded-2xl bg-slate-100 shadow-[0_12px_30px_rgba(2,6,23,0.18)]">
            <Transition name="slide-right" mode="out-in">
              <img
                v-if="projectImages(p).length"
                :key="`${p.id}-${currentProjectImageIndex(p)}`"
                :src="projectCurrentImage(p)"
                :alt="p.name"
                class="h-full w-full object-cover"
                @error="onImgError"
              />
              <div v-else key="no-image" class="flex h-full w-full items-center justify-center text-sm text-slate-400">
                ไม่มีรูป
              </div>
            </Transition>

            <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
              <h3 class="line-clamp-2 text-2xl font-extrabold text-white drop-shadow-sm">{{ p.name }}</h3>
              <span
                class="mt-4 inline-flex h-10 items-center rounded-full bg-[#2e58d6] px-6 text-sm font-extrabold text-white transition group-hover:bg-[#2448b6]"
              >
                ดูโปรเจค
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="relative py-14 sm:py-18">
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-slate-50"></div>
      <div class="absolute inset-x-0 top-0 -z-10 h-px bg-slate-200"></div>

      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="text-center">
          <p class="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#0B4AA2] uppercase">
            Trusted by <span class="h-1 w-1 rounded-full bg-[#0B4AA2]"></span> Partners
          </p>

          <h2 class="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">ลูกค้าและพาร์ทเนอร์</h2>

          <p class="mx-auto mt-3 max-w-2xl leading-relaxed text-slate-600">
            ตัวอย่างองค์กรที่ไว้วางใจและร่วมงานกับเรา
          </p>
        </div>

        <div class="mt-10 sm:mt-12">
          <div v-if="partnerLogos.length" class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <div
              v-for="item in partnerLogos"
              :key="item.id"
              class="flex h-24 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <img
                :src="item.imageDataUrl"
                :alt="item.name || 'partner'"
                class="h-full w-full object-contain p-3"
                loading="lazy"
                @error="onImgError"
              />
            </div>
          </div>

          <div v-else class="rounded-2xl border border-dashed border-slate-200 bg-white/70 px-6 py-10 text-center text-slate-500">
            ยังไม่มีโลโก้พาร์ทเนอร์
          </div>

          <div class="mt-10 h-px bg-slate-200"></div>
        </div>
      </div>
    </section>

    <main id="catalog" class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div v-if="loading" class="flex items-center gap-3 text-slate-500">
        <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-transparent"></span>
        <span class="font-medium">กำลังโหลด...</span>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        <div class="font-bold">โหลดข้อมูลไม่สำเร็จ</div>
        <div class="mt-1 text-sm">{{ error }}</div>
        <button
          type="button"
          class="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          @click="loadProducts"
        >
          ลองอีกครั้ง
        </button>
      </div>

      <div v-else class="space-y-8">
        <div class="space-y-4">
          <div class="text-center">
            <h2 class="text-2xl font-extrabold text-[#0B4AA2] sm:text-3xl">หมวดหมู่สินค้า</h2>
            <p class="mx-auto mt-2 max-w-2xl text-slate-600">
              เลือกดูสินค้าแยกตามแบรนด์ พร้อมรายละเอียดและรูปภาพ
            </p>
          </div>

          <div class="flex justify-end">
            <button
              type="button"
              class="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm hover:bg-slate-50"
              @click="loadProducts"
            >
              รีเฟรช
            </button>
          </div>
        </div>

        <section v-for="g in groupedByBrand" :key="g.brand" class="space-y-4">
          <div>
            <h3 class="text-xl font-extrabold text-slate-900">{{ g.brand }}</h3>
            <p class="text-sm text-slate-500">{{ g.items.length }} รายการ</p>
          </div>

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <NuxtLink
              v-for="p in g.items"
              :key="p.id"
              :to="`/product/${p.id}`"
              class="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
            >
              <div class="aspect-[4/3] overflow-hidden border-b border-slate-100 bg-white">
                <img
                  :src="p.image_url || fallbackImg"
                  :alt="p.name || 'product'"
                  class="h-full w-full object-contain transition group-hover:scale-[1.02]"
                  loading="lazy"
                  @error="onImgError"
                />
              </div>

              <div class="space-y-2 p-4">
                <h4 class="line-clamp-2 font-bold leading-snug text-slate-900">{{ p.name || '-' }}</h4>

                <div class="space-y-1 text-xs text-slate-600">
                  <div><span class="font-semibold">Brand:</span> {{ p.brand || '-' }}</div>
                  <div><span class="font-semibold">SKU:</span> {{ p.sku || '-' }}</div>
                  <div><span class="font-semibold">Category:</span> {{ p.category || '-' }}</div>
                  <div><span class="font-semibold">Unit:</span> {{ p.unit || '-' }}</div>
                </div>

                <div class="pt-2">
                  <span class="text-sm font-semibold text-[#0B4AA2] group-hover:underline">ดูรายละเอียด ></span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </section>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue"

type ProductRow = {
  id: string
  sku: string | null
  name: string | null
  category: string | null
  image_url: string | null
  unit: string | null
  brand: string | null
}

type ProjectRow = {
  id: string
  name: string
  description: string
  category?: string
  client?: string
  status?: "draft" | "doing" | "done"
  imageDataUrl?: string
  imageDataUrls?: string[]
  createdAt: string
  updatedAt: string
}

type PartnerLogoRow = {
  id: string
  name: string
  imageDataUrl: string
  createdAt: string
  updatedAt: string
}

const PRODUCTS_KEY = "products"
const PARTNERS_KEY = "partners"
const PROJECTS_KEY = "projects"
const fallbackImg = "https://picsum.photos/seed/product/1200/900"
const heroVideoSrc = "https://sportcourt.com/wp-content/uploads/2025/05/HomepageBanner.webm"
const { getValue } = useSharedStore()
let projectSlideTimer: ReturnType<typeof setInterval> | null = null

const products = ref<ProductRow[]>([])
const loading = ref(true)
const error = ref("")
const partnerLogos = ref<PartnerLogoRow[]>([])
const projects = ref<ProjectRow[]>([])
const projectsLoaded = ref(false)
const projectSlideById = ref<Record<string, number>>({})

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const normBrand = (b: string | null | undefined) => {
  const v = (b || "").trim()
  return v ? v : "Unbranded"
}

const groupedByBrand = computed(() => {
  const map = new Map<string, ProductRow[]>()

  for (const p of products.value) {
    const key = normBrand(p.brand)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(p)
  }

  const brands = Array.from(map.keys()).sort((a, b) => {
    if (a === "Unbranded") return 1
    if (b === "Unbranded") return -1
    return a.localeCompare(b, "en")
  })

  return brands.map((brand) => {
    const items = (map.get(brand) || []).slice().sort((x, y) =>
      (x.name || "").localeCompare(y.name || "", "th")
    )
    return { brand, items }
  })
})

const projectImages = (p: ProjectRow): string[] => {
  if (Array.isArray(p.imageDataUrls) && p.imageDataUrls.length) {
    return p.imageDataUrls.filter(Boolean)
  }
  return p.imageDataUrl ? [p.imageDataUrl] : []
}

const currentProjectImageIndex = (p: ProjectRow): number => {
  const images = projectImages(p)
  if (!images.length) return 0
  return (projectSlideById.value[p.id] || 0) % images.length
}

const projectCurrentImage = (p: ProjectRow): string => {
  const images = projectImages(p)
  if (!images.length) return ""
  return images[currentProjectImageIndex(p)] || images[0]
}

const loadProducts = async () => {
  loading.value = true
  error.value = ""
  try {
    const arr = await getValue<ProductRow>(PRODUCTS_KEY)
    products.value = Array.isArray(arr) ? (arr as ProductRow[]) : []
  } catch (err: any) {
    error.value = err?.message || "Failed to load products"
    products.value = []
  } finally {
    loading.value = false
  }
}

const loadProjectsLocal = async () => {
  try {
    const arr = await getValue<ProjectRow>(PROJECTS_KEY)
    projects.value = Array.isArray(arr) ? arr : []
    const nextMap: Record<string, number> = {}
    for (const p of projects.value) nextMap[p.id] = 0
    projectSlideById.value = nextMap
  } catch (e) {
    console.error("loadProjectsLocal error:", e)
    projects.value = []
    projectSlideById.value = {}
  } finally {
    projectsLoaded.value = true
  }
}

const loadPartnerLogosLocal = async () => {
  try {
    const arr = await getValue<PartnerLogoRow>(PARTNERS_KEY)
    partnerLogos.value = Array.isArray(arr) ? arr : []
  } catch (e) {
    console.error("loadPartnerLogosLocal error:", e)
    partnerLogos.value = []
  }
}

const startProjectSlider = () => {
  if (projectSlideTimer) clearInterval(projectSlideTimer)
  projectSlideTimer = setInterval(() => {
    const nextMap: Record<string, number> = { ...projectSlideById.value }
    for (const p of projects.value) {
      const total = projectImages(p).length
      if (total <= 1) continue
      const curr = nextMap[p.id] || 0
      nextMap[p.id] = (curr + 1) % total
    }
    projectSlideById.value = nextMap
  }, 3200)
}

onMounted(() => {
  startProjectSlider()
  loadProducts()
  loadProjectsLocal()
  loadPartnerLogosLocal()
})

onBeforeUnmount(() => {
  if (projectSlideTimer) clearInterval(projectSlideTimer)
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease;
}

.slide-right-enter-from {
  transform: translateX(-12%);
  opacity: 0.55;
}

.slide-right-leave-to {
  transform: translateX(12%);
  opacity: 0.25;
}

.slide-right-leave-active {
  position: absolute;
  inset: 0;
}
</style>
