export default defineNuxtRouteMiddleware((to) => {
  const path = to.path || "/"

  const isDisabledPage =
    path === "/product" ||
    path.startsWith("/product/") ||
    path === "/shades" ||
    path === "/promotions"

  if (isDisabledPage) {
    return navigateTo("/")
  }
})
