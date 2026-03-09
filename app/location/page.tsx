import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPageContent } from "@/app/actions/content-actions"

export default async function LocationPage() {
  const pageContent = await getPageContent('location')
  const content = pageContent ? JSON.parse(pageContent.content) : {}

  const heroTitle = content.heroTitle || 'GETTING HERE'
  const heroSubtitle = content.heroSubtitle || 'Your journey to the ultimate golf experience'
  const heroImage = content.heroImage || 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1788&auto=format&fit=crop'
  
  const locationTitle = content.locationTitle || 'PRIVILEGED LOCATION'
  const locationText = content.locationText || 'TPC Danzante Bay is located on the east coast of the Baja California Peninsula, just minutes from the charming Magical Town of Loreto. This destination offers a perfect blend of natural beauty and accessibility.'
  const flightsInfo = content.flightsInfo || 'Loreto International Airport (LTO) receives direct flights from Los Angeles (LAX), San Francisco (SFO), Phoenix (PHX), Dallas (DFW), and Tijuana (TIJ).'
  const transportInfo = content.transportInfo || 'We offer private transport service from the airport to the resort. The journey is approximately 30 minutes through desert and coastal landscapes.'
  
  const address = content.address || 'Carretera Transpeninsular Km 84, Ensenada Blanca, Loreto, Baja California Sur, Mexico'
  const phone = content.phone || '+52 (613) 134 1000'
  const email = content.email || 'golf@tpcdanzantebay.com'

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-black text-white">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="relative z-20 container h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{heroTitle}</h1>
            <p className="text-xl max-w-2xl font-light">{heroSubtitle}</p>
          </div>
        </section>

        {/* Location Info */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6 text-blue-900">{locationTitle}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {locationText}
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Direct Flights</h3>
                    <p className="text-gray-600">{flightsInfo}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ground Transportation</h3>
                    <p className="text-gray-600">{transportInfo}</p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px] shadow-inner relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.147636467385!2d-111.24646792404562!3d25.92383837722645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86b627999719323f%3A0xc6c769476b701257!2sTPC%20Danzante%20Bay!5e0!3m2!1sen!2smx!4v1716300000000!5m2!1sen!2smx" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 bg-gray-50 text-center">
          <div className="container px-4">
            <h2 className="text-3xl font-serif font-bold mb-8 text-blue-900">DIRECT CONTACT</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Address</h3>
                <p className="text-gray-600">{address}</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <p className="text-gray-600">{phone}</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
