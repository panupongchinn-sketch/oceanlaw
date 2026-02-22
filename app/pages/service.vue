<template>
  <div class="relative -mx-4 -my-8 min-h-[calc(100vh-120px)] overflow-hidden sm:-mx-6 lg:-mx-10">
    <section class="relative isolate overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('/16f347af2bafc6631b753cff99d30010.jpg');"
        aria-hidden="true"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/82 to-blue-950/70"
        aria-hidden="true"
      ></div>
      <div class="industrial-grid absolute inset-0 opacity-25" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div class="max-w-3xl">
          <p class="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            Sports Construction Services
          </p>
          <h1 class="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            บริการวิศวกรรมและผลงานโครงการสนามกีฬา
          </h1>
          <p class="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
            ออกแบบ ติดตั้ง และดูแลระบบสนามกีฬา พร้อมแสดงผลงานโครงการจริงเพื่อใช้ประกอบการตัดสินใจและขอใบเสนอราคา
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/contact"
              class="inline-flex h-11 items-center rounded-full bg-[#0B4AA2] px-6 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#083A7E]"
            >
              ขอใบเสนอราคา
            </NuxtLink>
            <a
              href="#projects"
              class="inline-flex h-11 items-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              ดูผลงานโครงการ
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="bg-slate-100 px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
      <div class="mx-auto max-w-7xl">
        <div class="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-2xl font-extrabold tracking-tight text-slate-900">ผลงานโครงการ</h2>
            <p class="mt-1 text-sm text-slate-600">ตัวอย่างงานติดตั้งและปรับปรุงสนามกีฬาจากข้อมูลที่บันทึกในระบบ</p>
          </div>

          <div class="flex items-center gap-2 text-xs sm:text-sm">
            <span class="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700">
              ทั้งหมด {{ projects.length }} โครงการ
            </span>
            <button
              type="button"
              class="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:text-sm"
              @click="loadProjects"
            >
              รีเฟรช
            </button>
          </div>
        </div>

        <div v-if="loadingProjects" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="n in 3"
            :key="`project-skeleton-${n}`"
            class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div class="aspect-[16/10] animate-pulse bg-slate-200"></div>
            <div class="space-y-3 p-4">
              <div class="h-5 w-3/4 animate-pulse rounded bg-slate-200"></div>
              <div class="h-4 w-full animate-pulse rounded bg-slate-100"></div>
              <div class="h-4 w-5/6 animate-pulse rounded bg-slate-100"></div>
            </div>
          </div>
        </div>

        <div v-else-if="projectError" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
          <div class="font-bold">โหลดผลงานโครงการไม่สำเร็จ</div>
          <div class="mt-1 text-sm">{{ projectError }}</div>
        </div>

        <div
          v-else-if="!featuredProjects.length"
          class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm"
        >
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 11h8m-8 4h5" />
            </svg>
          </div>
          <div class="mt-4 text-lg font-extrabold text-slate-900">ยังไม่มีผลงานโครงการในระบบ</div>
          <p class="mt-2 text-sm text-slate-500">สามารถเพิ่มข้อมูลจากหน้าแอดมิน เพื่อให้หน้า Service แสดงผลงานอัตโนมัติ</p>
          <NuxtLink
            to="/admin/projects-local"
            class="mt-4 inline-flex h-10 items-center rounded-lg bg-[#0B4AA2] px-4 text-sm font-bold text-white hover:bg-[#083A7E]"
          >
            ไปหน้าเพิ่มโปรเจค
          </NuxtLink>
        </div>

        <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <NuxtLink
            v-for="project in featuredProjects"
            :key="project.id"
            :to="`/project/${project.id}`"
            class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                :src="projectCover(project) || fallbackImg"
                :alt="project.name"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
                @error="onImgError"
              />
              <div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
              <div class="absolute left-3 top-3 flex flex-wrap gap-2 text-[11px] font-bold">
                <span v-if="project.category" class="rounded-full bg-white/90 px-2.5 py-1 text-slate-700">
                  {{ project.category }}
                </span>
                <span v-if="project.status" :class="statusClass(project.status)">
                  {{ statusText(project.status) }}
                </span>
              </div>
            </div>

            <div class="space-y-3 p-4">
              <div>
                <h3 class="line-clamp-2 text-lg font-extrabold leading-snug text-slate-900">
                  {{ project.name }}
                </h3>
                <p class="mt-1 text-xs text-slate-500">
                  อัปเดตล่าสุด {{ formatDate(project.updatedAt || project.createdAt) }}
                </p>
              </div>

              <p class="line-clamp-3 text-sm leading-relaxed text-slate-600">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-2 text-xs">
                <span
                  v-if="project.client"
                  class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-blue-700"
                >
                  ลูกค้า: {{ project.client }}
                </span>
                <span
                  v-if="project.imageDataUrls?.length && project.imageDataUrls.length > 1"
                  class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700"
                >
                  {{ project.imageDataUrls.length }} รูป
                </span>
              </div>

              <div class="pt-1">
                <span class="inline-flex items-center gap-2 text-sm font-bold text-[#0B4AA2] group-hover:text-[#083A7E]">
                  ดูรายละเอียดโครงการ
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-white px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
      <div class="mx-auto max-w-7xl">
        <div class="mb-7">
          <h2 class="text-2xl font-extrabold tracking-tight text-slate-900">ขอบเขตบริการหลัก</h2>
          <p class="mt-1 text-sm text-slate-600">บริการแบบ Turnkey สำหรับสนามกีฬาและพื้นที่กิจกรรม</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="service in services"
            :key="service.title"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#0B4AA2]">
              <span class="text-sm font-extrabold">{{ service.short }}</span>
            </div>
            <h3 class="mt-4 text-base font-extrabold text-slate-900">{{ service.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ service.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-slate-50 px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
      <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <h2 class="text-2xl font-extrabold tracking-tight text-slate-900">ขั้นตอนการทำงาน</h2>
          <p class="mt-1 text-sm text-slate-600">กระบวนการชัดเจน ตรวจสอบความคืบหน้าได้ทุกช่วงงาน</p>

          <div class="mt-6 space-y-3">
            <div
              v-for="(step, idx) in workflow"
              :key="step.title"
              class="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B4AA2] text-xs font-extrabold text-white">
                {{ idx + 1 }}
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900">{{ step.title }}</h3>
                <p class="mt-1 text-sm text-slate-600">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-lg">
            <h3 class="text-lg font-extrabold">ทำไมลูกค้ากลุ่มสนามกีฬาเลือกเรา</h3>

            <ul class="mt-4 space-y-3 text-sm text-slate-200">
              <li
                v-for="item in highlights"
                :key="item"
                class="flex items-start gap-3"
              >
                <span class="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-300"></span>
                <span>{{ item }}</span>
              </li>
            </ul>

            <NuxtLink
              to="/contact"
              class="mt-6 inline-flex h-10 items-center rounded-lg bg-cyan-400 px-4 text-sm font-bold text-slate-900 transition hover:bg-cyan-300"
            >
              ปรึกษาทีมวิศวกร
            </NuxtLink>
          </div>

          <div class="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h4 class="text-sm font-extrabold text-slate-900">Service Coverage</h4>
            <p class="mt-2 text-sm text-slate-600">
              รองรับงานติดตั้งและบำรุงรักษาสนามกีฬาทั่วประเทศ พร้อมทีมซัพพอร์ตหลังส่งมอบและแผนดูแลระยะยาว
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

useHead({
  title: 'บริการ | probuild',
})

type ProjectStatus = 'draft' | 'doing' | 'done'

type ProjectRow = {
  id: string
  name: string
  description: string
  category?: string
  client?: string
  status?: ProjectStatus | string
  imageDataUrl?: string
  imageDataUrls?: string[]
  createdAt: string
  updatedAt: string
}

const PROJECTS_KEY = 'projects'
const { getValue } = useSharedStore()
const fallbackImg = '/f248d603c9559d3dff1bb684011d9ae2.jpg'

const projects = ref<ProjectRow[]>([])
const loadingProjects = ref(true)
const projectError = ref('')

const services = [
  {
    short: '01',
    title: 'ออกแบบระบบและงานสนามกีฬา',
    description: 'วิเคราะห์หน้างาน ออกแบบสเปกวัสดุและระบบให้เหมาะกับประเภทการใช้งานจริง',
  },
  {
    short: '02',
    title: 'ติดตั้งและควบคุมคุณภาพ',
    description: 'ติดตั้งโดยทีมงานมืออาชีพ พร้อมตรวจสอบมาตรฐานและความเรียบร้อยก่อนส่งมอบ',
  },
  {
    short: '03',
    title: 'Maintenance & Overhaul',
    description: 'บำรุงรักษาเชิงป้องกันและปรับปรุงสนามเดิมเพื่อยืดอายุการใช้งาน',
  },
  {
    short: '04',
    title: 'Energy & Safety Upgrade',
    description: 'ปรับปรุงความปลอดภัย แสงสว่าง และองค์ประกอบที่เกี่ยวข้องกับมาตรฐานสนามกีฬา',
  },
]

const workflow = [
  {
    title: 'สำรวจหน้างานและเก็บ Requirement',
    description: 'เข้าหน้างาน วิเคราะห์ข้อจำกัด และกำหนดเป้าหมายร่วมกับลูกค้า',
  },
  {
    title: 'ออกแบบและวางแผนดำเนินงาน',
    description: 'จัดทำแบบ แนวทางวัสดุ และแผนงานให้สอดคล้องกับเวลาการใช้งานพื้นที่',
  },
  {
    title: 'ติดตั้ง ทดสอบ และส่งมอบ',
    description: 'ติดตั้งตามมาตรฐาน พร้อมตรวจสอบคุณภาพก่อนเปิดใช้งานจริง',
  },
  {
    title: 'ดูแลหลังส่งมอบ',
    description: 'แนะนำการดูแลรักษา พร้อมบริการบำรุงรักษาและซัพพอร์ตต่อเนื่อง',
  },
]

const highlights = [
  'ทีมงานมีประสบการณ์งานติดตั้งสนามกีฬาและงานปรับปรุงพื้นที่จริง',
  'วางแผนงานร่วมกับลูกค้าเพื่อลดผลกระทบต่อการใช้งานพื้นที่',
  'มีรายงานความคืบหน้าและเอกสารส่งมอบชัดเจนตลอดโครงการ',
  'รองรับการดูแลระยะยาวและแผนบำรุงรักษาตามความต้องการ',
]

const featuredProjects = computed(() => {
  return [...projects.value]
    .sort((a, b) => {
      const ta = new Date(a.updatedAt || a.createdAt || 0).getTime()
      const tb = new Date(b.updatedAt || b.createdAt || 0).getTime()
      return tb - ta
    })
    .slice(0, 6)
})

const loadProjects = async () => {
  loadingProjects.value = true
  projectError.value = ''
  try {
    const rows = await getValue<ProjectRow>(PROJECTS_KEY)
    projects.value = Array.isArray(rows) ? (rows as ProjectRow[]) : []
  } catch (err: any) {
    projectError.value = err?.message || 'Failed to load projects'
    projects.value = []
  } finally {
    loadingProjects.value = false
  }
}

const projectCover = (p: ProjectRow) => {
  if (Array.isArray(p.imageDataUrls) && p.imageDataUrls.length) return p.imageDataUrls[0] || ''
  return p.imageDataUrl || ''
}

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const statusText = (status?: string) => {
  switch ((status || '').toLowerCase()) {
    case 'done':
      return 'เสร็จแล้ว'
    case 'doing':
      return 'กำลังดำเนินการ'
    case 'draft':
      return 'ร่าง'
    default:
      return status || 'ไม่ระบุ'
  }
}

const statusClass = (status?: string) => {
  const v = (status || '').toLowerCase()
  if (v === 'done') return 'rounded-full bg-emerald-500/95 px-2.5 py-1 text-white shadow'
  if (v === 'doing') return 'rounded-full bg-amber-400/95 px-2.5 py-1 text-slate-900 shadow'
  return 'rounded-full bg-slate-900/80 px-2.5 py-1 text-white shadow'
}

const formatDate = (iso?: string) => {
  if (!iso) return '-'
  try {
    return new Date(iso).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
.industrial-grid {
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.17) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.17) 1px, transparent 1px);
  background-size: 44px 44px;
  background-position: center;
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
</style>
