import { useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCarById } from '../services/carService';

const BOOKINGS_STORAGE_KEY = 'autorentBookings';

const getLocalDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getRentalDays = (pickupDate, returnDate) => {
  if (!pickupDate || !returnDate) return null;

  const pickupTime = Date.parse(`${pickupDate}T00:00:00Z`);
  const returnTime = Date.parse(`${returnDate}T00:00:00Z`);
  if (Number.isNaN(pickupTime) || Number.isNaN(returnTime) || returnTime < pickupTime) return null;

  return Math.max(1, (returnTime - pickupTime) / 86400000);
};

const getLatestBooking = (carId) => {
  try {
    const savedBookings = JSON.parse(localStorage.getItem(BOOKINGS_STORAGE_KEY) || '[]');
    if (!Array.isArray(savedBookings)) return null;

    return [...savedBookings].reverse().find((booking) => String(booking.carId) === String(carId)) || null;
  } catch {
    return null;
  }
};

const createBookingId = (bookings) => {
  let bookingId;
  do {
    bookingId = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `booking-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  } while (bookings.some((booking) => booking.id === bookingId));

  return bookingId;
};

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const isSubmitting = useRef(false);
  const [dates, setDates] = useState({ pickupDate: '', returnDate: '' });
  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(() => getLatestBooking(id));
  const [submissionError, setSubmissionError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const selectedCar = getCarById(id);
  const today = getLocalDateString();
  const rentalDays = getRentalDays(dates.pickupDate, dates.returnDate);

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDates((currentDates) => ({ ...currentDates, [name]: value }));
    setErrors({});
    setSubmissionError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting.current) return;

    const nextErrors = {};
    if (!dates.pickupDate) {
      nextErrors.pickupDate = 'Please select a pickup date.';
    } else if (dates.pickupDate < today) {
      nextErrors.pickupDate = 'Pickup date cannot be in the past.';
    }

    if (!dates.returnDate) {
      nextErrors.returnDate = 'Please select a return date.';
    } else if (dates.pickupDate && dates.returnDate < dates.pickupDate) {
      nextErrors.returnDate = 'Return date cannot be before pickup date.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    isSubmitting.current = true;
    setIsSaving(true);
    setSubmissionError('');

    try {
      const savedBookings = JSON.parse(localStorage.getItem(BOOKINGS_STORAGE_KEY) || '[]');
      if (!Array.isArray(savedBookings)) throw new Error('Saved bookings are invalid.');

      const booking = {
        id: createBookingId(savedBookings),
        carId: selectedCar.id,
        carName: selectedCar.name,
        pickupDate: dates.pickupDate,
        returnDate: dates.returnDate,
        rentalDays,
        pricePerDay: selectedCar.price,
        totalPrice: selectedCar.price * rentalDays,
        pickupLocation: location.state?.pickupLocation || null,
        createdAt: new Date().toISOString(),
        status: 'Confirmed',
      };

      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify([...savedBookings, booking]));
      setConfirmedBooking(booking);
    } catch {
      setSubmissionError('We could not save your booking. Please check browser storage and try again.');
    } finally {
      isSubmitting.current = false;
      setIsSaving(false);
    }
  };

  if (!selectedCar) {
    return (
      <section className="bg-gray-100 min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Car Not Found</h1>
          <p className="text-gray-600">The selected car could not be found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-8">
            <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Booking</p>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">{selectedCar.name}</h1>
            <p className="text-gray-600 mt-2">{selectedCar.year} • {selectedCar.location}</p>

            <div className="mt-6 space-y-3 text-gray-700">
              <p><strong>Type:</strong> {selectedCar.type}</p>
              <p><strong>Seats:</strong> {selectedCar.seats}</p>
              <p><strong>Transmission:</strong> {selectedCar.transmission}</p>
              <p><strong>Fuel:</strong> {selectedCar.fuel}</p>
              <p><strong>Price:</strong> ₹{selectedCar.price.toLocaleString('en-IN')}/day</p>
              <p><strong>Status:</strong> {selectedCar.status}</p>
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-500">Selected car ID</p>
              <p className="text-xl font-semibold text-gray-800">{selectedCar.id}</p>
            </div>

            {confirmedBooking && String(confirmedBooking.carId) === String(selectedCar.id) ? (
              <section className="mt-6 border-t pt-6" aria-labelledby="booking-confirmation-title">
                <div className="rounded-lg border border-green-200 bg-green-50 p-5">
                  <h2 id="booking-confirmation-title" className="text-xl font-semibold text-green-800">Booking Confirmed</h2>
                  <p className="mt-1 text-sm text-green-700">Your booking has been saved on this device.</p>

                  <dl className="mt-5 space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between gap-4"><dt>Booking ID</dt><dd className="font-semibold text-right break-all">{confirmedBooking.id}</dd></div>
                    <div className="flex justify-between gap-4"><dt>Car</dt><dd className="font-semibold text-right">{confirmedBooking.carName}</dd></div>
                    <div className="flex justify-between gap-4"><dt>Pickup date</dt><dd className="font-semibold text-right">{confirmedBooking.pickupDate}</dd></div>
                    <div className="flex justify-between gap-4"><dt>Return date</dt><dd className="font-semibold text-right">{confirmedBooking.returnDate}</dd></div>
                    {confirmedBooking.pickupLocation && (
                      <div className="flex justify-between gap-4"><dt>Pickup location</dt><dd className="font-semibold text-right">{confirmedBooking.pickupLocation}</dd></div>
                    )}
                    <div className="flex justify-between gap-4"><dt>Number of days</dt><dd className="font-semibold text-right">{confirmedBooking.rentalDays}</dd></div>
                    <div className="flex justify-between gap-4"><dt>Price per day</dt><dd className="font-semibold text-right">₹{confirmedBooking.pricePerDay.toLocaleString('en-IN')}</dd></div>
                    <div className="flex justify-between gap-4 border-t border-green-200 pt-3 text-base"><dt>Total price</dt><dd className="font-bold text-right">₹{confirmedBooking.totalPrice.toLocaleString('en-IN')}</dd></div>
                    <div className="flex justify-between gap-4"><dt>Status</dt><dd className="font-semibold text-green-700">{confirmedBooking.status}</dd></div>
                  </dl>
                </div>
              </section>
            ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Rental dates</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-2">Pickup date</label>
                  <input
                    id="pickup-date"
                    name="pickupDate"
                    type="date"
                    min={today}
                    value={dates.pickupDate}
                    onChange={handleDateChange}
                    aria-invalid={Boolean(errors.pickupDate)}
                    aria-describedby={errors.pickupDate ? 'pickup-date-error' : undefined}
                    className={`w-full rounded border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pickupDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.pickupDate && <p id="pickup-date-error" className="mt-1 text-sm text-red-600">{errors.pickupDate}</p>}
                </div>

                <div>
                  <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-2">Return date</label>
                  <input
                    id="return-date"
                    name="returnDate"
                    type="date"
                    min={dates.pickupDate || today}
                    value={dates.returnDate}
                    onChange={handleDateChange}
                    aria-invalid={Boolean(errors.returnDate)}
                    aria-describedby={errors.returnDate ? 'return-date-error' : undefined}
                    className={`w-full rounded border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.returnDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.returnDate && <p id="return-date-error" className="mt-1 text-sm text-red-600">{errors.returnDate}</p>}
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-gray-50 p-4 text-sm text-gray-700 space-y-2">
                <p className="flex justify-between gap-4"><span>Price per day</span><strong>₹{selectedCar.price.toLocaleString('en-IN')}</strong></p>
                <p className="flex justify-between gap-4"><span>Number of days</span><strong>{rentalDays ?? '—'}</strong></p>
                <p className="flex justify-between gap-4 border-t border-gray-200 pt-2 text-base"><span>Total price</span><strong>₹{rentalDays === null ? '—' : (selectedCar.price * rentalDays).toLocaleString('en-IN')}</strong></p>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="mt-5 w-full rounded bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? 'Saving Booking...' : 'Continue with Booking'}
              </button>
              {submissionError && (
                <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {submissionError}
                </p>
              )}
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
