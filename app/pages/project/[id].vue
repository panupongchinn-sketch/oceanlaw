<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <NuxtLink
        to="/#projects"
        class="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <- กลับหน้าแรก
      </NuxtLink>
      <button
        type="button"
        class="inline-flex items-center rounded-xl bg-[#0B4AA2] px-4 py-2 text-sm font-bold text-white hover:bg-[#083A7E]"
        @click="goContact"
      >
        สนใจโปรเจคนี้ -> ติดต่อเรา
      </button>
    </div>

    <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
      กำลังโหลดรายละเอียดโปรเจค...
    </div>

    <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
      <div class="font-bold">โหลดข้อมูลไม่สำเร็จ</div>
      <div class="mt-1 text-sm">{{ error }}</div>
    </div>

    <div v-else-if="project" class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_55px_rgba(2,6,23,0.08)]">
      <div>
        <div class="relative h-[420px] bg-slate-100 sm:h-[640px] lg:h-[820px]">
          <img
            v-if="projectImages.length"
            :src="projectImages[currentIndex]"
            :alt="project.name"
            class="h-full w-full object-cover"
            @error="onImgError"
          />
          <div v-else class="flex h-full w-full items-center justify-center text-sm text-slate-400">ไม่มีรูป</div>

          <button
            v-if="projectImages.length > 1"
            type="button"
            class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white hover:bg-black/60"
            @click="prevImage"
            aria-label="Previous image"
          >
            <
          </button>
          <button
            v-if="projectImages.length > 1"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white hover:bg-black/60"
            @click="nextImage"
            aria-label="Next image"
          >
            >
          </button>
        </div>

        <div class="border-t border-slate-200 bg-white p-6 sm:p-10">
          <div class="mx-auto max-w-4xl">
            <h1 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{{ project.name }}</h1>

          <div class="mt-4 flex flex-wrap gap-2 text-xs sm:text-sm">
            <span v-if="project.category" class="rounded-full bg-slate-100 px-3 py-1.5 font-bold text-slate-700">
              {{ project.category }}
            </span>
            <span v-if="project.client" class="rounded-full bg-blue-50 px-3 py-1.5 font-bold text-blue-700">
              {{ project.client }}
            </span>
            <span v-if="project.status" class="rounded-full bg-amber-50 px-3 py-1.5 font-bold text-amber-700">
              {{ project.status }}
            </span>
            <span class="rounded-full bg-slate-900 px-3 py-1.5 font-bold text-white">
              {{ projectImages.length || 1 }} รูป
            </span>
          </div>

          <div class="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7"><p class="project-description">{{ project.description }}</p></div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"

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

const route = useRoute()
const { getValue } = useSharedStore()
const PROJECTS_KEY = "projects"
const fallbackImg = "https://picsum.photos/seed/projectdetail/1400/900"

const id = computed(() => String(route.params.id || ""))
const project = ref<ProjectRow | null>(null)
const loading = ref(true)
const error = ref("")
const currentIndex = ref(0)
let sliderTimer: ReturnType<typeof setInterval> | null = null

const projectImages = computed(() => {
  if (!project.value) return []
  if (Array.isArray(project.value.imageDataUrls) && project.value.imageDataUrls.length) {
    return project.value.imageDataUrls.filter(Boolean)
  }
  return project.value.imageDataUrl ? [project.value.imageDataUrl] : []
})

useHead(() => ({
  title: `${project.value?.name || "รายละเอียดโปรเจค"} | probuild`,
}))

const loadProject = async () => {
  loading.value = true
  error.value = ""
  currentIndex.value = 0
  try {
    const list = await getValue<ProjectRow>(PROJECTS_KEY)
    project.value = Array.isArray(list) ? list.find((x) => String(x.id) === id.value) || null : null
    if (!project.value) error.value = "ไม่พบโปรเจคที่ต้องการ"
  } catch (err: any) {
    error.value = err?.message || "Failed to load project"
    project.value = null
  } finally {
    loading.value = false
  }
}

const nextImage = () => {
  const total = projectImages.value.length
  if (total <= 1) return
  currentIndex.value = (currentIndex.value + 1) % total
}

const prevImage = () => {
  const total = projectImages.value.length
  if (total <= 1) return
  currentIndex.value = (currentIndex.value - 1 + total) % total
}

const startSlider = () => {
  if (sliderTimer) clearInterval(sliderTimer)
  sliderTimer = setInterval(() => {
    nextImage()
  }, 3200)
}

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const goContact = async () => {
  const qs = new URLSearchParams()
  if (project.value?.name) qs.set("subject", `สนใจโปรเจค: ${project.value.name}`)
  if (id.value) qs.set("project_id", id.value)
  await navigateTo(`/contact?${qs.toString()}`)
}

onMounted(async () => {
  await loadProject()
  startSlider()
})

watch(id, async () => {
  await loadProject()
})

watch(projectImages, () => {
  if (currentIndex.value >= projectImages.value.length) currentIndex.value = 0
})

onBeforeUnmount(() => {
  if (sliderTimer) clearInterval(sliderTimer)
})
</script>

<style scoped>
.project-description {
  white-space: pre-line;
  font-size: 1.06rem;
  line-height: 2;
  color: #1e293b;
}
</style>


