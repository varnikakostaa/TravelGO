
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Plane, ArrowLeft, User, Mail, Phone,
  CalendarDays, ShieldCheck, ArrowRight
} from 'lucide-react'

export default function PassengerDetails() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    flight,
    date,
    travellers,
    from,
    to
  } = location.state || {}

  const [passenger, setPassenger] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: ''
  })

  const [error, setError] = useState('')

  if (!flight) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <h2 className="text-xl font-bold">No flight selected</h2>
          <p className="mt-2 text-sm text-slate-500">
            Please select a flight before continuing.
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

  function updateField(e) {
    setPassenger({
      ...passenger,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (
      !passenger.name.trim() ||
      !passenger.age ||
      !passenger.gender ||
      !passenger.email.trim() ||
      !passenger.phone.trim()
    ) {
      setError('Please complete all passenger details.')
      return
    }

    navigate('/payment', {
      state: {
        flight,
        passenger,
        date,
        travellers,
        from,
        to
      }
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="border-b bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
            <Plane size={22} />
          </div>
          <h1 className="text-2xl font-extrabold">
            Travel<span className="text-blue-600">Go</span>
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">

        <button
          onClick={() => navigate('/flights')}
          className="mb-7 flex items-center gap-2 text-sm font-bold text-blue-600"
        >
          <ArrowLeft size={17} /> Back to Flights
        </button>

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-blue-600">
            COMPLETE YOUR JOURNEY
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            Passenger Details
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Enter the traveller information to continue your booking.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">

          {/* PASSENGER FORM */}
          <section className="rounded-2xl bg-white p-7 shadow-sm">

            <div className="mb-7 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <User size={21} />
              </div>
              <div>
                <h3 className="font-extrabold">Traveller information</h3>
                <p className="text-xs text-slate-500">
                  Passenger 1
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Full name
                </label>
                <input
                  name="name"
                  value={passenger.name}
                  onChange={updateField}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Age
                  </label>
                  <input
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    value={passenger.age}
                    onChange={updateField}
                    placeholder="Enter age"
                    className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={passenger.gender}
                    onChange={updateField}
                    className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Mail size={16} /> Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={passenger.email}
                  onChange={updateField}
                  placeholder="Enter email address"
                  className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Phone size={16} /> Mobile number
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={passenger.phone}
                  onChange={updateField}
                  placeholder="Enter mobile number"
                  className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {error && (
                <p className="text-sm font-semibold text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-700"
              >
                Continue to Payment <ArrowRight size={18} />
              </button>

            </form>
          </section>

          {/* FLIGHT SUMMARY */}
          <aside className="h-fit rounded-2xl bg-white p-7 shadow-sm">
            <h3 className="mb-6 text-lg font-extrabold">
              Booking Summary
            </h3>

            <div className="rounded-xl bg-blue-50 p-5">
              <div className="flex items-center gap-3">
                <Plane className="text-blue-600" />
                <div>
                  <p className="font-bold">{flight.airline}</p>
                  <p className="text-xs text-slate-500">{flight.code}</p>
                </div>
              </div>

              <div className="my-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold">{flight.from}</h3>
                  <p className="text-sm text-slate-500">{flight.departure}</p>
                </div>
                <Plane className="text-blue-600" />
                <div className="text-right">
                  <h3 className="text-xl font-extrabold">{flight.to}</h3>
                  <p className="text-sm text-slate-500">{flight.arrival}</p>
                </div>
              </div>

              <div className="border-t border-blue-200 pt-4 text-sm">
                <p className="flex justify-between">
                  <span>Duration</span>
                  <strong>{flight.duration}</strong>
                </p>
                <p className="mt-3 flex justify-between">
                  <span>Departure date</span>
                  <strong>{date || 'Not selected'}</strong>
                </p>
                <p className="mt-3 flex justify-between">
                  <span>Travellers</span>
                  <strong>{travellers}</strong>
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-bold">Total amount</span>
              <span className="text-2xl font-extrabold text-blue-600">
                ₹{flight.price.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={16} className="text-green-600" />
              Demo booking – no actual payment required.
            </p>
          </aside>

        </div>
      </main>
    </div>
  )
}
