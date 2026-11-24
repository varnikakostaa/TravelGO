
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Plane,
  ArrowLeftRight,
  CalendarDays,
  Users,
  Search,
  ArrowRight,
  SlidersHorizontal,
  ArrowLeft,
  Wifi,
  Coffee,
  Briefcase,
  ShieldCheck
} from 'lucide-react'

// Airport codes for commonly searched Indian cities
const airportCodes = {
  indore: 'IDR',
  goa: 'GOI',
  mumbai: 'BOM',
  delhi: 'DEL',
  bengaluru: 'BLR',
  bangalore: 'BLR',
  hyderabad: 'HYD',
  chennai: 'MAA',
  kolkata: 'CCU',
  jaipur: 'JAI',
  pune: 'PNQ',
  ahmedabad: 'AMD',
  lucknow: 'LKO',
  kochi: 'COK',
  varanasi: 'VNS',
  nagpur: 'NAG',
  bhopal: 'BHO',
  surat: 'STV'
}

function getAirportCode(city) {
  const normalized = city.trim().toLowerCase()

  return (
    airportCodes[normalized] ||
    normalized.replace(/[^a-z]/g, '').slice(0, 3).toUpperCase() ||
    'XXX'
  )
}

// Demo flight templates.
// These are sample results, not live airline schedules.
const flightTemplates = [
  {
    id: 1,
    airline: 'IndiGo',
    code: '6E 2045',
    departure: '06:30',
    arrival: '08:00',
    duration: '1h 30m',
    stops: 'Non-stop',
    price: 4599,
    color: 'bg-blue-600'
  },
  {
    id: 2,
    airline: 'Air India',
    code: 'AI 635',
    departure: '09:15',
    arrival: '10:50',
    duration: '1h 35m',
    stops: 'Non-stop',
    price: 5299,
    color: 'bg-red-700'
  },
  {
    id: 3,
    airline: 'Akasa Air',
    code: 'QP 1420',
    departure: '13:40',
    arrival: '15:15',
    duration: '1h 35m',
    stops: 'Non-stop',
    price: 3999,
    color: 'bg-orange-500'
  },
  {
    id: 4,
    airline: 'IndiGo',
    code: '6E 743',
    departure: '18:20',
    arrival: '19:55',
    duration: '1h 35m',
    stops: 'Non-stop',
    price: 4899,
    color: 'bg-blue-600'
  }
]

function getTravellerCount(value) {
  const count = parseInt(value, 10)
  return Number.isNaN(count) ? 1 : count
}

