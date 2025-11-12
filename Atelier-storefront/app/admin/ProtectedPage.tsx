import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'

export default async function ProtectedPage({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAdminAuthenticated()
  
  if (!authenticated) {
    redirect('/admin/login')
  }
  
  return <>{children}</>
}

