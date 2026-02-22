<template>
  <div class="product-page relative min-h-screen py-8 sm:py-10">
    <div class="page-blob page-blob-a" aria-hidden="true"></div>
    <div class="page-blob page-blob-b" aria-hidden="true"></div>

    <section class="relative mx-auto max-w-7xl space-y-6 px-4 sm:px-6">
      <div class="hero-card relative overflow-hidden rounded-3xl border border-white/20 p-6 shadow-[0_30px_70px_-38px_rgba(2,6,23,0.75)] sm:p-8 lg:p-10">
        <div class="pointer-events-none absolute inset-0 hero-bg" aria-hidden="true"></div>
        <div class="pointer-events-none absolute inset-0 hero-overlay" aria-hidden="true"></div>
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.14),transparent_40%),radial-gradient(circle_at_82%_10%,rgba(255,107,44,0.22),transparent_45%)]"
          aria-hidden="true"
        ></div>

        <div class="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div class="max-w-3xl">
            <p class="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              Sport Equipment Catalog
            </p>
            <h1 class="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">ผลิตภัณฑ์กีฬา PROBUILD</h1>
            <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-100 sm:text-base">
              เลือกดูสินค้าอุปกรณ์กีฬาและวัสดุพื้นสนาม แยกตามแบรนด์ พร้อมข้อมูลเบื้องต้นสำหรับการสั่งซื้อและขอใบเสนอราคา
            </p>

            <div class="mt-5 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div class="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">ทั้งหมด</div>
                <div class="mt-1 text-xl font-extrabold text-white">{{ products.length }}</div>
              </div>
              <div class="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">แสดงผล</div>
                <div class="mt-1 text-xl font-extrabold text-white">{{ totalFiltered }}</div>
              </div>
              <div class="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">แบรนด์</div>
                <div class="mt-1 text-xl font-extrabold text-white">{{ brands.length }}</div>
              </div>
            </div>
          </div>

          <div class="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
            <button
              type="button"
              class="inline-flex h-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20 backdrop-blur-sm"
              @click="loadProducts"
            >
              รีเฟรชข้อมูล
            </button>
            <div class="text-xs text-slate-200/90 sm:text-right">
              พบสินค้า <span class="font-extrabold text-white">{{ totalFiltered }}</span> จากทั้งหมด
              <span class="font-extrabold text-white">{{ products.length }}</span> รายการ
            </div>
          </div>
        </div>
      </div>

      <div class="filter-shell rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-5">
        <div class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div class="text-sm font-bold text-slate-900">ค้นหาและกรองสินค้า</div>
            <div class="text-xs text-slate-500">ค้นหาจากชื่อสินค้า, SKU, หมวดหมู่ หรือเลือกเฉพาะแบรนด์</div>
          </div>
          <button
            type="button"
            class="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="search = ''; selectedBrand = 'all'"
          >
            ล้างตัวกรอง
          </button>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div class="sm:col-span-2 lg:col-span-2">
            <label class="mb-1 block text-xs font-semibold text-slate-600">ค้นหาสินค้า</label>
            <input
              v-model.trim="search"
              type="text"
              placeholder="ค้นหาชื่อสินค้า, SKU, หมวดหมู่"
              class="field-control h-11 w-full rounded-xl px-4 text-sm outline-none"
            />
          </div>

          <div>
            <label class="mb-1 block text-xs font-semibold text-slate-600">แบรนด์</label>
            <select
              v-model="selectedBrand"
              class="field-control h-11 w-full rounded-xl px-4 text-sm outline-none"
            >
              <option value="all">ทุกแบรนด์</option>
              <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white/80 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
          <div class="flex items-center gap-3">
            <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></span>
            <span class="font-medium">กำลังโหลดข้อมูลสินค้า...</span>
          </div>
        </div>

        <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800 shadow-sm">
          <div class="font-bold">โหลดข้อมูลไม่สำเร็จ</div>
          <div class="mt-1 text-sm text-red-700">{{ error }}</div>
          <button
            type="button"
            class="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            @click="loadProducts"
          >
            ลองอีกครั้ง
          </button>
        </div>

        <div
          v-else-if="!products.length"
          class="empty-spot rounded-2xl border border-dashed border-slate-300/80 bg-white/70 p-10 text-center shadow-sm backdrop-blur-sm"
        >
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20 13V7a2 2 0 00-2-2h-3m-4 0H6a2 2 0 00-2 2v6m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0H4m5-4h6" />
            </svg>
          </div>
          <div class="mt-4 text-lg font-bold text-slate-900">ยังไม่มีสินค้าในระบบ</div>
          <div class="mt-2 text-sm text-slate-500">เพิ่มสินค้าจากหน้าแอดมิน แล้วข้อมูลจะแสดงที่หน้านี้อัตโนมัติ</div>
        </div>

        <div
          v-else-if="!filteredGroupedByBrand.length"
          class="empty-spot rounded-2xl border border-dashed border-slate-300/80 bg-white/70 p-10 text-center shadow-sm backdrop-blur-sm"
        >
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 16l-2.5 2.5M11 17a6 6 0 100-12 6 6 0 000 12zM18 18l2 2" />
            </svg>
          </div>
          <div class="mt-4 text-lg font-bold text-slate-900">ไม่พบสินค้าที่ตรงกับเงื่อนไขค้นหา</div>
          <div class="mt-2 text-sm text-slate-500">ลองเปลี่ยนคำค้นหา หรือเลือกแบรนด์เป็น "ทุกแบรนด์"</div>
        </div>

        <div v-else class="space-y-9">
          <section v-for="g in filteredGroupedByBrand" :key="g.brand" class="space-y-4">
            <div class="flex items-end justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h2 class="text-xl font-extrabold tracking-tight text-slate-900">{{ g.brand }}</h2>
                <p class="text-sm text-slate-500">{{ g.items.length }} รายการ</p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <NuxtLink
                v-for="p in g.items"
                :key="p.id"
                :to="`/product/${p.id}`"
                class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_-20px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-1 hover:border-[#ff6b2c]/60 hover:shadow-[0_20px_40px_-22px_rgba(15,23,42,0.4)] focus:outline-none focus:ring-2 focus:ring-[#ff6b2c]/25"
              >
                <div class="relative aspect-[4/3] overflow-hidden border-b border-slate-200 bg-slate-100">
                  <img
                    :src="p.image_url || fallbackImg"
                    :alt="p.name || 'product'"
                    class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                    loading="lazy"
                    @error="onImgError"
                  />
                  <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                  <span class="absolute left-3 top-3 rounded-full bg-[#ff6b2c] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                    {{ p.brand || 'PROBUILD' }}
                  </span>
                </div>

                <div class="space-y-3 p-4">
                  <h3 class="line-clamp-2 min-h-[52px] text-lg font-extrabold leading-snug text-slate-900">
                    {{ p.name || '-' }}
                  </h3>

                  <p class="line-clamp-3 text-sm leading-6 text-slate-600">
                    {{ productSummary(p) }}
                  </p>

                  <div class="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                    <span>SKU: {{ p.sku || '-' }}</span>
                    <span>{{ p.category || 'อุปกรณ์กีฬา' }}</span>
                  </div>

                  <div class="pt-1">
                    <span class="inline-flex h-10 items-center rounded-lg bg-slate-900 px-4 text-sm font-bold text-white transition group-hover:bg-[#ff6b2c]">
                      ดูรายละเอียดสินค้า
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

useHead({ title: 'สินค้า | probuild sports' })

type ProductRow = {
  id: string
  sku: string | null
  name: string | null
  category: string | null
  image_url: string | null
  unit: string | null
  brand: string | null
}

const PRODUCTS_KEY = 'products'
const { getValue } = useSharedStore()
const fallbackImg = '/f248d603c9559d3dff1bb684011d9ae2.jpg'

const products = ref<ProductRow[]>([])
const loading = ref(true)
const error = ref('')

const search = ref('')
const selectedBrand = ref('all')

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const normBrand = (b: string | null | undefined) => {
  const v = (b || '').trim()
  return v ? v : 'Unbranded'
}

const groupProducts = (rows: ProductRow[]) => {
  const map = new Map<string, ProductRow[]>()

  for (const p of rows) {
    const key = normBrand(p.brand)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(p)
  }

  const brandKeys = Array.from(map.keys()).sort((a, b) => {
    if (a === 'Unbranded') return 1
    if (b === 'Unbranded') return -1
    return a.localeCompare(b, 'en')
  })

  return brandKeys.map((brand) => {
    const items = (map.get(brand) || []).slice().sort((x, y) =>
      (x.name || '').localeCompare(y.name || '', 'th')
    )
    return { brand, items }
  })
}

const groupedByBrand = computed(() => groupProducts(products.value))
const brands = computed(() => groupedByBrand.value.map((g) => g.brand))

const filteredProducts = computed(() => {
  const q = search.value.toLowerCase()

  return products.value.filter((p) => {
    const brand = normBrand(p.brand)
    const byBrand = selectedBrand.value === 'all' || selectedBrand.value === brand

    const haystack = [
      p.name || '',
      p.sku || '',
      p.category || '',
      p.brand || '',
      p.unit || ''
    ].join(' ').toLowerCase()

    const bySearch = !q || haystack.includes(q)
    return byBrand && bySearch
  })
})

const filteredGroupedByBrand = computed(() => groupProducts(filteredProducts.value))
const totalFiltered = computed(() => filteredProducts.value.length)

const productSummary = (p: ProductRow) => {
  const category = p.category || 'อุปกรณ์กีฬา'
  const brand = p.brand || 'PROBUILD'
  const unit = p.unit ? ` หน่วยนับ ${p.unit}` : ''
  return `สินค้า${category}จากแบรนด์ ${brand} เหมาะสำหรับงานสนามกีฬาและการฝึกซ้อม${unit}`
}

const loadProducts = async () => {
  loading.value = true
  error.value = ''
  try {
    const arr = await getValue<ProductRow>(PRODUCTS_KEY)
    products.value = Array.isArray(arr) ? (arr as ProductRow[]) : []
  } catch (err: any) {
    error.value = err?.message || 'Failed to load products'
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.product-page {
  background:
    radial-gradient(circle at 12% -8%, rgba(59, 130, 246, 0.18), transparent 46%),
    radial-gradient(circle at 90% 2%, rgba(239, 68, 68, 0.12), transparent 34%),
    linear-gradient(180deg, #eef4ff 0%, #f8fbff 30%, #f9fafb 100%);
}

.page-blob {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  width: 18rem;
  height: 18rem;
  border-radius: 9999px;
  filter: blur(28px);
  opacity: 0.8;
}

.page-blob-a {
  top: 3rem;
  left: -3rem;
  background: rgba(37, 99, 235, 0.12);
}

.page-blob-b {
  top: 16rem;
  right: -4rem;
  background: rgba(239, 68, 68, 0.1);
}

.hero-bg {
  background-image: url('/16f347af2bafc6631b753cff99d30010.jpg');
  background-size: cover;
  background-position: center;
  filter: saturate(1.05) contrast(1.02);
}

.hero-overlay {
  background: linear-gradient(120deg, rgba(2, 6, 23, 0.88), rgba(10, 26, 68, 0.64), rgba(167, 28, 52, 0.36));
}

.filter-shell {
  backdrop-filter: blur(10px);
}

.field-control {
  border: 1px solid rgb(203 213 225);
  background: rgba(255, 255, 255, 0.92);
  color: rgb(15 23 42);
  transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
}

.field-control::placeholder {
  color: rgb(148 163 184);
}

.field-control:focus {
  border-color: rgb(255 107 44);
  box-shadow: 0 0 0 4px rgba(255, 107, 44, 0.15);
  background: rgb(255 255 255);
}

.empty-spot {
  background-image:
    radial-gradient(circle at 12% 10%, rgba(59, 130, 246, 0.06), transparent 35%),
    radial-gradient(circle at 88% 0%, rgba(239, 68, 68, 0.05), transparent 28%);
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

@media (max-width: 640px) {
  .page-blob {
    width: 12rem;
    height: 12rem;
    filter: blur(20px);
  }
}
</style>
