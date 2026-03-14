// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  srcDir: "app",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    supabaseUrl: process.env.NUXT_SUPABASE_URL || process.env.SUPABASE_URL || "",
    supabaseServiceRoleKey:
      process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
  app: {
    head: {
      title: "Oceanlaw",
      link: [
        { rel: "icon", type: "image/jpeg", href: "/oceanlaw-logo.jpg?v=1" },
        { rel: "alternate icon", type: "image/x-icon", href: "/1.ico" },
      ],
    },
  },
  css: ["./assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
