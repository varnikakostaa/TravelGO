
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plane, Hotel, MapPin, CalendarDays, Users,
  Search, ArrowRight, Star, Menu, Globe2,
  ShieldCheck, Headphones, ChevronRight
} from 'lucide-react'

const destinations = [
  {
    name: 'Bali, Indonesia',
    description: 'Tropical paradise',
    price: '₹24,999',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700'
  },
  {
    name: 'Paris, France',
    description: 'City of romance',
    price: '₹48,999',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=700'
  },
  {
    name: 'Swiss Alps',
    description: 'Mountains & adventure',
    price: '₹54,999',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=700'
  },
  {
    name: 'Maldives',
    description: 'Luxury island escape',
    price: '₹39,999',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700'
  }
]

const packages = [
  {
    name: 'Bali Escape',
    location: 'Bali, Indonesia',
    duration: '5 Days / 4 Nights',
    price: '₹24,999',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700'
  },
  {
    name: 'European Discovery',
    location: 'Paris, Switzerland',
    duration: '7 Days / 6 Nights',
    price: '₹69,999',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=700'
  },
  {
    name: 'Maldives Luxury',
    location: 'Maldives',
    duration: '4 Days / 3 Nights',
    price: '₹44,999',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700'
  }
]

export default function HomePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Flights')
  const [menuOpen, setMenuOpen] = useState(false)
  const [from, setFrom] = useState('Indore')
  const [to, setTo] = useState('Goa')
  const [departure, setDeparture] = useState('')
  const [guests, setGuests] = useState('1 Traveller')

  function handleSearch(e) {
    e.preventDefault()

    // Validate the destination for all search types.
    if (!from.trim()) {
      alert('Please enter your destination.')
      return
    }

    // Flight search validation.
    if (activeTab === 'Flights') {
      if (!to.trim()) {
        alert('Please enter your arrival destination.')
        return
      }

      if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
        alert('Departure and destination cannot be the same.')
        return
      }

      navigate('/flights', {
        state: {
          from: from.trim(),
          to: to.trim(),
          departure,
          travellers: guests
        }
      })

      return
    }

    // Hotel search.
    if (activeTab === 'Hotels') {
      const hotelGuests = guests
        .replace('Traveller', 'Guest')
        .replace('Travellers', 'Guests')

      navigate('/hotels', {
        state: {
          destination: from.trim(),
          checkIn: departure,
          guests: hotelGuests
        }
      })

      return
    }

    alert('Holiday package search is coming soon!')
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="/home" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
              <Plane size={22} fill="currentColor" />
            </span>
            <span className="font-extrabold tracking-tight text-2xl text-slate-900">
              Travel<span className="text-blue-600">Go</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a href="/flights" className="hover:text-blue-600">Flights</a>
            <a href="/hotels" className="hover:text-blue-600">Hotels</a>
            <a href="#packages" className="hover:text-blue-600">Packages</a>
            <a href="#destinations" className="hover:text-blue-600">Destinations</a>
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href="/my-bookings"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600"
            >
              My Bookings
            </a>
            <button className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">
              My Account
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu />
          </button>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-slate-100 bg-white px-6 py-5 text-sm font-semibold md:hidden">
            <a href="/flights" onClick={() => setMenuOpen(false)}>Flights</a>
            <a href="/hotels" onClick={() => setMenuOpen(false)}>Hotels</a>
            <a href="#packages" onClick={() => setMenuOpen(false)}>Packages</a>
            <a href="#destinations" onClick={() => setMenuOpen(false)}>Destinations</a>
            <a href="/my-bookings" onClick={() => setMenuOpen(false)}>
              My Bookings
            </a>
          </nav>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-slate-900/10" />

        <div className="relative mx-auto max-w-7xl px-6 pb-48 pt-24 lg:px-10 lg:pb-52 lg:pt-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold tracking-wider text-white backdrop-blur">
              <Globe2 size={15} /> EXPLORE THE WORLD WITH US
            </span>

            <h1 className="mt-7 font-extrabold leading-tight tracking-tight text-white text-5xl lg:text-7xl">
              Your next journey
              <span className="block text-blue-400">starts here.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-200 lg:text-lg">
              Discover beautiful destinations, find the best stays,
              and create unforgettable memories with TravelGo.
            </p>

            <a href="#search" className="mt-8 inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-950/30 transition hover:bg-blue-500">
              Explore destinations <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* SEARCH WIDGET */}
      <section id="search" className="relative z-10 mx-auto -mt-28 max-w-6xl px-5">
        <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-slate-900/10 md:p-9">
          <div className="mb-7 flex flex-wrap gap-3">
            {[
              { name: 'Flights', icon: Plane },
              { name: 'Hotels', icon: Hotel },
              { name: 'Packages', icon: MapPin }
            ].map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setActiveTab(name)}
                className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
                  activeTab === name
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50'
                }`}
              >
                <Icon size={17} /> {name}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 p-4">
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                <MapPin size={15} />
                {activeTab === 'Hotels' ? 'DESTINATION' : 'FROM'}
              </label>
              <input
                value={from}
                onChange={e => setFrom(e.target.value)}
                className="w-full bg-transparent text-sm font-bold outline-none"
                placeholder="Enter location"
              />
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                <MapPin size={15} />
                {activeTab === 'Hotels' ? 'HOTEL AREA' : 'TO'}
              </label>
              <input
                value={to}
                onChange={e => setTo(e.target.value)}
                className="w-full bg-transparent text-sm font-bold outline-none"
                placeholder="Enter destination or area"
              />
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                <CalendarDays size={15} />
                {activeTab === 'Hotels' ? 'CHECK-IN DATE' : 'TRAVEL DATE'}
              </label>
              <input
                type="date"
                value={departure}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setDeparture(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
              />
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                <Users size={15} />
                {activeTab === 'Hotels' ? 'GUESTS' : 'TRAVELLERS'}
              </label>
              <select
                value={guests}
                onChange={e => setGuests(e.target.value)}
                className="w-full bg-transparent text-sm font-bold outline-none"
              >
                <option>1 Traveller</option>
                <option>2 Travellers</option>
                <option>3 Travellers</option>
                <option>4 Travellers</option>
                <option>5+ Travellers</option>
              </select>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-sm font-bold text-white transition hover:bg-blue-700 lg:col-span-4"
            >
              <Search size={18} /> Search {activeTab}
            </button>
          </form>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-extrabold tracking-[.2em] text-blue-600">EXPLORE THE WORLD</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Popular destinations
            </h2>
            <p className="mt-3 text-sm text-slate-500">Places that travellers love to explore.</p>
          </div>
          <a href="#packages" className="hidden items-center gap-2 text-sm font-bold text-blue-600 md:flex">
            View all <ArrowRight size={17} />
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((place) => (
            <article key={place.name} className="group overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-60 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-xs font-bold text-slate-800 backdrop-blur">
                  Starting {place.price}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-slate-900">{place.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{place.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="text-xs font-extrabold tracking-[.2em] text-blue-600">HANDPICKED FOR YOU</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Trending holiday packages</h2>
            <p className="mt-3 text-sm text-slate-500">A little inspiration for your next escape.</p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {packages.map((item) => (
              <article key={item.name} className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1">
                <div className="relative h-56">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-800">
                    <Star size={13} fill="#FBBF24" color="#FBBF24" /> {item.rating}
                  </span>
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <MapPin size={14} className="text-blue-600" /> {item.location}
                  </p>
                  <h3 className="mt-3 text-xl font-extrabold">{item.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{item.duration}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-xs text-slate-500">Starting from</p>
                      <p className="mt-1 text-xl font-extrabold text-blue-600">{item.price}</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-3 text-xs font-bold text-blue-700 hover:bg-blue-600 hover:text-white">
                      Explore <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 sm:grid-cols-3 lg:px-10">
        {[
          { icon: ShieldCheck, title: 'Secure bookings', text: 'A simple and safe booking experience.' },
          { icon: Globe2, title: 'Amazing destinations', text: 'Discover beautiful places around the world.' },
          { icon: Headphones, title: 'Travel support', text: 'Help and guidance throughout your journey.' }
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Icon size={23} />
            </div>
            <div>
              <h3 className="font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <div>
            <h2 className="text-2xl font-extrabold">Travel<span className="text-blue-400">Go</span></h2>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              Your journey, our passion. Discover the world one destination at a time.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Explore</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
              <a href="/flights">Flights</a>
              <a href="/hotels">Hotels</a>
              <a href="#packages">Holiday packages</a>
              <a href="#destinations">Destinations</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Company</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
              <a href="#about">About us</a>
              <a href="#contact">Contact</a>
              <a href="#help">Help centre</a>
              <a href="#privacy">Privacy policy</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Stay inspired</h3>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Your next adventure is just around the corner.
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-700 p-2">
              <input placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none" />
              <button className="rounded-lg bg-blue-600 p-3"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 px-6 py-6 text-center text-xs text-slate-500">
          © 2026 TravelGo. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
