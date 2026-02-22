<template>
  <div class="mx-auto max-w-7xl px-4 py-8 space-y-6 sm:px-6">
    <div class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div class="pointer-events-none absolute inset-0 hero-bg" aria-hidden="true"></div>
      <div class="pointer-events-none absolute inset-0 hero-overlay" aria-hidden="true"></div>

      <div class="relative z-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="inline-flex items-center rounded-full border border-[#0B4AA2]/20 bg-[#0B4AA2]/5 px-3 py-1 text-xs font-semibold tracking-widest text-[#0B4AA2] uppercase">
            Admin Dashboard
          </p>
          <h1 class="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">จัดการสินค้า (Sports Catalog)</h1>
          <p class="mt-1 text-sm text-slate-600">เพิ่มและลบสินค้าที่จะแสดงในหน้า <span class="font-bold">/product</span></p>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
          สินค้าทั้งหมด <span class="font-extrabold text-slate-900">{{ products.length }}</span> รายการ
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-12">
      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-5">
        <div class="border-b border-slate-200 p-5">
          <h2 class="text-base font-extrabold text-slate-900">เพิ่มสินค้าใหม่</h2>
        </div>

        <form class="p-5 space-y-4" @submit.prevent="createProduct">
          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">ชื่อสินค้า *</label>
            <input
              v-model.trim="form.name"
              type="text"
              required
              class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#ff6b2c]/30"
              placeholder="เช่น พื้นสนามพียู สนามบาสเกตบอล"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">รายละเอียดสินค้า</label>
            <textarea
              v-model.trim="form.description"
              rows="4"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#ff6b2c]/30"
              placeholder="เช่น รายละเอียดสินค้า วิธีใช้งาน จุดเด่น และสเปก"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
               <label class="mb-1 block text-sm font-semibold text-slate-700">Brand</label>
              <input
                v-model.trim="form.brand"
                type="text"
                 class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#ff6b2c]/30"
                placeholder="เช่น ProSport"
              />
            </div>

            <div>
               <label class="mb-1 block text-sm font-semibold text-slate-700">SKU</label>
              <input
                v-model.trim="form.sku"
                type="text"
                 class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#ff6b2c]/30"
                placeholder="เช่น PS-FLOOR-001"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
               <label class="mb-1 block text-sm font-semibold text-slate-700">Category</label>
              <input
                v-model.trim="form.category"
                type="text"
                 class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#ff6b2c]/30"
                placeholder="เช่น พื้นสนามกีฬา"
              />
            </div>

            <div>
               <label class="mb-1 block text-sm font-semibold text-slate-700">Unit</label>
              <input
                v-model.trim="form.unit"
                type="text"
                 class="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#ff6b2c]/30"
                placeholder="เช่น ตร.ม."
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">รูปสินค้า (อัปโหลดจากเครื่อง)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              class="block w-full text-sm text-slate-600
                     file:mr-3 file:rounded-xl file:border file:border-slate-300 file:bg-white file:px-4 file:py-2
                     file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-50"
              @change="onPickImage"
            />

            <div class="mt-2 text-xs text-slate-500">
              * อัปโหลดได้หลายรูป และสามารถเลือกเพิ่มรูปได้เรื่อย ๆ
            </div>

            <div class="mt-3 flex items-start gap-3">
              <div
                v-if="form.imageDataUrls.length"
                class="grid max-h-40 grid-cols-4 gap-2 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2"
              >
                <div
                  v-for="(img, i) in form.imageDataUrls"
                  :key="`preview-${i}`"
                  class="relative h-16 w-16 cursor-move overflow-hidden rounded-md border border-slate-200 bg-white"
                  draggable="true"
                  @dragstart="onThumbDragStart(i)"
                  @dragover.prevent
                  @drop="onThumbDrop(i)"
                >
                  <img
                    :src="img"
                    alt="preview"
                    class="h-full w-full object-cover"
                  />
                  <span
                    class="absolute left-1 top-1 rounded bg-black/60 px-1 text-[10px] font-semibold text-white"
                  >
                    {{ i + 1 }}
                  </span>
                </div>
              </div>
              <div v-else class="flex h-16 w-20 items-center justify-center overflow-hidden rounded-lg border border-slate-300 bg-white">
                <span class="text-xs text-slate-500">ไม่มีรูป</span>
              </div>
              <button
                v-if="form.imageDataUrls.length"
                type="button"
                class="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                @click="form.imageDataUrl = ''; form.imageDataUrls = []"
              >
                ลบรูป
              </button>
            </div>

            <div v-if="form.imageDataUrls.length > 1" class="mt-2 text-xs text-slate-500">
              * ลากรูปเพื่อจัดลำดับได้ (รูปแรกจะเป็นรูปหลัก)
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
              class="h-11 flex-1 rounded-xl bg-[#ff6b2c] px-5 text-sm font-semibold text-white hover:bg-[#ff7c45]"
            >
              เพิ่มสินค้า
            </button>
            <button
              type="button"
              class="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              @click="resetForm"
            >
              ล้างฟอร์ม
            </button>
          </div>
        </form>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-7">
        <div class="flex items-center justify-between gap-3 border-b border-slate-200 p-5">
          <div>
            <h2 class="text-base font-extrabold text-slate-900">รายการสินค้า</h2>
            <p class="mt-1 text-sm text-slate-500">ทั้งหมด {{ products.length }} รายการ</p>
          </div>
          <button
            type="button"
            class="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            @click="loadProducts"
          >
            Refresh
          </button>
        </div>

        <div class="p-5">
          <div v-if="loading" class="text-sm text-slate-500">กำลังโหลด...</div>

          <div v-else-if="!products.length" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            ยังไม่มีสินค้า
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="p in products"
              :key="p.id"
              class="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="truncate font-semibold text-slate-900">{{ p.name || '-' }}</div>
                  <div v-if="p.description" class="mt-1 line-clamp-2 text-xs text-slate-600">{{ p.description }}</div>
                  <div class="mt-1 text-xs text-slate-600">
                    Brand: {{ p.brand || '-' }} | SKU: {{ p.sku || '-' }}
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    Category: {{ p.category || '-' }} | Unit: {{ p.unit || '-' }}
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    รูป: {{ p.image_urls?.length || (p.image_url ? 1 : 0) }} รูป
                  </div>
                </div>

                <button
                  type="button"
                  class="h-9 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-700 hover:bg-red-100"
                  @click="deleteProduct(p.id)"
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

definePageMeta({ middleware: ['auth'] })
useHead({ title: 'Admin | Products' })

type ProductRow = {
  id: string
  sku: string | null
  name: string | null
  description?: string | null
  category: string | null
  image_url: string | null
  image_urls?: string[] | null
  unit: string | null
  brand: string | null
}

const STORE_KEY = 'products'
const { getValue, setValue } = useSharedStore()

const products = ref<ProductRow[]>([])
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const dragThumbIndex = ref<number | null>(null)

const form = reactive({
  name: '',
  description: '',
  brand: '',
  sku: '',
  category: '',
  unit: '',
  imageDataUrl: '',
  imageDataUrls: [] as string[],
})

const uid = () => {
  if (typeof globalThis !== 'undefined' && (globalThis as any).crypto?.randomUUID) {
    return (globalThis as any).crypto.randomUUID() as string
  }
  return `prod_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

const resetForm = () => {
  form.name = ''
  form.description = ''
  form.brand = ''
  form.sku = ''
  form.category = ''
  form.unit = ''
  form.imageDataUrl = ''
  form.imageDataUrls = []
}

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const onPickImage = async (e: Event) => {
  const input = e.target as HTMLInputElement | null
  const files = Array.from(input?.files || [])
  if (!files.length) return

  const maxMB = 2
  const nextImages: string[] = []

  for (const file of files) {
    if (file.size > maxMB * 1024 * 1024) {
      window.alert(`ไฟล์ ${file.name} ใหญ่เกิน ${maxMB}MB กรุณาย่อรูปก่อน`)
      continue
    }
    nextImages.push(await fileToDataUrl(file))
  }

  form.imageDataUrls = [...form.imageDataUrls, ...nextImages]
  form.imageDataUrl = form.imageDataUrls[0] || ''
  if (input) input.value = ''
}

const onThumbDragStart = (index: number) => {
  dragThumbIndex.value = index
}

const onThumbDrop = (dropIndex: number) => {
  const fromIndex = dragThumbIndex.value
  dragThumbIndex.value = null
  if (fromIndex === null || fromIndex === dropIndex) return
  if (fromIndex < 0 || fromIndex >= form.imageDataUrls.length) return
  if (dropIndex < 0 || dropIndex >= form.imageDataUrls.length) return

  const arr = form.imageDataUrls.slice()
  const [moved] = arr.splice(fromIndex, 1)
  arr.splice(dropIndex, 0, moved)
  form.imageDataUrls = arr
  form.imageDataUrl = arr[0] || ''
}

const loadProducts = async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    const rows = await getValue<ProductRow>(STORE_KEY)
    products.value = rows.sort((a, b) => {
      const brandA = (a.brand || '').toLowerCase()
      const brandB = (b.brand || '').toLowerCase()
      if (brandA !== brandB) return brandA.localeCompare(brandB)
      return (a.name || '').toLowerCase().localeCompare((b.name || '').toLowerCase())
    })
  } catch (e: any) {
    errorMsg.value = e?.message || 'โหลดสินค้าล้มเหลว'
    products.value = []
  } finally {
    loading.value = false
  }
}

const createProduct = async () => {
  errorMsg.value = ''
  successMsg.value = ''

  const name = form.name.trim()
  if (!name) {
    errorMsg.value = 'กรุณากรอกชื่อสินค้า'
    return
  }

  try {
    const imageDataUrls = form.imageDataUrls.filter(Boolean)
    const imageDataUrl = imageDataUrls[0] || ''
    const payload = {
      name,
      description: form.description.trim() || null,
      brand: form.brand.trim() || null,
      sku: form.sku.trim() || null,
      category: form.category.trim() || null,
      unit: form.unit.trim() || null,
      image_url: imageDataUrl || null,
      image_urls: imageDataUrls.length ? imageDataUrls : null,
    }

    const current = await getValue<ProductRow>(STORE_KEY)
    const nextRows = [{ id: uid(), ...payload } as ProductRow, ...current]
    await setValue<ProductRow>(STORE_KEY, nextRows)

    successMsg.value = 'เพิ่มสินค้าสำเร็จ'
    resetForm()
    await loadProducts()
  } catch (e: any) {
    errorMsg.value = e?.message || 'เพิ่มสินค้าไม่สำเร็จ'
  }
}

const deleteProduct = async (id: string) => {
  errorMsg.value = ''
  successMsg.value = ''
  if (!window.confirm('ลบสินค้านี้ใช่ไหม?')) return

  try {
    const current = await getValue<ProductRow>(STORE_KEY)
    const nextRows = current.filter((x) => x.id !== id)
    await setValue<ProductRow>(STORE_KEY, nextRows)
    successMsg.value = 'ลบสินค้าแล้ว'
    await loadProducts()
  } catch (e: any) {
    errorMsg.value = e?.message || 'ลบสินค้าไม่สำเร็จ'
  }
}

onMounted(loadProducts)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hero-bg {
  background-image: url('/16f347af2bafc6631b753cff99d30010.jpg');
  background-size: cover;
  background-position: center;
  filter: saturate(1.05) contrast(1.02);
}

.hero-overlay {
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.84), rgba(241, 245, 249, 0.9), rgba(255, 243, 240, 0.7));
}
</style>
