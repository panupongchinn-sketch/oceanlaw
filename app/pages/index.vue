<template>
  <div class="home-two-tone -mx-4 -my-8 sm:-mx-6 lg:-mx-10">
    <section class="home-top relative overflow-hidden px-4 pb-2 pt-8 sm:px-6 sm:pt-10 lg:px-10">
      <div class="space-y-6">
        <section class="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/20 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] sm:min-h-[340px] sm:p-10">
          <img src="/home-hero-accounting.png" alt="Oceanlaw accounting team" class="absolute inset-0 h-full w-full object-cover" />
        </section>

        <section class="rounded-3xl border border-[#d7e4dc] bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.10)] backdrop-blur sm:p-7">
          <h2 class="text-xl font-black tracking-tight text-[#133629] sm:text-3xl">บริษัท โอเชี่ยน แอนด์ ลอว์ กรุ๊ป จำกัด</h2>
          <p class="mt-2 text-base font-bold text-[#1f6b49] sm:text-xl">บริการสำนักงานบัญชีครบวงจรสำหรับธุรกิจ</p>
          <p class="mt-3 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
            รับทำบัญชี ยื่นภาษี ประกันสังคม จดทะเบียนบริษัท และที่ปรึกษาด้านระบบบัญชีและการวางแผนภาษี เพื่อให้ผู้ประกอบการตัดสินใจทางการเงินได้อย่างมั่นใจ
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-3">
            <a
              :href="facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-11 items-center gap-2 rounded-full bg-[#1877f2] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1666d9]"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M13.5 8H16V5h-2.5C10.7 5 9 6.7 9 9.5V12H7v3h2v6h3v-6h2.4l.6-3H12V9.7c0-1 .3-1.7 1.5-1.7z" />
              </svg>
              Facebook
            </a>
            <button
              type="button"
              @click="openLineModal"
              class="inline-flex h-11 items-center gap-2 rounded-full bg-[#06c755] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#04a746]"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M19.2 3.2H4.8A2.8 2.8 0 0 0 2 6v8a2.8 2.8 0 0 0 2.8 2.8h2.4V21l4.2-4.2h7.8A2.8 2.8 0 0 0 22 14V6a2.8 2.8 0 0 0-2.8-2.8zM8 9.2h1.2v3.6H11V14H8V9.2zm4 0h1.2V14H12V9.2zm2.8 0h1.2v3.6h1.8V14h-3V9.2z" />
              </svg>
              Line Official
            </button>
          </div>
        </section>

        <section id="articles" class="px-1 pb-2 pt-2 sm:px-2">
          <div class="mb-7">
            <div>
              <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">บริการ</h2>
            </div>
          </div>

          <div v-if="!servicesLoaded" class="mt-8 text-center text-slate-500">กำลังโหลด...</div>

          <div v-else-if="!featuredServices.length" class="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            ยังไม่มีข้อมูลบริการ
          </div>

          <div v-else class="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            <article
              v-for="service in featuredServices"
              :key="`featured-service-${service.id}`"
              class="relative flex h-full min-h-[260px] flex-col rounded-[2rem] border border-[#d8e3dd] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_16px_38px_rgba(5,46,22,0.18)] sm:min-h-[320px] sm:p-6"
            >
              <NuxtLink :to="serviceDetailPath(service.id)" class="absolute inset-0 z-10 rounded-[2rem]" :aria-label="`ดูรายละเอียด ${service.name}`">
                <span class="sr-only">ดูรายละเอียด</span>
              </NuxtLink>

              <div v-if="serviceImage(service)" class="overflow-hidden rounded-[1.4rem] border border-[#d8e3dd] bg-[#edf3ef]">
                <img
                  :src="serviceImage(service)"
                  :alt="service.name || 'service image'"
                  class="h-32 w-full object-cover sm:h-40"
                />
              </div>
              <div v-else class="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[#edf3ef] text-[#1b7a52] sm:h-20 sm:w-20">
                <svg v-if="serviceIcon(service) === 'calculator'" viewBox="0 0 24 24" class="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <rect x="6" y="3" width="12" height="18" rx="2"></rect>
                  <path d="M9 7h6"></path>
                  <path d="M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01"></path>
                </svg>
                <svg v-else-if="serviceIcon(service) === 'document'" viewBox="0 0 24 24" class="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 3v5h5"></path>
                  <path d="M9 12h6M9 16h6"></path>
                </svg>
                <svg v-else-if="serviceIcon(service) === 'receipt'" viewBox="0 0 24 24" class="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M8 3h8l1 2 2 1v15l-2-1-2 1-2-1-2 1-2-1-2 1V6l2-1 1-2z"></path>
                  <path d="M9 9h6M9 13h6"></path>
                  <path d="M10 17h4"></path>
                </svg>
                <svg v-else-if="serviceIcon(service) === 'chart'" viewBox="0 0 24 24" class="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M21 21H3"></path>
                  <path d="M7 16V8"></path>
                  <path d="M12 16V4"></path>
                  <path d="M17 16v-5"></path>
                </svg>
                <svg v-else-if="serviceIcon(service) === 'shield'" viewBox="0 0 24 24" class="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z"></path>
                  <path d="M9.5 12.5l1.7 1.7 3.3-3.7"></path>
                </svg>
                <svg v-else viewBox="0 0 24 24" class="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <rect x="5" y="4" width="14" height="16" rx="2"></rect>
                  <path d="M9 8h6M9 12h6M9 16h6"></path>
                </svg>
              </div>

              <h3 class="mt-5 line-clamp-3 text-[1.05rem] font-black leading-tight text-[#163027] sm:text-2xl">{{ service.name }}</h3>
              <p class="mt-3 line-clamp-5 text-sm leading-relaxed text-[#5f7f71] sm:line-clamp-3 sm:text-base sm:text-slate-700">{{ service.description }}</p>

              <ul v-if="serviceHighlights(service).length" class="mt-4 hidden space-y-2 text-sm text-slate-800 sm:block">
                <li
                  v-for="(item, idx) in serviceHighlights(service)"
                  :key="`${service.id}-highlight-${idx}`"
                  class="flex items-start gap-2"
                >
                  <span class="mt-0.5 text-base leading-none text-green-600">✓</span>
                  <span class="line-clamp-1">{{ item }}</span>
                </li>
              </ul>

              <div class="relative z-20 mt-4 grid grid-cols-1 gap-2 pt-4 sm:mt-auto sm:grid-cols-2 sm:gap-3 sm:pt-6">
                <NuxtLink
                  :to="serviceDetailPath(service.id)"
                  @click.stop
                  class="inline-flex h-10 w-full items-center justify-center rounded-2xl bg-[#166534] px-3 text-center text-xs font-bold text-white transition hover:bg-[#14532d] sm:h-12 sm:px-5 sm:text-base"
                >
                  รายละเอียดเพิ่มเติม →
                </NuxtLink>

                <NuxtLink
                  :to="`/contact?topic=${encodeURIComponent(service.name)}`"
                  @click.stop
                  class="inline-flex h-10 w-full items-center justify-center rounded-2xl border-2 border-[#166534] bg-transparent px-3 text-center text-xs font-bold text-[#166534] transition hover:bg-[#f0fdf4] sm:h-12 sm:px-5 sm:text-base"
                >
                  ขอใบเสนอราคา ↑
                </NuxtLink>
              </div>
            </article>
          </div>
        </section>

      </div>

      <div class="home-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" class="h-full w-full">
          <path
            fill="#eef2f7"
            d="M0,70C190,42,380,30,570,34C770,39,955,62,1135,66C1265,69,1368,62,1440,54L1440,140L0,140Z"
          />
        </svg>
      </div>
    </section>

    <section class="home-bottom px-4 pb-8 sm:px-6 lg:px-10">
      <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div class="flex items-end justify-between gap-3">
          <div>
            <h2 class="text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">บทความ</h2>
          </div>
          <NuxtLink to="/articles" class="text-sm font-bold text-[#b11226] hover:underline">ดูทั้งหมด</NuxtLink>
        </div>

        <div v-if="!articlesLoaded" class="mt-8 text-center text-slate-500">กำลังโหลด...</div>

        <div v-else-if="!featuredArticles.length" class="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          ยังไม่มีบทความ
        </div>

        <div v-else class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <NuxtLink
            v-for="article in featuredArticles"
            :key="`home-article-${article.id}`"
            :to="`/articles/${article.id}`"
            class="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div class="aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                v-if="article.imageDataUrl"
                :src="article.imageDataUrl"
                :alt="article.title || 'article'"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                @error="onImgError"
              />
              <div v-else class="flex h-full items-center justify-center text-sm text-slate-400">ไม่มีรูป</div>
            </div>
            <div class="p-4">
              <h3 class="line-clamp-2 text-lg font-bold text-slate-900">{{ article.title || "-" }}</h3>
              <p class="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{{ article.content || "" }}</p>
              <p class="mt-3 text-sm font-semibold text-[#b11226]">อ่านต่อ</p>
            </div>
          </NuxtLink>
        </div>
      </section>
    </section>

    <transition name="line-modal">
      <div
        v-if="lineModalOpen"
        class="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/45 p-4"
        @click.self="closeLineModal"
      >
        <div class="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_48px_rgba(15,23,42,0.28)] sm:p-6">
          <h3 class="text-lg font-extrabold text-slate-900">Line Official</h3>
          <p class="mt-1 text-sm text-slate-500">สแกน QR หรือเพิ่มด้วย ID</p>

          <div class="mt-4 flex justify-center">
            <img :src="lineQrImage" alt="LINE QR" class="h-52 w-52 rounded-xl border border-slate-200 bg-white p-1" />
          </div>

          <p class="mt-4 text-center text-sm text-slate-700">
            LINE ID:
            <span class="font-extrabold text-[#166534]">{{ lineContactId }}</span>
          </p>

          <div class="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              class="inline-flex h-10 items-center rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              @click="copyLineId"
            >
              {{ lineCopied ? "คัดลอกแล้ว" : "คัดลอก ID" }}
            </button>
            <button
              type="button"
              class="inline-flex h-10 items-center rounded-lg bg-[#166534] px-4 text-sm font-semibold text-white transition hover:bg-[#14532d]"
              @click="closeLineModal"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </transition>
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

