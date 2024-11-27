import { NextRequest, NextResponse } from 'next/server'
import { AuthTokens } from '@/types/auth.types'
import { UserTypes } from '@/types/user.types'
import Routes from '@/constants/routes'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const isAuthPage = url.pathname === Routes.Auth || url.pathname.startsWith(`${Routes.Auth}/`)
  const isAdminPage = url.pathname === Routes.Admin || url.pathname.startsWith(`${Routes.Admin}/`)
  const idToken = request.cookies.get(AuthTokens.ID_TOKEN)?.value
  const roleToken = request.cookies.get(AuthTokens.USER_ROLE)?.value
  const isAdmin: boolean = roleToken !== undefined && roleToken === UserTypes[0]

  if (!idToken && !isAuthPage) {
    url.pathname = Routes.Auth
    return NextResponse.redirect(url)
  }

  if (idToken && isAdmin && (!isAdminPage || isAuthPage)) {
    url.pathname = Routes.Admin
    return NextResponse.redirect(url)
  }

  if (idToken && !isAdmin && (isAdminPage || isAuthPage)) {
    url.pathname = Routes.Home
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auth/:path*', '/admin/:path*']
}
