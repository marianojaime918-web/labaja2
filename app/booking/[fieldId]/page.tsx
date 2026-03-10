export const dynamic = 'force-dynamic'
import { notFound } from "next/navigation"
import { BookingForm } from "@/components/booking-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default async function BookingPage({
  params,
}: {
  params: Promise<{ fieldId: string }>
}) {
  const { fieldId } = await params

  const { prisma } = await import("@/lib/prisma")
  const field = await prisma.golfField.findUnique({
    where: { id: fieldId },
  })

  if (!field) {
    return notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      
      {/* Hero Banner */}
      <div className="relative h-64 w-full bg-black overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${field.imageUrl}')` }}
        />
        <div className="relative z-10 container h-full flex items-end pb-8 px-4 text-white">
           <h1 className="text-5xl font-serif font-bold">Golf</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Info Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-blue-700 font-serif font-bold text-lg mb-4 text-center border-b pb-2">BEFORE YOU BOOK:</h3>
              
              <div className="text-sm text-gray-600 space-y-4 text-justify font-serif">
                <p>
                  If you have a golf membership or prepaid stay&play package at {field.name}, please enter the promo code "PREPAID" as you proceed to book now your tee time. If you have a TPC Danzante Bay Membership, please enter the promo code "VILLAMEMBER" as you proceed to book now your tee time. Payment in advance is not required at this time.
                </p>
                
                <p className="italic font-bold text-gray-800">
                  June 15-30 and August 15-30, 2026: Semi-Annual Aerification Process - Please be advised that nine (9) holes will be available for play with course recovery to follow. A special 50% OFF to our standard rate will be offered during this time. A 20% discount will apply to our standard rate during the 10 days following the treatment.
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="border-2 border-blue-900 rounded-lg p-2 w-32 h-40 flex items-center justify-center">
                   {/* Logo Placeholder */}
                   <div className="text-center">
                     <span className="block text-4xl font-serif font-bold text-red-600">T</span>
                     <span className="block text-4xl font-serif font-bold text-blue-900">P</span>
                     <span className="block text-4xl font-serif font-bold text-blue-900">C</span>
                   </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <h4 className="font-serif font-bold tracking-widest text-blue-900">DANZANTE BAY</h4>
                <p className="text-xs text-blue-700">AT THE ISLANDS OF LORETO, MEXICO</p>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <BookingForm
                fieldId={field.id}
                pricePerPlayer={Number(field.pricePerPlayer)}
                maxPlayers={field.maxPlayers}
              />
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
