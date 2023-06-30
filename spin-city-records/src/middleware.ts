import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/", "/api/trpc/collections.getById", "/api/trpc/albums.getAll", "/api/trpc/collections.getById,albums.getAll", "/sign-in"]
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};