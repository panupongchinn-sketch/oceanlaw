<template>
  <div class="contact-shell relative isolate">
    <div class="contact-blob contact-blob-a" aria-hidden="true"></div>
    <div class="contact-blob contact-blob-b" aria-hidden="true"></div>

    <section
      class="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm"
    >
      <img
        src="/16f347af2bafc6631b753cff99d30010.jpg"
        alt="สนามบาสเกตบอลในร่ม"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-[linear-gradient(110deg,_rgba(255,255,255,0.94)_8%,_rgba(255,255,255,0.86)_42%,_rgba(255,255,255,0.72)_68%,_rgba(15,23,42,0.22)_100%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.10),_transparent_55%),radial-gradient(circle_at_80%_20%,_rgba(239,68,68,0.12),_transparent_50%)]"></div>
      <div class="relative p-5 sm:p-8 lg:p-10">
        <div class="grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-8 items-start">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-slate-600">
              CONTACT PROBUILD
            </div>
            <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              ติดต่อเรา
            </h1>
            <p class="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-slate-600">
              ส่งข้อความหาเราได้เลย ทีมงานพร้อมตอบคำถามเรื่องสินค้า ใบเสนอราคา และการให้บริการติดตั้งอย่างรวดเร็ว
            </p>

            <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                <div class="text-xs font-semibold uppercase tracking-wider text-slate-500">เวลาตอบกลับ</div>
                <div class="mt-1 text-lg font-bold text-slate-900">เร็วที่สุด</div>
                <div class="text-xs text-slate-500">ในเวลาทำการ</div>
              </div>
              <div class="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                <div class="text-xs font-semibold uppercase tracking-wider text-slate-500">ช่องทาง</div>
                <div class="mt-1 text-lg font-bold text-slate-900">โทร / อีเมล</div>
                <div class="text-xs text-slate-500">หรือส่งฟอร์มด้านล่าง</div>
              </div>
              <div class="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                <div class="text-xs font-semibold uppercase tracking-wider text-slate-500">บริการ</div>
                <div class="mt-1 text-lg font-bold text-slate-900">ใบเสนอราคา</div>
                <div class="text-xs text-slate-500">พร้อมให้คำแนะนำ</div>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white/90 p-4 sm:p-5 shadow-sm">
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">ติดต่อด่วน</div>
                <div class="mt-1 text-xl font-bold text-slate-900">ทีมงาน probuild</div>
              </div>
              <button
                class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                type="button"
                @click="resetForm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                ล้างฟอร์ม
              </button>
            </div>

            <div class="mt-4 space-y-3 text-sm">
              <div class="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                <div class="text-xs font-semibold text-slate-500">โทรศัพท์</div>
                <div class="mt-1 font-semibold text-slate-900">091-776-2859</div>
              </div>
              <div class="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                <div class="text-xs font-semibold text-slate-500">อีเมล</div>
                <div class="mt-1 font-semibold text-slate-900 break-all">automation101training@gmail.com</div>
              </div>
              <button
                class="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
                type="button"
                @click="goInvoice"
              >
                ขอใบเสนอราคา
                <span class="text-red-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <section class="lg:col-span-2">
        <div class="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur-sm">
          <div class="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-7 sm:py-6">
            <div class="flex items-start gap-4">
              <div class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 10h8m-8 4h5m-8 6h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg sm:text-xl font-bold text-slate-900">ส่งข้อความ / ขอข้อมูลเพิ่มเติม</h2>
                <p class="mt-1 text-sm text-slate-500">
                  กรอกข้อมูลให้ครบเพื่อให้ทีมงานติดต่อกลับได้ถูกต้องและเร็วขึ้น
                </p>
              </div>
            </div>
          </div>

          <div class="p-5 sm:p-7">
            <div v-if="success" class="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              ส่งข้อความเรียบร้อยแล้ว ขอบคุณครับ/ค่ะ
            </div>

            <div v-if="error" class="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {{ error }}
            </div>

            <form class="space-y-5" @submit.prevent="submit">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-700">ชื่อ-นามสกุล <span class="text-red-500">*</span></label>
                  <input
                    v-model.trim="form.full_name"
                    type="text"
                    class="contact-input mt-2"
                    placeholder="ชื่อลูกค้า"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700">เบอร์โทร</label>
                  <input
                    v-model.trim="form.phone"
                    type="tel"
                    class="contact-input mt-2"
                    placeholder="เช่น 08x-xxx-xxxx"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700">บริษัท</label>
                  <input
                    v-model.trim="form.company"
                    type="text"
                    class="contact-input mt-2"
                    placeholder="ชื่อบริษัท (ถ้ามี)"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700">Email</label>
                  <input
                    v-model.trim="form.email"
                    type="email"
                    class="contact-input mt-2"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700">หัวข้อ</label>
                <input
                  v-model.trim="form.subject"
                  type="text"
                  class="contact-input mt-2"
                  placeholder="เช่น ขอใบเสนอราคา / สอบถามสินค้า / ขอคำปรึกษา"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700">รายละเอียด <span class="text-red-500">*</span></label>
                <textarea
                  v-model.trim="form.detail"
                  rows="6"
                  class="contact-textarea mt-2"
                  placeholder="พิมพ์รายละเอียดที่ต้องการให้เราช่วย เช่น รุ่นสินค้า จำนวน จังหวัด และช่วงเวลาที่สะดวกให้ติดต่อกลับ..."
                  required
                />
                <div class="mt-2 text-xs text-slate-500">
                  แนะนำ: ระบุสินค้า/รุ่น จำนวน จังหวัด และช่วงเวลาที่สะดวกให้ติดต่อกลับ
                </div>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div class="text-xs leading-5 text-slate-500">
                    เมื่อกดส่ง ถือว่ายินยอมให้เราใช้ข้อมูลเพื่อการติดต่อกลับและให้คำแนะนำเบื้องต้น
                  </div>

                  <button
                    class="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 active:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed"
                    :disabled="loading"
                    type="submit"
                  >
                    <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                    ส่งข้อความ
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <aside class="lg:sticky lg:top-6 space-y-6">
        <div class="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.3)] backdrop-blur-sm">
          <div class="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 class="text-lg font-bold text-slate-900">ข้อมูลติดต่อ</h2>
            <p class="mt-1 text-sm text-slate-500">probuild</p>
            <p class="text-sm text-slate-500">พร้อมให้คำแนะนำสินค้าและบริการ</p>
          </div>

          <div class="p-5 sm:p-6 space-y-4 text-sm text-slate-700">
            <div class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <div>
                <div class="font-semibold text-slate-900">ที่อยู่</div>
                <div class="mt-1 text-slate-600">อ.เมือง จ.ร้อยเอ็ด 450000</div>
              </div>
            </div>

            <div class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.128a11.042 11.042 0 005.516 5.516l1.128-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <div>
                <div class="font-semibold text-slate-900">โทร</div>
                <div class="mt-1 text-slate-600">0917762859</div>
              </div>
            </div>

            <div class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 12H8m8 0l-3.5 3.5M16 12L12.5 8.5M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                </svg>
              </span>
              <div>
                <div class="font-semibold text-slate-900">อีเมล</div>
                <div class="mt-1 break-all text-slate-600">automation101training@gmail.com</div>
              </div>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-white p-4">
              <div class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">เวลาทำการ</div>
              <div class="mt-2 text-sm font-medium text-slate-700">จันทร์-ศุกร์ 09:00-18:00</div>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.3)] backdrop-blur-sm">
          <div class="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 class="text-lg font-bold text-slate-900">แผนที่</h2>
          </div>
          <div class="p-4 sm:p-5">
            <div class="map-placeholder aspect-[16/10] rounded-2xl border border-slate-200">
              <div class="text-center">
                <div class="text-sm font-semibold text-slate-700">พื้นที่แสดงแผนที่</div>
                <div class="mt-1 text-xs text-slate-500">สามารถใส่ Google Maps embed ได้ภายหลัง</div>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-[0_16px_40px_-24px_rgba(15,23,42,0.5)]">
          <div class="p-5 sm:p-6">
            <div class="text-xs font-semibold tracking-[0.14em] text-slate-300 uppercase">Need a quote?</div>
            <h3 class="mt-2 text-lg font-bold">ต้องการใบเสนอราคาแบบรวดเร็ว</h3>
            <p class="mt-2 text-sm leading-6 text-slate-300">
              ส่งรายละเอียดสินค้าและจำนวนที่ต้องการ ทีมงานจะช่วยประเมินและติดต่อกลับโดยเร็ว
            </p>
            <button
              class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
              type="button"
              @click="goInvoice"
            >
              ไปหน้าใบเสนอราคา
              <span class="text-red-300">→</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
