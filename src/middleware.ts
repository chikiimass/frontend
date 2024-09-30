import { NextResponse } from 'next/server'

export default function middleware() {
  return NextResponse.next({
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  })
}

// The matcher now includes both the static route `/video` and any dynamic routes under `/video/[id]`.
export const config = {
  matcher: ['/', '/video', '/video/:id*'],
}
