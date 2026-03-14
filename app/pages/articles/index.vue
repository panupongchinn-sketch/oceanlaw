<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <section class="article-hero relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div class="article-hero-glow article-hero-glow-a" aria-hidden="true"></div>
      <div class="article-hero-glow article-hero-glow-b" aria-hidden="true"></div>

      <div class="relative z-10 flex flex-wrap items-end justify-between gap-4">
        <div class="max-w-3xl">
          <p class="inline-flex items-center rounded-full border border-[#b11226]/20 bg-[#b11226]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#b11226]">
            Knowledge Hub
          </p>
          <h1 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">บทความ</h1>
          <p class="mt-2 text-sm text-slate-600 sm:text-base">สาระความรู้ด้านบัญชี ภาษี และการบริหารธุรกิจ</p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white/90 px-5 py-3 text-slate-700 shadow-sm backdrop-blur">
          <div class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">เผยแพร่ทั้งหมด</div>
          <div class="mt-1 text-2xl font-extrabold text-slate-900">{{ articles.length }}</div>
          <div class="text-xs text-slate-500">รายการ</div>
        </div>
      </div>
    </section>

    <section class="mt-6">
      <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">กำลังโหลด...</div>

      <div v-else-if="!articles.length" class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        ยังไม่มีบทความ
      </div>

      <div v-else class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="a in articles"
          :key="a.id"
          :to="`/articles/${a.id}`"
          class="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)]"
        >
          <div class="aspect-[16/10] overflow-hidden bg-slate-100">
            <img
              v-if="a.imageDataUrl"
              :src="a.imageDataUrl"
              :alt="a.title || 'article'"
              class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              @error="onImgError"
            />
            <div v-else class="flex h-full items-center justify-center text-sm text-slate-400">ไม่มีรูป</div>
          </div>

          <div class="p-4">
            <h2 class="line-clamp-2 text-lg font-extrabold text-slate-900">{{ a.title || "-" }}</h2>
            <p class="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{{ a.content || "" }}</p>
            <p class="mt-3 text-xs font-semibold text-[#0B4AA2]">อ่านต่อ →</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

useHead({ title: "บทความ | Oceanlaw" })

type ArticleRow = {
  id: string
  title: string | null
  content: string | null
  imageDataUrl?: string | null
  createdAt?: string
  updatedAt?: string
}

const STORE_KEY = "articles"
const fallbackImg = "https://picsum.photos/seed/article/1200/900"
const { getValue } = useSharedStore()

const articles = ref<ArticleRow[]>([])
const loading = ref(true)

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const loadArticles = async () => {
  loading.value = true
  try {
    const rows = await getValue<ArticleRow>(STORE_KEY)
    articles.value = Array.isArray(rows)
      ? rows.sort((a, b) => {
          const ta = new Date(a.updatedAt || a.createdAt || 0).getTime()
          const tb = new Date(b.updatedAt || b.createdAt || 0).getTime()
          return tb - ta
        })
      : []
  } catch (e) {
    console.error("loadArticles error:", e)
    articles.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadArticles)
</script>

<style scoped>
.article-hero {
  background:
    radial-gradient(circle at 12% 14%, rgba(177, 18, 38, 0.08), transparent 36%),
    radial-gradient(circle at 86% 20%, rgba(15, 23, 42, 0.06), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.article-hero-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(34px);
  pointer-events: none;
  opacity: 0.4;
}

.article-hero-glow-a {
  width: 180px;
  height: 180px;
  left: -70px;
  top: -58px;
  background: rgba(177, 18, 38, 0.26);
}

.article-hero-glow-b {
  width: 220px;
  height: 220px;
  right: -96px;
  bottom: -84px;
  background: rgba(30, 64, 175, 0.2);
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
