import { getPageContent } from "@/app/actions/content-actions"
import { ContentEditor } from "@/components/admin/content-editor"
import { notFound } from "next/navigation"

export default async function EditContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPageContent(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Content: {page.title}</h1>
      <ContentEditor slug={page.slug} initialContent={page.content} />
    </div>
  )
}
