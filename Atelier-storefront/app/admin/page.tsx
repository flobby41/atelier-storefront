import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import AdminDashboardClient from './AdminDashboardClient'

export default async function AdminDashboard() {
  const authenticated = await isAdminAuthenticated()
  
  if (!authenticated) {
    redirect('/admin/login')
  }
  
  return <AdminDashboardClient />
}

