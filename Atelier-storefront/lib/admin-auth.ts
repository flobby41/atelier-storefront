import { cookies } from 'next/headers'

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-auth')
  return authCookie?.value === 'authenticated'
}

export async function requireAdminAuth() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    throw new Error('Unauthorized')
  }
}