type ServiceRow = {
  id: string
  name: string
  description?: string
  image_url?: string | null
  image_urls?: string[] | null
}

const ARTICLES_KEY = "articles"
const SERVICES_KEY = "products"
const fallbackImg = "https://picsum.photos/seed/accounting/1200/900"
const facebookUrl = "https://www.facebook.com/OceanAndLawGroup"
const lineContactId = "0889636222"
const lineQrImage = "/349.jpg"
const { getValue } = useSharedStore()

const articles = ref<ArticleRow[]>([])
const articlesLoaded = ref(false)
const services = ref<ServiceRow[]>([])
const servicesLoaded = ref(false)
const lineModalOpen = ref(false)
const lineCopied = ref(false)

const featuredServices = computed(() => [...services.value].slice(0, 6))
const featuredArticles = computed(() => [...articles.value].slice(0, 3))

const serviceIcon = (service: ServiceRow) => {
  const text = `${service.name} ${service.description || ""}`.toLowerCase()
  if (text.includes("บัญชี")) return "calculator"
  if (text.includes("ครึ่งปี") || text.includes("ภ.ง.ด.51") || text.includes("ภาษี")) return "document"
  if (text.includes("งบ") || text.includes("การเงิน")) return "chart"
  if (text.includes("ตรวจสอบ") || text.includes("cpa")) return "shield"
  if (text.includes("จดทะเบียน") || text.includes("หจก") || text.includes("บริษัท")) return "receipt"
  return "document"
}

