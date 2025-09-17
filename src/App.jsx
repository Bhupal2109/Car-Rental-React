import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App