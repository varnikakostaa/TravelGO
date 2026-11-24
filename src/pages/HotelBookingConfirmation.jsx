
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CheckCircle,
  Hotel,
  MapPin,
  CalendarDays,
  User,
  Mail,
  Phone,
  BedDouble,
  Moon,
  Home,
  Download,
  ArrowLeft
} from 'lucide-react'

export default function HotelBookingConfirmation() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const booking = state?.booking || state?.completedBooking

  const [bookingId] = useState(
    booking?.bookingId || `TH${Date.now().toString().slice(-8)}`
  )

  if (!booking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-5 text-center">
        <Hotel size={48} className="text-blue-600" />
        <h2 className="mt-5 text-2xl font-extrabold">
          Booking details not found
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Please check your bookings to view your reservation.
        </p>
        <button
          onClick={() => navigate('/my-bookings')}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
        >
          My Bookings
        </button>
      </div>
    )
  }

  const hotel = booking.hotel || {}
  const room = booking.room || {}
  const guest = booking.guest || {}

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="border-b bg-white px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-2xl font-extrabold">
            Travel<span className="text-blue-600">Go</span>
          </h1>

          <button
            onClick={() => navigate('/my-bookings')}
            className="text-sm font-bold text-blue-600"
          >
            My Bookings
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12">

        <div className="mb-8 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600">
            <CheckCircle size={46} />
          </div>

          <h2 className="mt-5 text-3xl font-extrabold text-slate-900">
            Hotel Booking Confirmed!
          </h2>

          <p className="mt-2 text-slate-500">
            Your demo hotel reservation has been successfully completed.
          </p>
        </div>

        <div id="hotel-ticket" className="overflow-hidden rounded-3xl border bg-white shadow-sm">

          <div className="bg-blue-600 px-7 py-6 text-white">
            <p className="text-xs font-bold tracking-widest text-blue-100">
              HOTEL RESERVATION CONFIRMATION
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-blue-100">Booking Reference</p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-wider">
                  {bookingId}
                </h3>
              </div>

              <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold">
                {booking.status || 'Confirmed'}
              </span>
            </div>
          </div>

          <div className="p-7">

            <div className="flex flex-wrap gap-5">
              {hotel.image && (
                <img
                  src={hotel.image}
                  alt={hotel.name || 'Hotel'}
                  className="h-40 w-full rounded-2xl object-cover sm:w-56"
                />
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2 text-blue-600">
                  <Hotel size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Hotel Details
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-extrabold">
                  {hotel.name || 'Hotel'}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} />
                  {hotel.address || booking.destination || hotel.location || 'Location unavailable'}
                </p>

                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <BedDouble size={17} />
                  {room.name || 'Selected Room'}
                </p>
              </div>
            </div>

            <div className="my-7 border-t border-dashed" />

            <h3 className="mb-5 font-extrabold">Stay Details</h3>

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <CalendarDays size={16} />
                  CHECK-IN
                </p>
                <p className="mt-2 font-extrabold">
                  {booking.checkIn || 'Not specified'}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <CalendarDays size={16} />
                  CHECK-OUT
                </p>
                <p className="mt-2 font-extrabold">
                  {booking.checkOut || 'Not specified'}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Moon size={16} />
                  DURATION
                </p>
                <p className="mt-2 font-extrabold">
                  {booking.nights || 1} Night(s)
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <User size={16} />
                  GUESTS
                </p>
                <p className="mt-2 font-extrabold">
                  {booking.guests || '2 Guests'}
                </p>
              </div>

            </div>

            <div className="my-7 border-t border-dashed" />

            <h3 className="mb-5 font-extrabold">Guest Information</h3>

            <div className="space-y-3 text-sm text-slate-600">
              <p className="flex items-center gap-3">
                <User size={17} className="text-blue-600" />
                {guest.name || 'Guest'}
              </p>

              <p className="flex items-center gap-3 break-all">
                <Mail size={17} className="text-blue-600" />
                {guest.email || 'Email unavailable'}
              </p>

              <p className="flex items-center gap-3">
                <Phone size={17} className="text-blue-600" />
                {guest.phone || 'Phone unavailable'}
              </p>
            </div>

            <div className="my-7 border-t border-dashed" />

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-blue-50 p-5">
              <div>
                <p className="text-xs font-bold text-slate-500">
                  TOTAL AMOUNT (DEMO)
                </p>
                <p className="mt-2 text-3xl font-extrabold text-blue-600">
                  ₹{Number(booking.totalPrice || 0).toLocaleString('en-IN')}
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                {booking.paymentStatus || 'Demo Booking Successful'}
              </span>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              This is a frontend demo reservation, not a real hotel booking.
            </p>

          </div>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            <Download size={18} />
            Print Confirmation
          </button>

          <button
            onClick={() => navigate('/my-bookings')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            My Bookings
          </button>

          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 hover:bg-slate-100"
          >
            <Home size={18} />
            Home
          </button>
        </div>

      </main>

      <style>{`
        @media print {
          body {
            background: white !important;
          }
          header, footer, button {
            display: none !important;
          }
          #hotel-ticket {
            border: 1px solid #ddd;
            box-shadow: none;
          }
        }
      `}</style>

    </div>
  )
}
