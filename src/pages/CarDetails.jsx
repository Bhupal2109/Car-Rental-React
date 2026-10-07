import { useNavigate, useParams } from 'react-router-dom';
import { getCarById } from '../services/carService';
import { MapPin, Users, Cog, Fuel, Star, ArrowLeft } from 'lucide-react';

const CarDetails = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const selectedCar = getCarById(carId);

  if (!selectedCar) {
    return (
      <section className="bg-gray-100 min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Car not found</h1>
          <p className="text-gray-600">The car you requested does not exist or is no longer available.</p>
          <button
            type="button"
            onClick={() => navigate('/cars')}
            className="mt-6 bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Back to Cars
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-full object-cover" />
          </div>

          <div className="md:w-1/2 p-6 sm:p-8">
            <button
              type="button"
              onClick={() => navigate('/cars')}
              className="mb-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cars
            </button>

            <div className="flex items-center justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-800">{selectedCar.name}</h1>
              <div className="flex items-center gap-1 text-yellow-500 text-sm font-semibold">
                <Star className="w-5 h-5" />
                {selectedCar.rating}
              </div>
            </div>

            <p className="mt-2 text-gray-600">{selectedCar.year} • {selectedCar.type}</p>

            <div className="mt-6 space-y-3 text-gray-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>{selectedCar.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span>{selectedCar.seats} seats</span>
              </div>
              <div className="flex items-center gap-2">
                <Cog className="w-5 h-5 text-blue-500" />
                <span>{selectedCar.transmission}</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-blue-500" />
                <span>{selectedCar.fuel}</span>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-sm uppercase tracking-wide text-gray-500">Price per day</p>
              <p className="text-3xl font-bold text-blue-500 mt-2">₹{selectedCar.price.toLocaleString('en-IN')}</p>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p className="font-semibold text-gray-800">{selectedCar.status}</p>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/booking/${selectedCar.id}`)}
                className="bg-green-600 text-white px-5 py-3 rounded cursor-pointer transition duration-300 hover:bg-green-700"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
