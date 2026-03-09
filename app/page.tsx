export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getPageContent } from "@/app/actions/content-actions"

export default async function Home() {
  const fields = await prisma.golfField.findMany({
    where: { isActive: true },
  })

  // We are focusing on TPC Danzante Bay for this "solid" version
  const featuredField = fields.find(f => f.name.includes("Danzante")) || fields[0]

  // Fetch dynamic content
  const pageContent = await getPageContent('home')
  const content = pageContent ? JSON.parse(pageContent.content) : {}

  // Fallback values
  const heroTitle = content.heroTitle || 'WELCOME TO TPC DANZANTE BAY'
  const heroSubtitle = content.heroSubtitle || 'Play where the pros play'
  const heroImage = content.heroImage || (featuredField?.imageUrl || 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop')
  
  const introTitle = content.introTitle || 'AN 18-HOLE MASTERPIECE SHOWCASING THE PARADISIACAL VIEWS OF LORETO BAY.'
  const introText1 = content.introText1 || 'In a dazzling world-class location stretching along the east coast of the Baja California peninsula, near the magical town of Loreto, Mexico; Rees Jones has designed TPC Danzante Bay, a brilliant and multi-themed 18-hole golf course that takes you through valleys, arroyos, dunes, and foothills.'
  const introText2 = content.introText2 || 'The majestic Loreto golf course features spectacular landscapes showcasing the natural beauty of the region. From every angle, the breathtaking views of the Islands of Loreto and the Sierra de la Giganta mountain range will take your breath away.'
  
  const experienceTitle = content.experienceTitle || 'EXPERIENCE TPC DANZANTE BAY'
  const experienceSubtitle = content.experienceSubtitle || 'A different challenge for everyone'
  const experienceText = content.experienceText || 'The par-72 golf course in Loreto offers a different challenge for golfers of all abilities, providing a diversity of holes on the beach, cliffs, and canyons. The 17th hole has already gained fame as one of the most beautiful holes in the game.'
  const experienceImage = content.experienceImage || 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop'

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-black">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Using a high quality golf course image as background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="relative z-20 container h-full flex flex-col justify-center items-center text-center text-white px-4">
          <span className="uppercase tracking-[0.2em] text-sm mb-4">{heroSubtitle}</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 max-w-4xl leading-tight">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mb-8 opacity-90">
            Be among the first to discover the only TPC golf course in Mexico
          </p>
          <div className="flex gap-4">
             <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-serif">
               <Link href={`/booking/${featuredField?.id || 'tpc-danzante-bay'}`}>BOOK NOW</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-background text-foreground">
        <div className="container px-4 md:px-6 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <span className="text-2xl text-muted-foreground">◈◈◈</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase mb-8 leading-snug">
            {introTitle}
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {introText1}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {introText2}
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{experienceTitle}</h2>
            <div className="w-24 h-1 bg-primary mx-auto opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <h3 className="text-2xl font-serif font-bold">{experienceSubtitle}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {experienceText}
              </p>
              
              <div className="mt-8">
                <h4 className="font-bold text-lg mb-4 uppercase tracking-wider">Golf Services</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    <span>Pro Shop</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    <span>Practice Area</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    <span>Putting course (18 holes)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    <span>Club Rental</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
               <img 
                 src={experienceImage} 
                 alt="TPC Danzante Bay Landscape" 
                 className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
               />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
