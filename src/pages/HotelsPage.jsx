
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Hotel, MapPin, Star, Wifi, Coffee, Waves,
  Car, Search, ArrowLeft, ArrowRight, CalendarDays,
  Users, CheckCircle, ShieldCheck, Home, BedDouble
} from 'lucide-react'

const hotelData = [
  {
    id: 1,
    name: 'The Grand Palace',
    location: 'Goa',
    address: 'Calangute Beach Road, Goa',
    rating: 4.8,
    reviews: 245,
    price: 5499,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000',
    description: 'Enjoy a relaxing stay with elegant rooms, beautiful pool views and easy access to the beach.',
    amenities: ['Free Wi-Fi', 'Swimming Pool', 'Restaurant', 'Parking'],
    rooms: [
      { name: 'Standard Room', price: 5499 },
      { name: 'Deluxe Room', price: 7499 },
      { name: 'Suite Room', price: 9999 }
    ]
  },
  {
    id: 2,
    name: 'Ocean View Resort',
    location: 'Goa',
    address: 'Candolim Beach, Goa',
    rating: 4.6,
    reviews: 189,
    price: 4299,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000',
    description: 'A peaceful resort offering comfortable accommodation and beautiful ocean surroundings.',
    amenities: ['Free Wi-Fi', 'Swimming Pool', 'Restaurant', 'Parking'],
    rooms: [
      { name: 'Standard Room', price: 4299 },
      { name: 'Deluxe Room', price: 6299 },
      { name: 'Sea View Suite', price: 8999 }
    ]
  },
  {
    id: 3,
    name: 'Mountain Escape Hotel',
    location: 'Manali',
    address: 'Old Manali Road, Himachal Pradesh',
    rating: 4.7,
    reviews: 156,
    price: 3799,
    image: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=1000',
    description: 'A cosy mountain retreat with scenic views and comfortable rooms for your holiday.',
    amenities: ['Free Wi-Fi', 'Restaurant', 'Parking'],
    rooms: [
      { name: 'Classic Room', price: 3799 },
      { name: 'Mountain View Room', price: 5499 },
      { name: 'Premium Suite', price: 7999 }
    ]
  },
  {
    id: 4,
    name: 'Urban Comfort Suites',
    location: 'Mumbai',
    address: 'Andheri West, Mumbai',
    rating: 4.5,
    reviews: 210,
    price: 4999,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1000',
    description: 'Modern city accommodation with stylish interiors and convenient access to popular areas.',
    amenities: ['Free Wi-Fi', 'Restaurant', 'Parking'],
    rooms: [
      { name: 'Business Room', price: 4999 },
      { name: 'Deluxe Room', price: 6499 },
      { name: 'Executive Suite', price: 8499 }
    ]
  },
  {
    id: 5,
    name: 'Royal Heritage Stay',
    location: 'Jaipur',
    address: 'Civil Lines, Jaipur, Rajasthan',
    rating: 4.9,
    reviews: 320,
    price: 5999,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000',
    description: 'Experience traditional hospitality with royal-inspired interiors and modern comforts.',
    amenities: ['Free Wi-Fi', 'Swimming Pool', 'Restaurant', 'Parking'],
    rooms: [
      { name: 'Heritage Room', price: 5999 },
      { name: 'Royal Deluxe Room', price: 7999 },
      { name: 'Royal Suite', price: 11999 }
    ]
  },
  {
    id: 6,
    name: 'Green Valley Retreat',
    location: 'Indore',
    address: 'AB Road, Indore, Madhya Pradesh',
    rating: 4.4,
    reviews: 118,
    price: 2999,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1000',
    description: 'A comfortable and affordable stay with a peaceful atmosphere and essential facilities.',
    amenities: ['Free Wi-Fi', 'Restaurant', 'Parking'],
    rooms: [
      { name: 'Standard Room', price: 2999 },
      { name: 'Deluxe Room', price: 3999 },
      { name: 'Premium Room', price: 5499 }
    ]
  }
]

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getInitialCheckIn = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return formatDate(date)
}

const getInitialCheckOut = () => {
  const date = new Date()
  date.setDate(date.getDate() + 2)
  return formatDate(date)
}

function HotelsPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const searchData = location.state || {}

  const [destination, setDestination] = useState(
    searchData.destination || ''
  )
  const [checkIn, setCheckIn] = useState(
    searchData.checkIn || getInitialCheckIn()
  )
  const [checkOut, setCheckOut] = useState(getInitialCheckOut())
  const [guests, setGuests] = useState(
    Number.parseInt(searchData.guests, 10) || 2
  )

  const [searchTerm, setSearchTerm] = useState(
    searchData.destination || ''
  )
  const [sortBy, setSortBy] = useState('recommended')
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [error, setError] = useState('')

  const today = formatDate(new Date())

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1

    const start = new Date(`${checkIn}T00:00:00`)
    const end = new Date(`${checkOut}T00:00:00`)

    return Math.max(
      1,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    )
  }, [checkIn, checkOut])

  const filteredHotels = useMemo(() => {
    let results = hotelData.filter((hotel) =>
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortBy === 'price-low') {
      results.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating)
    }

    return results
  }, [searchTerm, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()

    if (!destination.trim()) {
      setError('Please enter a destination.')
      return
    }

    if (!checkIn || !checkOut) {
      setError('Please select your check-in and check-out dates.')
      return
    }

    if (checkIn < today) {
      setError('Check-in date cannot be in the past.')
      return
    }

    if (checkOut <= checkIn) {
      setError('Check-out must be after check-in.')
      return
    }

    if (guests < 1 || guests > 10) {
      setError('Please select between 1 and 10 guests.')
      return
    }

    setError('')
    setSearchTerm(destination.trim())
  }

  const openHotel = (hotel) => {
    setSelectedHotel(hotel)
    setSelectedRoom(hotel.rooms[0])
    setShowBookingForm(false)
    setError('')
  }

  const handleContinue = () => {
    if (!selectedRoom) {
      setError('Please select a room.')
      return
    }

    setError('')
    setShowBookingForm(true)
  }

  const handleBooking = (e) => {
    e.preventDefault()

    if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
      setError('Please complete all guest details.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(guestEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!/^[0-9]{10}$/.test(guestPhone.trim())) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    if (!selectedHotel || !selectedRoom) {
      setError('Please select a hotel and room.')
      return
    }

    const booking = {
      bookingId: `TH${Date.now().toString().slice(-8)}`,
      type: 'hotel',
      hotel: selectedHotel,
      room: selectedRoom,
      destination: selectedHotel.location,
      checkIn,
      checkOut,
      nights,
      guests,
      guest: {
        name: guestName.trim(),
        email: guestEmail.trim(),
        phone: guestPhone.trim()
      },
      totalPrice: selectedRoom.price * nights,
      status: 'Confirmed',
      paymentStatus: 'Demo Payment Successful',
      createdAt: new Date().toISOString()
    }

    try {
      const savedBookings = JSON.parse(
        localStorage.getItem('travelgo_hotel_bookings') || '[]'
      )

      const bookings = Array.isArray(savedBookings)
        ? savedBookings
        : []

      bookings.unshift(booking)

      localStorage.setItem(
        'travelgo_hotel_bookings',
        JSON.stringify(bookings)
      )

      navigate('/hotel-booking-confirmation', {
        state: { booking }
      })
    } catch (storageError) {
      console.error('Unable to save hotel booking:', storageError)
      setError('Unable to save your booking. Please try again.')
    }
  }

  const closeHotelDetails = () => {
    setSelectedHotel(null)
    setSelectedRoom(null)
    setShowBookingForm(false)
    setError('')
  }

  const getAmenityIcon = (amenity) => {
    if (amenity.includes('Wi-Fi')) return <Wifi size={15} />
    if (amenity.includes('Pool')) return <Waves size={15} />
    if (amenity.includes('Restaurant')) return <Coffee size={15} />
    if (amenity.includes('Parking')) return <Car size={15} />
    return <CheckCircle size={15} />
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-xl font-bold"
          >
            <Hotel className="text-red-400" />
            TravelGo
          </button>

          <button
            onClick={() => navigate('/my-bookings')}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
          >
            <CalendarDays size={17} />
            My Bookings
          </button>
        </div>
      </header>

      {/* Page heading */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => navigate('/home')}
            className="mb-5 flex items-center gap-2 text-sm text-slate-300 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-400">
            Discover your next stay
          </p>

          <h1 className="text-3xl font-bold md:text-5xl">
            Find the perfect hotel
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            Explore comfortable stays, compare room options and plan your trip with TravelGo.
          </p>
        </div>
      </section>

      {/* Search form */}
      <section className="relative z-10 mx-auto -mt-7 max-w-7xl px-5">
        <form
          onSubmit={handleSearch}
          className="grid gap-4 rounded-2xl bg-white p-5 shadow-xl md:grid-cols-5"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Destination
            </label>
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <MapPin size={18} className="text-red-500" />
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to?"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Check-in
            </label>
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <CalendarDays size={18} className="text-red-500" />
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full min-w-0 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Check-out
            </label>
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <CalendarDays size={18} className="text-red-500" />
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full min-w-0 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Guests
            </label>
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <Users size={18} className="text-red-500" />
              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </form>

        {error && !selectedHotel && (
          <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}
      </section>

      {/* Hotel listing */}
      <main className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Available Hotels
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredHotels.length} properties found
              {searchTerm ? ` for ${searchTerm}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border bg-white px-3 py-2 text-sm outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {filteredHotels.length === 0 ? (
          <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
            <Hotel size={45} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-xl font-bold">
              No hotels found
            </h3>
            <p className="mt-2 text-slate-500">
              Try another destination such as Goa, Manali, Mumbai, Jaipur or Indore.
            </p>
            <button
              onClick={() => {
                setDestination('')
                setSearchTerm('')
              }}
              className="mt-5 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
            >
              Show all hotels
            </button>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredHotels.map((hotel) => (
              <article
                key={hotel.id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-white px-3 py-1 text-sm font-bold">
                    <Star size={15} className="fill-yellow-400 text-yellow-400" />
                    {hotel.rating}
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold">
                      {hotel.name}
                    </h3>
                  </div>

                  <p className="flex items-center gap-1 text-sm text-slate-500">
                    <MapPin size={15} className="text-red-500" />
                    {hotel.address}
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {hotel.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {hotel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="flex items-center gap-1 text-xs text-slate-600"
                      >
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-end justify-between border-t pt-4">
                    <div>
                      <p className="text-xs text-slate-500">
                        Starting from
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        ₹{hotel.price.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-slate-500">
                        per night
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {hotel.reviews} reviews
                      </p>
                    </div>

                    <button
                      onClick={() => openHotel(hotel)}
                      className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      View Rooms
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Hotel and room selection modal */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
          <div className="my-6 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
                  {showBookingForm ? 'Guest information' : 'Select your room'}
                </p>
                <h2 className="text-xl font-bold">
                  {selectedHotel.name}
                </h2>
              </div>

              <button
                onClick={closeHotelDetails}
                className="rounded-full bg-slate-100 px-3 py-2 text-slate-600 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              {!showBookingForm ? (
                <>
                  <img
                    src={selectedHotel.image}
                    alt={selectedHotel.name}
                    className="mb-4 h-48 w-full rounded-xl object-cover"
                  />

                  <p className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} />
                    {selectedHotel.address}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-3">
                    {selectedHotel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm"
                      >
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <h3 className="mb-3 font-bold">
                    Choose a room
                  </h3>

                  <div className="space-y-3">
                    {selectedHotel.rooms.map((room) => (
                      <button
                        key={room.name}
                        type="button"
                        onClick={() => setSelectedRoom(room)}
                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                          selectedRoom?.name === room.name
                            ? 'border-red-500 bg-red-50'
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <BedDouble className="text-red-500" />
                          <div>
                            <p className="font-semibold">
                              {room.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              Selected for {guests} guest(s)
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold">
                            ₹{room.price.toLocaleString('en-IN')}
                          </p>
                          <p className="text-xs text-slate-500">
                            per night
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-slate-50 p-4">
                    <div className="flex justify-between text-sm">
                      <span>Room price × {nights} night(s)</span>
                      <span className="font-semibold">
                        ₹{(selectedRoom.price * nights).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between border-t pt-3 text-lg font-bold">
                      <span>Total amount</span>
                      <span className="text-red-600">
                        ₹{(selectedRoom.price * nights).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleContinue}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </>
              ) : (
                <form onSubmit={handleBooking}>
                  <div className="mb-5 rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 font-semibold">
                      <ShieldCheck className="text-green-600" />
                      Booking summary
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {selectedHotel.name} · {selectedRoom.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {checkIn} to {checkOut} · {nights} night(s) · {guests} guest(s)
                    </p>
                    <p className="mt-2 text-lg font-bold text-red-600">
                      ₹{(selectedRoom.price * nights).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <h3 className="mb-4 text-lg font-bold">
                    Primary guest details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Full name
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border p-3 outline-none focus:border-red-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-lg border p-3 outline-none focus:border-red-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className="w-full rounded-lg border p-3 outline-none focus:border-red-500"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                      {error}
                    </p>
                  )}

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowBookingForm(false)
                        setError('')
                      }}
                      className="flex-1 rounded-lg border py-3 font-semibold hover:bg-slate-50"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
                    >
                      <CheckCircle size={18} />
                      Confirm Booking
                    </button>
                  </div>

                  <p className="mt-4 text-center text-xs text-slate-500">
                    Demo booking only. No real payment is processed.
                  </p>
                </form>
              )}

              {error && !showBookingForm && (
                <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 px-5 py-7 text-center text-sm text-slate-400">
        <div className="mb-2 flex items-center justify-center gap-2 text-white">
          <Home size={17} />
          <span className="font-semibold">TravelGo</span>
        </div>
        Your journey starts here.
        <p className="mt-2 text-xs">
          Demo travel booking application. Sample hotel data only.
        </p>
      </footer>
    </div>
  )
}

export default HotelsPage
