<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
    <div class="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p class="text-sm text-slate-500">??????????????????</p>
      <h1 class="mt-2 text-2xl font-extrabold text-slate-900">????????????? ????????????</h1>
      <NuxtLink
        to="/admin/products"
        class="mt-5 inline-flex h-10 items-center rounded-xl bg-[#166534] px-4 text-sm font-semibold text-white hover:bg-[#14532d]"
      >
        ?????? /admin/products
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] })
useHead({ title: "Admin | Works" })

onMounted(() => {
  navigateTo("/admin/products", { replace: true })
})
</script>
