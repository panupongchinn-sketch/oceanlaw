<template>
  <div class="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
    <div class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div class="pointer-events-none absolute inset-0 hero-bg" aria-hidden="true"></div>
      <div class="pointer-events-none absolute inset-0 hero-overlay" aria-hidden="true"></div>

      <div class="relative z-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="inline-flex items-center rounded-full border border-[#0B4AA2]/20 bg-[#0B4AA2]/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#0B4AA2]">
            Admin Dashboard
          </p>
          <h1 class="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">จัดการบทความ</h1>
          <p class="mt-1 text-sm text-slate-600">เพิ่ม แก้ไข และลบบทความที่จะแสดงในหน้า <span class="font-bold">/articles</span></p>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
          บทความทั้งหมด <span class="font-extrabold text-slate-900">{{ articles.length }}</span> รายการ
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-12">
      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-5">
        <div class="border-b border-slate-200 p-5">
          <h2 class="text-base font-extrabold text-slate-900">เพิ่มบทความใหม่</h2>
        </div>

        <form class="space-y-4 p-5" @submit.prevent="saveArticle">
          <div v-if="editingId" class="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            กำลังแก้ไขบทความ
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">หัวข้อบทความ *</label>
            <input
              v-model.trim="form.title"
              type="text"
              required
              class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#0B4AA2]/25"
              placeholder="เช่น วิธีเตรียมเอกสารก่อนยื่นภาษี"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">เนื้อหาบทความ *</label>
            <textarea
              v-model.trim="form.content"
              rows="8"
              required
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#0B4AA2]/25"
              placeholder="เขียนเนื้อหาบทความที่ต้องการแสดง..."
            ></textarea>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">รูปภาพบทความ</label>
            <input
              type="file"
              accept="image/*"
              class="block w-full text-sm text-slate-600 file:mr-3 file:rounded-xl file:border file:border-slate-300 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-50"
              @change="onPickImage"
            />

            <div class="mt-3 flex items-start gap-3">
              <div class="flex h-20 w-24 items-center justify-center overflow-hidden rounded-lg border border-slate-300 bg-white">
                <img v-if="form.imageDataUrl" :src="form.imageDataUrl" alt="preview" class="h-full w-full object-cover" />
                <span v-else class="text-xs text-slate-500">ไม่มีรูป</span>
              </div>
              <button
                v-if="form.imageDataUrl"
                type="button"
                class="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                @click="form.imageDataUrl = ''"
              >
                ลบรูป
              </button>
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
              class="h-11 flex-1 rounded-xl bg-[#0B4AA2] px-5 text-sm font-semibold text-white hover:bg-[#083A7E]"
            >
              {{ editingId ? "บันทึกการแก้ไข" : "เพิ่มบทความ" }}
            </button>
            <button
              type="button"
              class="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              @click="resetForm"
            >
              {{ editingId ? "ยกเลิกแก้ไข" : "ล้างฟอร์ม" }}
            </button>
          </div>
        </form>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-7">
        <div class="flex items-center justify-between gap-3 border-b border-slate-200 p-5">
          <div>
            <h2 class="text-base font-extrabold text-slate-900">รายการบทความ</h2>
            <p class="mt-1 text-sm text-slate-500">ทั้งหมด {{ articles.length }} รายการ</p>
          </div>
          <button
            type="button"
            class="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            @click="loadArticles"
          >
            Refresh
          </button>
        </div>

        <div class="p-5">
          <div v-if="loading" class="text-sm text-slate-500">กำลังโหลด...</div>

          <div v-else-if="!articles.length" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            ยังไม่มีบทความ
          </div>

          <div v-else class="space-y-3">
            <div v-for="a in articles" :key="a.id" class="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="truncate font-semibold text-slate-900">{{ a.title || "-" }}</div>
                  <div v-if="a.content" class="mt-1 line-clamp-3 text-xs text-slate-600">{{ a.content }}</div>
                  <div class="mt-1 text-xs text-slate-500">
                    อัปเดต: {{ formatDate(a.updatedAt || a.createdAt) }}
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="h-9 rounded-lg border border-blue-200 bg-blue-50 px-3 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                    @click="startEdit(a)"
                  >
                    แก้ไข
                  </button>
                  <button
                    type="button"
                    class="h-9 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-700 hover:bg-red-100"
                    @click="deleteArticle(a.id)"
                  >
                    ลบ
                  </button>
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
useHead({ title: "Admin | Articles" })

type ArticleRow = {
  id: string
  title: string | null
  content: string | null
  imageDataUrl?: string | null
  createdAt?: string
  updatedAt?: string
}

const STORE_KEY = "articles"
const { getValue, setValue } = useSharedStore()

const articles = ref<ArticleRow[]>([])
const loading = ref(false)
const errorMsg = ref("")
const successMsg = ref("")
const editingId = ref<string | null>(null)

const form = reactive({
  title: "",
  content: "",
  imageDataUrl: "",
})

const uid = () => {
  if (typeof globalThis !== "undefined" && (globalThis as any).crypto?.randomUUID) {
    return (globalThis as any).crypto.randomUUID() as string
  }
  return `article_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

const formatDate = (d?: string) => {
  if (!d) return "-"
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return "-"
  return dt.toLocaleString("th-TH")
}

const resetForm = () => {
  editingId.value = null
  form.title = ""
  form.content = ""
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
  const maxMB = 2
  if (file.size > maxMB * 1024 * 1024) {
    window.alert(`ไฟล์ใหญ่เกิน ${maxMB}MB กรุณาย่อรูปก่อน`)
    return
  }
  form.imageDataUrl = await fileToDataUrl(file)
  if (input) input.value = ""
}

const loadArticles = async () => {
  loading.value = true
  errorMsg.value = ""
  try {
    const rows = await getValue<ArticleRow>(STORE_KEY)
    articles.value = Array.isArray(rows)
      ? rows.sort((a, b) => {
          const ta = new Date(a.updatedAt || a.createdAt || 0).getTime()
          const tb = new Date(b.updatedAt || b.createdAt || 0).getTime()
          return tb - ta
        })
      : []
  } catch (e: any) {
    errorMsg.value = e?.message || "โหลดบทความล้มเหลว"
    articles.value = []
  } finally {
    loading.value = false
  }
}

const startEdit = (a: ArticleRow) => {
  editingId.value = a.id
  form.title = a.title || ""
  form.content = a.content || ""
  form.imageDataUrl = a.imageDataUrl || ""
  errorMsg.value = ""
  successMsg.value = ""
}

const saveArticle = async () => {
  errorMsg.value = ""
  successMsg.value = ""

  const title = form.title.trim()
  const content = form.content.trim()
  if (!title) {
    errorMsg.value = "กรุณากรอกหัวข้อบทความ"
    return
  }
  if (!content) {
    errorMsg.value = "กรุณากรอกเนื้อหาบทความ"
    return
  }

  try {
    const current = await getValue<ArticleRow>(STORE_KEY)
    const now = new Date().toISOString()
    const payload = {
      title,
      content,
      imageDataUrl: form.imageDataUrl || null,
      updatedAt: now,
    }

    if (editingId.value) {
      const target = editingId.value
      const next = current.map((x) => (x.id === target ? ({ ...x, ...payload } as ArticleRow) : x))
      await setValue<ArticleRow>(STORE_KEY, next)
      successMsg.value = "บันทึกการแก้ไขบทความแล้ว"
    } else {
      const next = [{ id: uid(), ...payload, createdAt: now } as ArticleRow, ...current]
      await setValue<ArticleRow>(STORE_KEY, next)
      successMsg.value = "เพิ่มบทความสำเร็จ"
    }

    resetForm()
    await loadArticles()
  } catch (e: any) {
    errorMsg.value = e?.message || "บันทึกบทความไม่สำเร็จ"
  }
}

const deleteArticle = async (id: string) => {
  errorMsg.value = ""
  successMsg.value = ""
  if (!window.confirm("ลบบทความนี้ใช่ไหม?")) return

  try {
    const current = await getValue<ArticleRow>(STORE_KEY)
    const next = current.filter((x) => x.id !== id)
    await setValue<ArticleRow>(STORE_KEY, next)
    successMsg.value = "ลบบทความแล้ว"
    await loadArticles()
  } catch (e: any) {
    errorMsg.value = e?.message || "ลบบทความไม่สำเร็จ"
  }
}

onMounted(loadArticles)
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hero-bg {
  background-image: url("/16f347af2bafc6631b753cff99d30010.jpg");
  background-size: cover;
  background-position: center;
  filter: saturate(1.05) contrast(1.02);
}

.hero-overlay {
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.84), rgba(241, 245, 249, 0.9), rgba(255, 243, 240, 0.7));
}
</style>
