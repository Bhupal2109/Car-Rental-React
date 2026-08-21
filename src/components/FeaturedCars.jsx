import React from 'react'
import bmw from "../assets/bmw.jpg"
import tesla from "../assets/tesla.jpg"
import audi from "../assets/audi.jpg"
import toyota from "../assets/toyota.jpg"
import kia from "../assets/kia.jpg"
import ford from "../assets/ford.jpg"
import { Car } from "lucide-react";
import { MapPin } from 'lucide-react';
import { Users } from 'lucide-react';
import { Cog } from 'lucide-react';
import { Fuel } from 'lucide-react';
import { Star } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

//ScrollReveal
import ScrollReveal from 'scrollreveal'

const cars = [
  {
    id: 1,
    name: 'Tesla Model 3',
    year: 2023,
    location: 'San Francisco',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    price: 89,
    rating: 4.8,
    badges: ['Autopilot', 'Premium Audio', '+2 more'],
    type: 'Electric',
    status: 'Available',
    image: tesla,
  },
  {
    id: 2,
    name: 'BMW X5',
    year: 2023,
    location: 'New York',
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    price: 149,
    rating: 4.7,
    badges: ['Leather Seats', 'Navigation', '+2 more'],
    type: 'Luxury SUV',
    status: 'Available',
    image: bmw,
  },
  {
    id: 3,
    name: 'Audi A4',
    year: 2023,
    location: 'Los Angeles',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    price: 79,
    rating: 4.6,
    badges: ['Virtual Cockpit', 'Heated Seats', '+2 more'],
    type: 'Sedan',
    status: 'Available',
    image: audi,
  },
  {
    id: 4,
    name: 'Toyota Auris',
    year: 2022,
    location: 'New York',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 49,
    rating: 4.4,
    badges: ['Reliable', 'Fuel Efficient', '+1 more'],
    type: 'Sedan',
    status: 'Available',
    image: toyota,
  },
  {
    id: 5,
    name: 'Ford Explorer',
    year: 2021,
    location: 'Phoenix',
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 69,
    rating: 4.5,
    badges: ['Spacious', 'All-wheel drive'],
    type: 'SUV',
    status: 'Available',
    image: ford,
  },
  {
    id: 6,
    name: 'Kia Sportage',
    year: 2022,
    location: 'London',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    price: 65,
    rating: 4.3,
    badges: ['Hybrid', 'Modern Interior'],
    type: 'Crossover',
    status: 'Available',
    image: kia,
  },
];

const FeaturedCars = () => {
  return (
    <section className="bg-gray-100 py-20 sm:px-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12 head-reveal">
        <h2 className="sm:text-4xl text-3xl font-bold mb-2 flex justify-center items-center gap-2">
          <span className="text-blue-500"><Car className='w-12 h-12' /></span><span className='text-gray-800'>Featured Cars</span>
        </h2>
        <p className="text-gray-600 text-lg">Discover our handpicked selection of premium vehicles, perfect for any journey</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-3 reveal-y">
            <div className="relative overflow-hidden">
              <img src={car.image} alt={car.name} className="rounded-md w-full h-48 sm:h-56 md:h-60 object-cover" />
              <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-full shadow">{car.type}</span>
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">{car.status}</span>
            </div>
            <div className="mt-4">
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
                <p className="text-lg font-bold text-blue-500">${car.price}<span className="text-sm font-normal text-gray-500">/day</span></p>
              </div>
              <div className="flex sm:flex-row flex-col mt-4 gap-3">
                <button className="sm:w-1/2 w-full border border-gray-300 px-3 py-2 rounded cursor-pointer transition duration-300 hover:bg-gray-300">View Details</button>
                <button className="sm:w-1/2 w-full bg-green-600 text-white px-3 py-2 rounded cursor-pointer transition duration-300 hover:bg-green-700">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className='mx-auto flex items-center justify-center mt-12 bg-blue-500 py-3 px-5 text-white rounded cursor-pointer gap-1 transition duration-300 hover:bg-blue-700'>View All Cars <ArrowRight className='w-5 h-5' /></button>
    </section>
  )
}

export default FeaturedCars