<template>
  <div class="min-h-screen bg-white text-slate-900">
    <div class="flex min-h-screen flex-col">
      <header class="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur">
        <div class="mx-auto max-w-none px-4 sm:px-6 lg:px-10">
          <div class="flex flex-col gap-3 py-3 lg:min-h-[84px] lg:flex-row lg:items-center lg:gap-4 lg:py-2">
            <NuxtLink to="/" class="flex shrink-0 items-center gap-3">
              <img src="/oceanlaw-logo.jpg" alt="oceanlaw" class="h-12 w-auto object-contain sm:h-14 lg:h-16" />
              <div class="leading-none">
                <div class="text-2xl font-black tracking-tight text-[#b11226] sm:text-[2.2rem] lg:text-[2.8rem]">โอเชี่ยน แอนด์ ลอว์ กรุ๊ป</div>
              </div>
            </NuxtLink>

            <nav class="no-scrollbar order-3 flex items-center gap-3 overflow-x-auto whitespace-nowrap text-base lg:order-2 lg:flex-1 lg:justify-end lg:gap-5 lg:text-lg">
              <NuxtLink
                v-for="item in nav"
                :key="item.to"
                :to="item.to"
                class="shrink-0 font-semibold text-slate-700 hover:text-[#166534]"
                :class="isNavActive(item) ? 'text-[#166534]' : ''"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>

            <div class="order-2 flex items-center gap-2 lg:order-3 lg:ml-4">
              <div class="flex items-center gap-2">
                <button
                  v-for="contactBtn in contactButtons"
                  :key="contactBtn.label"
                  type="button"
                  @click="onContactClick(contactBtn)"
                  class="inline-flex h-10 items-center gap-2 rounded-full bg-[#166534] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#14532d] focus:outline-none focus:ring-2 focus:ring-[#166534]/35"
                >
                  <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                    <path
                      d="M6.62 10.79a15.54 15.54 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.58 1 1 0 0 1-.24 1z"
                    />
                  </svg>
                  <span>{{ contactBtn.label }}</span>
                </button>
              </div>

              <div class="flex items-center">
                <NuxtLink
                  v-if="!isLoggedIn"
                  to="/login"
                  class="inline-flex h-9 items-center rounded-lg bg-[#166534] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#14532d] active:bg-[#0f3d23] focus:outline-none focus:ring-2 focus:ring-[#166534]/30"
                >
                  เข้าสู่ระบบ
                </NuxtLink>

                <div v-else class="flex items-center gap-2">
                  <button
                    type="button"
                    class="inline-flex h-9 items-center rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    @click="onLogout"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="mx-auto w-full max-w-none flex-1 px-3 py-6 sm:px-6 sm:py-8 lg:px-10">
        <slot />
      </main>

      <transition name="contact-modal">
        <div
          v-if="showContactModal"
          class="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/45 p-4"
          @click.self="closeContactModal"
        >
          <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.28)] sm:p-6">
            <div class="flex items-start gap-3">
              <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf6ee] text-[#166534]">
                <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M6.62 10.79a15.54 15.54 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.58 1 1 0 0 1-.24 1z" />
                </svg>
              </span>
              <div class="min-w-0 flex-1">
                <h3 class="text-lg font-extrabold text-slate-900">ติดต่อเรา</h3>
                <p class="mt-1 text-sm text-slate-500">เบอร์สำหรับติดต่อทางโทรศัพท์</p>
                <div class="mt-3 rounded-xl border border-[#d8e7dd] bg-[#f4faf6] px-3 py-2 text-xl font-black tracking-wide text-[#166534]">
                  {{ desktopContactPhone }}
                </div>
              </div>
            </div>

            <div class="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                class="inline-flex h-10 items-center rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                @click="copyContactPhone"
              >
                {{ copiedContact ? "คัดลอกแล้ว" : "คัดลอกเบอร์" }}
              </button>
              <button
                type="button"
                class="inline-flex h-10 items-center rounded-lg bg-[#166534] px-4 text-sm font-semibold text-white transition hover:bg-[#14532d]"
                @click="closeContactModal"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      </transition>

      <footer class="mt-auto border-t border-slate-200 bg-[#f7f8fb] text-slate-800">
        <div class="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8">
          <div class="flex flex-col items-center gap-5 md:flex-row md:flex-wrap md:justify-center md:gap-6 xl:flex-nowrap xl:gap-8">
            <div class="flex shrink-0 justify-center">
              <img src="/oceanlaw-logo.jpg" alt="oceanlaw logo" class="h-[96px] w-auto object-contain sm:h-[110px] md:h-[120px]" />
            </div>

            <div class="w-full max-w-[560px] text-center">
              <h3 class="text-base font-extrabold leading-tight text-slate-900 sm:text-lg lg:text-[28px]">
                บริษัท โอเชี่ยน แอนด์ ลอว์ กรุ๊ป จำกัด
              </h3>
              <div class="mt-2 space-y-0.5 break-words text-xs font-normal leading-snug text-slate-700 sm:text-sm lg:text-[15px]">
                <p>90/30 หมู่ที่ 5 ตำบลบางรักพัฒนา อำเภอบางบัวทอง</p>
                <p>จังหวัดนนทบุรี 11110</p>
                <p>โทร: 088-9636222</p>
                <p>Hotline : 099-1466222, 088-1436222</p>
                <p>
                  Email:
                  <a href="mailto:oceanlaw2557.hr@gmail.com" class="hover:underline">oceanlaw2557.hr@gmail.com</a>
                </p>
                <div class="mt-3 flex flex-wrap justify-center gap-2">
                  <a
                    href="https://www.facebook.com/OceanAndLawGroup"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex h-9 items-center gap-2 rounded-full bg-[#1877f2] px-4 text-xs font-bold text-white transition hover:bg-[#1666d9] sm:h-10 sm:text-sm"
                  >
                    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 fill-current" aria-hidden="true">
                      <path d="M13.5 8H16V5h-2.5C10.7 5 9 6.7 9 9.5V12H7v3h2v6h3v-6h2.4l.6-3H12V9.7c0-1 .3-1.7 1.5-1.7z" />
                    </svg>
                    Facebook
                  </a>
                  <a
                    href="https://lin.ee/5Qv8W9f"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex h-9 items-center gap-2 rounded-full bg-[#06c755] px-4 text-xs font-bold text-white transition hover:bg-[#04a746] sm:h-10 sm:text-sm"
                  >
                    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 fill-current" aria-hidden="true">
                      <path d="M19.2 3.2H4.8A2.8 2.8 0 0 0 2 6v8a2.8 2.8 0 0 0 2.8 2.8h2.4V21l4.2-4.2h7.8A2.8 2.8 0 0 0 22 14V6a2.8 2.8 0 0 0-2.8-2.8zM8 9.2h1.2v3.6H11V14H8V9.2zm4 0h1.2V14H12V9.2zm2.8 0h1.2v3.6h1.8V14h-3V9.2z" />
                    </svg>
                    Line Official
                  </a>
                </div>
              </div>
            </div>

            <div class="flex shrink-0 justify-center">
              <a
                href="https://lin.ee/5Qv8W9f"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex w-[200px] flex-col items-center rounded-2xl border border-emerald-200/80 bg-white p-3 shadow-[0_8px_22px_rgba(22,101,52,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(22,101,52,0.16)]"
              >
                <span class="inline-flex items-center gap-1.5 rounded-full bg-[#eafff2] px-3 py-1 text-xs font-extrabold text-[#0f9f47]">
                  <span class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#06c755] text-white">
                    <svg viewBox="0 0 24 24" class="h-2.5 w-2.5 fill-current" aria-hidden="true">
                      <path d="M19.2 3.2H4.8A2.8 2.8 0 0 0 2 6v8a2.8 2.8 0 0 0 2.8 2.8h2.4V21l4.2-4.2h7.8A2.8 2.8 0 0 0 22 14V6a2.8 2.8 0 0 0-2.8-2.8zM8 9.2h1.2v3.6H11V14H8V9.2zm4 0h1.2V14H12V9.2zm2.8 0h1.2v3.6h1.8V14h-3V9.2z" />
                    </svg>
                  </span>
                  LINE Official
                </span>

                <img
                  src="/349.jpg"
                  alt="Line QR"
                  class="mt-2 h-[150px] w-[150px] rounded-md border border-slate-200 bg-white p-1"
                  loading="lazy"
                />
                <span class="mt-2 text-xs font-semibold text-slate-500">สแกนเพื่อเพิ่มเพื่อน</span>
              </a>
            </div>

            <div class="flex shrink-0 justify-center">
              <div class="h-[190px] w-full max-w-[320px] overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.14)] md:w-[320px]">
                <iframe
                  title="Oceanlaw map"
                  src="https://www.google.com/maps?q=90/30%20หมู่ที่%205%20ตำบลบางรักพัฒนา%20อำเภอบางบัวทอง%20นนทบุรี&output=embed"
                  class="h-full w-full border-0"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-200 bg-[#eef1f7] py-1.5 text-center text-xs text-slate-700">
          © {{ new Date().getFullYear() }} Oceanlaw Develop by Bp Online Groups
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const auth = useAuth?.() as any
const user = auth?.user
const getSession = auth?.getSession
const signOut = auth?.signOut

const adminTest = ref(false)

onMounted(async () => {
  adminTest.value = localStorage.getItem("ADMIN_TEST") === "1"

  try {
    if (getSession) await getSession()
  } catch (e) {
    console.error("getSession error:", e)
  }
})

const isLoggedIn = computed(() => {
  const real = !!user?.value
  return real || adminTest.value
})

const onLogout = async () => {
  try {
    if (signOut) await signOut()
  } finally {
    adminTest.value = false
    localStorage.removeItem("ADMIN_TEST")
    await navigateTo("/")
  }
}

type NavItem = {
  label: string
  to: string
}

type ContactButton = {
  label: string
  phone: string
}

const contactButtons = [
  { label: "ติดต่อ", phone: "099-1466222" },
]

const showContactModal = ref(false)
const desktopContactPhone = ref("")
const copiedContact = ref(false)

const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`

const isMobileClient = () => {
  if (typeof window === "undefined") return false
  const ua = window.navigator.userAgent || ""
  const byUA = /Android|iPhone|iPad|iPod|Mobile/i.test(ua)
  const byViewport = window.matchMedia?.("(max-width: 768px)")?.matches ?? false
  return byUA || byViewport
}

const onContactClick = (btn: ContactButton) => {
  if (isMobileClient()) {
    window.location.href = toTelHref(btn.phone)
    return
  }
  desktopContactPhone.value = btn.phone
  copiedContact.value = false
  showContactModal.value = true
}

const closeContactModal = () => {
  showContactModal.value = false
}

const copyContactPhone = async () => {
  try {
    await navigator.clipboard.writeText(desktopContactPhone.value)
    copiedContact.value = true
  } catch (e) {
    console.error("copyContactPhone error:", e)
  }
}

const isNavActive = (item: NavItem) => {
  const [path, hash] = item.to.split("#")
  if (hash) {
    return route.path === (path || "/") && route.hash === `#${hash}`
  }
  return route.path === item.to
}

const nav = computed(() => {
  const base: NavItem[] = [
    { label: "หน้าแรก", to: "/" },
    { label: "บริการ", to: "/service" },
    { label: "บทความ", to: "/articles" },
    { label: "เกี่ยวกับเรา", to: "/about" },
    { label: "ติดต่อเรา", to: "/contact" },
  ]

  if (isLoggedIn.value) {
    base.push({ label: "จัดการบริการ", to: "/admin/products" })
    base.push({ label: "จัดการบทความ", to: "/admin/articles" })
    base.push({ label: "รายงานผู้ติดต่อ", to: "/admin/contact-messages" })
    base.push({ label: "ตั้งค่า", to: "/admin/settings" })
  }

  return base
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800&display=swap");

* {
  font-family: "Kanit", system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.contact-modal-enter-active,
.contact-modal-leave-active {
  transition: opacity 0.2s ease;
}

.contact-modal-enter-from,
.contact-modal-leave-to {
  opacity: 0;
}

</style>