export default function FlightsPage() {
  const navigate = useNavigate()
  const location = useLocation()

  // Receive search information from HomePage
  const searchData = location.state || {}

  const [from, setFrom] = useState(searchData.from || 'Indore')
  const [to, setTo] = useState(searchData.to || 'Goa')
  const [date, setDate] = useState(searchData.departure || '')
  const [travellers, setTravellers] = useState(
    searchData.travellers || '1 Traveller'
  )

  const [airline, setAirline] = useState('All')
  const [sort, setSort] = useState('recommended')
  const [selectedFlight, setSelectedFlight] = useState(null)

  const fromCode = getAirportCode(from)
  const toCode = getAirportCode(to)

  // Generate sample results for the selected route
  const routeFlights = flightTemplates.map(flight => ({
    ...flight,
    from: fromCode,
    to: toCode
  }))

  // Apply airline filter
  let flights = routeFlights.filter(flight =>
    airline === 'All' || flight.airline === airline
  )

  // Apply sorting
  if (sort === 'low') {
    flights = [...flights].sort(
      (a, b) => a.price - b.price
    )
  } else if (sort === 'high') {
    flights = [...flights].sort(
      (a, b) => b.price - a.price
    )
  } else if (sort === 'early') {
    flights = [...flights].sort(
      (a, b) => a.departure.localeCompare(b.departure)
    )
  }

  function swapCities() {
    setFrom(to)
    setTo(from)
  }

  function handleSearch(e) {
    e.preventDefault()

    if (!from.trim() || !to.trim()) {
      alert('Please enter departure and destination cities.')
      return
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      alert('Departure and destination cannot be the same.')
      return
    }

    setAirline('All')
    setSort('recommended')
    setSelectedFlight(null)

    window.scrollTo({
      top: 650,
      behavior: 'smooth'
    })
  }

  function continueBooking() {
    navigate('/passenger-details', {
      state: {
        flight: selectedFlight,
        date,
        travellers,
        from,
        to
      }
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">

          <a href="/home" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
              <Plane size={22} fill="currentColor" />
            </span>

            <span className="text-2xl font-extrabold tracking-tight">
              Travel<span className="text-blue-600">Go</span>
            </span>
          </a>

          <nav className="hidden gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a href="/flights" className="text-blue-600">Flights</a>
            <a href="/home#packages" className="hover:text-blue-600">Packages</a>
            <a href="/home#destinations" className="hover:text-blue-600">Destinations</a>
          </nav>

          <a href="/home" className="text-sm font-bold text-slate-700">
            Home
          </a>

        </div>
      </header>

      {/* PAGE TITLE */}
      <section className="bg-gradient-to-r from-blue-950 to-blue-700 px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">

          <a
            href="/home"
            className="mb-5 inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Home
          </a>

          <p className="text-xs font-bold tracking-[.2em] text-blue-300">
            FIND YOUR NEXT JOURNEY
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Explore Flights
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100">
            Compare flight options, discover sample fares and
            find a flight for your next adventure.
          </p>

        </div>
      </section>

      {/* SEARCH FORM */}
      <section className="relative z-10 mx-auto -mt-7 max-w-7xl px-5">

        <form
          onSubmit={handleSearch}
          className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 md:p-8"
        >

          <div className="mb-6 flex items-center gap-2 font-bold text-slate-800">
            <Plane size={19} className="text-blue-600" />
            Search your flight
          </div>

          <div className="grid items-end gap-4 md:grid-cols-2 lg:grid-cols-5">

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-500">
                FROM
              </label>

              <input
                value={from}
                onChange={e => setFrom(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 p-4 text-sm font-bold outline-none focus:border-blue-500"
                placeholder="Departure city"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-500">
                TO
              </label>

              <input
                value={to}
                onChange={e => setTo(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 p-4 text-sm font-bold outline-none focus:border-blue-500"
                placeholder="Destination city"
              />
            </div>

            <button
              type="button"
              onClick={swapCities}
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100 lg:flex"
              title="Swap cities"
            >
              <ArrowLeftRight size={18} />
            </button>

            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                <CalendarDays size={14} />
                DEPARTURE
              </label>

              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                <Users size={14} />
                TRAVELLERS
              </label>

              <select
                value={travellers}
                onChange={e => setTravellers(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none"
              >
                <option>1 Traveller</option>
                <option>2 Travellers</option>
                <option>3 Travellers</option>
                <option>4 Travellers</option>
                <option>5+ Travellers</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700"
          >
            <Search size={18} />
            Search Flights
          </button>

        </form>
      </section>

      {/* RESULTS */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <div>
            <p className="text-xs font-bold tracking-widest text-blue-600">
              AVAILABLE DEMO OPTIONS
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">
              Flights from {from} to {to}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {flights.length} sample flights · One way
              {date ? ` · ${date}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">

            <SlidersHorizontal size={17} className="text-blue-600" />

            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-transparent text-sm font-semibold outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="early">Earliest Departure</option>
            </select>

          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-6 flex flex-wrap gap-3">

          {['All', 'IndiGo', 'Air India', 'Akasa Air'].map(name => (

            <button
              key={name}
              onClick={() => setAirline(name)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${
                airline === name
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-400'
              }`}
            >
              {name === 'All' ? 'All Airlines' : name}
            </button>

          ))}

        </div>

        {/* FLIGHT CARDS */}
        <div className="space-y-5">

          {flights.map(flight => (

            <article
              key={flight.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg md:p-7"
            >

              <div className="grid items-center gap-6 md:grid-cols-[1fr_2fr_1fr]">

                {/* AIRLINE */}
                <div className="flex items-center gap-3">

                  <div className={`grid h-12 w-12 place-items-center rounded-xl text-white ${flight.color}`}>
                    <Plane size={22} />
                  </div>

                  <div>
                    <h3 className="font-extrabold">{flight.airline}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {flight.code}
                    </p>
                  </div>

                </div>

                {/* TIMING */}
                <div className="flex items-center justify-between gap-3">

                  <div>
                    <p className="text-2xl font-extrabold">
                      {flight.departure}
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {flight.from}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col items-center px-2">

                    <span className="text-xs text-slate-500">
                      {flight.duration}
                    </span>

                    <div className="relative my-2 h-px w-full bg-blue-200">
                      <Plane
                        size={16}
                        className="absolute -top-2 left-1/2 -translate-x-1/2 rotate-90 bg-white text-blue-600"
                      />
                    </div>

                    <span className="text-xs font-semibold text-green-600">
                      {flight.stops}
                    </span>

                  </div>

                  <div>
                    <p className="text-2xl font-extrabold">
                      {flight.arrival}
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {flight.to}
                    </p>
                  </div>

                </div>

                {/* PRICE */}
                <div className="border-t border-slate-100 pt-5 text-center md:border-l md:border-t-0 md:pt-0 md:text-right">

                  <p className="text-xs text-slate-500">
                    Starting fare
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-blue-600">
                    ₹{flight.price.toLocaleString('en-IN')}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    per traveller
                  </p>

                  <button
                    onClick={() => setSelectedFlight(flight)}
                    className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 md:w-auto"
                  >
                    Book Now <ArrowRight size={15} className="ml-1 inline" />
                  </button>

                </div>

              </div>

              <div className="mt-6 flex flex-wrap gap-5 border-t border-slate-100 pt-4 text-xs text-slate-500">

                <span className="flex items-center gap-2">
                  <Briefcase size={14} /> Cabin baggage
                </span>

                <span className="flex items-center gap-2">
                  <Wifi size={14} /> In-flight services
                </span>

                <span className="flex items-center gap-2">
                  <Coffee size={14} /> Refreshments
                </span>

                <span className="flex items-center gap-2">
                  <ShieldCheck size={14} /> Booking support
                </span>

              </div>

            </article>

          ))}

          {flights.length === 0 && (

            <div className="rounded-2xl bg-white p-12 text-center">

              <Plane size={35} className="mx-auto text-slate-300" />

              <h3 className="mt-4 text-lg font-bold">
                No flights found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try selecting another airline.
              </p>

            </div>

          )}

        </div>
      </main>

      {/* BOOKING MODAL */}
      {selectedFlight && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-5">

          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-extrabold">
                Flight selected!
              </h2>

              <button
                onClick={() => setSelectedFlight(null)}
                className="text-slate-400 hover:text-slate-900"
                aria-label="Close"
              >
                ✕
              </button>

            </div>

            <p className="mt-4 text-sm text-slate-500">
              You selected {selectedFlight.airline} ({selectedFlight.code}).
            </p>

            <div className="my-6 rounded-xl bg-blue-50 p-5">

              <div className="flex justify-between font-bold">
                <span>{selectedFlight.from}</span>
                <Plane className="text-blue-600" />
                <span>{selectedFlight.to}</span>
              </div>

              <p className="mt-4 text-center text-2xl font-extrabold text-blue-600">
                ₹{selectedFlight.price.toLocaleString('en-IN')}
              </p>

              <p className="mt-1 text-center text-xs text-slate-500">
                Per traveller
              </p>

            </div>

            <p className="mb-5 text-xs leading-5 text-slate-500">
              This is a frontend demonstration. Flight details and fares are sample data.
              No actual ticket or reservation will be created.
            </p>

            <button
              onClick={continueBooking}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white hover:bg-blue-700"
            >
              Continue to Booking
            </button>

          </div>
        </div>

      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 px-6 py-8 text-center text-sm text-slate-400">
        © 2026 TravelGo. All rights reserved.
      </footer>

    </div>
  )
}
