
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Plane,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  Lock,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export default function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const booking = location.state || {}
  const { flight, passenger, date, travellers } = booking

  const [method, setMethod] = useState('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [error, setError] = useState('')
  const [completedBooking, setCompletedBooking] = useState(null)

  if (!flight || !passenger) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <h2 className="text-xl font-bold">
            Booking information missing
          </h2>

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

  function handlePayment(e) {
    e.preventDefault()
    setError('')

    if (method === 'upi' && !upiId.trim()) {
      setError('Please enter a UPI ID.')
      return
    }

    if (method === 'card') {
      if (
        !cardName.trim() ||
        cardNumber.length !== 16 ||
        !expiry.trim() ||
        cvv.length !== 3
      ) {
        setError('Please enter valid demo card details.')
        return
      }
    }

    // Generate one booking reference
    const bookingId = `TG${Date.now().toString().slice(-8)}`

    // Never save payment credentials
    const savedBooking = {
      ...booking,
      bookingId,
      status: 'Confirmed',
      paymentStatus: 'Demo Payment Successful',
      createdAt: new Date().toISOString()
    }

    try {
      const existingBookings = JSON.parse(
        localStorage.getItem('travelgo_bookings') || '[]'
      )

      existingBookings.unshift(savedBooking)

      localStorage.setItem(
        'travelgo_bookings',
        JSON.stringify(existingBookings)
      )

      setCompletedBooking(savedBooking)
    } catch {
      setError('Unable to save booking. Please check browser storage.')
    }
  }

  const methods = [
    {
      id: 'upi',
      name: 'UPI',
      description: 'Google Pay, PhonePe, Paytm',
      icon: Smartphone
    },
    {
      id: 'card',
      name: 'Credit / Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: CreditCard
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'All major banks',
      icon: Landmark
    },
    {
      id: 'wallet',
      name: 'Wallet',
      description: 'Digital wallet payment',
      icon: Wallet
    }
  ]

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
          <ArrowLeft size={17} />
          Back to Flights
        </button>

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-blue-600">
            ALMOST THERE
          </p>

          <h2 className="mt-2 text-3xl font-extrabold">
            Secure Payment
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Choose your preferred demo payment method.
          </p>
        </div>

        {completedBooking ? (

          <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-lg">

            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-50 text-green-600">
              <CheckCircle size={45} />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold">
              Demo Payment Successful!
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Your demo booking has been saved successfully.
            </p>

            <div className="my-7 rounded-xl bg-blue-50 p-5">
              <p className="text-sm text-slate-500">
                Booking reference
              </p>

              <p className="mt-2 text-xl font-extrabold tracking-widest">
                {completedBooking.bookingId}
              </p>

              <p className="mt-5 text-sm text-slate-500">
                Amount paid (demo)
              </p>

              <p className="mt-2 text-3xl font-extrabold text-blue-600">
                ₹{flight.price.toLocaleString('en-IN')}
              </p>
            </div>

            <button
              onClick={() => navigate('/booking-confirmation', {
                state: completedBooking
              })}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-700"
            >
              View Booking Confirmation
              <ArrowRight size={18} />
            </button>

          </div>

        ) : (

          <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">

            <section className="rounded-2xl bg-white p-7 shadow-sm">

              <h3 className="mb-6 text-lg font-extrabold">
                Select Payment Method
              </h3>

              <div className="space-y-3">

                {methods.map(item => {
                  const Icon = item.icon

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        setMethod(item.id)
                        setError('')
                      }}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                        method === item.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-blue-600">
                        <Icon size={22} />
                      </div>

                      <div className="flex-1">
                        <p className="font-bold">{item.name}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <span className={`h-5 w-5 rounded-full border-2 ${
                        method === item.id
                          ? 'border-blue-600 bg-blue-600 ring-2 ring-blue-100'
                          : 'border-slate-300'
                      }`} />
                    </button>
                  )
                })}

              </div>

              <form onSubmit={handlePayment} className="mt-7 space-y-5">

                {method === 'upi' && (
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Enter UPI ID
                    </label>

                    <input
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="example@upi"
                      className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {method === 'card' && (
                  <>
                    <div>
                      <label className="mb-2 block text-sm font-bold">
                        Cardholder Name
                      </label>

                      <input
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        placeholder="Name on card"
                        className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold">
                        Card Number
                      </label>

                      <input
                        value={cardNumber}
                        onChange={e => setCardNumber(
                          e.target.value.replace(/\D/g, '').slice(0, 16)
                        )}
                        placeholder="16 digit demo number"
                        className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-bold">
                          Expiry
                        </label>

                        <input
                          value={expiry}
                          onChange={e => setExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold">
                          CVV
                        </label>

                        <input
                          value={cvv}
                          onChange={e => setCvv(
                            e.target.value.replace(/\D/g, '').slice(0, 3)
                          )}
                          placeholder="123"
                          type="password"
                          className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {method === 'netbanking' && (
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Select Bank
                    </label>

                    <select className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm">
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {method === 'wallet' && (
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Select Wallet
                    </label>

                    <select className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm">
                      <option>Paytm Wallet</option>
                      <option>Amazon Pay</option>
                      <option>Mobikwik</option>
                    </select>
                  </div>
                )}

                {error && (
                  <p className="text-sm font-semibold text-red-600">
                    {error}
                  </p>
                )}

                <p className="text-xs leading-5 text-slate-500">
                  This is a simulated payment for a frontend project.
                  No actual money will be charged.
                </p>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-700"
                >
                  <Lock size={17} />
                  Pay ₹{flight.price.toLocaleString('en-IN')}
                </button>

              </form>
            </section>

            <aside className="h-fit rounded-2xl bg-white p-7 shadow-sm">

              <h3 className="mb-6 text-lg font-extrabold">
                Fare Summary
              </h3>

              <div className="rounded-xl bg-blue-50 p-5">

                <div className="flex items-center gap-3">
                  <Plane className="text-blue-600" />

                  <div>
                    <p className="font-bold">{flight.airline}</p>
                    <p className="text-xs text-slate-500">
                      {flight.code}
                    </p>
                  </div>
                </div>

                <div className="my-6 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-extrabold">{flight.from}</p>
                    <p className="text-sm text-slate-500">
                      {flight.departure}
                    </p>
                  </div>

                  <Plane className="text-blue-600" />

                  <div className="text-right">
                    <p className="text-xl font-extrabold">{flight.to}</p>
                    <p className="text-sm text-slate-500">
                      {flight.arrival}
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-6 space-y-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-slate-500">Passenger</span>
                  <strong>{passenger.name}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Travel date</span>
                  <strong>{date || 'Not selected'}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Travellers</span>
                  <strong>{travellers}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Base fare</span>
                  <strong>₹{flight.price.toLocaleString('en-IN')}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Taxes and fees</span>
                  <strong>Included</strong>
                </div>

              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Total Amount</span>

                  <span className="text-2xl font-extrabold text-blue-600">
                    ₹{flight.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="mt-6 flex items-center gap-2 text-xs text-green-600">
                <ShieldCheck size={17} />
                Secure demo checkout
              </p>

            </aside>

          </div>
        )}

      </main>

      <footer className="mt-10 bg-slate-950 px-6 py-7 text-center text-xs text-slate-400">
        © 2026 TravelGo. All rights reserved.
      </footer>

    </div>
  )
}
