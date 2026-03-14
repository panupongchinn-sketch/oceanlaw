<template>
  <div class="min-h-screen bg-white text-slate-900">
    <div class="flex min-h-screen flex-col">
      <header class="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur">
        <div class="mx-auto max-w-none px-4 sm:px-6 lg:px-10">
          <div class="flex flex-col gap-3 py-3 lg:min-h-[84px] lg:flex-row lg:items-center lg:gap-4 lg:py-2">
            <NuxtLink to="/" class="flex shrink-0 items-center gap-3">
              <img src="/????????1.jpg" alt="oceanlaw" class="h-12 w-auto object-contain sm:h-14 lg:h-16" />
              <div class="leading-none">
                <div class="text-2xl font-black tracking-tight text-[#b11226] sm:text-[2.2rem] lg:text-[2.8rem]">???????? ????? ???? ?????</div>
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
                <a
                  v-for="contactBtn in contactButtons"
                  :key="contactBtn.label"
                  :href="contactBtn.href"
                  class="inline-flex h-10 items-center gap-2 rounded-full bg-[#166534] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#14532d] focus:outline-none focus:ring-2 focus:ring-[#166534]/35"
                >
                  <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                    <path
                      d="M6.62 10.79a15.54 15.54 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.58 1 1 0 0 1-.24 1z"
                    />
                  </svg>
                  <span>{{ contactBtn.label }}</span>
                </a>
              </div>

              <div v-if="isLoggedIn" class="flex items-center">
                <div class="flex items-center gap-2">
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

      <footer class="mt-auto border-t border-slate-200 bg-[#f7f8fb] text-slate-800">
        <div class="mx-auto max-w-none px-4 py-4 sm:px-6 lg:px-10">
          <div class="flex flex-col items-center gap-5 md:grid md:grid-cols-12 md:items-center md:gap-4">
            <div class="flex w-full justify-center md:col-span-2">
              <img src="/????????1.jpg" alt="oceanlaw logo" class="h-[96px] w-auto object-contain sm:h-[110px] md:h-[120px]" />
            </div>

            <div class="w-full max-w-[360px] text-center md:col-span-4 md:max-w-none">
              <h3 class="text-base font-extrabold leading-tight text-slate-900 sm:text-lg lg:text-[28px]">
                ?????? ???????? ????? ???? ????? ?????
              </h3>
              <div class="mt-2 space-y-0.5 break-words text-xs font-normal leading-snug text-slate-700 sm:text-sm lg:text-[15px]">
                <p>90/30 ??????? 5 ??????????????? ??????????????</p>
                <p>?????????????? 11110</p>
                <p>???: 0-2929-6200</p>
                <p>?????: 0-2929-5853</p>
                <p>Hotline : 086-3223421, 086-3162034</p>
              </div>
            </div>

            <div class="flex w-full justify-center md:col-span-3">
              <a
                href="https://lin.ee/5Qv8W9f"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex w-full max-w-[200px] flex-col items-center rounded-2xl border border-emerald-200/80 bg-white p-3 shadow-[0_8px_22px_rgba(22,101,52,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(22,101,52,0.16)]"
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
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://lin.ee/5Qv8W9f"
                  alt="Line QR"
                  class="mt-2 h-[150px] w-[150px] rounded-md border border-slate-200 bg-white p-1"
                  loading="lazy"
                />
                <span class="mt-2 text-xs font-semibold text-slate-500">????????????????????</span>
              </a>
            </div>

            <div class="flex w-full justify-center md:col-span-3">
              <div class="h-[190px] w-full max-w-[320px] overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.14)]">
                <iframe
                  title="Oceanlaw map"
                  src="https://www.google.com/maps?q=90/30%20???????%205%20???????????????%20??????????????%20???????&output=embed"
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

const contactButtons = [
  { label: "??????", href: "tel:0863223421" },
]

const isNavActive = (item: NavItem) => {
  const [path, hash] = item.to.split("#")
  if (hash) {
    return route.path === (path || "/") && route.hash === `#${hash}`
  }
  return route.path === item.to
}

const nav = computed(() => {
  const base: NavItem[] = [
    { label: "???????", to: "/" },
    { label: "??????", to: "/service" },
    { label: "??????", to: "/articles" },
    { label: "????????????", to: "/about" },
    { label: "?????????", to: "/contact" },
  ]

  if (isLoggedIn.value) {
    base.push({ label: "????????????", to: "/admin/products" })
    base.push({ label: "????????????", to: "/admin/articles" })
    base.push({ label: "???????????????", to: "/admin/contact-messages" })
    base.push({ label: "???????", to: "/admin/settings" })
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

</style>
