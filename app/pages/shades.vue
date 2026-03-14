<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-extrabold text-[#ff4a16] sm:text-4xl">เฉดสี</h1>
    </div>

    <section class="relative overflow-hidden rounded-3xl border border-white/60 bg-white/55 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),rgba(255,255,255,0.55)_45%,rgba(241,245,249,0.65))]"></div>
      <div class="relative">
        <div v-if="loading" class="mt-8 text-sm text-slate-600">กำลังโหลดเฉดสี...</div>
        <div v-else-if="errorMsg" class="mt-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ errorMsg }}
        </div>

        <div v-else class="space-y-8">
          <section v-for="group in shadeGroups" :key="group.title" class="space-y-4">
            <div>
              <p class="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">Surface Color System</p>
              <h2 class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">{{ group.title }}</h2>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <article
                v-for="shade in group.items"
                :key="shade.id"
                class="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/60 p-4 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
              >
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/35 to-slate-100/30"></div>
                <div class="relative">
                  <div class="mx-auto flex h-24 w-full max-w-[180px] items-center justify-center overflow-hidden rounded-xl border border-white/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <img
                      v-if="shade.imageDataUrl"
                      :src="shade.imageDataUrl"
                      :alt="shade.name"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div v-else class="h-full w-full" :style="{ background: shade.hex || '#e5e7eb' }"></div>
                  </div>
                  <div class="mx-auto mt-3 h-1.5 w-14 rounded-full" :style="{ background: shade.hex || '#cbd5e1' }"></div>
                  <div class="mt-4 text-sm font-semibold tracking-wide text-slate-700">{{ shade.code }}</div>
                  <div class="mt-1 min-h-12 text-base font-bold leading-tight text-slate-900">
                    {{ shade.name }}
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

type ShadeRow = {
  id: string
  groupTitle?: string
  code: string
  name: string
  imageDataUrl?: string
  hex?: string
  createdAt?: string
  updatedAt?: string
}

type ShadeSettings = {
  title?: string
}

const STORE_KEY = "shades"
const SETTINGS_KEY = "shade_settings"
const { getValue } = useSharedStore()

const defaultShades: ShadeRow[] = [
  { id: "ral-9001", groupTitle: "Procrete SL", code: "RAL 9001", name: "Cream", hex: "#ddd9cb" },
  { id: "ral-6032", groupTitle: "Procrete SL", code: "RAL 6032", name: "Soft Green", hex: "#178f58" },
  { id: "ral-1018", groupTitle: "Procrete SL", code: "RAL 1018", name: "Golden Yellow", hex: "#e9d931" },
  { id: "ral-5015", groupTitle: "Procrete SL", code: "RAL 5015", name: "Sky Blue", hex: "#2f79b6" },
  { id: "ral-7036", groupTitle: "Procrete SL", code: "RAL 7036", name: "Soft Grey", hex: "#a19ea1" },
  { id: "ral-7037", groupTitle: "Procrete SL", code: "RAL 7037", name: "Strom Grey", hex: "#8f9090" },
]

const rows = ref<ShadeRow[]>([])
const shadeTitle = ref("Procrete SL")
const loading = ref(true)
const errorMsg = ref("")

const displayShades = computed(() => (rows.value.length ? rows.value : defaultShades))
const shadeGroups = computed(() => {
  const ordered: { title: string; items: ShadeRow[] }[] = []
  const indexByTitle = new Map<string, number>()

  for (const item of displayShades.value) {
    const title = (item.groupTitle || "").trim() || shadeTitle.value || "Shades"
    const idx = indexByTitle.get(title)
    if (idx === undefined) {
      indexByTitle.set(title, ordered.length)
      ordered.push({ title, items: [item] })
    } else {
      ordered[idx]!.items.push(item)
    }
  }

  return ordered
})

const loadShades = async () => {
  loading.value = true
  errorMsg.value = ""
  try {
    const arr = await getValue<ShadeRow>(STORE_KEY)
    rows.value = Array.isArray(arr)
      ? arr.filter((x) => x && typeof x === "object" && x.code && x.name)
      : []
  } catch (e: any) {
    rows.value = []
    errorMsg.value = e?.message || "โหลดเฉดสีไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}

const loadShadeSettings = async () => {
  try {
    const arr = await getValue<ShadeSettings>(SETTINGS_KEY)
    const first = Array.isArray(arr) ? arr[0] : null
    shadeTitle.value = first?.title?.trim() || "Procrete SL"
  } catch {
    shadeTitle.value = "Procrete SL"
  }
}

onMounted(async () => {
  await Promise.all([loadShades(), loadShadeSettings()])
})
</script>
