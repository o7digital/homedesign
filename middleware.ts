import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // Permite solo la página /suspendido
  if (!url.pathname.startsWith('/suspendido')) {
    url.pathname = '/suspendido'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
