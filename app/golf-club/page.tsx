import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPageContent } from "@/app/actions/content-actions"

export default async function ClubDeGolfPage() {
  const pageContent = await getPageContent('golf-club')
  const content = pageContent ? JSON.parse(pageContent.content) : {}

  const heroTitle = content.heroTitle || 'GOLF CLUB'
  const heroSubtitle = content.heroSubtitle || 'A unique experience designed by Rees Jones'
  const heroImage = content.heroImage || 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop'
  
  const designerTitle = content.designerTitle || 'WORLD CLASS DESIGN'
  const designerText1 = content.designerText1 || 'TPC Danzante Bay is a brilliant, multi-themed 18-hole masterpiece designed by legendary architect Rees Jones. The course takes you on a diverse journey through valleys, arroyos, dunes, and foothills, offering spectacular views on every shot.'
  const designerText2 = content.designerText2 || 'Each hole presents a unique challenge and incomparable beauty, integrating perfectly with the natural surroundings of the Sierra de la Giganta and the Sea of Cortez.'
  const designerImage = content.designerImage || 'https://images.unsplash.com/photo-1592919505780-30395071e867?q=80&w=1974&auto=format&fit=crop'
  
  const detailsTitle = content.detailsTitle || 'COURSE DETAILS'
  const grassType = content.grassType || 'Paspalum SeaDwarf throughout the course, ensuring superior playing conditions and sustainability.'
  const facilities = content.facilities || 'Full Pro Shop, practice area, 9-hole putting course, and clubhouse with restaurant.'
  const signatureHole = content.signatureHole || 'Hole 17, a spectacular par 3 situated on a cliff overlooking the Sea of Cortez.'

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-black text-white">
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

        {/* Designer Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={designerImage} 
                  alt="Golf Course Detail" 
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6 text-blue-900">{designerTitle}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {designerText1}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {designerText2}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="border-l-4 border-blue-900 pl-4">
                    <span className="block text-3xl font-bold text-blue-900">18</span>
                    <span className="text-sm text-gray-500 uppercase tracking-wider">Holes</span>
                  </div>
                  <div className="border-l-4 border-blue-900 pl-4">
                    <span className="block text-3xl font-bold text-blue-900">72</span>
                    <span className="text-sm text-gray-500 uppercase tracking-wider">Par</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Details */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-12 text-blue-900">{detailsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Grass Type</h3>
                <p className="text-gray-600">{grassType}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Facilities</h3>
                <p className="text-gray-600">{facilities}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Signature Hole</h3>
                <p className="text-gray-600">{signatureHole}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 bg-blue-900 text-white text-center">
          <div className="container px-4">
            <h2 className="text-3xl font-serif font-bold mb-6">READY FOR THE CHALLENGE?</h2>
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-serif tracking-widest">
              <Link href="/booking/tpc-danzante-bay">BOOK TEE TIME</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
