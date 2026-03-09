import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; booking_id?: string }>
}) {
  const { session_id, booking_id } = await searchParams

  if (!session_id || !booking_id) {
    return notFound()
  }

  const booking = await prisma.booking.findUnique({
    where: { id: booking_id },
    include: { field: true },
  })

  if (!booking) {
    return notFound()
  }

  // Actualizar a PAID para demo
  if (booking.status === "PENDING") {
    await prisma.booking.update({
      where: { id: booking_id },
      data: { status: "PAID" },
    })
  }

  return (
    <div className="container mx-auto py-16 text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-green-600">Booking Confirmed!</h1>
      <p className="text-lg mb-8 text-muted-foreground">Thank you for your booking. We have sent the details to your email.</p>
      
      <div className="bg-card border rounded-lg p-6 max-w-md mx-auto text-left shadow-sm">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Booking Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Course:</span>
            <span>{booking.field.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Date:</span>
            <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Time:</span>
            <span>{new Date(booking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Players:</span>
            <span>{booking.numberOfPlayers}</span>
          </div>
          <div className="flex justify-between pt-2 border-t mt-2">
            <span className="font-bold">Total Paid:</span>
            <span className="font-bold text-green-600">${Number(booking.totalPrice)}</span>
          </div>
        </div>
      </div>
      
      <a href="/" className="mt-8 inline-block text-primary hover:underline">Back to home</a>
    </div>
  )
}
