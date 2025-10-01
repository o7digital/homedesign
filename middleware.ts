import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  return NextResponse.rewrite(new URL("/404", req.url));
}

export const config = {
  matcher: ["/:path*"],
};