useState<string>("mb_search_q", () => "")

type ContactForm = {
  full_name: string
  phone: string
  company: string
  email: string
  subject: string
  detail: string
}

type ContactMessageRow = ContactForm & {
  id: string
  source_page: string
  created_at: string
}

const CONTACT_STORAGE_KEY = "contact_messages"
const { getValue, setValue } = useSharedStore()

const form = ref<ContactForm>({
  full_name: "",
  phone: "",
  company: "",
  email: "",
  subject: "",
  detail: "",
})

const loading = ref(false)
const error = ref("")
const success = ref(false)

const nowIso = () => new Date().toISOString()

const uid = () => {
  if (typeof globalThis !== "undefined" && (globalThis as any).crypto?.randomUUID) {
    return (globalThis as any).crypto.randomUUID() as string
  }
  return `c_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

const resetForm = () => {
  form.value = {
    full_name: "",
    phone: "",
    company: "",
    email: "",
    subject: "",
    detail: "",
  }
  error.value = ""
  success.value = false
}

const submit = async () => {
  loading.value = true
  error.value = ""
  success.value = false

  try {
    const fullName = (form.value.full_name || "").trim()
    const detail = (form.value.detail || "").trim()

    if (!fullName) throw new Error("กรุณากรอกชื่อ-นามสกุล")
    if (!detail) throw new Error("กรุณากรอกรายละเอียด")

    const payload: ContactMessageRow = {
      id: uid(),
      full_name: fullName,
      phone: (form.value.phone || "").trim(),
      company: (form.value.company || "").trim(),
      email: (form.value.email || "").trim(),
      subject: (form.value.subject || "").trim(),
      detail,
      source_page: route.fullPath,
      created_at: nowIso(),
    }

    const rows = await getValue<ContactMessageRow>(CONTACT_STORAGE_KEY)
    rows.unshift(payload)
    await setValue<ContactMessageRow>(CONTACT_STORAGE_KEY, rows)

    resetForm()
    success.value = true
  } catch (err: any) {
    error.value = err?.message || "ส่งข้อมูลไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}

const goInvoice = async () => {
  await navigateTo("/invoice")
}
</script>

<style scoped>
.contact-shell {
  --blob-blue: rgba(59, 130, 246, 0.14);
  --blob-red: rgba(239, 68, 68, 0.12);
}

.contact-blob {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  width: 16rem;
  height: 16rem;
  border-radius: 9999px;
  filter: blur(22px);
  opacity: 0.9;
  animation: floatBlob 16s ease-in-out infinite;
}

.contact-blob-a {
  top: -2rem;
  left: -2rem;
  background: var(--blob-blue);
}

.contact-blob-b {
  top: 18rem;
  right: -2.5rem;
  background: var(--blob-red);
  animation-delay: -6s;
}

.contact-input,
.contact-textarea {
  width: 100%;
  border-radius: 0.85rem;
  border: 1px solid rgb(203 213 225);
  background: rgba(255, 255, 255, 0.9);
  color: rgb(15 23 42);
  transition: box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease;
}

.contact-input {
  height: 2.9rem;
  padding: 0 0.95rem;
}

.contact-textarea {
  min-height: 9rem;
  padding: 0.75rem 0.95rem;
  resize: vertical;
}

.contact-input::placeholder,
.contact-textarea::placeholder {
  color: rgb(148 163 184);
}

.contact-input:focus,
.contact-textarea:focus {
  outline: none;
  border-color: rgb(248 113 113);
  background: rgb(255 255 255);
  box-shadow: 0 0 0 4px rgba(254, 202, 202, 0.65);
}

.map-placeholder {
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 18% 20%, rgba(37, 99, 235, 0.1), transparent 40%),
    radial-gradient(circle at 82% 28%, rgba(239, 68, 68, 0.12), transparent 42%),
    linear-gradient(0deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
    #f8fafc;
  background-size: auto, auto, 22px 22px, 22px 22px, auto;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes floatBlob {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(0, 14px, 0) scale(1.05);
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-blob {
    animation: none;
  }
}
</style>
