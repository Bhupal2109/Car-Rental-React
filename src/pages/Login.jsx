import React, { useEffect, useState } from 'react'
import { Mail, Lock, Car } from 'lucide-react';
import ScrollReveal from 'scrollreveal';
import { Link } from 'react-router-dom';
import heroCar from '../assets/bmw.jpg';

const Login = () => {
  const rememberedEmail = localStorage.getItem('rememberedEmail') || '';
  const [formData, setFormData] = useState({
    email: rememberedEmail,
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedEmail));
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    ScrollReveal().reveal(".reveal-x-alt", {
      origin: "right",
      distance: "100px",
      duration: 1500,
      easing: "ease-in-out",
      reset: false
    })
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitMessage('');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password.trim()) {
      nextErrors.password = 'Password is required.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email.trim());
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    setSubmitMessage('Your sign-in details are valid. Authentication is not connected yet.');
    console.log('Login form submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg md:min-h-[660px] md:grid-cols-[0.9fr_1.1fr]">
        <section className="relative isolate flex min-h-[280px] flex-col justify-between overflow-hidden bg-slate-950 px-6 py-7 text-white sm:min-h-[320px] sm:px-9 sm:py-9 md:min-h-[660px] md:px-8 lg:px-12">
          <img src={heroCar} alt="Premium BMW SUV" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-950/85 via-slate-950/65 to-slate-950/75" />

          <Link to="/" className="relative inline-flex w-fit items-center gap-2.5 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Car className="h-6 w-6" />
            </span>
            <span className="text-2xl font-bold">AutoRent</span>
          </Link>

          <div className="relative mt-12 md:mt-0 md:pb-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-blue-200">Premium Car Rentals</p>
            <h2 className="max-w-sm text-3xl font-bold leading-tight sm:text-4xl">Your journey starts here.</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/85 sm:text-base">
              Premium cars, simple booking, and a better way to travel.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10 md:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-md reveal-x-alt">
            <div className="mb-8">
              <p className="text-sm font-semibold text-blue-600">Welcome back to AutoRent</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
              <p className="mt-2 text-sm text-slate-600">Sign in to continue your journey.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    id="login-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="inline-flex cursor-pointer items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600 focus:ring-2 focus:ring-blue-400"
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">Forgot password?</Link>
              </div>

              {submitMessage && (
                <p role="status" className="rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-800">
                  {submitMessage}
                </p>
              )}

              <button
                type="submit"
                className="h-12 w-full cursor-pointer rounded-lg bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-600">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">Sign Up</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login