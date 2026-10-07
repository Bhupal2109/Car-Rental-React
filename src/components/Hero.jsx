import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Search } from 'lucide-react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAllCars } from '../services/carService';

//Scroll Reveal
import ScrollReveal from 'scrollreveal';

const Hero = () => {
  const navigate = useNavigate();
  const cars = getAllCars();
  const carLocations = [...new Set(cars.map((car) => car.location))];
  const availableCarCount = cars.filter((car) => car.status === 'Available').length;
  const uniqueLocationCount = carLocations.length;
  const heroCar = cars.find((car) => car.id === 17);
  const heroImage = heroCar.image.replace('/330px-', '/1280px-');
  const [formData, setFormData] = useState({
    pickupLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    ScrollReveal().reveal('.hero-reveal', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'left',
      reset: false, 
    });
  }, []);

    useEffect(() => {
    ScrollReveal().reveal(".head-reveal", {
      scale: 0.85,
      distance: "0px",
      duration: 1500,
      easing: "ease-in-out",
      reset: false
    })
  }, []);

  useEffect(() => {
    ScrollReveal().reveal(".reveal-y", {
      origin: "bottom",
      distance: "100px",
      duration: 1500,
      interval: 200,
      easing: "ease-in-out",
      reset: false
    })
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { pickupLocation, pickupDate, pickupTime, returnDate } = formData;

    if (!pickupLocation) {
      setMessage('Please select a pickup location to continue.');
      return;
    }

    if (!pickupDate) {
      setMessage('Please choose your pickup date.');
      return;
    }

    if (!pickupTime) {
      setMessage('Please choose your pickup time.');
      return;
    }

    if (!returnDate) {
      setMessage('Please choose your return date.');
      return;
    }

    if (new Date(returnDate) < new Date(pickupDate)) {
      setMessage('Return date cannot be before the pickup date.');
      return;
    }

    const searchData = { pickupLocation, pickupDate, pickupTime, returnDate };

    try {
      navigate('/cars', { state: searchData });
      setMessage('Search values ready. The Cars page route is not currently defined in this project, so the form is validated and prepared for that route when it is added.');
    } catch {
      setMessage('Unable to submit your search right now. Please try again.');
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-4 pb-14 pt-12 text-white sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div className="max-w-xl hero-reveal">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-medium text-blue-50">
                <BadgeCheck className="h-4 w-4 text-yellow-300" />
                Premium Car Rentals
              </div>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Find Your <span className="text-yellow-400">Perfect Ride</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-blue-100 sm:text-lg">
                Choose from a wide range of cars and book your next journey in just a few clicks.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/cars"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-slate-950 transition-colors duration-150 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
                >
                  Explore Cars <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-5 py-3 font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  How It Works
                </Link>
              </div>
            </div>

            <div className="relative min-w-0 hero-reveal">
              <img
                src={heroImage}
                alt="Toyota Fortuner premium SUV"
                className="aspect-[4/3] w-full rounded-2xl object-cover object-center shadow-2xl shadow-slate-950/25 sm:aspect-[16/10] lg:aspect-[5/4]"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-slate-950/75 px-4 py-3 text-sm text-white backdrop-blur-sm sm:bottom-6 sm:left-6">
                <p className="font-semibold">{heroCar.name}</p>
                <p className="mt-0.5 text-blue-100">{heroCar.type} · ₹{heroCar.price.toLocaleString('en-IN')}/day</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 mt-10 grid grid-cols-1 gap-4 rounded-xl bg-white p-4 text-gray-900 shadow-xl shadow-blue-950/15 sm:grid-cols-2 sm:p-6 xl:-mb-7 xl:grid-cols-[1.25fr_1fr_1fr_1fr_auto] xl:items-end">
            <div className="min-w-0">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin className="h-4 w-4 text-blue-600" /> Pickup Location
              </label>
              <select
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select city</option>
                {carLocations.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="h-4 w-4 text-blue-600" /> Pickup Date
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                className="h-11 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="min-w-0">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Clock className="h-4 w-4 text-blue-600" /> Pickup Time
              </label>
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                className="h-11 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="min-w-0">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="h-4 w-4 text-blue-600" /> Return Date
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="h-11 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 font-semibold text-white transition-colors duration-150 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 xl:w-auto"
            >
              <Search className="h-4 w-4" /> Search Cars
            </button>
          </form>

          {message && (
            <p className="mx-auto mt-4 max-w-4xl rounded-lg bg-red-100 px-4 py-3 text-left text-sm font-medium text-red-700">
              {message}
            </p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm sm:grid-cols-4 sm:divide-y-0">
          <div className="px-3 py-5 text-center sm:px-5">
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{availableCarCount}</p>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">Available Cars</p>
          </div>
          <div className="px-3 py-5 text-center sm:px-5">
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{uniqueLocationCount}</p>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">Locations</p>
          </div>
          <div className="px-3 py-5 text-center sm:px-5">
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl">Easy</p>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">Booking Flow</p>
          </div>
          <div className="px-3 py-5 text-center sm:px-5">
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl">Flexible</p>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">Rental Dates</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero