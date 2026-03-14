<template>
  <div class="relative min-h-[calc(100vh-0px)] overflow-hidden bg-slate-100 text-slate-100">
    <div
      class="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200"
      aria-hidden="true"
    ></div>

    <div class="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-start justify-center px-4 py-20 sm:px-6 lg:px-8">
      <section class="w-full max-w-md">
        <div class="mx-auto w-full max-w-md rounded-2xl border border-slate-200/30 bg-white/92 shadow-2xl backdrop-blur-sm">
          <div class="border-b border-slate-200/70 p-6">
            <div class="flex items-center gap-3">
              <img src="/1.ico" alt="probuild" class="h-10 w-auto" />
              <div>
                <h2 class="text-xl font-extrabold text-slate-900">เข้าสู่ระบบ</h2>
                <p class="text-sm text-slate-600">กรอก User และ Password เพื่อเข้าใช้งาน</p>
              </div>
            </div>
          </div>

          <form class="space-y-4 p-6" @submit.prevent="onLogin">
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">User (Email)</label>
              <input
                v-model.trim="email"
                type="email"
                autocomplete="username"
                placeholder="เช่น user@email.com"
                class="h-11 w-full rounded-xl border border-slate-300 bg-slate-100 px-3 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                :disabled="loading"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">Password</label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPw ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="••••••••"
                  class="h-11 w-full rounded-xl border border-slate-300 bg-slate-100 px-3 pr-20 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  :disabled="loading"
                />
                <button
                  type="button"
                  class="absolute right-2 top-1/2 h-8 -translate-y-1/2 rounded-md px-3 text-sm font-semibold text-slate-600 hover:bg-slate-200/70"
                  @click="showPw = !showPw"
                  :disabled="loading"
                >
                  {{ showPw ? "ซ่อน" : "ดู" }}
                </button>
              </div>
            </div>

            <div v-if="errorMsg" class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {{ errorMsg }}
            </div>

            <button
              type="submit"
              class="h-11 w-full rounded-full bg-[#0B4AA2] font-bold text-white shadow-sm transition-colors hover:bg-[#083A7E] active:bg-[#062B5D] disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="loading"
            >
              <span v-if="!loading">เข้าสู่ระบบ</span>
              <span v-else class="inline-flex items-center gap-2">
                <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"></span>
                กำลังเข้าสู่ระบบ...
              </span>
            </button>

            <div class="flex items-center justify-between pt-2 text-sm">
              <NuxtLink to="/" class="text-slate-500 hover:text-[#0B4AA2]">← กลับหน้าแรก</NuxtLink>
              <NuxtLink to="/signup" class="font-semibold text-[#0B4AA2] hover:text-[#083A7E]">
                ยังไม่มีบัญชี? สมัครสมาชิก
              </NuxtLink>
            </div>
          </form>
        </div>

        <p class="mt-4 text-center text-xs text-slate-300">© {{ new Date().getFullYear() }} probuild</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute } from "vue-router"

useHead({ title: "Login | probuild" })

const route = useRoute()
const redirectTo = computed(() => {
  const r = route.query.redirect
  return typeof r === "string" && r.startsWith("/") ? r : "/admin/projects-local"
})

const email = ref("")
const password = ref("")
const showPw = ref(false)

const loading = ref(false)
const errorMsg = ref("")

const { signIn } = useAuth()

const onLogin = async () => {
  errorMsg.value = ""

  if (!email.value || !password.value) {
    errorMsg.value = "กรุณากรอก Email และ Password"
    return
  }

  loading.value = true
  try {
    const { error } = await signIn(email.value, password.value)
    if (error) {
      errorMsg.value = error.message || "เข้าสู่ระบบไม่สำเร็จ"
      return
    }
    await navigateTo(redirectTo.value)
  } catch (e: any) {
    errorMsg.value = e?.message || "เข้าสู่ระบบไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}
</script>
