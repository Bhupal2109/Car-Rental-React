# 🚗 AutoRent - Premium Car Rental Website

A modern, responsive car rental website built with React and Vite, featuring a beautiful user interface and smooth animations.

## 🌟 Features

### 🏠 Homepage
- **Hero Section** with car search functionality
- **Featured Cars** showcase with detailed car information
- **Video Section** with modal popup for promotional content
- **Features Section** highlighting service benefits
- **Statistics** showing company achievements
- **Responsive Footer** with contact information and links

### 🚙 Car Catalog
- **6 Premium Vehicles** including Tesla, BMW, Audi, Toyota, Ford, and Kia
- **Detailed Car Information**: Year, location, seating capacity, transmission type, fuel type
- **Price Display** with per-day rates
- **Car Ratings** and feature badges
- **Availability Status** for each vehicle
- **Book Now** and **View Details** buttons

### 🔐 Authentication
- **Login Page** with email/password authentication
- **Registration Page** with first name, last name, email, and password
- **Social Login Options** (Google, Facebook)
- **Remember Me** functionality
- **Forgot Password** link

### 🎨 User Interface
- **Modern Design** with blue gradient theme
- **Responsive Layout** that works on all devices
- **Smooth Animations** using ScrollReveal library
- **Interactive Elements** with hover effects
- **Material-UI Components** for enhanced UX
- **Lucide React Icons** throughout the interface

### 🛠️ Technical Features
- **React Router** for navigation between pages
- **Tailwind CSS** for styling
- **ScrollReveal** for scroll animations
- **Vite** for fast development and building
- **ESLint** for code quality
- **Hot Module Replacement** for instant updates

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Car-Rental
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the website

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
src/
├── components/
│   ├── FeaturedCars.jsx    # Car catalog display
│   ├── Features.jsx        # Service features section
│   ├── Footer.jsx          # Website footer
│   ├── Hero.jsx            # Main hero section with search
│   ├── Home.jsx            # Homepage layout
│   ├── Layout.jsx          # Main layout wrapper
│   ├── Nav.jsx             # Navigation component
│   └── VideoSection.jsx    # Video showcase section
├── pages/
│   ├── Login.jsx           # User login page
│   └── Register.jsx        # User registration page
├── assets/
│   ├── audi.jpg            # Audi car image
│   ├── bmw.jpg             # BMW car image
│   ├── ford.jpg            # Ford car image
│   ├── kia.jpg             # Kia car image
│   ├── tesla.jpg           # Tesla car image
│   ├── toyota.jpg          # Toyota car image
│   └── video-img.jpg       # Video section background
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

## 🎯 Key Components

### Hero Section
- Interactive car search form with location, date, and time selection
- Company statistics (500+ cars, 50+ locations, 24/7 support, 99% satisfaction)
- Gradient background with smooth animations

### Featured Cars
- Grid layout showcasing 6 premium vehicles
- Each car card includes:
  - High-quality image
  - Vehicle specifications
  - Pricing information
  - Availability status
  - Feature badges
  - Rating display

### Features Section
- 8 key service benefits:
  - Fully Insured vehicles
  - 24/7 Customer Support
  - Easy Payment options
  - Multiple pickup locations
  - Expert support team
  - Premium quality vehicles
  - Trusted by thousands
  - Instant booking process

### Video Section
- Interactive video player with modal popup
- Animated play button with pulsing effects
- YouTube embed integration

## 🎨 Design System

### Colors
- **Primary Blue**: #3B82F6 (blue-500)
- **Secondary Blue**: #1D4ED8 (blue-700)
- **Accent Yellow**: #FBBF24 (yellow-400)
- **Background Gray**: #F3F4F6 (gray-100)
- **Text Gray**: #374151 (gray-700)

### Typography
- **Headings**: Bold, large sizes (text-3xl to text-5xl)
- **Body Text**: Regular weight, readable sizes
- **Brand Font**: Clean, modern sans-serif

### Animations
- **ScrollReveal**: Elements animate in as user scrolls
- **Hover Effects**: Smooth transitions on interactive elements
- **Pulsing Animation**: Video play button with continuous pulse

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: Full feature set with side-by-side layouts
- **Tablet**: Adjusted grid layouts and spacing
- **Mobile**: Stacked layouts with touch-friendly buttons

## 🔧 Technologies Used

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.6.3
- **Icons**: Lucide React 0.525.0
- **UI Components**: Material-UI 7.2.0
- **Animations**: ScrollReveal 4.0.9
- **Linting**: ESLint 9.30.1

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- **Phone**: +1 (555) 123-4567
- **Email**: info@autorent.com
- **Address**: 123 Main St, City, State 12345

## 🙏 Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- UI components by [Material-UI](https://mui.com/)
- Animations powered by [ScrollReveal](https://scrollrevealjs.org/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

---

**AutoRent** - Your trusted partner for premium car rentals. Experience the freedom of the road with our quality vehicles and exceptional service.