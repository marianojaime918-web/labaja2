export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"
import { startOfDay, endOfDay, parse, addMinutes, format } from "date-fns"

export async function GET(request: Request) {
  const { prisma } = await import("@/lib/prisma")
  const { searchParams } = new URL(request.url)
  const fieldId = searchParams.get("fieldId")
  const dateString = searchParams.get("date") // YYYY-MM-DD

  if (!fieldId || !dateString) {
    return NextResponse.json({ error: "Missing fieldId or date" }, { status: 400 })
  }

  const date = parse(dateString, "yyyy-MM-dd", new Date())
  const dayOfWeek = date.getDay() // 0-6

  // Obtener disponibilidad base para ese día
  const availability = await prisma.availability.findUnique({
    where: {
      fieldId_dayOfWeek: {
        fieldId,
        dayOfWeek,
      },
    },
  })

  if (!availability || !availability.isActive) {
    return NextResponse.json({ slots: [] })
  }

  // Generar slots
  const slots = []
  let currentTime = parse(availability.startTime, "HH:mm", date)
  const endTime = parse(availability.endTime, "HH:mm", date)
  const interval = availability.intervalMinutes

  // Obtener reservas existentes
  const bookings = await prisma.booking.findMany({
    where: {
      fieldId,
      bookingDate: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
      status: {
        not: "CANCELLED",
      },
    },
  })

  // Set de horas ocupadas
  const bookedTimes = new Set(bookings.map((b) => format(b.bookingDate, "HH:mm")))

  while (currentTime < endTime) {
    const timeString = format(currentTime, "HH:mm")
    if (!bookedTimes.has(timeString)) {
      slots.push(timeString)
    }
    currentTime = addMinutes(currentTime, interval)
  }

  return NextResponse.json({ slots })
}
