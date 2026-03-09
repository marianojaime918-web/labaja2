export const dynamic = 'force-dynamic'
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getPageContent } from "@/app/actions/content-actions"

export default async function GalleryPage() {
  const pageContent = await getPageContent('gallery')
  const content = pageContent ? JSON.parse(pageContent.content) : {}

  const heroTitle = content.heroTitle || 'GALLERY'
  const heroSubtitle = content.heroSubtitle || 'Unforgettable moments at TPC Danzante Bay'
  
  const defaultImages = [
    { src: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop", alt: "Panoramic View" },
    { src: "https://images.unsplash.com/photo-1592919505780-30395071e867?q=80&w=1974&auto=format&fit=crop", alt: "Green Detail" },
    { src: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop", alt: "Sunset on the Course" },
    { src: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop", alt: "Hole 17" },
    { src: "https://images.unsplash.com/photo-1560159752-d61053676674?q=80&w=1974&auto=format&fit=crop", alt: "Clubhouse" },
    { src: "https://images.unsplash.com/photo-1593111774240-d529f12db460?q=80&w=2070&auto=format&fit=crop", alt: "Tournament" },
  ]

  const images = content.images || defaultImages

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-black text-white text-center">
          <div className="container px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{heroTitle}</h1>
            <p className="text-xl max-w-2xl mx-auto font-light text-gray-400">{heroSubtitle}</p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((img: any, index: number) => (
                <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] cursor-pointer">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all z-10" />
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-serif font-bold">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
