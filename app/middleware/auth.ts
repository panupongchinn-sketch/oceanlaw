export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return

  const { getSession } = useAuth()

  // normalize path กันเคส /oceanlogin/ หรือ /admin/products/
  const path = (to.path || "/").replace(/\/+$/, "") || "/"

  // ✅ หน้าที่ “ต้องล็อกอิน” (เพิ่มได้ตามต้องการ)
  const protectedPrefixes = ["/admin"]
  const isProtectedRoute = protectedPrefixes.some(
    (p) => path === p || path.startsWith(p + "/")
  )

  // ✅ หน้าสาธารณะ (เข้าดูได้)
  const authPages = ["/login", "/oceanlogin", "/signup"]
  const isAuthPage = authPages.includes(path)

  const { session } = await getSession()

  // ถ้าไม่ล็อกอิน แล้วเข้าหน้า protected → ไป oceanlogin
  if (!session && isProtectedRoute) {
    return navigateTo("/oceanlogin")
  }

  // ถ้าล็อกอินแล้ว แต่จะไป login/oceanlogin/signup → เด้งไปหน้าคอร์สของฉัน (หรือจะเป็น "/" ก็ได้)
  if (session && isAuthPage) {
    return navigateTo("/admin/products")
  }
})