const serviceImage = (service: ServiceRow) => {
  if (Array.isArray(service?.image_urls) && service.image_urls.length) {
    const first = String(service.image_urls.find(Boolean) || "").trim()
    if (first) return first
  }
  return String(service?.image_url || "").trim()
}

const serviceHighlights = (s: ServiceRow) => {
  const text = String(s.description || "")
  return text
    .split(/\r?\n|[•·]|\|/g)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3)
}

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const openLineModal = () => {
  lineCopied.value = false
  lineModalOpen.value = true
}

const closeLineModal = () => {
  lineModalOpen.value = false
}

const copyLineId = async () => {
  try {
    await navigator.clipboard.writeText(lineContactId)
    lineCopied.value = true
  } catch (e) {
    console.error("copyLineId error:", e)
  }
}

const serviceDetailPath = (serviceId: string) => {
  const id = String(serviceId || "").trim()
  if (!id) return "/service"
  return `/service-detail/${encodeURIComponent(id)}`
}

const loadArticlesLocal = async () => {
  try {
    const arr = await getValue<ArticleRow>(ARTICLES_KEY)
    articles.value = Array.isArray(arr)
      ? arr
          .map((item: any) => ({
            ...item,
            id: String(item?.id || ""),
            title: item?.title == null ? null : String(item.title),
            content: item?.content == null ? null : String(item.content),
            imageDataUrl: item?.imageDataUrl ? String(item.imageDataUrl) : "",
          }))
          .sort((a, b) => {
            const ta = new Date(a.updatedAt || a.createdAt || 0).getTime()
            const tb = new Date(b.updatedAt || b.createdAt || 0).getTime()
            return tb - ta
          })
      : []
  } catch (e) {
    console.error("loadArticlesLocal error:", e)
    articles.value = []
  } finally {
    articlesLoaded.value = true
  }
}

const loadServicesLocal = async () => {
  try {
    const arr = await getValue<ServiceRow>(SERVICES_KEY)
    services.value = Array.isArray(arr)
      ? arr.map((item: any) => ({
          ...item,
          id: String(item?.id || ""),
          name: String(item?.name || ""),
          description: String(item?.description || ""),
        }))
      : []
  } catch (e) {
    console.error("loadServicesLocal error:", e)
    services.value = []
  } finally {
    servicesLoaded.value = true
  }
}

onMounted(() => {
  loadArticlesLocal()
  loadServicesLocal()
})
</script>

<style scoped>
.home-two-tone {
  background: #eef2f7;
}

.home-top {
  position: relative;
  background:
    radial-gradient(circle at 12% 14%, rgba(184, 198, 214, 0.22) 0, rgba(184, 198, 214, 0) 30%),
    radial-gradient(circle at 86% 24%, rgba(172, 188, 206, 0.18) 0, rgba(172, 188, 206, 0) 36%),
    linear-gradient(180deg, #f9fbfd 0%, #eef3f8 100%);
}

.home-top > .space-y-6 {
  position: relative;
  z-index: 2;
}

.home-wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 88px;
  pointer-events: none;
  z-index: 1;
}

.home-bottom {
  background:
    radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.2) 1px, transparent 0),
    linear-gradient(180deg, #f3f6fa 0%, #eef2f7 100%);
  background-size: 18px 18px, auto;
  padding-top: 6px;
}

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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-modal-enter-active,
.line-modal-leave-active {
  transition: opacity 0.2s ease;
}

.line-modal-enter-from,
.line-modal-leave-to {
  opacity: 0;
}
</style>
