import { NextRequest, NextResponse } from 'next/server'
import { AuthTokens } from '@/types/auth.types'
import Routes from '@/constants/routes'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const isAuthPage = url.pathname.includes(Routes.Auth)
  const token = request.cookies.get(AuthTokens.ID_TOKEN)?.value

  if ((!token && !isAuthPage) || (token && isAuthPage)) {
    url.pathname = !token ? Routes.Auth : Routes.Home
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auth']
}
