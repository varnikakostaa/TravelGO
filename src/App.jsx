import HotelBookingConfirmation from './pages/HotelBookingConfirmation'
import HotelsPage from './pages/HotelsPage'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import FlightsPage from './pages/FlightsPage'
import PassengerDetails from './pages/PassengerDetails'
import PaymentPage from './pages/PaymentPage'
import BookingConfirmation from './pages/BookingConfirmation'
import MyBookings from './pages/MyBookings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/home" element={<HomePage />} />

      <Route path="/flights" element={<FlightsPage />} />

      <Route
        path="/passenger-details"
        element={<PassengerDetails />}
      />

      <Route path="/payment" element={<PaymentPage />} />

      <Route
        path="/booking-confirmation"
        element={<BookingConfirmation />}
      />

      <Route path="/my-bookings" element={<MyBookings />} />

      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/hotels" element={<HotelsPage />} />
      <Route
  path="/hotel-booking-confirmation"
  element={<HotelBookingConfirmation />}
/>
    </Routes>
  )
}
