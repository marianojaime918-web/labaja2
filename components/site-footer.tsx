import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">TPC DANZANTE BAY</h3>
            <p className="text-gray-400 text-sm">
              An 18-hole masterpiece showcasing the paradisiacal views of Loreto Bay.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">Loreto, Baja California Sur</p>
            <p className="text-gray-400 text-sm">Mexico</p>
            <p className="text-gray-400 text-sm mt-2">+52 (613) 134 1000</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white">Terms and Conditions</Link></li>
              <li><Link href="#" className="hover:text-white">Sitemap</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Social Icons would go here */}
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">F</div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">I</div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">T</div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} TPC Danzante Bay. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
