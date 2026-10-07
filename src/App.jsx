import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cars from './pages/Cars'
import Booking from './pages/Booking'
import CarDetails from './pages/CarDetails'
import ForgotPassword from './pages/ForgotPassword'
import About from './pages/About'
import Contact from './pages/Contact'
import MyBookings from './pages/MyBookings'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='my-bookings' element={<MyBookings />} />
          <Route path='cars' element={<Cars />} />
          <Route path='cars/:carId' element={<CarDetails />} />
          <Route path='booking/:id' element={<Booking />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App