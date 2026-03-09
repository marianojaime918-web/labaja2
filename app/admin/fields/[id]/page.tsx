export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function EditFieldPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const field = await prisma.golfField.findUnique({
    where: { id },
    include: {
      availabilities: {
        orderBy: { dayOfWeek: 'asc' }
      }
    }
  })

  if (!field) {
    return notFound()
  }

  // Pre-fill availability for all days (0-6)
  const availabilities = Array.from({ length: 7 }, (_, i) => {
    const existing = field.availabilities.find(a => a.dayOfWeek === i)
    return existing || {
      dayOfWeek: i,
      startTime: "08:00",
      endTime: "18:00",
      intervalMinutes: 15,
      isActive: false
    }
  })

  async function updateField(formData: FormData) {
    "use server"
    
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const imageUrl = formData.get("imageUrl") as string
    const price = Number(formData.get("price"))
    const isActive = formData.get("isActive") === "on"
    const maxPlayers = Number(formData.get("maxPlayers"))

    // Update Field Details
    await prisma.golfField.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        pricePerPlayer: price,
        maxPlayers,
        isActive,
      },
    })

    // Update Availabilities
    for (let i = 0; i < 7; i++) {
      const dayActive = formData.get(`day_${i}_active`) === "on"
      const startTime = formData.get(`day_${i}_start`) as string
      const endTime = formData.get(`day_${i}_end`) as string
      const interval = Number(formData.get(`day_${i}_interval`))

      if (dayActive) {
        await prisma.availability.upsert({
          where: {
            fieldId_dayOfWeek: {
              fieldId: id,
              dayOfWeek: i
            }
          },
          update: {
            startTime,
            endTime,
            intervalMinutes: interval,
            isActive: true
          },
          create: {
            fieldId: id,
            dayOfWeek: i,
            startTime,
            endTime,
            intervalMinutes: interval,
            isActive: true
          }
        })
      } else {
        // If unchecked, mark as inactive
        await prisma.availability.updateMany({
          where: {
            fieldId: id,
            dayOfWeek: i
          },
          data: { isActive: false }
        })
      }
    }

    revalidatePath("/admin/fields")
    revalidatePath(`/admin/fields/${id}`)
    redirect("/admin/fields")
  }

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Edit Field: {field.name}</h2>
        <Button variant="outline" asChild><a href="/admin/fields">Cancel</a></Button>
      </div>
      
      <form action={updateField} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Field Details */}
        <div className="space-y-6 bg-card border rounded-lg p-6 shadow-sm h-fit">
          <h3 className="text-xl font-semibold border-b pb-2">General Details</h3>
          
          <div>
            <Label htmlFor="name" className="mb-2 block">Field Name</Label>
            <Input id="name" name="name" defaultValue={field.name} required />
          </div>

          <div>
            <Label htmlFor="description" className="mb-2 block">Description</Label>
            <Textarea id="description" name="description" defaultValue={field.description || ""} rows={4} />
          </div>

          <div>
            <Label htmlFor="imageUrl" className="mb-2 block">Image URL</Label>
            <Input id="imageUrl" name="imageUrl" defaultValue={field.imageUrl || ""} />
            {field.imageUrl && (
              <div className="mt-2 relative h-32 w-full rounded-md overflow-hidden border">
                <img src={field.imageUrl} alt="Preview" className="object-cover w-full h-full" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="mb-2 block">Price ($)</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                defaultValue={Number(field.pricePerPlayer)} 
                step="0.01"
                required
              />
            </div>
            <div>
              <Label htmlFor="maxPlayers" className="mb-2 block">Max. Players</Label>
              <Input 
                id="maxPlayers" 
                name="maxPlayers" 
                type="number" 
                defaultValue={field.maxPlayers} 
                min="1"
                max="4"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2 bg-muted/20 p-3 rounded-md">
            <input 
              type="checkbox" 
              id="isActive" 
              name="isActive" 
              defaultChecked={field.isActive}
              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
            />
            <Label htmlFor="isActive" className="cursor-pointer font-medium">Active Field (Visible to public)</Label>
          </div>
        </div>

        {/* Right Column: Availability */}
        <div className="space-y-6 bg-card border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold border-b pb-2">Weekly Availability</h3>
          <p className="text-sm text-muted-foreground mb-4">Configure opening hours for each day.</p>
          
          <div className="space-y-4">
            {availabilities.map((avail, index) => (
              <div key={index} className="p-4 border rounded-md bg-background hover:bg-muted/5 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id={`day_${index}_active`} 
                      name={`day_${index}_active`} 
                      defaultChecked={avail.isActive}
                      className="h-4 w-4 rounded border-gray-300 accent-primary"
                    />
                    <Label htmlFor={`day_${index}_active`} className="font-semibold">{days[index]}</Label>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 pl-6">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Opening</Label>
                    <Input 
                      type="time" 
                      name={`day_${index}_start`} 
                      defaultValue={avail.startTime} 
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Closing</Label>
                    <Input 
                      type="time" 
                      name={`day_${index}_end`} 
                      defaultValue={avail.endTime} 
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Interval (min)</Label>
                    <Input 
                      type="number" 
                      name={`day_${index}_interval`} 
                      defaultValue={avail.intervalMinutes} 
                      min="10"
                      step="5"
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 sticky bottom-6 z-10">
          <Button type="submit" size="lg" className="w-full shadow-lg text-lg">Save All Changes</Button>
        </div>
      </form>
    </div>
  )
}
