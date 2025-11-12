'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export function AdminLayoutWrapper({ 
  children, 
  sidebar 
}: { 
  children: ReactNode
  sidebar?: ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  // If on login page, return only children without layout
  if (isLoginPage) {
    return <>{children}</>
  }

  // Otherwise, return full layout with sidebar
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen relative">
          {sidebar}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

