import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Car, ClipboardList, Search, SlidersHorizontal, Star } from 'lucide-react'
import { getAllCars } from '../services/carService'
import Footer from '../components/Footer'

const projectFeatures = [
  {
    title: 'Explore the catalog',
    description: 'Browse the project’s sample vehicles and compare their prices, locations, and specifications.',
    icon: Car,
  },
  {
    title: 'Find a better fit',
    description: 'Search by vehicle name, type, or location, then narrow results with catalog filters and sorting.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Review before booking',
    description: 'Open a vehicle detail page or continue to its booking page through the existing app routes.',
    icon: ClipboardList,
  },
]

const About = () => (
  <>
    <main className="bg-gray-100 min-h-screen">
      <section className="bg-white px-4 py-16 sm:px-8 sm:py-20">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-3">About AutoRent</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">A simpler way to explore your next ride.</h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-600">
              AutoRent is a car-rental project designed to make discovering a vehicle straightforward. Browse a sample catalog, compare useful details, and follow a clear path from search to vehicle information and booking.
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 mt-8 rounded bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Cars <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-lg p-5 sm:p-6">
              <Car className="h-7 w-7 text-blue-500 mb-4" />
              <p className="text-3xl font-bold text-gray-900">{getAllCars().length}</p>
              <p className="mt-1 text-sm text-gray-600">sample vehicles in this project</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-5 sm:p-6">
              <Search className="h-7 w-7 text-blue-500 mb-4" />
              <p className="text-3xl font-bold text-gray-900">3 ways</p>
              <p className="mt-1 text-sm text-gray-600">to search: name, type, or location</p>
            </div>
            <div className="col-span-2 bg-blue-500 rounded-lg p-5 sm:p-6 text-white">
              <Star className="h-7 w-7 mb-4" />
              <p className="text-lg font-semibold">Built around useful comparisons</p>
              <p className="mt-1 text-sm text-blue-50">Prices, ratings, availability, and vehicle details are shown together in the catalog.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why choose AutoRent?</h2>
            <p className="mt-3 text-gray-600">The project brings the key steps of browsing and selecting a rental vehicle into one simple experience.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {projectFeatures.map(({ title, description, icon: Icon }) => (
              <article key={title} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-5">
                  {createElement(Icon, { className: 'h-6 w-6' })}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
)

export default About