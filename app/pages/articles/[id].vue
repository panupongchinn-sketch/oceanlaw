<template>
  <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
    <div class="mb-4">
      <NuxtLink to="/articles" class="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        ← กลับหน้าบทความ
      </NuxtLink>
    </div>

    <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">กำลังโหลด...</div>

    <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
      <div class="font-bold">ไม่พบบทความ</div>
      <div class="mt-1 text-sm">{{ error }}</div>
    </div>

    <article v-else-if="article" class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div class="overflow-hidden bg-slate-50 p-2 sm:p-3">
        <img
          v-if="article.imageDataUrl"
          :src="article.imageDataUrl"
          :alt="article.title || 'article'"
          class="mx-auto h-auto max-h-[78vh] w-full object-contain"
          @error="onImgError"
        />
        <div v-else class="flex min-h-[240px] items-center justify-center text-sm text-slate-400">ไม่มีรูป</div>
      </div>

      <div class="p-6 sm:p-8">
        <h1 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{{ article.title }}</h1>
        <p class="mt-2 text-xs text-slate-500">อัปเดต {{ formatDate(article.updatedAt || article.createdAt) }}</p>
        <div class="mt-6 whitespace-pre-line text-base leading-8 text-slate-700">{{ article.content }}</div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

type ArticleRow = {
  id: string
  title: string | null
  content: string | null
  imageDataUrl?: string | null
  createdAt?: string
  updatedAt?: string
}

const STORE_KEY = "articles"
const fallbackImg = "https://picsum.photos/seed/article-detail/1400/900"
const route = useRoute()
const { getValue } = useSharedStore()

const id = computed(() => String(route.params.id || ""))
const article = ref<ArticleRow | null>(null)
const loading = ref(true)
const error = ref("")

useHead(() => ({
  title: `${article.value?.title || "บทความ"} | Oceanlaw`,
}))

const formatDate = (d?: string) => {
  if (!d) return "-"
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return "-"
  return dt.toLocaleString("th-TH")
}

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const loadArticle = async () => {
  loading.value = true
  error.value = ""
  try {
    const rows = await getValue<ArticleRow>(STORE_KEY)
    article.value = Array.isArray(rows) ? rows.find((x) => String(x.id) === id.value) || null : null
    if (!article.value) error.value = "ไม่พบบทความที่ต้องการ"
  } catch (e: any) {
    error.value = e?.message || "โหลดบทความไม่สำเร็จ"
    article.value = null
  } finally {
    loading.value = false
  }
}

onMounted(loadArticle)
</script>

