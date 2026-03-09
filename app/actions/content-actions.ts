'use server'

import { revalidatePath } from "next/cache"

export async function getPageContent(slug: string) {
  const { prisma } = await import("@/lib/prisma")
  const page = await prisma.pageContent.findUnique({
    where: { slug },
  })
  return page
}

export async function getAllPages() {
  const { prisma } = await import("@/lib/prisma")
  const pages = await prisma.pageContent.findMany({
    orderBy: { title: 'asc' }
  })
  return pages
}

export async function updatePageContent(slug: string, content: string) {
  try {
    // Validate JSON
    JSON.parse(content)
    
    const { prisma } = await import("@/lib/prisma")
    await prisma.pageContent.update({
      where: { slug },
      data: { content },
    })

    revalidatePath(`/${slug === 'home' ? '' : slug}`)
    revalidatePath(`/admin/content/${slug}`)
    return { success: true }
  } catch (error) {
    console.error("Error updating page content:", error)
    return { success: false, error: "Invalid content format or database error" }
  }
}
