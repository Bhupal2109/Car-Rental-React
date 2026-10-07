import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Users, Cog, Fuel, Star, Calendar, Clock, Search } from 'lucide-react';
import { filterCars, getAllCars } from '../services/carService';

const Cars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state || {};

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const cars = getAllCars();
  const typeOptions = ['All', ...new Set(cars.map((car) => car.type))];
  const fuelOptions = ['All', ...new Set(cars.map((car) => car.fuel))];
  const transmissionOptions = ['All', ...new Set(cars.map((car) => car.transmission))];

  const filteredCars = useMemo(() => {
    const result = filterCars({
      searchTerm,
      selectedType,
      selectedFuel,
      selectedTransmission,
    });

    switch (sortBy) {
      case 'price-low':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...result].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating);
      default:
        return result;
    }
  }, [searchTerm, selectedType, selectedFuel, selectedTransmission, sortBy]);

  const handleViewDetails = (carId) => {
    navigate(`/cars/${carId}`);
  };

  const handleBookNow = (carId) => {
    navigate(`/booking/${carId}`);
  };

  return (
    <section className="bg-gray-100 py-20 sm:px-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Available Cars</h1>

          {(searchData.pickupLocation || searchData.pickupDate || searchData.pickupTime || searchData.returnDate) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-700">
              {searchData.pickupLocation && (
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span><strong>Pickup:</strong> {searchData.pickupLocation}</span>
                </div>
              )}
              {searchData.pickupDate && (
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span><strong>From:</strong> {searchData.pickupDate}</span>
                </div>
              )}
              {searchData.pickupTime && (
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span><strong>Time:</strong> {searchData.pickupTime}</span>
                </div>
              )}
              {searchData.returnDate && (
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span><strong>Return:</strong> {searchData.returnDate}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mb-8 bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:items-end">
            <label className="block">
              <span className="sr-only">Search cars</span>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, type, or location"
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-600 block mb-2">Car Type</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {typeOptions.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-600 block mb-2">Fuel Type</span>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fuelOptions.map((fuel) => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-600 block mb-2">Transmission</span>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {transmissionOptions.map((transmission) => (
                  <option key={transmission} value={transmission}>{transmission}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-600 block mb-2">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </div>
        </div>

        {filteredCars.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No cars found</h2>
            <p className="text-gray-600">Try adjusting your search or filters to find another vehicle.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car) => (
              <div key={car.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-3">
                <div className="relative overflow-hidden">
                  <img src={car.image} alt={car.name} className="rounded-md w-full h-48 sm:h-56 md:h-60 object-cover" />
                  <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-full shadow">{car.type}</span>
                  <span className={`absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full ${car.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {car.status}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>
                    <div className="text-yellow-500 text-sm flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      {car.rating}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">{car.year}</p>

                  <div className="flex items-center text-sm text-gray-500 my-4 gap-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{car.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1"><Users className="w-4 h-4 text-blue-500" /> {car.seats} seats</span>
                    <span className="inline-flex items-center gap-1"><Cog className="w-4 h-4 text-blue-500" /> {car.transmission}</span>
                    <span className="inline-flex items-center gap-1 col-span-2"><Fuel className="w-4 h-4 text-blue-500" /> {car.fuel}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {car.badges.map((badge, index) => (
                      <span key={index} className="bg-gray-50 text-xs px-2 py-1 rounded-full font-semibold border border-gray-200">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-xl font-bold text-blue-500">
                      ₹{car.price.toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-500">/day</span>
                    </p>
                  </div>

                  <div className="flex sm:flex-row flex-col mt-5 gap-3">
                    <button
                      type="button"
                      onClick={() => handleViewDetails(car.id)}
                      className="sm:w-1/2 w-full border border-gray-300 px-3 py-2 rounded cursor-pointer transition duration-300 hover:bg-gray-200"
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
        )}
      </div>
    </section>
  );
};

export default Cars;
