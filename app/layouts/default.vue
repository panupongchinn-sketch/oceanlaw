<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <div class="flex min-h-screen flex-col">
      <header class="sticky top-0 z-[60] border-b border-slate-200 bg-white">
        <div class="mx-auto max-w-none px-4 sm:px-6 lg:px-10">
          <div class="flex h-16 items-center gap-3 sm:gap-4">
            <NuxtLink to="/" class="flex shrink-0 items-center gap-3">
              <img src="/cropped-logo.png" alt="probuild" class="h-12 w-auto object-contain sm:h-14" />
              <div class="hidden leading-tight sm:block">
                <div class="font-extrabold tracking-tight text-slate-900">probuild</div>
                <div class="-mt-0.5 text-[11px] text-slate-500">SPORTS</div>
              </div>
            </NuxtLink>

            <div class="flex-1"></div>

            <div class="flex items-center">
              <NuxtLink
                v-if="!isLoggedIn"
                to="/login"
                class="inline-flex h-9 items-center rounded-full bg-[#0B4AA2] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#083A7E] active:bg-[#062F67] focus:outline-none focus:ring-2 focus:ring-[#0B4AA2]/30"
              >
                เข้าสู่ระบบ
              </NuxtLink>

              <div v-else class="flex items-center gap-2">
                <button
                  type="button"
                  class="inline-flex h-9 items-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  @click="onLogout"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>

          <div class="flex h-12 items-center border-t border-slate-100">
            <nav class="no-scrollbar flex items-center gap-5 overflow-x-auto whitespace-nowrap text-sm">
              <NuxtLink
                v-for="item in nav"
                :key="item.to"
                :to="item.to"
                class="shrink-0 font-semibold text-slate-800 hover:text-[#0B4AA2]"
                :class="route.path === item.to ? 'text-[#0B4AA2]' : ''"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </header>

      <main class="mx-auto w-full max-w-none flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <slot />
      </main>

      <footer class="mt-auto border-t border-slate-200 bg-slate-50">
        <div class="mx-auto max-w-none px-4 py-4 sm:px-6 lg:px-10">
          <div class="grid items-center gap-4 md:grid-cols-12">
            <div class="flex justify-center md:col-span-2">
              <img src="/cropped-logo.png" alt="probuild logo" class="h-[84px] w-auto object-contain" />
            </div>

            <div class="text-center md:col-span-4">
              <h3 class="whitespace-nowrap text-base font-extrabold leading-tight text-slate-900 sm:text-lg lg:text-[28px]">
                บริษัท โปร-บิลด์ (ประเทศไทย) จำกัด
              </h3>
              <div class="mt-2 space-y-0.5 text-xs font-normal leading-snug text-slate-900 sm:text-sm lg:text-base">
                <p>335,337 ถนนช่างอากาศอุทิศ แขวงดอนเมือง</p>
                <p>เขตดอนเมือง กรุงเทพมหานคร 10210</p>
                <p>โทร: 0-2929-6200</p>
                <p>แฟกซ์: 0-2929-5853</p>
                <p>Hotline : 086-3223421, 086-3162034</p>
                <p>Email:</p>
                <p>
                  <a class="hover:underline" href="mailto:puchaya@probuildthai.com">puchaya@probuildthai.com</a>,
                  <a class="hover:underline" href="mailto:info@probuildthai.com">info@probuildthai.com</a>
                </p>
              </div>
            </div>

            <div class="flex justify-center md:col-span-3">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://lin.ee/5Qv8W9f"
                alt="Line QR"
                class="h-[180px] w-[180px] bg-white p-1"
                loading="lazy"
              />
            </div>

            <div class="flex justify-center md:col-span-3">
              <iframe
                title="probuild map"
                src="https://www.google.com/maps?q=บริษัท%20โปร-บิลด์%20(ประเทศไทย)%20จำกัด&output=embed"
                class="h-[180px] w-[250px] border border-slate-300"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-200 bg-slate-50 py-1 text-center text-xs text-slate-600">
          © {{ new Date().getFullYear() }} probuildthai Develop by Bp Online Groups
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

const nav = computed(() => {
  const base = [
    { label: "หน้าแรก", to: "/" },
    { label: "เกี่ยวกับเรา", to: "/about" },
    { label: "สินค้า", to: "/product" },
    { label: "บริการ", to: "/service" },
    { label: "ติดต่อ", to: "/contact" },
  ]

  if (isLoggedIn.value) {
    base.push({ label: "จัดการสินค้า", to: "/admin/products" })
    base.push({ label: "จัดการโปรเจค", to: "/admin/projects-local" })
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
</style>
