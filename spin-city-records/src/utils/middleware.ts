import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import { NextResponse } from "next/server";
// export default withClerkMiddleware(() => {
//   return NextResponse.next();
// });
// // Stop Middleware running on static files
// export const config = {
//   matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
// };