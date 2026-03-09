import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8 text-blue-900">Terms and Conditions</h1>
        
        <div className="prose max-w-none text-gray-700 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Welcome to TPC Danzante Bay. These Terms and Conditions govern your use of our website and the booking of tee times and other services. 
              By accessing this website and making a reservation, you agree to comply with and be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Reservations and Cancellations</h2>
            <p>
              All tee time reservations are subject to availability. We reserve the right to modify or cancel reservations due to course maintenance, 
              weather conditions, or other operational requirements.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Cancellations made more than 48 hours in advance will receive a full refund.</li>
              <li>Cancellations made within 48 hours of the tee time are non-refundable.</li>
              <li>No-shows will be charged the full amount of the reservation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Check-in and Play</h2>
            <p>
              Players are requested to check in at least 20 minutes prior to their tee time. Proper golf attire is required at all times on the course 
              and practice facilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Rain Check Policy</h2>
            <p>
              If the course is closed due to inclement weather, rain checks will be issued based on the number of holes played. 
              Rain checks are valid for one year from the date of issue.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Liability</h2>
            <p>
              TPC Danzante Bay is not responsible for loss or damage to personal property or for any injury sustained by players or guests 
              while on the premises, except where such injury is caused by our negligence.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
