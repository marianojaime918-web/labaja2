import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 })
    }
    const stripe = new Stripe(secretKey, {
      apiVersion: "2025-02-24.acacia" as any,
    })

    const body = await request.json()
    const { fieldId, date, time, players, customerName, customerEmail } = body

    if (!fieldId || !date || !time || !players || !customerName || !customerEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const field = await prisma.golfField.findUnique({
      where: { id: fieldId },
    })

    if (!field) {
      return NextResponse.json({ error: "Field not found" }, { status: 404 })
    }

    // Calcular precio total
    const totalPrice = Number(field.pricePerPlayer) * players

    // Crear fecha completa
    const bookingDate = new Date(`${date}T${time}:00`)

    // Crear reserva PENDING
    const booking = await prisma.booking.create({
      data: {
        fieldId,
        bookingDate,
        numberOfPlayers: players,
        totalPrice,
        customerName,
        customerEmail,
        status: "PENDING",
      },
    })

    // Crear sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Booking: ${field.name}`,
              description: `${date} at ${time} for ${players} players`,
              images: field.imageUrl ? [field.imageUrl] : [],
            },
            unit_amount: Math.round(Number(field.pricePerPlayer) * 100), // En centavos
          },
          quantity: players,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${booking.id}`,
      cancel_url: `${request.headers.get("origin")}/booking/${fieldId}?canceled=true`,
      metadata: {
        bookingId: booking.id,
      },
      customer_email: customerEmail,
    })

    // Actualizar reserva con sessionId
    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripeSessionId: session.id },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}
