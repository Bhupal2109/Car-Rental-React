import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { getCarById } from '../services/carService'

const BOOKINGS_STORAGE_KEY = 'autorentBookings'

const readBookings = () => {
  try {
    const savedBookings = JSON.parse(localStorage.getItem(BOOKINGS_STORAGE_KEY) || '[]')
    return Array.isArray(savedBookings) ? savedBookings : []
  } catch {
    return []
  }
}

const MyBookings = () => {
  const [bookings, setBookings] = useState(readBookings)
  const [error, setError] = useState('')

  const handleCancelBooking = (bookingId) => {
    const booking = bookings.find((savedBooking) => savedBooking.id === bookingId)
    if (!booking || booking.status === 'Cancelled') return
    if (!window.confirm(`Cancel booking ${bookingId}?`)) return

    try {
      const savedBookings = readBookings()
      const updatedBookings = savedBookings.map((savedBooking) =>
        savedBooking.id === bookingId
          ? { ...savedBooking, status: 'Cancelled' }
          : savedBooking
      )

      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings))
      setBookings(updatedBookings)
      setError('')
    } catch {
      setError('This booking could not be cancelled. Please check browser storage and try again.')
    }
  }

  return (
    <>
      <main className="bg-gray-100 min-h-screen px-4 py-14 sm:px-8 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Bookings</h1>
            <p className="mt-2 text-gray-600">Review your saved bookings on this device.</p>
          </header>

          {error && (
            <p role="alert" className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          {bookings.length === 0 ? (
            <section className="rounded-xl bg-white p-8 text-center shadow-md sm:p-12">
              <h2 className="text-2xl font-semibold text-gray-800">You don't have any bookings yet.</h2>
              <p className="mt-2 text-gray-600">Browse the catalog to find a car for your next trip.</p>
              <Link
                to="/cars"
                className="inline-flex mt-6 rounded bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Browse Cars
              </Link>
            </section>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {bookings.map((booking) => {
                const carStillExists = Boolean(getCarById(booking.carId))
                const isCancelled = booking.status === 'Cancelled'

                return (
                  <article key={booking.id} className="rounded-xl bg-white p-5 shadow-md sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Booking ID</p>
                        <p className="mt-1 break-all font-semibold text-gray-800">{booking.id}</p>
                        <h2 className="mt-3 text-xl font-bold text-gray-900">{booking.carName}</h2>
                      </div>
                      <span className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${isCancelled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {booking.status}
                      </span>
                    </div>

                    <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                      <div><dt className="text-gray-500">Pickup date</dt><dd className="mt-1 font-medium text-gray-800">{booking.pickupDate}</dd></div>
                      <div><dt className="text-gray-500">Return date</dt><dd className="mt-1 font-medium text-gray-800">{booking.returnDate}</dd></div>
                      <div><dt className="text-gray-500">Rental days</dt><dd className="mt-1 font-medium text-gray-800">{booking.rentalDays}</dd></div>
                      <div><dt className="text-gray-500">Price per day</dt><dd className="mt-1 font-medium text-gray-800">₹{booking.pricePerDay.toLocaleString('en-IN')}</dd></div>
                      <div className="sm:col-span-2 border-t border-gray-200 pt-3">
                        <dt className="text-gray-500">Total price</dt>
                        <dd className="mt-1 text-lg font-bold text-blue-600">₹{booking.totalPrice.toLocaleString('en-IN')}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row">
                      {carStillExists && (
                        <Link
                          to={`/cars/${booking.carId}`}
                          className="inline-flex justify-center rounded border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                          View Car
                        </Link>
                      )}
                      {!isCancelled && (
                        <button
                          type="button"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="rounded bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default MyBookings