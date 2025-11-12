import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart,
  LogOut 
} from 'lucide-react'
import { AdminLayoutWrapper } from './AdminLayoutWrapper'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Don't check authentication here to avoid loop with /admin/login
  // Authentication will be checked in each protected page

  return (
    <AdminLayoutWrapper
      sidebar={
        <>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-8">Shopify Dashboard</h1>
            <nav className="space-y-2">
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/products">
                <Button variant="ghost" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Products
                </Button>
              </Link>
              <Link href="/admin/customers">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Customers
                </Button>
              </Link>
              <Link href="/admin/orders">
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Orders
                </Button>
              </Link>
            </nav>
          </div>
          <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200 dark:border-gray-700">
            <form action={async () => {
              'use server'
              const { cookies } = await import('next/headers')
              const cookieStore = await cookies()
              cookieStore.delete('admin-auth')
              redirect('/admin/login')
            }}>
              <Button type="submit" variant="ghost" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </>
      }
    >
      {children}
    </AdminLayoutWrapper>
  )
}

