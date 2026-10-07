# 🚗 AutoRent — Premium Car Rental Website

AutoRent is a modern and responsive car rental web application built with React.js and Node.js. It allows users to explore available cars, search and filter vehicles, view detailed car information, and proceed through the booking flow.

The project is being developed as a full-stack application with a React frontend, Express backend, and MongoDB database integration.

---

## ✨ Features

### 👤 User Features
- User Registration
- User Login
- Forgot Password page
- Responsive navigation
- User-friendly interface

### 🚘 Car Features
- Browse available cars
- Featured cars section
- Search cars by name, type, or location
- Filter cars by category/type
- Filter electric vehicles
- Sort cars by price
- View detailed information about individual cars

### 📅 Booking Features
- Car booking flow
- Booking details page
- My Bookings section
- Booking-related navigation

### 🎨 UI & UX
- Responsive design
- Modern car rental interface
- Reusable React components
- Smooth navigation
- Mobile-friendly layout

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

### Development Tools

- VS Code
- Git
- GitHub
- npm
- Vercel

---

## 🏗️ Project Structure

```text
Car-Rental-React/
│
├── public/
│
├── src/
│   ├── api/
│   │   └── apiClient.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── data/
│   │   └── cars.js
│   │
│   ├── pages/
│   │
│   ├── services/
│   │   └── carService.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .env
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
└── vite.config.js
