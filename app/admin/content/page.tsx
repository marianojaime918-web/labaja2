export const dynamic = 'force-dynamic'
import { getAllPages } from "@/app/actions/content-actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ContentListPage() {
  const pages = await getAllPages()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      
      <div className="grid gap-4">
        {pages.map((page) => (
          <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
            <div>
              <h2 className="text-xl font-semibold">{page.title}</h2>
              <p className="text-sm text-muted-foreground">/{page.slug}</p>
            </div>
            <Button asChild>
              <Link href={`/admin/content/${page.slug}`}>Edit</Link>
            </Button>
          </div>
        ))}
        
        {pages.length === 0 && (
          <p className="text-muted-foreground">No pages configured. Run database seed.</p>
        )}
      </div>
    </div>
  )
}
