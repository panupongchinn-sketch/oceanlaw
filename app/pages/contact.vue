<template>
  <div class="contact-shell">
    <section class="rounded-[28px] border border-[#d7e4dc] bg-[#eef5f1] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-3xl font-black tracking-tight text-[#102d24] sm:text-4xl lg:text-5xl">ติดต่อเรา</h1>
        <p class="mt-3 text-sm leading-7 text-[#4c6558] sm:text-base">
          ส่งข้อความหาเราได้เลย ทีมงานพร้อมตอบคำถามด้านบัญชี ภาษี และงานที่ปรึกษาธุรกิจอย่างรวดเร็ว
        </p>
      </div>
    </section>

    <div class="mt-8 grid grid-cols-1 items-start gap-7 lg:grid-cols-3">
      <section class="lg:col-span-2">
        <div class="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_56px_-32px_rgba(15,23,42,0.42)]">
          <div class="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-5 py-5 sm:px-7 sm:py-6">
            <div class="flex items-start gap-4">
              <div class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600">
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
            <div class="mb-5 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
              <span class="inline-flex items-center rounded-full bg-white px-2.5 py-1 font-semibold text-slate-700">ตอบกลับภายใน 1 วันทำการ</span>
              <span class="inline-flex items-center rounded-full bg-white px-2.5 py-1 font-semibold text-slate-700">ข้อมูลของคุณจะถูกเก็บเป็นความลับ</span>
            </div>

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
                <div class="mt-2 flex flex-wrap gap-2">
                  <button
                    v-for="item in subjectOptions"
                    :key="item"
                    type="button"
                    class="inline-flex h-9 items-center rounded-full border px-3 text-xs font-semibold transition sm:text-sm"
                    :class="form.subject === item
                      ? 'border-[#b11226] bg-[#b11226] text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-[#b11226]/40 hover:text-[#b11226]'"
                    @click="selectSubject(item)"
                  >
                    {{ item }}
                  </button>
                </div>
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
                  placeholder="พิมพ์รายละเอียดที่ต้องการให้เราช่วย เช่น ประเภทธุรกิจ ปัญหาบัญชี/ภาษี เอกสารที่มี และช่วงเวลาที่สะดวกให้ติดต่อกลับ..."
                  required
                />
                <div class="mt-2 text-xs text-slate-500">
                  แนะนำ: ระบุประเภทธุรกิจ ประเด็นที่ต้องการปรึกษา และช่วงเวลาที่สะดวกให้ติดต่อกลับ
                </div>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-4">
                <div class="flex justify-end">
                  <button
                    class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#b11226] px-6 text-sm font-bold text-white shadow-[0_10px_20px_-10px_rgba(177,18,38,0.7)] transition hover:bg-[#8f0f1f] active:bg-[#700c18] disabled:cursor-not-allowed disabled:opacity-60"
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

      <aside class="space-y-6 lg:sticky lg:top-6">
        <div class="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_56px_-32px_rgba(15,23,42,0.38)]">
          <div class="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 class="text-lg font-bold text-slate-900">ข้อมูลติดต่อ</h2>
            <p class="mt-1 text-sm text-slate-500">Oceanlaw</p>
            <p class="text-sm text-slate-500">พร้อมให้คำแนะนำด้านบัญชี ภาษี และธุรกิจ</p>
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
                  <div class="mt-1 text-slate-600">{{ officeAddress }}</div>
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
                  <div class="mt-1 space-y-1 text-slate-600">
                    <div>
                      สำนักงาน:
                      <a :href="officePhoneHref" class="hover:text-red-700">{{ officePhone }}</a>
                    </div>
                    <div>
                      Hotline บัญชี:
                      <a :href="toTelHref(hotlines.accounting)" class="hover:text-red-700">{{ hotlines.accounting }}</a>
                    </div>
                    <div>
                      Hotline ธุรกิจ:
                      <a :href="toTelHref(hotlines.business)" class="hover:text-red-700">{{ hotlines.business }}</a>
                    </div>
                    <div>
                      แฟกซ์:
                      <span>{{ faxPhone }}</span>
                    </div>
                  </div>
                </div>
              </div>

            <div class="rounded-2xl border border-slate-200 bg-white p-4">
              <div class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">เวลาทำการ</div>
              <div class="mt-2 text-sm font-medium text-slate-700">จันทร์-ศุกร์ 08:30-17:30</div>
            </div>
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

const officePhone = "0-2929-6200"
const faxPhone = "0-2929-5853"
const hotlines = {
  accounting: "086-3223421",
  business: "086-3162034",
}
const officeAddress = "90/30 หมู่ที่ 5 ตำบลบางรักพัฒนา อำเภอบางบัวทอง จังหวัดนนทบุรี 11110"

const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`

const officePhoneHref = computed(() => toTelHref(officePhone))

const form = ref<ContactForm>({
  full_name: "",
  phone: "",
  company: "",
  email: "",
  subject: "",
  detail: "",
})

const subjectOptions = [
  "ขอใบเสนอราคา",
  "สอบถามบริการบัญชี",
  "สอบถามบริการภาษี",
  "ขอคำปรึกษาธุรกิจ",
  "นัดคุยกับทีมงาน",
]

const selectSubject = (subject: string) => {
  form.value.subject = subject
}

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

</script>

<style scoped>
.contact-shell {
  background:
    linear-gradient(180deg, rgba(19, 82, 55, 0.04) 0%, rgba(19, 82, 55, 0) 220px),
    repeating-linear-gradient(-45deg, rgba(27, 86, 60, 0.03), rgba(27, 86, 60, 0.03) 1px, transparent 1px, transparent 18px);
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
</style>
