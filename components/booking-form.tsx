"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { CalendarIcon, Users, Clock, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface BookingFormProps {
  fieldId: string
  pricePerPlayer: number
  maxPlayers: number
}

export function BookingForm({ fieldId, pricePerPlayer, maxPlayers }: BookingFormProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [slots, setSlots] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [players, setPlayers] = useState<number>(1)
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (date) {
      const dateString = format(date, "yyyy-MM-dd")
      fetch(`/api/availability?fieldId=${fieldId}&date=${dateString}`)
        .then((res) => res.json())
        .then((data) => setSlots(data.slots || []))
        .catch((err) => console.error(err))
    }
  }, [date, fieldId])

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(2)
  }

  const handleCheckout = async () => {
    if (!customerName || !customerEmail) return
    setLoading(true)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldId,
          date: date ? format(date, "yyyy-MM-dd") : "",
          time: selectedTime,
          players,
          customerName,
          customerEmail,
        }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Error al crear la sesión de pago: " + (data.error || "Desconocido"))
      }
    } catch (err) {
      console.error(err)
      alert("Ocurrió un error inesperado.")
    } finally {
      setLoading(false)
    }
  }

  // Generate simulated different rates for visual fidelity to the screenshot
  // In a real app, these would come from the backend logic
  const rates = [
    { name: "RESORT GUEST", price: pricePerPlayer, type: "resort_guest" },
    { name: "NON RESORT GUEST", price: pricePerPlayer * 1.12, type: "non_resort_guest" },
  ]

  if (step === 1) {
    return (
      <div className="p-6 bg-white min-h-[600px]">
        {/* Date Selector Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <CalendarIcon className="h-5 w-5 text-blue-700" />
             <span className="font-serif font-bold text-blue-900 mr-2">Date of Play:</span>
             <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal bg-white",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP", { locale: enUS }) : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="text-sm text-blue-700 font-medium">
             {slots.length} Available Times
          </div>
        </div>

        {/* Slots Grid */}
        {date ? (
          slots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {slots.map((time) => (
                <div key={time} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white group">
                  <div className="bg-blue-50 p-3 border-b border-blue-100 flex justify-between items-center group-hover:bg-blue-100 transition-colors">
                    <span className="text-xl font-bold text-blue-700 font-serif">{time}</span>
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{maxPlayers}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {rates.map((rate) => (
                      <div key={rate.name} className="flex justify-between items-center text-sm border-b border-dashed border-gray-100 pb-2 last:border-0 last:pb-0">
                        <span className="font-bold text-gray-700 text-xs tracking-wider">{rate.name}</span>
                        <span className="text-blue-900 font-semibold">${rate.price.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="pt-2 text-xs text-gray-400 text-center italic">
                      Includes shared golf cart
                    </div>
                    <Button 
                      onClick={() => handleTimeSelect(time)} 
                      className="w-full mt-2 bg-blue-900 hover:bg-blue-800 text-white font-serif tracking-widest"
                    >
                      BOOK
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed">
              <Clock className="h-10 w-10 mx-auto text-gray-300 mb-4" />
              <p className="text-muted-foreground text-lg">No available times for this date.</p>
              <p className="text-sm text-gray-400 mt-2">Try selecting another day.</p>
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed">
             <p className="text-muted-foreground">Select a date above to see availability.</p>
          </div>
        )}
      </div>
    )
  }

  // Step 2: Checkout Form
  return (
    <div className="max-w-2xl mx-auto p-8">
      <Button variant="ghost" onClick={() => setStep(1)} className="mb-6 pl-0 hover:pl-2 transition-all text-blue-900">
        &larr; Back to Times
      </Button>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8 flex justify-between items-center">
        <div>
           <p className="text-sm text-blue-600 uppercase tracking-wider font-bold mb-1">Your Selection</p>
           <h3 className="text-2xl font-serif font-bold text-blue-900">
             {date && format(date, "EEEE d 'of' MMMM", { locale: enUS })} at {selectedTime}
           </h3>
        </div>
        <div className="bg-white p-3 rounded-md shadow-sm">
           <span className="text-2xl font-bold text-blue-900">${(pricePerPlayer * players).toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Player Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="font-semibold text-gray-700">Number of Players</Label>
            <Select value={players.toString()} onValueChange={(v) => setPlayers(Number(v))}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select number of players" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(maxPlayers)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1} Player{i > 0 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold text-gray-700">Full Name</Label>
            <Input 
              id="name" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
              placeholder="Ex. John Doe" 
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold text-gray-700">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={customerEmail} 
              onChange={(e) => setCustomerEmail(e.target.value)} 
              placeholder="john@example.com" 
              className="h-12"
            />
          </div>
        </div>

        <div className="pt-8">
          <Button 
            onClick={handleCheckout} 
            disabled={loading || !customerName || !customerEmail} 
            className="w-full h-14 text-lg font-serif font-bold tracking-widest bg-green-700 hover:bg-green-800 shadow-lg"
          >
            {loading ? "PROCESSING..." : "CONFIRM AND PAY"}
          </Button>
          <p className="text-center text-xs text-gray-400 mt-4">
            By clicking confirm, you will be redirected to Stripe to complete your secure payment.
          </p>
        </div>
      </div>
    </div>
  )
}
