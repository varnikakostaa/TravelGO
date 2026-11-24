
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Plane, CheckCircle, Download, Home,
  CalendarDays, User, Mail, Clock,
  MapPin, Ticket, ShieldCheck
} from 'lucide-react'

export default function BookingConfirmation() {
  const navigate = useNavigate()
  const location = useLocation()

  const booking = location.state || {}
  const { flight, passenger, date, travellers } = booking

  const [bookingId] = useState(
    booking.bookingId || `TG${Date.now().toString().slice(-8)}`
  )

  if (!flight || !passenger) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <h2 className="text-xl font-bold">Booking details unavailable</h2>
          <p className="mt-2 text-sm text-slate-500">
            Please complete the booking process first.
          </p>
          <button
            onClick={() => navigate('/flights')}
            className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-white"
          >
            Browse Flights
          </button>
        </div>
      </div>
    )
  }

  function downloadTicket() {
    window.print()
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b bg-white px-6 py-5 print:hidden">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
            <Plane size={22} />
          </div>
          <h1 className="text-2xl font-extrabold">
            Travel<span className="text-blue-600">Go</span>
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-12">

        {/* SUCCESS MESSAGE */}
        <section className="mb-9 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600">
            <CheckCircle size={48} />
          </div>

          <p className="mt-6 text-xs font-bold tracking-[.2em] text-green-600">
            BOOKING CONFIRMED
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
            You're ready to fly!
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
            Your demo booking has been completed successfully.
            Your journey with TravelGo starts here.
          </p>
        </section>

        {/* BOOKING REFERENCE */}
        <section className="mb-7 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="text-xs font-bold tracking-widest text-green-700">
            YOUR BOOKING REFERENCE
          </p>

          <h3 className="mt-3 text-3xl font-extrabold tracking-widest text-slate-900">
            {bookingId}
          </h3>

          <p className="mt-2 text-xs text-slate-500">
            Keep this reference for your demo booking.
          </p>
        </section>

        {/* E-TICKET */}
        <section
          id="ticket"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
        >

          {/* TICKET HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-blue-950 px-7 py-6 text-white">
            <div>
              <p className="text-xs font-semibold tracking-widest text-blue-300">
                TRAVELGO E-TICKET
              </p>
              <h3 className="mt-2 text-xl font-extrabold">
                Flight Booking Confirmation
              </h3>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
              <Ticket size={17} />
              Confirmed
            </div>
          </div>

          <div className="p-7 md:p-9">

            {/* FLIGHT INFORMATION */}
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Plane size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">
                    {flight.airline}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Flight {flight.code}
                  </p>
                </div>
              </div>

              <div className="grid items-center gap-5 rounded-2xl bg-slate-50 p-6 md:grid-cols-[1fr_auto_1fr]">

                <div>
                  <p className="text-3xl font-extrabold text-slate-900">
                    {flight.departure}
                  </p>
                  <p className="mt-2 text-xl font-bold text-blue-600">
                    {flight.from}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Departure
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-xs text-slate-500">
                    {flight.duration}
                  </p>
                  <div className="my-2 flex items-center gap-2 text-blue-600">
                    <div className="h-px w-10 bg-blue-300" />
                    <Plane size={20} />
                    <div className="h-px w-10 bg-blue-300" />
                  </div>
                  <p className="text-xs font-semibold text-green-600">
                    {flight.stops}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-3xl font-extrabold text-slate-900">
                    {flight.arrival}
                  </p>
                  <p className="mt-2 text-xl font-bold text-blue-600">
                    {flight.to}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Arrival
                  </p>
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-dashed border-slate-300" />

            {/* PASSENGER DETAILS */}
            <div className="py-8">
              <h4 className="mb-5 text-lg font-extrabold">
                Passenger Information
              </h4>

              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <User size={15} /> Passenger Name
                  </p>
                  <p className="mt-2 font-bold text-slate-900">
                    {passenger.name}
                  </p>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <User size={15} /> Age / Gender
                  </p>
                  <p className="mt-2 font-bold text-slate-900">
                    {passenger.age} / {passenger.gender}
                  </p>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail size={15} /> Email Address
                  </p>
                  <p className="mt-2 break-all font-bold text-slate-900">
                    {passenger.email}
                  </p>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={15} /> Travel Date
                  </p>
                  <p className="mt-2 font-bold text-slate-900">
                    {date || 'Not selected'}
                  </p>
                </div>

              </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-dashed border-slate-300" />

            {/* FARE DETAILS */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-7">
              <div>
                <p className="text-sm text-slate-500">Travellers</p>
                <p className="mt-1 font-bold">{travellers || '1 Traveller'}</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-500">Total fare (demo)</p>
                <p className="mt-1 text-3xl font-extrabold text-blue-600">
                  ₹{flight.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* CONFIRMATION FOOTER */}
            <div className="rounded-xl bg-green-50 p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-green-700">
                <ShieldCheck size={19} />
                Demo booking completed successfully
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                This ticket is generated for your TravelGo frontend project.
                It is not a valid airline ticket or travel document.
              </p>
            </div>

          </div>
        </section>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

          <button
            onClick={downloadTicket}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 font-bold text-slate-700 hover:bg-slate-100"
          >
            <Download size={18} />
            Print / Save Ticket
          </button>

          <button
            onClick={() => navigate('/home')}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white hover:bg-blue-700"
          >
            <Home size={18} />
            Back to Homepage
          </button>

        </div>

      </main>

      <footer className="bg-slate-950 px-6 py-7 text-center text-xs text-slate-400 print:hidden">
        © 2026 TravelGo. All rights reserved.
      </footer>

    </div>
  )
}
