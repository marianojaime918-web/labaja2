import Link from "next/link"
import { GolfField } from "@prisma/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FieldCardProps {
  field: GolfField
}

export function FieldCard({ field }: FieldCardProps) {
  return (
    <Card className="overflow-hidden">
      {field.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={field.imageUrl}
            alt={field.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{field.name}</CardTitle>
        <CardDescription>{field.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${Number(field.pricePerPlayer)} <span className="text-sm font-normal text-muted-foreground">/ player</span></div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/booking/${field.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
