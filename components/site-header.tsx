import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex flex-col items-center border border-white p-1 rounded-sm">
             <span className="text-xl font-serif font-bold tracking-widest">TPC</span>
             <span className="text-[0.6rem] tracking-widest">DANZANTE BAY</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide">
          <Link href="/golf-club" className="hover:text-primary transition-colors">GOLF CLUB</Link>
          <Link href="/location" className="hover:text-primary transition-colors">LOCATION</Link>
          <Link href="/gallery" className="hover:text-primary transition-colors">GALLERY</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="text-black bg-white hover:bg-gray-200 border-none font-semibold">
            <Link href="/booking/tpc-danzante-bay">BOOK TEE TIME</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
