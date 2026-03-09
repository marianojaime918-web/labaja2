import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Link from "next/link"

export default function NewFieldPage() {
  async function createField(formData: FormData) {
    "use server"
    
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const imageUrl = formData.get("imageUrl") as string
    const maxPlayers = Number(formData.get("maxPlayers"))
    const pricePerPlayer = Number(formData.get("pricePerPlayer"))

    await prisma.golfField.create({
      data: {
        name,
        description,
        imageUrl,
        maxPlayers,
        pricePerPlayer,
        isActive: true,
      },
    })

    revalidatePath("/admin/fields")
    redirect("/admin/fields")
  }

  return (
    <div className="max-w-2xl mx-auto bg-card border rounded-lg p-6 shadow-sm">
      <h1 className="text-3xl font-bold mb-6">New Golf Course</h1>
      
      <form action={createField} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Course Name</Label>
          <Input id="name" name="name" required placeholder="e.g. Ocean Course" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required placeholder="Course description..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxPlayers">Max Players</Label>
            <Input id="maxPlayers" name="maxPlayers" type="number" required defaultValue={4} min={1} max={8} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerPlayer">Price per Player</Label>
            <Input id="pricePerPlayer" name="pricePerPlayer" type="number" required placeholder="0.00" step="0.01" min={0} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" required placeholder="https://..." />
          <p className="text-sm text-muted-foreground">URL of the main image for the course</p>
        </div>

        <div className="flex gap-4">
          <Button type="submit">Create Course</Button>
          <Button variant="outline" asChild>
            <Link href="/admin/fields">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
