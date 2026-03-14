<template>
  <div class="space-y-8">
    <section class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_40%)]"
      ></div>
      <div class="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">ผลงานของเรา</h1>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm">
          ทั้งหมด <span class="font-extrabold text-slate-900">{{ projects.length }}</span> โปรเจค
        </div>
      </div>
    </section>

    <section>
      <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-500">
        กำลังโหลดผลงาน...
      </div>

      <div v-else-if="errorMsg" class="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-red-700">
        <div class="font-bold">โหลดข้อมูลผลงานไม่สำเร็จ</div>
        <div class="mt-1 text-sm">{{ errorMsg }}</div>
        <button
          type="button"
          class="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          @click="loadWorks"
        >
          ลองอีกครั้ง
        </button>
      </div>

      <div
        v-else-if="!projects.length"
        class="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"
      >
        <div class="text-lg font-extrabold text-slate-900">ยังไม่มีผลงาน</div>
        <div class="mt-1 text-sm text-slate-600">เพิ่มข้อมูลจากเมนูจัดการโปรเจคก่อน</div>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="p in projects"
          :key="p.id"
          :to="`/project/${p.id}`"
          class="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="relative aspect-[16/11] overflow-hidden bg-slate-100">
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

            <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"></div>
            <div class="absolute left-4 top-4 flex flex-wrap gap-2">
              <span
                v-if="p.category"
                class="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur"
              >
                {{ p.category }}
              </span>
              <span
                v-if="p.status"
                class="rounded-full px-3 py-1 text-xs font-semibold text-white"
                :class="statusBadgeClass(p.status)"
              >
                {{ statusLabel(p.status) }}
              </span>
            </div>
          </div>

          <div class="space-y-3 p-5">
            <div>
              <h2 class="line-clamp-2 text-xl font-extrabold leading-tight text-slate-900">{{ p.name }}</h2>
              <p class="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{{ p.description }}</p>
            </div>

            <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span v-if="p.client" class="rounded-full bg-slate-100 px-3 py-1">ลูกค้า: {{ p.client }}</span>
            </div>

            <div class="pt-1 text-sm font-semibold text-[#0B4AA2] group-hover:underline">ดูรายละเอียดโปรเจค ></div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"

useHead({ title: "ผลงาน | Oceanlaw" })

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

const PROJECTS_KEY = "projects"
const fallbackImg = "https://picsum.photos/seed/project/1200/900"
const { getValue } = useSharedStore()

const projects = ref<ProjectRow[]>([])
const loading = ref(true)
const errorMsg = ref("")
const projectSlideById = ref<Record<string, number>>({})
let projectSlideTimer: ReturnType<typeof setInterval> | null = null

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const projectImages = (p: ProjectRow): string[] => {
  if (Array.isArray(p.imageDataUrls) && p.imageDataUrls.length) return p.imageDataUrls.filter(Boolean)
  return p.imageDataUrl ? [p.imageDataUrl] : []
}

const currentProjectImageIndex = (p: ProjectRow) => {
  const images = projectImages(p)
  if (!images.length) return 0
  return (projectSlideById.value[p.id] || 0) % images.length
}

const projectCurrentImage = (p: ProjectRow) => {
  const images = projectImages(p)
  if (!images.length) return ""
  return images[currentProjectImageIndex(p)] || images[0] || ""
}

const statusLabel = (status?: ProjectRow["status"]) => {
  if (status === "done") return "เสร็จแล้ว"
  if (status === "doing") return "กำลังทำ"
  if (status === "draft") return "ร่าง"
  return "สถานะ"
}

const statusBadgeClass = (status?: ProjectRow["status"]) => {
  if (status === "done") return "bg-emerald-600/90"
  if (status === "doing") return "bg-amber-500/90"
  return "bg-slate-600/85"
}

const startProjectSlider = () => {
  if (projectSlideTimer) clearInterval(projectSlideTimer)
  projectSlideTimer = setInterval(() => {
    const nextMap: Record<string, number> = { ...projectSlideById.value }
    for (const p of projects.value) {
      const total = projectImages(p).length
      if (total <= 1) continue
      nextMap[p.id] = ((nextMap[p.id] || 0) + 1) % total
    }
    projectSlideById.value = nextMap
  }, 3200)
}

const loadWorks = async () => {
  loading.value = true
  errorMsg.value = ""
  try {
    const arr = await getValue<ProjectRow>(PROJECTS_KEY)
    projects.value = Array.isArray(arr) ? arr : []
    const nextMap: Record<string, number> = {}
    for (const p of projects.value) nextMap[p.id] = 0
    projectSlideById.value = nextMap
  } catch (e: any) {
    projects.value = []
    projectSlideById.value = {}
    errorMsg.value = e?.message || "Failed to load works"
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  startProjectSlider()
  loadWorks()
})

onBeforeUnmount(() => {
  if (projectSlideTimer) clearInterval(projectSlideTimer)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
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
