import { auth } from "./auth"; // <-- adjust this path if your auth file is elsewhere
import { NextResponse } from "next/server";

export default auth((req) => {
  // Example: protect routes manually (optional)
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAuthPage = nextUrl.pathname.startsWith("/auth");

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // Continue normally
  return NextResponse.next();
});

// You can use config.matcher to select routes this middleware applies to
export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*"],
};
