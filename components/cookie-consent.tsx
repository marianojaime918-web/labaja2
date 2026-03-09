"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false
    return !localStorage.getItem("cookie-consent")
  })

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg border-t border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-sm text-gray-300">
          <p>
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            {" "}
            <Link href="/privacy-policy" className="underline hover:text-white">
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={acceptCookies}
            variant="secondary"
            size="sm"
            className="whitespace-nowrap"
          >
            Accept Cookies
          </Button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
