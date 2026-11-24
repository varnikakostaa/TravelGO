
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plane,
  Hotel,
  CalendarDays,
  User,
  Ticket,
  XCircle,
  ClipboardList,
  MapPin,
  BedDouble,
  Mail,
  Phone,
  Moon,
  Home
} from 'lucide-react'

function getSavedBookings(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export default function MyBookings() {
  const navigate = useNavigate()

  const [flightBookings, setFlightBookings] = useState(
    () => getSavedBookings('travelgo_bookings')
  )

  const [hotelBookings, setHotelBookings] = useState(
    () => getSavedBookings('travelgo_hotel_bookings')
  )

  const [activeTab, setActiveTab] = useState('all')

  const allBookings = [
    ...flightBookings.map(booking => ({
      ...booking,
      type: 'flight'
    })),
    ...hotelBookings.map(booking => ({
      ...booking,
      type: 'hotel'
    }))
  ].sort((a, b) => {
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  })

  const displayedBookings = allBookings.filter(booking => {
    if (activeTab === 'all') return true
    return booking.type === activeTab
  })

  const activeCount = allBookings.filter(
    booking => booking.status !== 'Cancelled'
  ).length

  function cancelBooking(bookingId, type) {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this demo booking?'
    )

    if (!confirmed) return

    if (type === 'flight') {
      const updated = flightBookings.map(booking =>
        booking.bookingId === bookingId
          ? { ...booking, status: 'Cancelled' }
          : booking
      )

      setFlightBookings(updated)
      localStorage.setItem(
        'travelgo_bookings',
        JSON.stringify(updated)
      )
    } else {
      const updated = hotelBookings.map(booking =>
        booking.bookingId === bookingId
          ? { ...booking, status: 'Cancelled' }
          : booking
      )

      setHotelBookings(updated)
      localStorage.setItem(
        'travelgo_hotel_bookings',
        JSON.stringify(updated)
      )
    }
  }

  function formatPrice(price) {
    return Number(price || 0).toLocaleString('en-IN')
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <a href="/home" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
              <Plane size={22} />
            </div>

            <h1 className="text-2xl font-extrabold">
              Travel<span className="text-blue-600">Go</span>
            </h1>
          </a>

          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            <Home size={17} />
            Back to Home
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12">

        {/* PAGE TITLE */}
        <div className="mb-9">
          <p className="text-xs font-bold tracking-widest text-blue-600">
            YOUR TRAVEL ACTIVITY
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            My Bookings
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            View and manage all your TravelGo flight and hotel bookings.
          </p>
        </div>

        {/* BOOKING SUMMARY */}
        <div className="mb-7 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">
                Total Bookings
              </p>
              <ClipboardList className="text-blue-600" />
            </div>
            <p className="mt-3 text-3xl font-extrabold">
              {allBookings.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">
                Flight Bookings
              </p>
              <Plane className="text-blue-600" />
            </div>
            <p className="mt-3 text-3xl font-extrabold">
              {flightBookings.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">
                Hotel Bookings
              </p>
              <Hotel className="text-blue-600" />
            </div>
            <p className="mt-3 text-3xl font-extrabold">
              {hotelBookings.length}
            </p>
          </div>

        </div>

        {/* FILTER TABS */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm">

          <div>
            <p className="text-sm font-bold text-slate-800">
              {activeCount} Active Bookings
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Cancelled bookings are retained in your history.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'flight', label: 'Flights' },
              { id: 'hotel', label: 'Hotels' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* EMPTY STATE */}
        {displayedBookings.length === 0 ? (

          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-blue-50 text-blue-600">
              <ClipboardList size={38} />
            </div>

            <h3 className="mt-6 text-xl font-extrabold">
              {allBookings.length === 0
                ? 'No bookings yet'
                : 'No bookings in this category'}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {allBookings.length === 0
                ? 'Your completed flight and hotel bookings will appear here.'
                : 'Try selecting another booking category.'}
            </p>

            {allBookings.length === 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => navigate('/flights')}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
                >
                  <Plane size={17} />
                  Explore Flights
                </button>

                <button
                  onClick={() => navigate('/hotels')}
                  className="flex items-center gap-2 rounded-xl border border-blue-200 px-6 py-3 font-bold text-blue-600 hover:bg-blue-50"
                >
                  <Hotel size={17} />
                  Explore Hotels
                </button>
              </div>
            )}

          </div>

        ) : (

          /* BOOKING CARDS */
          <div className="space-y-6">

            {displayedBookings.map(booking => {

              const isHotel = booking.type === 'hotel'

              return (
                <article
                  key={`${booking.type}-${booking.bookingId}`}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                >

                  {/* CARD HEADER */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">

                    <div>
                      <div className="flex items-center gap-2">
                        {isHotel ? (
                          <Hotel size={17} className="text-purple-600" />
                        ) : (
                          <Plane size={17} className="text-blue-600" />
                        )}

                        <span className={`text-xs font-extrabold uppercase tracking-wider ${
                          isHotel ? 'text-purple-600' : 'text-blue-600'
                        }`}>
                          {isHotel ? 'Hotel Booking' : 'Flight Booking'}
                        </span>
                      </div>

                      <p className="mt-2 text-xs font-bold text-slate-400">
                        BOOKING REFERENCE
                      </p>

                      <h3 className="mt-1 font-extrabold tracking-wider">
                        {booking.bookingId}
                      </h3>
                    </div>

                    <span className={`rounded-full px-4 py-2 text-xs font-bold ${
                      booking.status === 'Cancelled'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-green-50 text-green-700'
                    }`}>
                      {booking.status || 'Confirmed'}
                    </span>

                  </div>

                  <div className="grid gap-7 p-6 md:grid-cols-[1.5fr_1fr]">

                    {/* FLIGHT BOOKING DETAILS */}
                    {!isHotel ? (

                      <div>

                        <div className="flex items-center gap-3">
                          <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                            <Plane size={22} />
                          </div>

                          <div>
                            <h3 className="font-extrabold">
                              {booking.flight?.airline}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Flight {booking.flight?.code}
                            </p>
                          </div>
                        </div>

                        <div className="my-7 flex items-center justify-between rounded-xl bg-slate-50 p-5">

                          <div>
                            <p className="text-2xl font-extrabold">
                              {booking.flight?.from}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {booking.flight?.departure}
                            </p>
                          </div>

                          <Plane className="text-blue-600" />

                          <div className="text-right">
                            <p className="text-2xl font-extrabold">
                              {booking.flight?.to}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {booking.flight?.arrival}
                            </p>
                          </div>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                          <p className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays size={16} className="text-blue-600" />
                            {booking.date || 'Date not selected'}
                          </p>

                          <p className="flex items-center gap-2 text-sm text-slate-600">
                            <User size={16} className="text-blue-600" />
                            {booking.passenger?.name || 'Passenger'}
                          </p>

                          <p className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin size={16} className="text-blue-600" />
                            {booking.travellers || '1 Traveller'}
                          </p>

                          <p className="flex items-center gap-2 text-sm text-slate-600">
                            <Ticket size={16} className="text-blue-600" />
                            {booking.flight?.duration || 'Duration unavailable'}
                          </p>

                        </div>

                      </div>

                    ) : (

                      /* HOTEL BOOKING DETAILS */
                      <div>

                        <div className="flex items-center gap-3">
                          <div className="grid h-11 w-11 place-items-center rounded-xl bg-purple-50 text-purple-600">
                            <Hotel size={22} />
                          </div>

                          <div>
                            <h3 className="font-extrabold">
                              {booking.hotel?.name || 'Hotel'}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {booking.hotel?.address || booking.destination}
                            </p>
                          </div>
                        </div>

                        <div className="my-7 overflow-hidden rounded-xl bg-slate-50">

                          {booking.hotel?.image && (
                            <img
                              src={booking.hotel.image}
                              alt={booking.hotel.name}
                              className="h-40 w-full object-cover"
                            />
                          )}

                          <div className="p-5">
                            <p className="font-extrabold">
                              {booking.room?.name || 'Selected Room'}
                            </p>

                            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                              <MapPin size={15} />
                              {booking.destination || booking.hotel?.location}
                            </p>
                          </div>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                          <p className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays size={16} className="text-purple-600" />
                            Check-in: {booking.checkIn}
                          </p>

                          <p className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays size={16} className="text-purple-600" />
                            Check-out: {booking.checkOut}
                          </p>

                          <p className="flex items-center gap-2 text-sm text-slate-600">
                            <Moon size={16} className="text-purple-600" />
                            {booking.nights} Night(s)
                          </p>

                          <p className="flex items-center gap-2 text-sm text-slate-600">
                            <User size={16} className="text-purple-600" />
                            {booking.guests || '2 Guests'}
                          </p>

                        </div>

                      </div>

                    )}

                    {/* PRICE AND CUSTOMER DETAILS */}
                    <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-6">

                      <div>
                        <p className="text-xs font-bold text-slate-400">
                          TOTAL FARE (DEMO)
                        </p>

                        <p className="mt-2 text-3xl font-extrabold text-blue-600">
                          ₹{formatPrice(
                            isHotel
                              ? booking.totalPrice
                              : booking.flight?.price
                          )}
                        </p>

                        {isHotel ? (

                          <>
                            <p className="mt-4 text-xs text-slate-500">
                              Guest: {booking.guest?.name || 'Guest'}
                            </p>

                            <p className="mt-1 flex items-center gap-2 break-all text-xs text-slate-500">
                              <Mail size={13} />
                              {booking.guest?.email}
                            </p>

                            <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                              <Phone size={13} />
                              {booking.guest?.phone}
                            </p>
                          </>

                        ) : (

                          <>
                            <p className="mt-3 text-xs text-slate-500">
                              Passenger: {booking.passenger?.name}
                            </p>

                            <p className="mt-1 break-all text-xs text-slate-500">
                              {booking.passenger?.email}
                            </p>
                          </>

                        )}

                      </div>

                      {booking.status !== 'Cancelled' && (
                        <button
                          onClick={() => cancelBooking(
                            booking.bookingId,
                            booking.type
                          )}
                          className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
                        >
                          <XCircle size={17} />
                          Cancel Demo Booking
                        </button>
                      )}

                    </div>

                  </div>

                </article>
              )
            })}

          </div>

        )}

      </main>

      <footer className="bg-slate-950 px-6 py-7 text-center text-xs text-slate-400">
        © 2026 TravelGo. All rights reserved.
      </footer>

    </div>
  )
}