"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function AdminHeader() {
  const pathname = usePathname()
  
  // Don't show header on login page
  if (pathname === "/admin/login") {
    return null
  }

  return (
    <header className="border-b bg-muted/40 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-lg">Admin Panel</h1>
        <nav className="flex gap-4 text-sm font-medium">
          <Link 
            href="/admin/bookings" 
            className={`hover:text-primary transition-colors ${pathname.startsWith('/admin/bookings') ? 'text-primary' : ''}`}
          >
            Bookings
          </Link>
          <Link 
            href="/admin/fields" 
            className={`hover:text-primary transition-colors ${pathname.startsWith('/admin/fields') ? 'text-primary' : ''}`}
          >
            Courses
          </Link>
          <Link 
            href="/admin/content" 
            className={`hover:text-primary transition-colors ${pathname.startsWith('/admin/content') ? 'text-primary' : ''}`}
          >
            Content
          </Link>
        </nav>
      </div>
      <Button variant="outline" size="sm" asChild>
         <Link href="/">Go to website</Link>
      </Button>
    </header>
  )
}
