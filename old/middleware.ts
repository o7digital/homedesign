import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  return new NextResponse(
    "<html><head><title>404 - No encontrado</title></head><body style='display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#111;color:#fff;'><h1>404</h1><p style='margin-top:20px;font-size:18px;'>El recurso solicitado no existe.</p></body></html>",
    {
      status: 404,
      headers: {
        "content-type": "text/html",
      },
    }
  );
}
