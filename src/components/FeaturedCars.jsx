import { useNavigate } from 'react-router-dom';
import { Car } from "lucide-react";
import { MapPin } from 'lucide-react';
import { Users } from 'lucide-react';
import { Cog } from 'lucide-react';
import { Fuel } from 'lucide-react';
import { Star } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { getFeaturedCars } from '../services/carService';

const FeaturedCars = () => {
  const navigate = useNavigate();
  const featuredCars = getFeaturedCars();

  const handleViewDetails = (carId) => {
    navigate(`/cars/${carId}`);
  };

  const handleBookNow = (carId) => {
    navigate(`/booking/${carId}`);
  };

  return (
    <section className="bg-gray-100 py-20 sm:px-16 px-4">
      <div className="max-w-7xl mx-auto mb-9 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between head-reveal">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Cars</h2>
          <p className="mt-2 max-w-2xl text-base text-gray-600 sm:text-lg">Explore a few picks from our available cars.</p>
        </div>
        <p className="text-sm font-medium text-blue-700">24 cars in the full catalog</p>
      </div>

      <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {featuredCars.map((car) => (
          <div key={car.id} className="flex h-full flex-col rounded-xl bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg reveal-y">
            <div className="relative overflow-hidden">
              <img src={car.image} alt={car.name} className="rounded-md w-full h-48 sm:h-56 md:h-60 object-cover" />
              <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-full shadow">{car.type}</span>
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">{car.status}</span>
            </div>
            <div className="mt-4 flex grow flex-col">
                <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-semibold">{car.name}</h3>
                    <div className="text-yellow-500 text-sm flex items-center gap-1"><Star className='w-5 h-5' />{car.rating}</div>
                </div>
              <p className="text-sm text-gray-500">{car.year}</p>
              <div className="flex items-center text-sm text-gray-500 my-4 gap-1">
                <MapPin className='w-4 h-4' /><span>{car.location}</span>
              </div>
              <div className="flex sm:items-center sm:flex-row flex-col sm:gap-10 gap-2 mt-2 text-gray-600 text-sm">
                <span className='inline-flex items-center gap-1'><Users className='w-4 h-4 text-blue-500' /> {car.seats} seats</span>
                <span className='inline-flex items-center gap-1'><Cog className='w-4 h-4 text-blue-500' /> {car.transmission}</span>
                <span className='inline-flex items-center gap-1'><Fuel className='w-4 h-4 text-blue-500' /> {car.fuel}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {car.badges.map((badge, i) => (
                  <span key={i} className="bg-gray-50 text-xs px-2 py-1 rounded-full font-semibold border border-gray-200">{badge}</span>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold text-blue-500">₹{car.price.toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-500">/day</span></p>
              </div>
              <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleViewDetails(car.id)}
                  className="sm:w-1/2 w-full border border-gray-300 px-3 py-2 rounded cursor-pointer transition duration-300 hover:bg-gray-300"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => handleBookNow(car.id)}
                  className="sm:w-1/2 w-full bg-green-600 text-white px-3 py-2 rounded cursor-pointer transition duration-300 hover:bg-green-700"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => navigate('/cars')} className='mx-auto flex items-center justify-center mt-12 bg-blue-500 py-3 px-5 text-white rounded cursor-pointer gap-1 transition duration-300 hover:bg-blue-700'>View All Cars <ArrowRight className='w-5 h-5' /></button>
    </section>
  )
}

export default FeaturedCars